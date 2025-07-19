import { userstore } from "./stores/user"
const userInfo=document.getElementById("header-user-info")
userstore.authStatus.effect(()=>{
    if (userstore.authStatus.value){
    userInfo.textContent = `Welcome ${userstore.firstName.value}`
} else{
    userInfo.textContent ="loading"
}
}) 
