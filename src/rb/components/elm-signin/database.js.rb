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

      @element.set_spinner_display(false)
    end
  end

  def add_token(options, &callback)
    query = "INSERT INTO tokens (user_id, token, expires_at) " +
            "VALUES (#{options.id}, '#{options.token}', '#{options.date}')"
            
    __bef_db.set(query) do |is_write|
      if is_write
        callback.call() if callback
      end
    end
  end
end