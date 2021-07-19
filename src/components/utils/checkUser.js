import jwtDecode from "jwt-decode";
import setAxiosAuthToken from "./setAxiosAuthToken";

const checkUser = () =>{
    let token = window.localStorage.getItem("jwtToken")
    if(token){
        const currentTime = Date.now()/1000
        let decodeJwtToken = jwtDecode(token)
        if(decodeJwtToken.exp<currentTime){
            setAxiosAuthToken(null)
            return false
        } else{
            setAxiosAuthToken(token)
            return true
        } 
    } else{
        return false
    }
}

export default checkUser