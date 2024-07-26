import "./packages/template-rjs-0.1.1/elements";

// import './packages/gallery-rjs-0.1.0/elements'
import ElmMap from "./elements/elm_map";
window.customElements.define("elm-map", ElmMap);
import ElmMarkerAvater from "./elements/elm_marker_avater";
window.customElements.define("elm-marker-avater", ElmMarkerAvater);
import ElmSignup from "./elements/elm_signup";
window.customElements.define("elm-signup", ElmSignup);
import ElmAlert from "./elements/elm_alert";
window.customElements.define("elm-alert", ElmAlert);
import ElmSignin from "./elements/elm_signin";
window.customElements.define("elm-signin", ElmSignin);
import ElmDashboard from "./elements/elm_dashboard";
window.customElements.define("elm-dashboard", ElmDashboard)