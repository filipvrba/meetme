export default class AProtectionElement < HTMLElement
  def initialize
    super

    @user_id = nil

    token = Cookie.get('l-token')

    unless token
      go_to_signin()
    else
      query = "SELECT user_id FROM tokens WHERE token = '#{token}'"
      __bef_db.get(query) do |rows|
        is_accessible = rows.length > 0
        
        unless is_accessible
          go_to_signin()
        else
          @user_id = rows[0]['user_id'].to_i
          initialize_protected()
        end
      end
    end
  end

  def go_to_signin()
    location.hash = "signin"
  end

  def initialize_protected()
  end
end