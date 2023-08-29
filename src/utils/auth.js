export function  setToken(token){
    return sessionStorage.setItem("token",token)
}

export function  getToken(){
    return sessionStorage.getItem("token")
}

export function  removeToken(){
    sessionStorage.clear();
}