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
      let squareCanvas = document.createElement("canvas");
      let squareCtx = squareCanvas.getContext("2d");
      let size = Math.min(img.width, img.height);
      squareCanvas.width = size;
      squareCanvas.height = size;
      let offsetX = (img.width - size) / 2;
      let offsetY = (img.height - size) / 2;

      squareCtx.drawImage(
        img,
        offsetX,
        offsetY,
        size,
        size,
        0,
        0,
        size,
        size
      );

      // resize 256px
      let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext("2d");
      canvas.width = 256;
      canvas.height = 256;

      return pica().resize(squareCanvas, canvas).then(result => (
        pica().toBlob(result, "image/jpeg", 0.9)
      )).then((blob) => {
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