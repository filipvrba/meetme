import 'CDatabase', './database'

export default class CNotifications
  def initialize(element)
    @element    = element
    @timeout_id = nil
    @c_database = CDatabase.new
  end

  def dispose()
    clear_timeout(@timeout_id)
  end

  def update(is_start)
    Events.emit('#app', 'chatUpdate')

    @c_database.there_is_notification(@element.user_id) do |have_notifications|
      if have_notifications
        unless window.is_notification_played
          window.is_notification_played = true
          sign()
        end

        @element.notification.class_list.remove('notification-display')
      else
        @element.notification.class_list.add('notification-display')
        window.is_notification_played = false
      end
    end

    @timeout_id = set_timeout(update, 10_000)
  end

  def sign()
    play_sound()

    Notification.requestPermission().then(lambda do|permission|
      if permission === "granted"
            notification = Notification.new("Nové oznámení", {
                body: "Toto je příklad oznámení.",
                # icon: "https://example.com/icon.png"
            })
    
            # // Ošetření události kliknutí na oznámení
            # notification.onclick = function(event) {
            #     event.preventDefault(); // Zabráníme defaultnímu chování
            #     window.open("https://example.com", "_blank"); // Otevře URL
            # };
      end
    end)
  end

  def play_sound()
    audio = Audio.new('/mp3/message.mp3')
    audio.play()
  end
end