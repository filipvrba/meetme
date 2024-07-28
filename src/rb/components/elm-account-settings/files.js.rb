import 'pica', 'pica'

export default class CFiles
  def initialize(profile_picture, c_database)
    @profile_picture = profile_picture
    @c_database      = c_database
  end

  def upload_file_input_change(&callback)
    file = @profile_picture.files[0]

    if file
      reader = FileReader.new

      reader.onload = lambda do |e|
        resize_image(e.target.result) do |result_base64_data|
          @c_database.upload_file_on_db(file.name, result_base64_data, callback) do |image_id|
            callback(image_id) if callback
          end
        end
      end
      reader.read_as_dataURL(file)
    else
      @c_database.get_file_id() do |image_id|
        callback(image_id) if callback
      end
    end
  end  # upload_file_input_change

  def resize_image(file_result, &callback)
    img = Image.new
    img.onload = lambda do |e|
      canvas = document.get_element_by_id('canvas')
      ctx = canvas.get_context('2d')
      
      target_width = 256
      target_height = 256

      canvas.width = target_width;
      canvas.height = target_height;

      pica().resize(img, canvas, {
        width: target_width,
        height: target_height
      })
      .then(lambda do |result|
        return pica().to_blob(result, 'image/jpeg', 0.90)
      end)
      .then(lambda do |blob|
        reader = FileReader.new

        reader.onloadend = lambda do
          base64_data = reader.result
          callback(base64_data) if callback
        end
        reader.read_as_dataURL(blob)
      end)
    end
    img.src = file_result
  end
end