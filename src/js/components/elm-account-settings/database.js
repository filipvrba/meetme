export default class CDatabase {
  constructor(element) {
    this._element = element;
    this._element.setSpinnerDisplay(false)
  };

  getUserDetails(callback) {
    this._element.setSpinnerDisplay(true);

    return _BefDb.get(
      `
SELECT 
    users.id, 
    users.full_name, 
    users.email, 
    user_details.bio
FROM 
    users
LEFT JOIN 
    user_details ON users.id = user_details.user_id
WHERE 
    users.id = ${this._element.userId};`,

      (rows) => {
        let data;
        this._element.setSpinnerDisplay(false);

        if (rows.length > 0) {
          data = rows[0];
          if (callback) return callback(data)
        }
      }
    )
  };

  uploadFileOnDb(name, base64File, callback) {
    let lInsert = () => (
      _BefDb.set(
        `INSERT INTO image_avatars (user_id, name, image_base64) VALUES (${this._element.userId}, '${name}', '${base64File}');`,

        () => (
          this.getFileId((imageId) => {
            if (callback) return callback(imageId)
          })
        )
      )
    );

    return this.getFileId(avatarId => (
      avatarId > 0 ? _BefDb.set(
        `DELETE FROM image_avatars WHERE id = ${avatarId}`,

        (isDeleted) => {
          if (isDeleted) return lInsert.call()
        }
      ) : lInsert.call()
    ))
  };

  getFileId(callback) {
    return _BefDb.get(
      `SELECT id FROM image_avatars WHERE user_id = ${this._element.userId}`,

      (rows) => {
        if (rows.length > 0) {
          if (callback) return callback(rows[rows.length - 1].id)
        } else if (callback) {
          return callback(-1)
        }
      }
    )
  };

  updateUser(fullName, email, callback) {
    let queryUser = `UPDATE users SET full_name = '${fullName}', email = '${email}' WHERE id = ${this._element.userId};`;

    return _BefDb.set(queryUser, (isWrite) => {
      if (isWrite) if (callback) return callback.call()
    })
  };

  addOrUpdateUserDetails(bio, imageId, callback) {
    let queryUserDetails = `INSERT INTO user_details (user_id, bio, avatar_id) VALUES (${this._element.userId}, '${bio}', ${imageId});`;

    return _BefDb.set(queryUserDetails, (isWrite) => {
      let queryUserDetailsUpdate;

      if (isWrite) {
        if (callback) return callback.call()
      } else {
        queryUserDetailsUpdate = `UPDATE user_details SET bio = '${bio}', avatar_id = ${imageId} WHERE user_id = ${this._element.userId};`;

        return _BefDb.set(queryUserDetailsUpdate, (isWrite) => {
          if (callback) return callback.call()
        })
      }
    })
  };

  saveChanges(fullName, email, bio, callback) {
    this._element.setSpinnerDisplay(true);
    _BefDb.isVerbose = false;

    // TODO: Zde by mohla být logická hodnota pro konečnou fázy
    //       kontroly pro callback.
    this.updateUser(fullName, email, () => null);

    return this._element.cFiles.uploadFileInputChange(imageId => (
      this.addOrUpdateUserDetails(bio, imageId, () => {
        this._element.setSpinnerDisplay(false);
        _BefDb.isVerbose = true;
        if (callback) return callback.call()
      })
    ))
  }
}