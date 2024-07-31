export default class CBody
  def initialize(user_id)
    @user_id = user_id

    window.dashboard_update = dashboard_update
  end

  def dashboard_update(index = nil)
    URLParams.set('d-index', index) if index != nil
    update_subinit_elm()
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