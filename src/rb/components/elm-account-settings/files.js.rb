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
        @c_database.upload_file_on_db(file.name, e.target.result, callback) do |image_id|
          callback(image_id) if callback
        end
      end
      reader.read_as_dataURL(file)
    else
      @c_database.get_file_id() do |image_id|
        callback(image_id) if callback
      end
    end
  end  # upload_file_input_change
end