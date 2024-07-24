export default class CAnimations
  def initialize
    @h_tick = lambda { |e| update(e.detail.value) }

    @obj_moving_position = {
      is_active:    false,
      position:     nil,
      old_position: nil,
      speed:        0.1,
      t:            0,
      callback:     nil,
    }
  end

  def connected_callback()
    Events.connect('#app', 'tick', @h_tick)
  end

  def disconnected_callback()
    Events.disconnect('#app', 'tick', @h_tick)
  end

  def update(dt)
    moving_position(dt)
  end

  def moving_position(dt)
    unless @obj_moving_position.is_active
      return
    end

    l_lerp_position = lambda do
      return @obj_moving_position.old_position.lerp(
        @obj_moving_position.position, @obj_moving_position.t)
    end
    l_callback = lambda do
      @obj_moving_position.callback(l_lerp_position()) if
      @obj_moving_position.callback
    end

    @obj_moving_position.t += @obj_moving_position.speed * dt

    puts @obj_moving_position.t
    
    if @obj_moving_position.t >= 1
      @obj_moving_position.t         = 1
      @obj_moving_position.is_active = false

      l_callback()

      @obj_moving_position.position     = nil
      @obj_moving_position.old_position = nil

      @obj_moving_position.callback = nil
    else
      l_callback()
    end
  end

  def move_position(position, old_position, &callback)
    @obj_moving_position.is_active = true
    @obj_moving_position.t         = 0
    
    @obj_moving_position.position     = position
    @obj_moving_position.old_position = old_position

    @obj_moving_position.callback = callback
  end
end