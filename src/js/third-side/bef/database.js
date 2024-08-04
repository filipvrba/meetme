import { ENV } from "../../env";

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
      if (callback) return callback(data)
    })
  };

  set(query, callback) {
    let lowQuery = query.toLowerCase();

    let lQuery = method => (
      this.query(query, method, (data) => {
        if (data.status_code === 403 || data.status_code === 405 || data.status === "SQL Error") {
          if (this._isVerbose) console.error(data);
          if (callback) return callback(false)
        } else if (data.error === "Server error") {
          if (this._isVerbose) console.error(data);
          return Events.emit("#app", "befError")
        } else if (callback) {
          return callback(true)
        }
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