import "../css/bootstrap.min.css";
import "../../node_modules/bootstrap-icons/font/bootstrap-icons.min.css";
import "maplibre-gl/dist/maplibre-gl.css";
import "../css/elm-map.css";
import "../css/elm-spinner.css";
import "../css/elm-dashboard-header.css";
import "../css/elm-dashboard-footer.css";
import "../css/elm-account-settings.css";
import "../css/elm-chat-menu.css";
import "../css/elm-chat-messenger.css";
import "../css/style.css";
import "./core";
import "./singleton";
import "./elements";
import "./math";
import "./third_side";
document.querySelector("#app").innerHTML = "<elm-priority-routes></elm-priority-routes>"