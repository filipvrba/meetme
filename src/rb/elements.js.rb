
import './packages/template-rjs-0.1.1/elements'
# import './packages/gallery-rjs-0.1.0/elements'

import 'ElmMap', './elements/elm_map'
window.custom_elements.define('elm-map', ElmMap)

import 'ElmMarkerAvater', './elements/elm_marker_avater'
window.custom_elements.define('elm-marker-avater', ElmMarkerAvater)

import 'ElmSignup', './elements/elm_signup'
window.custom_elements.define('elm-signup', ElmSignup)

import 'ElmAlert', './elements/elm_alert'
window.custom_elements.define('elm-alert', ElmAlert)

import 'ElmSignin', './elements/elm_signin'
window.custom_elements.define('elm-signin', ElmSignin)

import 'ElmDashboard', './elements/elm_dashboard'
window.custom_elements.define('elm-dashboard', ElmDashboard)

import 'ElmDashboardHeader', './elements/dashboard/elm_header'
window.custom_elements.define('elm-dashboard-header', ElmDashboardHeader)

import 'ElmDashboardJumbotronAvatar', './elements/dashboard/elm_jumbotron_avatar'
window.custom_elements.define('elm-dashboard-jumbotron-avatar', ElmDashboardJumbotronAvatar)
