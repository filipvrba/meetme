export default class ElmChatHeader extends HTMLElement {
  constructor() {
    super();
    this.initElm()
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  initElm() {
    let template = `${`
<nav class='navbar navbar-light bg-light'>
  <div class='container-fluid mx-auto'>
    <div class='col-4'>
      <button class='btn navbar-brand' type='button' data-bs-toggle='offcanvas' data-bs-target='#offcanvasChatMenu' aria-controls='offcanvasChatMenu'>
        <i class='bi bi-menu-button'></i>
      </button>
    </div>
    <div class='col-4 text-center'>
      <h3 class='m-0'>Chat</h3>
    </div>
    <div class='col-4'>
    </div>
  </div>
</nav>
    `}`;
    return this.innerHTML = template
  }
}