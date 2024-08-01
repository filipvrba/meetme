export default class CDatabase
  def initialize(element)
    @element = element
  end

  def get_all_relevant_users(&callback)
    query = "
SELECT 
    u.id,
    u.full_name,
    ia.image_base64,
    ud.is_logged,
    MAX(m.created_at) as latest_message
FROM 
    messages m
JOIN 
    users u ON m.user_id = u.id
JOIN 
    user_details ud ON u.id = ud.user_id
LEFT JOIN 
    image_avatars ia ON ud.avatar_id = ia.id
WHERE 
    m.for_user_id = #{@element.user_id}
GROUP BY 
    u.id, u.full_name, ia.image_base64, ud.is_logged;
    "

    __bef_db.get(query) do |rows|
      if rows.length > 0
        callback(rows) if callback
      else
        callback(nil) if callback
      end
    end
  end

  def get_notifications(&callback)
    query = "
SELECT 
    notifications.id AS notification_id, 
    messages.user_id 
FROM 
    notifications
JOIN 
    messages ON notifications.message_id = messages.id
WHERE 
    notifications.for_user_id = #{@element.user_id} AND notifications.is_read = 0;
    "
    
    __bef_db.get(query) do |rows|
      callback(rows) if callback
    end
  end
end