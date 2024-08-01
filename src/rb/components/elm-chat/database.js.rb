export default class CDatabase
  def initialize(element)
    @element = element
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
      if rows.length
        callback(rows) if callback
      else
        callback(nil) if callback
      end
    end
  end
end