import CDatabase from "../../components/elm-chat-menu/database";

export default class ElmChatMenu extends HTMLElement {
  get userId() {
    return this._userId
  };

  constructor() {
    super();

    this._hChatUpdate = () => {
      return this.chatUpdate()
    };

    this._userId = this.getAttribute("user-id");
    this.initElm();
    this._menuList = this.querySelector("#chatMenuList");
    this._cDatabase = new CDatabase(this);
    this.chatUpdate();
    window.chatMenuLiClick = this.chatMenuLiClick.bind(this)
  };

  connectedCallback() {
    return Events.connect("#app", "chatUpdate", this._hChatUpdate)
  };

  disconnectedCallback() {
    return Events.disconnect("#app", "chatUpdate", this._hChatUpdate)
  };

  chatMenuLiClick(id) {
    return Events.emit("#app", "chatMenuLiClick", id)
  };

  chatUpdate() {
    return this._cDatabase.getAllRelevantUsers((rows) => {
      if (rows) return this.subinitElm(rows)
    })
  };

  initElm() {
    let template = `${`
<div class='offcanvas offcanvas-start' data-bs-scroll='true' tabindex='-1' id='offcanvasChatMenu' aria-labelledby='offcanvasChatMenuLabel'>
  <div class='offcanvas-header'>
    <button type='button' class='btn-close' data-bs-dismiss='offcanvas' aria-label='Close'></button>
  </div>
  <div class='offcanvas-body'>
    <h5>Uživatelé</h5>
    <ul id='chatMenuList' class='list-group list-group-flush'></ul>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  };

  subinitElm(rows) {
    let result = [];

    for (let row of rows) {
      let id = row.id;
      let fullName = row.full_name.decodeBase64();
      let img = row.image_base64;
      let isLogged = parseInt(row.is_logged) === 1 ? "<small class=\"text-success\">Online</small>" : "<small class=\"text-danger\">Offline</small>";
      let template = `${`
      <li class='list-group-item d-flex align-items-center' onclick='chatMenuLiClick(${id})'>
        <img src='${img}' class='rounded-circle' width='40' height='40' alt='Avatar ${fullName}'>
        <div style='margin-left: 12px;'>
          <h6 class='mb-0'>${fullName}</h6>
          <small class='text-muted'>${isLogged}</small>
        </div>
      </li>
      `}`;
      result.push(template)
    };

    return this._menuList.innerHTML = result.join("")
  }
}