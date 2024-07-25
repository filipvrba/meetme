export default class ElmMarkerAvater extends HTMLElement {
  constructor() {
    super();
    this._idAvatar = this.getAttribute("id-avatar");
    this._src = this.getAttribute("src");
    this.initElm();
    window.markerAvatarClick = this.markerAvatarClick.bind(this)
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  markerAvatarClick(idAvatar) {
    return console.log(idAvatar)
  };

  initElm() {
    let template = `${`\n    <img id='avatar-${this._idAvatar}' class='rounded-circle' onclick='markerAvatarClick(${this._idAvatar})' alt='Marker avatar' width='64' height='64' src='${this._src}'></img>\n    `}`;
    return this.innerHTML = template
  }
}