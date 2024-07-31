import routesObj from "../../json/routes.json";
window.ROUTES_JSON = routesObj;
import errorHTML from "../../html/error.html?raw";
import uvodHTML from "../../html/uvod.html?raw";
import mapaHTML from "../../html/mapa.html?raw";
import signupHTML from "../../html/signup.html?raw";
import signinHTML from "../../html/signin.html?raw";
import dashboardHTML from "../../html/dashboard.html?raw";
import chatHTML from "../../html/chat.html?raw";

window.PAGES = {
  error: errorHTML,
  uvod: uvodHTML,
  mapa: mapaHTML,
  signup: signupHTML,
  signin: signinHTML,
  dashboard: dashboardHTML,
  chat: chatHTML
}