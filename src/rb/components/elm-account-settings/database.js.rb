export default class CDatabase
  def initialize(element)
    @element = element

    @element.set_spinner_display(false)
  end

  def get_user_details(&callback)
    @element.set_spinner_display(true)
    __bef_db.get("
SELECT 
    users.id, 
    users.full_name, 
    users.email, 
    user_details.bio
FROM 
    users
LEFT JOIN 
    user_details ON users.id = user_details.user_id
WHERE 
    users.id = #{@element.user_id};"
    ) do |rows|
      @element.set_spinner_display(false)
      if rows.length > 0
        data = rows[0]

        callback(data) if callback
      end
    end
  end  # get_user_details

  def upload_file_on_db(name, base64_file, &callback)
    l_insert = lambda do
      __bef_db.set("INSERT INTO image_avatars (user_id, name, image_base64) " +
                 "VALUES (#{@element.user_id}, '#{name}', '#{base64_file}');") do

        get_file_id() do |image_id|
          callback(image_id) if callback
        end
      end
    end

    get_file_id() do |avatar_id|
      if avatar_id > 0
        __bef_db.set("DELETE FROM image_avatars WHERE id = #{avatar_id}") do |is_deleted|
          l_insert.call() if is_deleted
        end
      else
        l_insert.call()
      end
    end
  end  # upload_file_on_db

  def get_file_id(&callback)
    __bef_db.get("SELECT id FROM image_avatars WHERE user_id = #{@element.user_id}") do |rows|

      if rows.length > 0
        callback(rows.last.id) if callback
      else
        callback(-1) if callback
      end
    end
  end  # get_file_id

  def update_user(full_name, email, &callback)
    query_user = "UPDATE users SET full_name = '#{full_name}', " +
                 "email = '#{email}' WHERE id = #{@element.user_id};"
    
    __bef_db.set(query_user) do |is_write|
      if is_write
        callback.call() if callback
      end
    end
  end  # update_user

  def add_or_update_user_details(bio, image_id, &callback)
    query_user_details = "INSERT INTO user_details (user_id, bio, avatar_id, is_logged, position) " +
                         "VALUES (#{@element.user_id}, '#{bio}', #{image_id}, " +
                         "1, '');"
      __bef_db.set(query_user_details) do |is_write|
        unless is_write
          query_user_details_update =
            "UPDATE user_details SET bio = '#{bio}', avatar_id = #{image_id} " +
            "WHERE user_id = #{@element.user_id};"
          __bef_db.set(query_user_details_update) do |is_write|
            callback.call() if callback
          end
        else
          callback.call() if callback
        end
      end
  end  # add_or_update_user_details

  def save_changes(full_name, email, bio, &callback)
    @element.set_spinner_display(true)
    __bef_db.is_verbose = false
    
    update_user(full_name, email) do
      # TODO: Zde by mohla být logická hodnota pro konečnou fázy
      #       kontroly pro callback.
    end

    @element.c_files.upload_file_input_change() do |image_id|

      add_or_update_user_details(bio, image_id) do
        @element.set_spinner_display(false)
        __bef_db.is_verbose = true

        # unsafe
        callback.call() if callback
        # end
      end
    end
  end  # save_changes
end