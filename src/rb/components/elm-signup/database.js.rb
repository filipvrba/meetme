import 'ElmAlert', '../../elements/elm_alert'

export default class CDatabase
  def initialize(elm_signup)
    @elm_signup = elm_signup

    @elm_signup.set_spinner_display(false)
  end

  def add_new_user(options)
    @elm_signup.set_spinner_display(true)

    full_name     = options.full_name.value.encode_base64()
    email         = options.email.value
    hash_password = options.password.value.encode_md5()

    query = "INSERT INTO users (full_name, email, hash_password) " +
            "VALUES ('#{full_name}', '#{email}', '#{hash_password}');"
      
    __bef_db.is_verbose = false
    __bef_db.set(query) do |is_registered|
      unless is_registered
        Events.emit('#app', ElmAlert::ENVS::SHOW, {
          end_time: 7,
          message: "<i class='bi bi-exclamation-triangle-fill me-2'></i> " +
                    "Registraci nelze dokončit, protože zadaný e-mail již je registrován.",
          style: 'warning',
        })
      else
        @elm_signup.link_signin.click()
      end

      __bef_db.is_verbose = true
      @elm_signup.set_spinner_display(false)
    end
  end
end