import { userstore } from "../stores/user"
import { signal } from "../signals"
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
})
reviewStatusSelect.addEventListener ("change", (e)=>{
    reviewStatusToggle.value= (e.target.value)
})