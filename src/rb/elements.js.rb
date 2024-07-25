
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