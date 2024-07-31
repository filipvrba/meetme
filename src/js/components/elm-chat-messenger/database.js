export default class CDatabase {
  constructor(element) {
    this._element = element
  };

  getAvatarsWithMessages(id, callback) {
    return this.getImageAvatarsFromId(id, (imageRows) => {
      if (imageRows) {
        return this.getMessagesFromId(id, (messageRows) => {
          let data;

          if (messageRows) {
            data = {avatars: imageRows, messages: messageRows};
            if (callback) return callback(data)
          }
        })
      }
    })
  };

  getImageAvatarsFromId(id, callback) {
    let query = `
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
    u.id IN (${this._element.userId}, ${id});
    `;

    return _BefDb.get(query, (rows) => {
      if (rows.length > 0) {
        if (callback) return callback(rows)
      } else if (callback) {
        return callback(null)
      }
    })
  };

  getMessagesFromId(id, callback) {
    let query = `
SELECT 
    m1.user_id,
    m1.message,
    m1.created_at
FROM 
    messages m1
WHERE 
    m1.user_id = ${id} AND m1.for_user_id = ${this._element.userId}
    OR m1.user_id = ${this._element.userId} AND m1.for_user_id = ${id}
ORDER BY 
    m1.created_at ASC;
    `;

    return _BefDb.get(query, (rows) => {
      if (rows.length > 0) {
        if (callback) return callback(rows)
      } else if (callback) {
        return callback(null)
      }
    })
  };

  sendMessage(id, message, callback) {
    let query = `INSERT INTO messages (user_id, for_user_id, message) VALUES (${this._element.userId}, ${id}, '${message.encodeBase64()}');`;

    return _BefDb.set(query, (isSent) => {
      if (callback) return callback(isSent)
    })
  }
}