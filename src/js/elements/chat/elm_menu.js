export default class ElmChatMenu extends HTMLElement {
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
<div class='offcanvas offcanvas-start' data-bs-scroll='true' tabindex='-1' id='offcanvasChatMenu' aria-labelledby='offcanvasChatMenuLabel'>
  <div class='offcanvas-header'>
    <button type='button' class='btn-close' data-bs-dismiss='offcanvas' aria-label='Close'></button>
  </div>
  <div class='offcanvas-body'>
    <h5>Uživatelé</h5>
    ${this.subinitElm()}
  </div>
</div>
    `}`;
    return this.innerHTML = template
  };

  subinitElm() {
    return `${`
<ul class='list-group list-group-flush'>
  <li class='list-group-item d-flex align-items-center'>
      <img src='https://via.placeholder.com/50' class='rounded-circle' alt='Uživatel 1'>
      <div style='margin-left: 12px;'>
          <h6 class='mb-0'>Uživatel 1</h6>
          <small class='text-muted'>Online</small>
      </div>
  </li>
  <li class='list-group-item d-flex align-items-center'>
      <img src='https://via.placeholder.com/50' class='rounded-circle' alt='Uživatel 2'>
      <div style='margin-left: 12px;'>
          <h6 class='mb-0'>Uživatel 2</h6>
          <small class='text-muted'>Offline</small>
      </div>
  </li>
    <!-- Další uživatelé -->
</ul>
    `}`
  }
}