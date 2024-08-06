export default class CBody
  def initialize(user_id)
    @user_id = user_id

    @h_dashboard_update_body = lambda { update_subinit_elm() }
  end

  def connected_callback()
    Events.connect('#app', 'dashboardUpdateBody', @h_dashboard_update_body)
  end

  def disconnected_callback()
    Events.disconnect('#app', 'dashboardUpdateBody', @h_dashboard_update_body)
  end

  def update_subinit_elm()
    dashboard_body = document.get_element_by_id('dashboardBody')

    if dashboard_body
      dashboard_index = URLParams.get_index('d-index')
      dashboard_body.innerHTML = subinit_elm(dashboard_index)
    end
  end

  def subinit_elm(dashboard_index)
    case dashboard_index
    when 1
      return """
      <div class='col-lg-8 mx-auto'>
        <elm-alert></elm-alert>
        <elm-dashboard-account-settings user-id='#{@user_id}'></elm-dashboard-account-settings>
      </div>
      """
    else
      return """
      <elm-dashboard-greeting user-id='#{@user_id}'></elm-dashboard-greeting>
      """
    end
  end
end