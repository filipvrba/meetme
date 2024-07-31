import AProtectionElement from "./abstracts/protection_element";

export default class ElmChat extends AProtectionElement {
  constructor() {
    super()
  };

  initializeProtected() {
    return this.initElm()
  };

  connectedCallback() {
    return super.connectedCallback()
  };

  disconnectedCallback() {
    return super.disconnectedCallback()
  };

  initElm() {
    let template = `${`
    <elm-chat-header></elm-chat-header>
    <elm-chat-menu user-id='${this._userId}'></elm-chat-menu>
    <elm-dashboard-footer user-id='${this._userId}'></elm-dashboard-footer>
    `}`;
    return this.innerHTML = template
  }
}