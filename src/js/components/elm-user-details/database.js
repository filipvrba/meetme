export default class CDatabase {
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
  }
}