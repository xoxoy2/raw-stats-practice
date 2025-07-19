import { userstore } from "./stores/user";

const startStore=async () => {
    await userstore.initialize ()
    console.log ("User initalized")
}

startStore()