export default class CDatabase {
  constructor(element) {
    this._element = element
  };

  getDetails(userId, callback) {
    let query = `
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
    u.id = ${userId};
`;

    return _BefDb.get(query, (rows) => {
      if (rows.length > 0) if (callback) return callback(rows[0])
    })
  };

  startConversation(forUserId, message, callback) {
    let query = `INSERT INTO messages (user_id, for_user_id, message) VALUES (${this._element.userId}, ${forUserId}, '${message.encodeBase64()}');`;

    return _BefDb.set(query, (isStarted) => {
      if (isStarted) return callback(isStarted)
    })
  }
}