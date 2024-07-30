export default class ElmDashboardFooter < HTMLElement
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
<footer class='footer navbar-light bg-light'>
  <div class='container-fluid'>
    <div class='row text-center icons-padding'>
      <div class='col-sm'>
        <a href='#dashboard' class='text-dark'>
          <i class='bi bi-speedometer2 icon-large'></i>
        </a>
      </div>
      <div class='col-sm'>
        <a href='#mapa' class='text-dark'>
          <i class='bi bi-map icon-large'></i>
        </a>
      </div>
    </div>
  </div>
</footer>
    """

    self.innerHTML = template
  end
end