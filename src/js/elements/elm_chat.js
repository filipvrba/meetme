import AProtectionElement from "./abstracts/protection_element";

export default class ElmChat extends AProtectionElement {
  get userId() {
    return this._userId
  };

  constructor() {
    super()
  };

  initializeProtected() {
    return this.initElm()
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