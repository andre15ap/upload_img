import axios from 'axios';

// ip da maquina e porta, no django rodar com ip e porta tbm
// ex. runserver 192.168.1.103:900
const api = axios.create({
    baseURL: 'http://192.168.43.177:8000/api'
});


export default api;