export default class ElmChatMessenger extends HTMLElement {
  constructor() {
    super();
    this._userId = this.getAttribute("user-id");
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
<div class='container-messenger'>
  <div class='col-md-9 p-3 mx-auto d-flex flex-column' style='height: 100%;'>
    <div class='border rounded p-3 mb-3 flex-grow-1' overflow-y: auto;'>
      <!-- Zprávy -->
      <div class='d-flex mb-3'>
        <img src='https://via.placeholder.com/40' class='rounded-circle' alt='Uživatel 1' style='margin-right: 12px;'>
        <div class='bg-light rounded p-2'>
          <p class='mb-0'>Ahoj, jak se máš?</p>
        </div>
      </div>
      <div class='d-flex justify-content-end mb-3'>
        <div class='bg-primary text-white rounded p-2'>
          <p class='mb-0'>Mám se dobře, díky!</p>
        </div>
        <img src='https://via.placeholder.com/40' class='rounded-circle' alt='Ty' style='margin-left: 12px;'>
      </div>
      <!-- Další zprávy -->
    </div>


    <div class='input-group mt-auto'>
      <input type='text' class='form-control' placeholder='Napiš zprávu...'>
      <div class='input-group-append'>
        <button class='btn btn-primary' type='button'><i class='bi bi-send'></i></button>
      </div>
    </div>

  </div>
</div>
    `}`;
    return this.innerHTML = template
  }
}