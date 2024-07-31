import AProtectionElement from "./abstracts/protection_element";

export default class ElmChat extends AProtectionElement {
  constructor() {
    super();
    this._timeoutId = null
  };

  initializeProtected() {
    return this.initElm()
  };

  connectedCallback() {
    super.connectedCallback();
    return this.update()
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