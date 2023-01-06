import axios from "axios";
import app from "../axiosImp";
// const URL = "http://localhost:8080/mai/"
const URL = '/back/mai/'


const config = {
    headers:{
        'Content-Type': 'application/json',
    },
    withCredentials: true
};
const configOut = {
    withCredentials: true
};

const configUp = {
    headers:{
        'Content-Type': 'application/json',
    },
};

const reg = (email, name, password) => {
    return axios.post(URL+ "signup", {
        name, email, password
    }, configUp)
};

const login = (email, password) => {
    return axios.post(URL+"signin", {
        email, password
    }, config).then((response) => {
        console.log(response)
        if(response.data.email) {
            localStorage.setItem("user", JSON.stringify(response.data));
            console.log(response.data)
            // axios.defaults.headers.common["authtoken"] = `${response.data.authtoken}`;
        }
        return response.data;
    })
}

const logout = () => {
    localStorage.removeItem("user");
    return axios.get(URL + "signout", configOut).then((response) => {
        return response.data;
    });

}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
    reg,
    login,
    logout,
    getCurrentUser,
}

export default AuthService;