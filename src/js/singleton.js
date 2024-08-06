window.isNotificationPlayed = false;

window.dashboardUpdate = (index=null) => {
  if (index !== null) URLParams.set("d-index", index);
  return Events.emit("#app", "dashboardUpdateBody")
}