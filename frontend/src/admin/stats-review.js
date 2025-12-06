import { userstore } from "../stores/user"
import { signal } from "../signals"
import { test,iqTableSchema,createTableFromSchema } from "../componets/statsTable"
// import {iqTableSchema,createTableFromSchema} from "../componets/statsTable.js"
//import { statsstore } from "../stores/stats"

const reviewStatusSelect= document.getElementById ("review-status-select")
const allUserStatsContainer= document.getElementById ("all-user-stats-container")


const allUserStats = signal ([])
const viewableStats = signal ([])
const reviewStatusToggle=signal ("under review")


async function fetchAllUserStats(){
    const response = await fetch("http://localhost:3000/api/user-stats/admin/all-user-stats", {
        method: "GET",
        headers: {
              "Authorization":localStorage.getItem("auth"),

            "Content-Type": "application/json"
        }
    });
    
    const data = await response.json();

    if (data.success) {
        allUserStats.value=(data.data);
         console.log(data, "All user stats data");
    }
}

userstore.authStatus.effect(async() => {
    if (userstore.authStatus.value) {
        console.log("Fetching all user stats as admin");
        await fetchAllUserStats();
    } else {
    }
})
reviewStatusToggle.effect (()=>{
    console.log(allUserStats.value,"allUserStats in effect")
    const filteredStats=allUserStats.value.filter ((item)=>item.reviewStatus===reviewStatusToggle.value)
    console.log (filteredStats,"filteredStats")
    viewableStats.value= (filteredStats)

allUserStatsContainer.innerHTML= ("")
if (viewableStats.value.length===0){
    allUserStatsContainer.innerHTML=("<p>No user stats found.</p>")
    return
}
viewableStats.value.forEach ((stat)=>{
    const statDiv= document.createElement ("div")
    statDiv.className= "user-stat-item"
    statDiv.innerHTML= `
    <div> 
    <h3>User: ${stat.User.userName} (ID: ${stat.userId})</h3>

    </div>

    <div>
    <button id="view-stats-button">View Stats</button>
    </div>

    <div id="stats-data-container" style="display:none;">

    </div>
    
    <div>
    <button id="approve-button">Approve</button>
    <button id="reject-button"> Reject</button>
    </div>
    `
    allUserStatsContainer.appendChild (statDiv)
    const viewStatsButton= statDiv.querySelector ("#view-stats-button")
    const statsDataContainer= statDiv.querySelector ("#stats-data-container")
    viewStatsButton.addEventListener ("click",()=>{
        if (statsDataContainer.style.display==="none"){
            statsDataContainer.style.display="block"
            // statsDataContainer.innerHTML= `<pre>${JSON.stringify (stat.data,null,2)}</pre>`
            createTableFromSchema(iqTableSchema, iqTableSchema.headers, statsDataContainer, stat.data)
            viewStatsButton.textContent="Hide Stats"
        } else {
            statsDataContainer.style.display="none"
            viewStatsButton.textContent="View Stats"
        }
    })
    const approveButton= statDiv.querySelector ("#approve-button")
    approveButton.addEventListener ("click", async()=>{
        // Add your reject logic here
        console.log("Approve button clicked for stat ID:", stat.id);
        try {
            const response = await fetch(`http://localhost:3000/api/user-stats/admin/approve/${stat.id}`, {
                method: "POST",
                headers: {
                      "Authorization":localStorage.getItem("auth"),
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();

           console.log (data,"approve response data")
        //    createTableFromSchema(iqTableSchema, iqTableSchema.headers,statsstore.iqStats.value?.data)
        } catch (error) {
            console.log (error,"error in approve request")
        }
    })
    const rejectButton= statDiv.querySelector ("#reject-button")
    rejectButton.addEventListener ("click", async()=>{
        // Add your reject logic here
        console.log("Reject button clicked for stat ID:", stat.id);
        try {
            const response = await fetch(`http://localhost:3000/api/user-stats/admin/reject/${stat.id}`, {
                method: "POST",
                headers: {
                      "Authorization":localStorage.getItem("auth"),
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();

           console.log (data,"reject response data")
        } catch (error) {
            console.log (error,"error in reject request")
        }
    })
})
})
reviewStatusSelect.addEventListener ("change", (e)=>{
    reviewStatusToggle.value= (e.target.value)
})