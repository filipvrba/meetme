import 'maplibregl', 'maplibre-gl'

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
        end
      end
    end
  end

  def server_add(options)
    marker = maplibregl.Marker.new
    .setLngLat([options.position.x, options.position.y])
    .addTo(@element.map)

    marker.get_element().innerHTML = """
    <elm-marker-avater user-id='#{options.user_id}' src='#{options.src}'></elm-marker-avater>
    """

    @markers[options.user_id] = marker
  end

  def server_change_positions(id_marker, position)
    @markers[id_marker]
    .setLngLat([position.x, position.y])
  end

  def remove(id_marker)
    @markers[id_marker].remove()
    delete @markers[id_marker]
  end
end