export default class CDatabase {
  constructor(element) {
    this._element = element
  };

  getNotifications(callback) {
    let query = `
SELECT 
    notifications.id AS notification_id, 
    messages.user_id 
FROM 
    notifications
JOIN 
    messages ON notifications.message_id = messages.id
WHERE 
    notifications.for_user_id = ${this._element.userId} AND notifications.is_read = 0;
    `;

    return _BefDb.get(query, (rows) => {
      if (rows.length) {
        if (callback) return callback(rows)
      } else if (callback) {
        return callback(null)
      }
    })
  }
}