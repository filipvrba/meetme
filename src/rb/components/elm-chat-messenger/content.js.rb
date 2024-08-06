export default class CContent
  attr_reader :data

  def initialize(data)
    @data = data
  end

  def subinit_elm(id, date = nil)
    result = []

    @data.messages.each do |message|
      is_left           = message['user_id'].to_i == id
      firt_div_class    = is_left ? ''         : 'justify-content-end'
      img_style_margine = is_left ? 'right'    : 'left'
      second_div_class  = is_left ? 'bg-light' : 'bg-primary text-white'

      m_full_name,
      avatar      = get_avatar(message['user_id'].to_i)
      m_full_name = m_full_name.decode_base64()
      m_message   = message['message'].decode_base64()
                    .gsub('HELLO', '👋')
                    .gsub(/https?:\/\/([^\s]+)/, "<a href=\"$&\" class='text-white' target='_blank'>$&</a>")

      dom_img = "<img src='#{avatar}' class='rounded-circle' width='40' height='40' alt='Avatar #{m_full_name}' style='margin-#{img_style_margine}: 12px;'>"

      template = """
      <div #{date ? "id='message-#{date}'" : ''} class='d-flex #{firt_div_class} mb-3'>
        #{is_left ? dom_img : ''}
        <div class='#{second_div_class} rounded p-2'>
          <p class='mb-0' style='word-break: break-all;'>#{m_message}</p>
        </div>
        #{is_left ? '' : dom_img}
      </div>
      """
      result.push(template)
    end

    return result.join('')
  end  # subinit_elm

  def get_avatar(id)
    @data.avatars.each do |avatar|
      if avatar['user_id'].to_i == id
        return [avatar['full_name'], avatar['image_base64']]
      end
    end

    return nil
  end
end