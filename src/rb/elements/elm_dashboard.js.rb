import 'AProtectionElement', './abstracts/protection_element'

export default class ElmDashboard < AProtectionElement
  def initialize
    super
  end

  def initialize_protected()
    init_elm()
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def init_elm()
    template = """
    lol
    """

    self.innerHTML = template
  end
end