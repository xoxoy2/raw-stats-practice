import { signal } from "../signals";

class Userstore {
    constructor(){
        this.firstName=signal("")
        this.lastName=signal("")
        this.email=signal("")
        this.authStatus=signal(null)
        this.statsCategories=signal([])
    }
    async initialize(){
        try {
             const res=await fetch("http://localhost:3000/api/users/profile",{
            headers:{
                "Authorization":localStorage.getItem("auth")
            }
        })
        const resJson=await res.json ()
        console.log(resJson, "resjson")
        if (!resJson.success){
            this.authStatus.value=false 
            return 
        }
        this.firstName.value=resJson.data?.firstName 
        this.lastName.value=resJson.data?.lastName
        this.email.value=resJson.data?.email
        this.authStatus.value=true
        } catch (error) {
            console.log(error)
            this.authStatus.value=false
        }
    }
 }
 export const userstore=new Userstore ()