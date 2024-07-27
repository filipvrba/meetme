export default class ElmDashboardHeader < HTMLElement
  def initialize
    super

    @user_id = self.get_attribute('user-id')
    
    __bef_db.get("SELECT email FROM users WHERE id = #{@user_id}") do |rows|
      init_elm(rows[0].email) if rows.length > 0
    end
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def init_elm(email)
    template = """
<nav class='navbar navbar-light bg-light'>
  <div class='container-fluid'>
    <a class='navbar-brand' href='#dashboard'>Dashboard</a>
    <div class='ms-auto'>
      <ul class='navbar-nav d-flex flex-row'>
        <li class='nav-item dropdown'>
          <a class='nav-link dropdown-toggle' href='#' id='accountDropdown' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
            <i class='bi bi-person-circle'></i> Účet
          </a>
          <ul class='dropdown-menu text-small shadow' aria-labelledby='accountDropdown' style='position: absolute; inset: 0px 0px auto auto; margin: 0px; transform: translate(0px, 34px);' data-popper-placement='bottom-end'>
            <li class='dropdown-header'>
              Přihlášen jako<br><strong>#{email}</strong>
            </li>
            <li><hr class='dropdown-divider'></li>
            <li><a id='dashboard-header-settings-link' class='dropdown-item' href='#dashboard-settings'>Nastavení</a></li>
            <li><a class='dropdown-item' href='#'>Odhlásit se</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
    """

    self.innerHTML = template
  end
end