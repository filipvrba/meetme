export default class CDatabase
  def there_is_notification(user_id, &callback)
    query = "SELECT id FROM notifications WHERE for_user_id = #{user_id};"

    __bef_db.get(query) do |rows|
      callback(rows.length > 0) if callback
    end
  end
end