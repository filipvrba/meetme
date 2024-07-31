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
    m.created_at
FROM 
    messages m
JOIN 
    users u ON m.user_id = u.id
JOIN 
    user_details ud ON u.id = ud.user_id
LEFT JOIN 
    image_avatars ia ON ud.avatar_id = ia.id
WHERE 
    m.for_user_id = ${this._element.userId};
    `;

    return _BefDb.get(query, (rows) => {
      if (rows.length > 0) {
        if (callback) return callback(rows)
      } else if (callback) {
        return callback(null)
      }
    })
  }
}