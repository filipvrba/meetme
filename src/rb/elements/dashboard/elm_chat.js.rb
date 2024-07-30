export default class ElmDashboardChat < HTMLElement
  def initialize
    super
    
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