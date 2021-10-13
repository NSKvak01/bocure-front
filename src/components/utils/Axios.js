import axios from "axios"
const Axios = axios.create({
    baseURL:process.env.REACT_APP_ENV === "development"
    ?"http://localhost:8080"
    :"/",
    timeout:50000
})

export default Axios