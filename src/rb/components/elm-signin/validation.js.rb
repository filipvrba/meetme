export default class CValidation
  REG_EMAIL_VALIDATION = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/

  def initialize(email, password)
    @email     = email
    @password  = password
  end

  def validations(&callback)
    val_email     = validation_email()
    val_password  = validation_password()

    if val_email && val_password
      callback.call() if callback
    end
  end

  def validation_email()
    is_email_correct = REG_EMAIL_VALIDATION.test(@email.value)
    update_validation_email(is_email_correct)

    return is_email_correct
  end

  def validation_password()
    is_password_correct = @password.value != ''
    update_validation_password(is_password_correct)

    return is_password_correct
  end

  def update_validation_email(is_valid)
    if is_valid
      @email.class_list.remove('is-invalid')
    else
      @email.class_list.add('is-invalid')
    end
  end

  def update_validation_password(is_valid)
    if is_valid
      @password.class_list.remove('is-invalid')
    else
      @password.class_list.add('is-invalid')
    end
  end
end