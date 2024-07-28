export default class CFiles {
  constructor(profilePicture, cDatabase) {
    this._profilePicture = profilePicture;
    this._cDatabase = cDatabase
  };

  uploadFileInputChange(callback) {
    let reader;
    let file = this._profilePicture.files[0];

    if (file) {
      reader = new FileReader;

      reader.onload = e => (
        this._cDatabase.uploadFileOnDb(
          file.name,
          e.target.result,
          callback,

          (imageId) => {
            if (callback) return callback(imageId)
          }
        )
      );

      return reader.readAsDataURL(file)
    } else {
      return this._cDatabase.getFileId((imageId) => {
        if (callback) return callback(imageId)
      })
    }
  }
}