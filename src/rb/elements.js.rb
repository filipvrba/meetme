
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

import 'ElmDashboardAccountSettings', './elements/dashboard/elm_account_settings'
window.custom_elements.define('elm-dashboard-account-settings', ElmDashboardAccountSettings)

import 'ElmDashboardGreeting', './elements/dashboard/elm_greeting'
window.custom_elements.define('elm-dashboard-greeting', ElmDashboardGreeting)

import 'ElmDashboardFooter', './elements/dashboard/elm_footer'
window.custom_elements.define('elm-dashboard-footer', ElmDashboardFooter)

import 'ElmMapUserDetails', './elements/map/elm_user_details'
window.custom_elements.define('elm-map-user-details', ElmMapUserDetails)

import 'ElmChat', './elements/elm_chat'
window.custom_elements.define('elm-chat', ElmChat)

import 'ElmChatMenu', './elements/chat/elm_menu'
window.custom_elements.define('elm-chat-menu', ElmChatMenu)

import 'ElmChatHeader', './elements/chat/elm_header'
window.custom_elements.define('elm-chat-header', ElmChatHeader)
