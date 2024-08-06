window.is_notification_played = false

window.dashboard_update = lambda do |index = nil|
    URLParams.set('d-index', index) if index != nil
    Events.emit('#app', 'dashboardUpdateBody')
end
