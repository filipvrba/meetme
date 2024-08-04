import ['ENV'], '../../env'

class Database
  attr_writer :is_verbose

  def initialize
    @is_verbose = true
    @mode       = ENV::MODE
  end

  def query(query, method, &callback)
    options = {
      method: method.upcase
    }
  
    fetch("/api/bef-db?query=#{encodeURI_component(query)}", options)
    .then(lambda {|response| response.json() })
    .then(lambda {|data| callback(data) if callback })
    .catch(lambda {|error| console.error('Error:', error) })
  end

  def get(query, &callback)
    unless @mode == 'development'
      query(query, 'get') do |data|
        callback(data) if callback
      end
    else
      dev_get(query) do |data|
        callback(data) if callback
      end
    end
  end

  def set(query, &callback)
    unless @mode == 'development'
      prod_set(query) do |data|
        callback(data) if callback
      end
    else
      dev_set(query) do |data|
        callback(data) if callback
      end
    end
  end

  def dev_get(query, &callback)
    query_encode = encodeURIComponent(query)
    uri = "#{ENV::VITE_URL_API}?token=#{ENV::VITE_BEF_CLIENT}" +
      "&database=#{ENV::VITE_DATABASE}&query=#{query_encode}"

    Net.bef_json(uri) do |data|
      callback(data) if callback
    end
  end

  def prod_set(query, &callback)
    low_query = query.downcase
    l_query   = lambda do |method|
      query(query, method) do |data|
        if data['status_code'] == 403 || data['status_code'] == 405 ||
          data.status == 'SQL Error'

          console.error(data) if @is_verbose
          callback(false) if callback
        elsif data.error == 'Server error'
          console.error(data) if @is_verbose
          Events.emit('#app', 'befError')
        else
          callback(true) if callback
        end
      end
    end 
    
    if low_query.indexOf('insert into') > -1 ||
      low_query.indexOf('create table') > -1

      l_query('post')
    elsif low_query.indexOf('delete') > -1
      l_query('delete')
    elsif low_query.indexOf('update') > -1
      l_query('patch')
    end
  end

  def dev_set(query, &callback)
    is_active = false
    low_query = query.toLowerCase()
    if low_query.indexOf('insert into') > -1 ||
       low_query.indexOf('create table') > -1
      is_active = true
      Net.bef_send('post', query, @is_verbose) do |data|
        callback(data) if callback
      end
    elsif low_query.indexOf('delete') > -1
      is_active = true
      Net.bef_send('delete', query, @is_verbose) do |data|
        callback(data) if callback
      end
    elsif low_query.indexOf('update') > -1
      is_active = true
      Net.bef_send('patch', query, @is_verbose) do |data|
        callback(data) if callback
      end
    end

    return is_active
  end
end
window.__bef_db = Database.new