export default class CDatabase
  def initialize(element)
    @element = element
  end

  def get_avatars_with_messages(id, &callback)
    get_image_avatars_from_id(id) do |image_rows|
      if image_rows
        get_messages_from_id(id) do |message_rows|
          if message_rows
            data = {
              avatars: image_rows,
              messages: message_rows
            }
            callback(data) if callback
          end
        end
      end
    end
  end

  def get_image_avatars_from_id(id, &callback)
    query = "
    SELECT 
    u.id AS user_id,
    u.full_name,
    ia.image_base64
FROM 
    users u
LEFT JOIN 
    user_details ud ON u.id = ud.user_id
LEFT JOIN 
    image_avatars ia ON ud.avatar_id = ia.id
WHERE 
    u.id IN (#{@element.user_id}, #{id});
    "

    __bef_db.get(query) do |rows|
      if rows.length > 0
        callback(rows) if callback
      else
        callback(nil) if callback
      end
    end
  end

  def get_messages_from_id(id, &callback)
    query = "
SELECT 
    m1.user_id,
    m1.message,
    m1.created_at
FROM 
    messages m1
WHERE 
    m1.user_id = #{id} AND m1.for_user_id = #{@element.user_id}
    OR m1.user_id = #{@element.user_id} AND m1.for_user_id = #{id}
ORDER BY 
    m1.created_at ASC;
    "

    __bef_db.get(query) do |rows|
      if rows.length > 0
        callback(rows) if callback
      else
        callback(nil) if callback
      end
    end
  end

  def send_message(id, message, &callback)
    query = "INSERT INTO messages (user_id, for_user_id, message) " +
            "VALUES (#{@element.user_id}, #{id}, '#{message.encode_base64()}');"

    __bef_db.set(query) do |is_sent|
      callback(is_sent) if callback
    end
  end
end