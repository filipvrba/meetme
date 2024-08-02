import 'AProtectionElement', './abstracts/protection_element'

export default class ElmChat < AProtectionElement
  attr_reader :user_id

  def initialize
    super
  end

  def initialize_protected()
    init_elm()
  end

  def init_elm()
    template = """
    <elm-chat-header user-id='#{@user_id}'></elm-chat-header>
    <elm-chat-menu user-id='#{@user_id}'></elm-chat-menu>
    <elm-chat-messenger user-id='#{@user_id}'></elm-chat-messenger>
    <elm-dashboard-footer user-id='#{@user_id}'></elm-dashboard-footer>
    """

    self.innerHTML = template
  end
end