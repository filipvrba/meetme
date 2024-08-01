export default class CDatabase {
  thereIsNotification(userId, callback) {
    let query = `SELECT id FROM notifications WHERE for_user_id = ${userId};`;

    return _BefDb.get(query, (rows) => {
      if (callback) return callback(rows.length > 0)
    })
  }
}