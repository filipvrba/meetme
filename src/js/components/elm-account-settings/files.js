import pica from "pica";

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
        this.resizeImage(e.target.result, resultBase64Data => (
          this._cDatabase.uploadFileOnDb(
            file.name,
            resultBase64Data,
            callback,

            (imageId) => {
              if (callback) return callback(imageId)
            }
          )
        ))
      );

      return reader.readAsDataURL(file)
    } else {
      return this._cDatabase.getFileId((imageId) => {
        if (callback) return callback(imageId)
      })
    }
  };

  resizeImage(fileResult, callback) {
    let img = new Image;

    img.onload = (e) => {
      let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext("2d");
      let targetWidth = 256;
      let targetHeight = 256;
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      return pica().resize(
        img,
        canvas,
        {width: targetWidth, height: targetHeight}
      ).then(result => pica().toBlob(result, "image/jpeg", 0.9)).then((blob) => {
        let reader = new FileReader;

        reader.onloadend = () => {
          let base64Data = reader.result;
          if (callback) return callback(base64Data)
        };

        return reader.readAsDataURL(blob)
      })
    };

    return img.src = fileResult
  }
}