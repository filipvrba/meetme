import { ENV } from "../../env";

// def query(query, &callback)
//   is_set = set(query) do |data|
//     callback(data) if callback
//   end
//   unless is_set
//     get(query) do |data|
//       callback(data) if callback
//     end
//   end
// end
// def get(query, &callback)
//   query_encode = encodeURIComponent(query)
//   uri = "#{ENV::VITE_URL_API}?token=#{ENV::VITE_BEF_CLIENT}" +
//     "&database=#{ENV::VITE_DATABASE}&query=#{query_encode}"
//   Net.bef_json(uri) do |data|
//     callback(data) if callback
//   end
// end
// def set(query, &callback)
//   is_active = false
//   low_query = query.toLowerCase()
// if low_query.indexOf('insert into') > -1 ||
//    low_query.indexOf('create table') > -1
//   is_active = true
//   Net.bef_send('post', query, @is_verbose) do |data|
//     callback(data) if callback
//   end
// elsif low_query.indexOf('delete') > -1
//   is_active = true
//   Net.bef_send('delete', query, @is_verbose) do |data|
//     callback(data) if callback
//   end
// elsif low_query.indexOf('update') > -1
//   is_active = true
//   Net.bef_send('patch', query, @is_verbose) do |data|
//     callback(data) if callback
//   end
// end
//   return is_active
// end
class Database {
  set isVerbose(isVerbose) {
    this._isVerbose = isVerbose
  };

  constructor() {
    this._isVerbose = true
  };

  query(query, method, callback) {
    let options = {method: method.toUpperCase()};

    return fetch(
      `/api/bef-db?query=${encodeURIComponent(query)}`,
      options
    ).then(response => response.json()).then((data) => {
      if (callback) return callback(data)
    }).catch(error => console.error("Error:", error))
  };

  get(query, callback) {
    return this.query(query, "get", (data) => {
      console.log(data);
      if (callback) return callback(data)
    })
  };

  set(query, callback) {
    let lowQuery = query.toLowerCase();

    let lQuery = method => (
      this.query(query, method, (data) => {
        console.log(data);
        if (callback) return callback(data)
      })
    );

    if (lowQuery.indexOf("insert into") > -1 || lowQuery.indexOf("create table") > -1) {
      return lQuery("post")
    } else if (lowQuery.indexOf("delete") > -1) {
      return lQuery("delete")
    } else if (lowQuery.indexOf("update") > -1) {
      return lQuery("patch")
    }
  }
};

window._BefDb = new Database