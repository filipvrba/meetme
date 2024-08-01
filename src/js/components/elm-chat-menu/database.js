export default class CDatabase {
  constructor(element) {
    this._element = element
  };

  getAllRelevantUsers(callback) {
    let query = `
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
    m.for_user_id = ${this._element.userId}
GROUP BY 
    u.id, u.full_name, ia.image_base64, ud.is_logged;
    `;

    return _BefDb.get(query, (rows) => {
      if (rows.length > 0) {
        if (callback) return callback(rows)
      } else if (callback) {
        return callback(null)
      }
    })
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
      if (callback) return callback(rows)
    })
  }
}