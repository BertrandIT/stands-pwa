import axios from "axios";
//na produkcji
// axios.defaults.baseURL = "http://192.168.1.6/";
//lokalny development (w BBS lokalnie php artisan serve)
axios.defaults.baseURL = "http://127.0.0.1:8000/";
// axios.defaults.baseURL = "http://192.168.1.4/projekty/dataviewer2/public/";
// axios.defaults.headers = {...axios.defaults.headers, "Access-Control-Allow-Origin": "*" };
export default axios;
