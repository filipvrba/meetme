export default class CValidation
  REG_EMAIL_VALIDATION = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/

  def initialize(full_name, email, password)
    @full_name = full_name
    @email     = email
    @password  = password
  end

  def validations(&callback)
    val_full_name = validation_full_name()
    val_email     = validation_email()
    val_password  = validation_password()

    if val_full_name && val_email && val_password
      callback.call() if callback
    end
  end

  def validation_full_name()
    is_full_name_valid = @full_name.value != ''
    update_validation_full_name(is_full_name_valid)

    return is_full_name_valid
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

  def update_validation_full_name(is_valid)
    if is_valid
      @full_name.class_list.remove('is-invalid')
    else
      @full_name.class_list.add('is-invalid')
    end
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