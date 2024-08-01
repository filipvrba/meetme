export default class CDatabase
  def initialize(element)
    @element = element
  end

  def get_details(user_id, &callback)
    query = "
SELECT 
    u.full_name,
    ia.image_base64,
    ud.bio
FROM 
    users u
JOIN 
    user_details ud ON u.id = ud.user_id
LEFT JOIN 
    image_avatars ia ON ud.avatar_id = ia.id
WHERE 
    u.id = #{user_id};
"

    __bef_db.get(query) do |rows|
      if rows.length > 0
        callback(rows[0]) if callback
      end
    end
  end

  def start_conversation(for_user_id, message, &callback)
    query = "INSERT INTO messages (user_id, for_user_id, message) " +
            "VALUES (#{@element.user_id}, #{for_user_id}, #{message.encode_base64()});"
            
    __bef_db.set(query) do |is_started|
      callback(is_started) if is_started
    end
  end
end