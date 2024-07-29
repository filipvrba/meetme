export default class CDatabase {
  constructor(userId) {
    this._userId = userId
  };

  getAllUsers(callback) {
    let query = `
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
    `;

    return _BefDb.get(query, (rows) => {
      if (rows.length > 0) if (callback) return callback(rows)
    })
  };

  updatePosition(position, callback) {
    let query = `UPDATE user_details SET position = '${position.x}-${position.y}' WHERE user_id = ${this._userId};`;

    return _BefDb.set(query, (isWrite) => {
      if (isWrite) if (callback) return callback.call()
    })
  }
}