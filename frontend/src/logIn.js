const logInForm=document.getElementById("log-in-form")



logInForm.onsubmit=async(event)=>{
    event.preventDefault()
    const submitData={}
    const formData=new FormData(event.target)
    for(let [key,value] of formData) {
        console.log(key,value)
        submitData[key]=value
    }
    const res=await fetch("http://localhost:3000/api/users/login",{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(submitData),
        credentials:"include"
    })
    const resJson=await res.json()
    console.log (resJson)
    // if (resJson.success){
    //     location.href="/raw-stats"
    // }
}