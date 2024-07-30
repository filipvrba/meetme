import 'maplibregl', 'maplibre-gl'
import 'CAnimations', './animations'

export default class CMarkers
  attr_reader :markers

  def initialize(element)
    @element = element
    @markers = {}
  end

  def server_add_from_db(position)
    @element.c_database.get_all_users() do |rows|
      rows.each do |row|
        if row['is_logged'].to_i == 1
          m_pos = nil

          id_equals = @element.user_id == row['user_id'].to_i
          unless id_equals
            # Server
            m_pos = row['position'].split('-')
            m_pos = Vector.new(m_pos[0], m_pos[1])
          else
            # Client
            m_pos = position
            @element.c_database.update_position(m_pos)
          end

          s_user_id = row['user_id'].to_i
          unless @markers.has_own_property(s_user_id)
            server_add({
              position: m_pos,
              user_id:  s_user_id,
              src:      row['image_base64'],
            }) if m_pos
          else
            server_change_positions(s_user_id, m_pos)
          end
        else

          if @markers.has_own_property(row['user_id'].to_i)
            remove(row['user_id'].to_i)
          end

        end
      end
    end
  end

  def server_add(options)
    marker = maplibregl.Marker.new
    .setLngLat([options.position.x, options.position.y])
    .addTo(@element.map)

    marker.get_element().innerHTML = """
    <elm-marker-avater user-id='#{options.user_id}' src='#{options.src}' data-bs-toggle='modal' data-bs-target='#userDetailModal'></elm-marker-avater>
    """

    @markers[options.user_id] = marker
  end

  def server_change_positions(id_marker, position)
    m_old_position = @markers[id_marker].get_lng_lat()
    m_old_position = Vector.new(m_old_position.lng, m_old_position.lat)

    @element.c_animations.move_position(position, m_old_position) do |update_position|
      @markers[id_marker]
      .setLngLat([update_position.x, update_position.y])
    end
  end

  def remove(id_marker)
    @markers[id_marker].remove()
    delete @markers[id_marker]
  end
end