import 'routesObj', '../../json/routes.json'

window.ROUTES_JSON = routes_obj

import 'errorHTML', '../../html/error.html?raw'
import 'uvodHTML', '../../html/uvod.html?raw'
import 'mapaHTML', '../../html/mapa.html?raw'
import 'signupHTML', '../../html/signup.html?raw'
import 'signinHTML', '../../html/signin.html?raw'
import 'dashboardHTML', '../../html/dashboard.html?raw'

window.PAGES = {
  error: errorHTML,
  uvod: uvodHTML,
  mapa: mapaHTML,
  signup: signupHTML,
  signin: signinHTML,
  dashboard: dashboardHTML,
}
