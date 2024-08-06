import CDatabase from "./database";

export default class CNotifications {
  constructor(element) {
    this._element = element;
    this._timeoutId = null;
    this._cDatabase = new CDatabase
  };

  dispose() {
    return clearTimeout(this._timeoutId)
  };

  update(isStart) {
    Events.emit("#app", "chatUpdate");

    this._cDatabase.thereIsNotification(
      this._element.userId,

      (haveNotifications) => {
        if (haveNotifications) {
          if (!window.isNotificationPlayed) {
            window.isNotificationPlayed = true;
            this.sign()
          };

          return this._element.notification.classList.remove("notification-display")
        } else {
          this._element.notification.classList.add("notification-display");
          return window.isNotificationPlayed = false
        }
      }
    );

    this._timeoutId = setTimeout(this.update.bind(this), 10_000);
    return this._timeoutId
  };

  sign() {
    this.playSound();

    return Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        let notification = new Notification("Nové oznámení", {body: "Toto je příklad oznámení."});
        return notification
      }
    })
  };

  playSound() {
    let audio = new Audio("/mp3/message.mp3");
    return audio.play()
  }
}