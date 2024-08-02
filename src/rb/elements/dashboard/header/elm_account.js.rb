export default class ElmDashboardHeaderAccount < HTMLElement
  def initialize
    super

    @user_id = self.get_attribute('user-id')
    
    init_elm()

    __bef_db.get("SELECT email FROM users WHERE id = #{@user_id}") do |rows|
      init_email(rows[0].email) if rows.length > 0
    end

    window.dropdown_item_signout_click = dropdown_item_signout_click
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def dropdown_item_signout_click()
    Cookie.erase('l-token')
    Events.emit('#app', 'signout')
  end

  def init_elm()
    template = """
<ul class='navbar-nav d-flex flex-row'>
  <li class='nav-item dropdown'>
    <a class='nav-link dropdown-toggle' href='#' id='accountDropdown' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
      <i class='bi bi-person-circle'></i> Účet
    </a>
    <ul class='dropdown-menu text-small shadow' aria-labelledby='accountDropdown' style='position: absolute; inset: 0px 0px auto auto; margin: 0px; transform: translate(0px, 34px);' data-popper-placement='bottom-end'>
      <li class='dropdown-header'>
        Přihlášen jako<br><strong id='dropdownHeaderEmail'></strong>
      </li>
      <li><hr class='dropdown-divider'></li>
      <li><a id='dashboard-header-settings-link' class='dropdown-item' onclick='dashboardUpdate(1)' href='#dashboard'>Nastavení</a></li>
      <li><a class='dropdown-item'onclick='dropdownItemSignoutClick()' href='#'>Odhlásit se</a></li>
    </ul>
  </li>
</ul>
    """

    self.innerHTML = template
  end

  def init_email(email)
    self.query_selector('#dropdownHeaderEmail').innerHTML = email
  end
end