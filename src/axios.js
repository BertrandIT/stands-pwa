import axios from "axios";
//na produkcji
// axios.defaults.baseURL = "http://192.168.1.4/api";
//lokalny development (w BBS lokalnie php artisan serve)
<<<<<<< HEAD
<<<<<<< HEAD
// axios.defaults.baseURL = "http://127.0.0.1:8000/";
<<<<<<< HEAD
axios.defaults.baseURL = "http://192.168.0.101/projekty/dataviewer2/public/";
=======
axios.defaults.baseURL = "http://192.168.1.100/projekty/dataviewer2/public/";
=======
axios.defaults.baseURL = "http://127.0.0.1:8000/";
// axios.defaults.baseURL = "https://192.168.1.10/dataviewer2/public/";
>>>>>>> 19f250f (test filtruj)
>>>>>>> e909ccc (test filtruj)
=======
axios.defaults.baseURL = "http://127.0.0.1:8000/";
// axios.defaults.baseURL = "https://192.168.1.10/dataviewer2/public/";
>>>>>>> 484a691 (change axios)
export default axios;
