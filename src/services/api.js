import axios from "axios";

//Base da URL: https://api.themoviedb.org/3/
//URL DA API: /movie/now_playing?api_key=bb6168befc0d7650e970a25df83eee12&language=pt-BR

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;