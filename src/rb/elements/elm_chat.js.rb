import 'AProtectionElement', './abstracts/protection_element'
import 'CDatabase', '../components/elm-chat/database'

export default class ElmChat < AProtectionElement
  attr_reader :user_id

  def initialize
    super

    @timeout_id = nil
  end

  def initialize_protected()
    init_elm()

    @c_database = CDatabase.new(self)

    update()
  end

  def connected_callback()
    super
  end

  def disconnected_callback()
    super

    clear_timeout(@timeout_id)
  end

  def update()
    Events.emit('#app', 'chatUpdate')
    notifications()
    
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

  def notifications()
    @c_database.get_notifications() do |rows|
      unless rows
        return
      end

      Events.emit('#app', 'chatNotifications', rows)
    end
  end
end