import 'ElmAlert', '../../elements/elm_alert'

export default class CDatabase
  def initialize(element)
    @element = element

    @element.set_spinner_display(false)
  end

  def signin(options, &callback)
    @element.set_spinner_display(true)

    email         = options.email.value
    hash_password = options.password.value.encode_md5()

    query = "SELECT id FROM users WHERE email='#{email}' " +
            "AND hash_password='#{hash_password}';"

    __bef_db.get(query) do |rows|
      @element.set_spinner_display(false)

      is_signin = rows.length > 0
      unless is_signin
        Events.emit('#app', ElmAlert::ENVS::SHOW, {
          end_time: 15,
          message: """
          <i class='bi bi-x-circle me-2'></i> Nepodařilo se přihlásit! Možné důvody: Špatný email nebo špatné heslo.
          """,
          style: 'danger',
        })
      else
        user_id = rows[0].id
        callback(user_id) if callback
      end
    end
  end

  def add_token(options, &callback)
    @element.set_spinner_display(true)

    clean_up_tokens() do 
      query = "INSERT INTO tokens (user_id, token, expires_at) " +
              "VALUES (#{options.id}, '#{options.token}', '#{options.date}');"
        
      __bef_db.set(query) do |is_write|
        @element.set_spinner_display(false)
        
        if is_write
          callback.call() if callback
        end
      end
    end
  end

  def clean_up_tokens(&callback)
    current_time = Date.new().toISO_string()
    query = "DELETE FROM tokens WHERE expires_at < '#{current_time}';"

    __bef_db.set(query) do |is_clean_up|
      callback.call() if callback
    end
  end
end