import ['ENV'], '../../env'

class Database
  attr_writer :is_verbose

  def initialize
    @is_verbose = true
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
    query(query, 'get') do |data|
      callback(data) if callback
    end
  end

  def set(query, &callback)
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
end
window.__bef_db = Database.new