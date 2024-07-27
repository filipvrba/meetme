import 'AProtectionElement', './abstracts/protection_element'
import 'CBody', '../components/elm-dashboard/body'

export default class ElmDashboard < AProtectionElement
  def initialize
    super
  end

  def initialize_protected()
    @c_body = CBody.new(@user_id)
    
    init_elm()
    @c_body.dashboard_update()
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def init_elm()
    template = """
    <elm-dashboard-header user-id='#{@user_id}'></elm-dashboard-header>
    <div id='dashboardBody' class='nav-padding'></div>
    """

    self.innerHTML = template
  end
end