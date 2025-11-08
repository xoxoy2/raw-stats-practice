import { signal } from "../signals";

class Statsstore {
    constructor(){
        this.iqStats=signal(null)
        this.apStats=signal(null)
        this.salesStats=signal(null)
    }
    async initialize(){
        try {
             const res=await fetch("http://localhost:3000/api/user-stats/view",{
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
        this.iqStats.value=resJson.data.find ((item)=>item.category==="IQ")
        this.apStats.value=resJson.data.find ((item)=>item.category==="AP")
        this.salesStats.value=resJson.data.find ((item)=>item.category==="Sales")
        } catch (error) {
            console.log(error)
            this.authStatus.value=false
        }
    }

 }
 export const statsstore=new Statsstore ()