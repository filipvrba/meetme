export default class ElmDashboardHeader < HTMLElement
  def initialize
    super

    @user_id = self.get_attribute('user-id')

    init_elm()
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def init_elm()
    template = """
<nav class='navbar navbar-light bg-light'>
  <div class='container-fluid'>
    <a class='navbar-brand' onclick='window.dashboardUpdate(0)' href='#dashboard'>Dashboard</a>
    <div class='ms-auto'>
      <elm-dashboard-header-account user-id='#{@user_id}'></elm-dashboard-header-account>
    </div>
  </div>
</nav>
    """

    self.innerHTML = template
  end
end