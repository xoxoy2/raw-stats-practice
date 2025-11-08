import { userstore } from "./stores/user";
import { statsstore } from "./stores/stats";
const startStore=async () => {
    await userstore.initialize ()
    console.log ("User initalized")
    await statsstore.initialize()
    console.log ("Stats initialized")
}

startStore()