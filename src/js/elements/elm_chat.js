import AProtectionElement from "./abstracts/protection_element";
import CDatabase from "../components/elm-chat/database";

export default class ElmChat extends AProtectionElement {
  get userId() {
    return this._userId
  };

  constructor() {
    super();
    this._timeoutId = null
  };

  initializeProtected() {
    this.initElm();
    this._cDatabase = new CDatabase(this);
    return this.update()
  };

  connectedCallback() {
    return super.connectedCallback()
  };

  disconnectedCallback() {
    super.disconnectedCallback();
    return clearTimeout(this._timeoutId)
  };

  update() {
    Events.emit("#app", "chatUpdate");
    this._timeoutId = setTimeout(this.update.bind(this), 10_000);
    return this._timeoutId
  };

  initElm() {
    let template = `${`
    <elm-chat-header></elm-chat-header>
    <elm-chat-menu user-id='${this._userId}'></elm-chat-menu>
    <elm-chat-messenger user-id='${this._userId}'></elm-chat-messenger>
    <elm-dashboard-footer user-id='${this._userId}'></elm-dashboard-footer>
    `}`;
    return this.innerHTML = template
  }
}