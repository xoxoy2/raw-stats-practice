import { userstore } from "./stores/user"
const profileForm =document.getElementById("profile-edit-form")

userstore.authStatus.effect(()=>{
        if (userstore.authStatus.value){
             const profileInputs=profileForm.querySelectorAll("input")
            Array.from(profileInputs).forEach((input)=>{
                console.log(input.name)
            input.value=userstore[input.name].value
            })
    } else{
    }
    }) 
const getUserInfo= async() => {
   
    // try {
    //     const res=await fetch("http://localhost:3000/api/users/profile",{
    //         headers:{
    //             "Authorization":localStorage.getItem("auth")
    //         }
    //     })
    //     const resJson=await res.json ()
    //     console.log(resJson, "resjson")
    //     if (resJson.success){
    //         const profileInputs=profileForm.querySelectorAll("input")
    //         Array.from(profileInputs).forEach((input)=>{
    //         input.value=resJson.data[input.name]
    //         })
    //     }
    // } catch (error) {
    //  console.log ("error",error)   
    // }
}
profileForm.onsubmit=async(event)=>{
event.preventDefault ()
const formData=new FormData(event.target)
const submitData={}
for(const [key,value] of formData.entries()){
    submitData [key]=value
}
console.log (submitData)
try { 
    const res=await fetch("http://localhost:3000/api/users/profile",{
        method:"PUT",
    headers:{
        "Authorization":localStorage.getItem("auth"),
        "content-type":"application/json"
    },
    body:JSON.stringify(submitData)
})
const resJson=await res.json ()
console.log(resJson, "resjson")
    
} catch (error) {
    console.log (error)
}
}
getUserInfo()