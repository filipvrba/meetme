export default class Events {
  static emit(dom, event, values=null) {
    let customEvent = new CustomEvent(event, {detail: {value: values}});
    return document.querySelector(dom).dispatchEvent(customEvent)
  };

  static connect(dom, event, callback) {
    if (callback) {
      return document.querySelector(dom).addEventListener(event, callback)
    }
  };

  static disconnect(dom, event, callback) {
    let element = document.querySelector(dom);
    if (element) if (callback) return element.removeEventListener(event, callback)
  }
};

window.Events = Events