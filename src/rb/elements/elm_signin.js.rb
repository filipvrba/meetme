import 'CValidation', '../components/elm-signin/validation'
import 'CDatabase', '../components/elm-signin/database'
import 'CProtect', '../components/elm-signin/protect'

export default class ElmSignin < HTMLElement
  attr_reader :c_validation, :c_token

  def initialize
    super
    
    init_elm()

    window.signin_btn_click = signin_btn_click
  end

  def connected_callback()
    @email             = self.query_selector('#signinEmail')
    @password          = self.query_selector('#signinPassword')
    @spinner_overlay   = self.query_selector('.spinner-overlay')

    @c_validation = CValidation.new(@email, @password)
    @c_database   = CDatabase.new(self)
    @c_protect    = CProtect.new()
  end

  def disconnected_callback()
  end

  def signin_btn_click()
    @c_validation.validations do
      @c_database.signin({email: @email, password: @password}) do |user_id|

        token, date = @c_protect.write_new_token()

        @c_database.add_token({id: user_id, token: token, date: date}) do
          location.hash = "dashboard"
        end
      end
    end
  end

  def init_elm()
    template = """
<div class='col-md-6 mx-auto'>
  <elm-spinner class='spinner-overlay' id='spinnerOverlay'></elm-spinner>

  <div class='mb-4'>
    <label class='mb-1' for='signinEmail'>Email</label>
    <input type='email' class='form-control' id='signinEmail'>
    <div id='signinValidationEmailFeedback' class='invalid-feedback'>
      Zadejte prosím platnou emailovou adresu.
    </div>
  </div>
  <div class='mb-4'>
    <label class='mb-1' for='signinPassword'>Heslo</label>
    <input type='password' class='form-control' id='signinPassword'>
    <div id='signinValidationPasswordFeedback' class='invalid-feedback'>
      Zadejte prosím heslo.
    </div>
  </div>
  <div class='d-flex justify-content-between mb-4'>
    <a class='link-custom'>Zapoměl jsi heslo?</a>
    <a href='#signup' id='signinLinkSignUp' class='link-custom'>Potřebuješ účet?</a>
  </div>
  <button class='btn btn-primary btn-lg w-100' onclick='signinBtnClick()' style='font-size: 18px;'>Přihlásit se</button>
</div>
    """

    self.innerHTML = template
  end

  def set_spinner_display(is_disabled)
    @spinner_overlay.style.display = is_disabled ? '' : :none
  end
end