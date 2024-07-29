export default class ElmMarkerAvater extends HTMLElement {
  constructor() {
    super();
    this._userId = this.getAttribute("user-id");
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
    return Events.emit("#app", "avatarClick", idAvatar)
  };

  initElm() {
    let template = `${`\n    <img id='avatar-${this._userId}' class='rounded-circle' onclick='markerAvatarClick(${this._userId})' alt='Marker avatar' width='64' height='64' src='${this._src}'></img>\n    `}`;
    return this.innerHTML = template
  }
}