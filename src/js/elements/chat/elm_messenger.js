import CDatabse from "../../components/elm-chat-messenger/database";
import CContent from "../../components/elm-chat-messenger/content";

export default class ElmChatMessenger extends HTMLElement {
  get userId() {
    return this._userId
  };

  constructor() {
    super();

    this._hChatUpdate = () => {
      return this.chatUpdate()
    };

    this._hChatMenuLiClick = e => this.updateInitElm(e.detail.value, true);

    this._hBtnClick = () => {
      return this.btnClick()
    };

    this._userId = this.getAttribute("user-id");
    this._id = null;
    this._cDatabase = new CDatabse(this);
    this.initElm();
    this._containerMessages = this.querySelector("#chatMessengerContainerMessages");
    this._input = this.querySelector("#chatMessengerInput");
    this._btn = this.querySelector("#chatMessengerBtn")
  };

  connectedCallback() {
    Events.connect("#app", "chatMenuLiClick", this._hChatMenuLiClick);
    this._btn.addEventListener("click", this._hBtnClick);
    return Events.connect("#app", "chatUpdate", this._hChatUpdate)
  };

  disconnectedCallback() {
    Events.disconnect("#app", "chatMenuLiClick", this._hChatMenuLiClick);
    this._btn.removeEventListener("click", this._hBtnClick);
    return Events.disconnect("#app", "chatUpdate", this._hChatUpdate)
  };

  chatUpdate() {
    if (!this._id) return;
    return this.updateInitElm(this._id)
  };

  btnClick() {
    if (!this._id || this._input.value === "") return;
    let date = (new Date).toISOString();
    this.offlineSendMessage(date);
    this.scrollDown();
    let messageElm = document.getElementById(`message-${date}`);

    this._cDatabase.sendMessage(
      this._id,
      this._input.value,

      (isSent) => {
        if (isSent) return messageElm.classList.remove("inactive")
      }
    );

    this._input.value = "";
    return messageElm.classList.add("inactive")
  };

  updateInitElm(id, sudo=false) {
    this._id = id;

    return this._cDatabase.getAvatarsWithMessages(this._id, (data) => {
      this._cContent = new CContent(data);
      this._containerMessages.innerHTML = this._cContent.subinitElm(this._id);
      return this.scrollDown(sudo)
    })
  };

  initElm() {
    let template = `${`
<div class='container-messenger'>
  <div class='col-md-9 p-3 mx-auto d-flex flex-column' style='height: 100%;'>
    <div id='chatMessengerContainerMessages' class='border rounded p-3 mb-3 flex-grow-1' style='overflow-y: auto;'>
    </div>

    <div class='input-group mt-auto'>
      <input id='chatMessengerInput' type='text' class='form-control' placeholder='Napiš zprávu...'>
      <div class='input-group-append'>
        <button id='chatMessengerBtn' class='btn btn-primary' type='button'><i class='bi bi-send'></i></button>
      </div>
    </div>

  </div>
</div>
    `}`;
    return this.innerHTML = template
  };

  scrollDown(sudo=false) {
    let currentScroll = this._containerMessages.scrollTop + this._containerMessages.clientHeight;
    let maxScroll = this._containerMessages.scrollHeight;

    if (maxScroll - currentScroll <= 100 || sudo) {
      return this._containerMessages.scrollTo({
        top: this._containerMessages.scrollHeight,
        behavior: "smooth"
      })
    }
  };

  offlineSendMessage(date) {
    let mNewData = Object.assign({}, this._cContent.data);

    mNewData.messages = [{
      user_id: this._userId,
      message: this._input.value.encodeBase64()
    }];

    this._cContent = new CContent(mNewData);

    return this._containerMessages.innerHTML += this._cContent.subinitElm(
      this._id,
      date
    )
  }
}