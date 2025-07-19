import { userstore } from "./stores/user"
import { signal } from "./signals"
const statsForm =document.getElementById("stats-edit-form")
const statsFormcategory =document.getElementById("stats-edit-form-category")
const statsFormtable =document.getElementById("stats-edit-form-table")
const addIQButton=document.getElementById("stats-edit-add-IQ")
const showaddIQtable= signal(false)

userstore.authStatus.effect(()=>{
        if (userstore.authStatus.value){
            
    } else{
    }
    }) 

    // 1:Find all of the user's added categories from the store
    //2: When the page loads select the 1st category and then render the table inside of the div with id "stats-edit-form-table"
    //3: Create table JSON for each category

    const iqTableSchema = {
        headers:[
            "Subtest", "Scaled score", "Percentile"
        ],

        body:[
            ["Information","",""]
        ]
    }

    const createTableFromSchema = ()=> {
        const tableHeader = document.createElement ("div")
    }


    
    showaddIQtable.effect(()=>{
        if (showaddIQtable.value){

        }
    })
    
    addIQButton.onclick=()=>{
    showaddIQtable.value = true 
    

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