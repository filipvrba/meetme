export default class CContent {
  get data() {
    return this._data
  };

  constructor(data) {
    this._data = data
  };

  subinitElm(id, date=null) {
    let result = [];

    for (let message of this._data.messages) {
      let isLeft = parseInt(message.user_id) === id;
      let firtDivClass = isLeft ? "" : "justify-content-end";
      let imgStyleMargine = isLeft ? "right" : "left";
      let secondDivClass = isLeft ? "bg-light" : "bg-primary text-white";
      let [mFullName, avatar] = this.getAvatar(parseInt(message.user_id));
      mFullName = mFullName.decodeBase64();

      let mMessage = message.message.decodeBase64().replaceAll(
        "HELLO",
        "<p style=\"font-size: 48px;\">👋</p>"
      );

      let domImg = `<img src='${avatar}' class='rounded-circle' width='40' height='40' alt='Avatar ${mFullName}' style='margin-${imgStyleMargine}: 12px;'>`;
      let template = `${`
      <div ${date ? `id='message-${date}'` : ""} class='d-flex ${firtDivClass} mb-3'>
        ${isLeft ? domImg : ""}
        <div class='${secondDivClass} rounded p-2'>
          <p class='mb-0'>${mMessage}</p>
        </div>
        ${isLeft ? "" : domImg}
      </div>
      `}`;
      result.push(template)
    };

    return result.join("")
  };

  getAvatar(id) {
    for (let avatar of this._data.avatars) {
      if (parseInt(avatar.user_id) === id) {
        return [avatar.full_name, avatar.image_base64]
      }
    };

    return null
  }
}