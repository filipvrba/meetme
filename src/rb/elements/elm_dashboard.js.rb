import 'AProtectionElement', './abstracts/protection_element'
import 'CBody', '../components/elm-dashboard/body'

export default class ElmDashboard < AProtectionElement
  def initialize
    super
  end

  def initialize_protected()
    @c_body = CBody.new(@user_id)
    @c_body.connected_callback()
    
    init_elm()
    window.dashboard_update()
  end

  def connected_callback()
    super
  end

  def disconnected_callback()
    super
    @c_body.disconnected_callback()
  end

  def init_elm()
    template = """
    <elm-dashboard-header user-id='#{@user_id}'></elm-dashboard-header>
    <div id='dashboardBody' class='nav-padding footer-padding'></div>
    <elm-dashboard-footer user-id='#{@user_id}'></elm-dashboard-footer>
    """

    self.innerHTML = template
  end
end