import 'AProtectionElement', './abstracts/protection_element'

export default class ElmDashboard < AProtectionElement
  def initialize
    super
  end

  def initialize_protected()
    init_elm()
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def init_elm()
    template = """
<elm-dashboard-header user-id='#{@user_id}'></elm-dashboard-header>
<div class='nav-padding'>
  <elm-dashboard-jumbotron-avatar user-id='#{@user_id}'></elm-dashboard-jumbotron-avatar>
</div>
    """

    self.innerHTML = template
  end
end