export default class CDatabase
  def initialize(user_id)
    @user_id = user_id
  end

  def get_all_users(&callback)
    query = "
SELECT 
    user_details.user_id, 
    image_avatars.image_base64, 
    user_details.is_logged, 
    user_details.position
FROM 
    user_details
JOIN 
    image_avatars
ON 
    user_details.avatar_id = image_avatars.id;
    "

    __bef_db.get(query) do |rows|
      if rows.length > 0
        callback(rows) if callback
      end
    end
  end  # get_all_users

  def update_position(position, &callback)
    query = "UPDATE user_details SET position = '#{position.x}-#{position.y}' " +
            "WHERE user_id = #{@user_id};"

    __bef_db.set(query) do |is_write|
      if is_write
        callback.call() if callback
      end
    end
  end  # update_position
end