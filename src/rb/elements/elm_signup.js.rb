import 'CValidation', '../components/elm-signup/validation'
import 'CDatabase', '../components/elm-signup/database'

export default class ElmSignup < HTMLElement
  attr_reader :link_signin

  def initialize
    super

    init_elm()

    window.signup_btn_click = signup_btn_click
  end

  def connected_callback()
    @full_name = self.query_selector('#signupFullName')
    @email = self.query_selector('#signupEmail')
    @password = self.query_selector('#signupPassword')
    @spinner_overlay = self.query_selector('.spinner-overlay')
    @link_signin = self.query_selector('#signupLinkSignIn')

    @c_validation = CValidation.new(@full_name, @email, @password)
    @c_database = CDatabase.new(self)
  end

  def disconnected_callback()
  end

  def signup_btn_click()
    @c_validation.validations do
      @c_database.add_new_user({
        full_name: @full_name,
        email: @email,
        password: @password
      })
    end  # c_validation
  end

  def init_elm()
    template = """
<div class='col-md-6 mx-auto'>
  <elm-spinner class='spinner-overlay' id='spinnerOverlay'></elm-spinner>

  <div class='mb-4'>
    <label class='mb-1' for='signupFullName'>Celé jméno</label>
    <input type='text' class='form-control' id='signupFullName'>
    <div id='signupValidationFullNameFeedback' class='invalid-feedback'>
      Zadejte prosím celé jméno.
    </div>
  </div>
  <div class='mb-4'>
    <label class='mb-1' for='signupEmail'>Email</label>
    <input type='email' class='form-control' id='signupEmail'>
    <div id='signupValidationEmailFeedback' class='invalid-feedback'>
      Zadejte prosím platnou emailovou adresu.
    </div>
  </div>
  <div class='mb-4'>
    <label class='mb-1' for='signupPassword'>Heslo</label>
    <input type='password' class='form-control' id='signupPassword'>
    <div id='signupValidationPasswordFeedback' class='invalid-feedback'>
      Zadejte prosím heslo.
    </div>
  </div>
  <div class='d-flex justify-content-between mb-4'>
    <a class='link-custom'>Forgot Your Password?</a>
    <a href='#signin' id='signupLinkSignIn' class='link-custom'>Have an Account?</a>
  </div>
  <button class='btn btn-primary btn-lg w-100' onclick='signupBtnClick()' style='font-size: 18px;'>Registrovat se</button>
</div>
    """

    self.innerHTML = template
  end

  def set_spinner_display(is_disabled)
    @spinner_overlay.style.display = is_disabled ? '' : :none
  end
end