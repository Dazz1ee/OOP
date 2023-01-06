
import axios from "axios"


// const URL = "http://localhost:8080/mai/"
const URL = '/back/mai/'

const config = {
    withCredentials: true,
    headers:{
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
};


const getLastTexts = ()=>{
    return axios.get(URL + "getLast", config);
}

const generate = (author, text, count) => {
    return axios.post(URL + "generation", {author, text, count}, config
    );
}

const InfoService = {
    getLastTexts,
    generate,
}
export default InfoService;