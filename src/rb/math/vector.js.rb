class Vector
  attr_accessor :x, :y

  def initialize(x, y)
    @x = x
    @y = y
  end

  ## Lineární interpolace
  # t - je normalizovaná hodnota mezi 0.0 až 1.0
  def lerp(target, t)
    return Vector.new(
      @x + t * (target.x - @x),
      @y + t * (target.y - @y)
    )
  end
end
window.Vector = Vector