export default class AProtectionElement < HTMLElement
  def initialize
    super

    @h_visibility_change = lambda { |_| visibility_change() }

    @user_id = nil

    token = Cookie.get('l-token')
    @spinner_overlay = document.query_selector('.spinner-overlay')

    unless token
      go_to_signin()
    else
      set_spinner_display(true)
      query = "SELECT user_id FROM tokens WHERE token = '#{token}'"
      __bef_db.get(query) do |rows|
        is_accessible = rows.length > 0
        
        unless is_accessible
          go_to_signin()
        else
          set_spinner_display(false)
          @user_id = rows[0]['user_id'].to_i
          visibility_change() do
            initialize_protected()
          end
        end
      end
    end
  end

  def go_to_signin()
    visibility_change() do
      location.hash = "signin"
    end
  end

  def set_spinner_display(is_disabled)
    if @spinner_overlay
      @spinner_overlay.style.display = is_disabled ? '' : :none
    end
  end

  def connected_callback()
    document.add_event_listener('visibilitychange', @h_visibility_change)
  end

  def disconnected_callback()
    document.remove_event_listener('visibilitychange', @h_visibility_change)
  end

  def visibility_change(&callback)
    is_logged = document.hidden ? 0 : 1

    query = "UPDATE user_details SET is_logged = #{is_logged} " +
            "WHERE user_id = #{@user_id};"
    __bef_db.set(query) do |is_updated|
      callback.call() if is_updated
    end
  end

  def initialize_protected()
  end
end