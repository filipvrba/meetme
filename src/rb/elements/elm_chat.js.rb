import 'AProtectionElement', './abstracts/protection_element'

export default class ElmChat < AProtectionElement
  def initialize
    super

    @timeout_id = nil
  end

  def initialize_protected()
    init_elm()
  end

  def connected_callback()
    super

    update()
  end

  def disconnected_callback()
    super

    clear_timeout(@timeout_id)
  end

  def update()
    Events.emit('#app', 'chatUpdate')

    @timeout_id = set_timeout(update, 10_000)
  end

  def init_elm()
    template = """
    <elm-chat-header></elm-chat-header>
    <elm-chat-menu user-id='#{@user_id}'></elm-chat-menu>
    <elm-chat-messenger user-id='#{@user_id}'></elm-chat-messenger>
    <elm-dashboard-footer user-id='#{@user_id}'></elm-dashboard-footer>
    """

    self.innerHTML = template
  end
end