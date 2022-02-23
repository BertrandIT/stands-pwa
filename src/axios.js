import axios from "axios";
//na produkcji
// axios.defaults.baseURL = "http://192.168.1.4/api";
//lokalny development (w BBS lokalnie php artisan serve)
// axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.baseURL = "http://192.168.1.101/projekty/dataviewer2/public/";
export default axios;
