import axios from "axios";
//na produkcji
// axios.defaults.baseURL = "http://192.168.1.4/api";
//lokalny development (w BBS lokalnie php artisan serve)

// // axios.defaults.baseURL = "http://127.0.0.1:8000/";
// axios.defaults.baseURL = "http://192.168.1.100/projekty/dataviewer2/public/";

// axios.defaults.baseURL = "http://127.0.0.1:8000/";
// // axios.defaults.baseURL = "https://192.168.1.10/dataviewer2/public/";

axios.defaults.baseURL = "http://127.0.0.1:8000/";
//axios.defaults.baseURL = "https://192.168.0.152/dataviewer2/public/";

export default axios;
