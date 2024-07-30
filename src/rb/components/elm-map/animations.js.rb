export default class CAnimations
  def initialize
    @h_tick = lambda { |e| update(e.detail.value) }

    @animations = {}
    @obj_moving_position = {
      is_active:    false,
      position:     nil,
      old_position: nil,
      speed:        1,
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
    unless @animations.length > 0 
      return
    end

    @animations.keys().each do |k|
      obj_moving_position = @animations[k]

      unless obj_moving_position.is_active
        return
      end

      l_lerp_position = lambda do
        return obj_moving_position.old_position.lerp(
          obj_moving_position.position, obj_moving_position.t)
      end
      l_callback = lambda do
        obj_moving_position.callback(l_lerp_position()) if
        obj_moving_position.callback
      end

      obj_moving_position.t += obj_moving_position.speed * dt
      
      if obj_moving_position.t >= 1
        obj_moving_position.t         = 1
        obj_moving_position.is_active = false

        l_callback()

        obj_moving_position.position     = nil
        obj_moving_position.old_position = nil

        obj_moving_position.callback = nil

        delete @animations[k]
      else
        l_callback()
      end
    end
  end

  def move_position(position, old_position, &callback)
    options = {
      is_active:    true,
      position:     position,
      old_position: old_position,
      speed:        1,
      t:            0,
      callback:     callback,
    }
    @animations[generate_random_string()] = options
  end

  def generate_random_string(length = 10)
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    result = ''
    characters_length = characters.length
    (0 .. length).each do |i|
        result += characters.char_at(Math.floor(Math.random() * characters_length))
    end
    return result
  end
end