import { userstore } from "./stores/user"
import { signal } from "./signals"
import { statsstore } from "./stores/stats"
const statsForm = document.getElementById("stats-edit-form")
const statsFormcategory = document.getElementById("stats-edit-form-category")
const statsFormtable = document.getElementById("stats-edit-form-table")
const addIQButton = document.getElementById("stats-edit-add-IQ")
const showaddIQtable = signal(false)
const addAPButton = document.getElementById("stats-edit-add-AP-tests")
const showaddAPtable = signal(false)
//const profileForm = document.getElementById("profile-form")
const tableCategorySelected = signal(null)

userstore.authStatus.effect(() => {
    if (userstore.authStatus.value) {

    } else {
    }
})
tableCategorySelected.effect(() => {
    console.log(statsstore.iqStats.value, "statsstore.iqStats")
    console.log(statsstore.apStats.value, "statsstore.apStats")
    console.log(statsstore.salesStats.value, "statsstore.salesStats")
})

// 1:Find all of the user's added categories from the store
//2: When the page loads select the 1st category and then render the table inside of the div with id "stats-edit-form-table"
//3: Create table JSON for each category

const iqTableSchema = {
    headers: [
        "Subtest", "Scaled score", "Percentile", "Age when taken", "Year taken"
    ],

    body: [
        ["Information", {edit:true,type:"select",options:["1","2","3"]}, "", {edit:true,type:"input",inputType:"number"}, {edit:true,type:"input",inputType:"number"}],
        ["Similarities", {edit:true,type:"select",options:["1","2","3"]}, "", {edit:true,type:"input",inputType:"number"}, {edit:true,type:"input",inputType:"number"}],
        ["Vocab",{edit:true,type:"select",options:["1","2","3"]}, "", {edit:true,type:"input",inputType:"number"}, {edit:true,type:"input",inputType:"number"}],
        ["Block Design", {edit:true,type:"select",options:["1","2","3"]}, "", {edit:true,type:"input",inputType:"number"}, {edit:true,type:"input",inputType:"number"}],
        ["Visual Puzzles", {edit:true,type:"select",options:["1","2","3"]}, "", {edit:true,type:"input",inputType:"number"}, {edit:true,type:"input",inputType:"number"}],
        ["Matrix Reasoning", {edit:true,type:"select",options:["1","2","3"]}, "", {edit:true,type:"input",inputType:"number"}, {edit:true,type:"input",inputType:"number"}],
        ["Arithmetic", {edit:true,type:"select",options:["1","2","3"]}, "", {edit:true,type:"input",inputType:"number"}, {edit:true,type:"input",inputType:"number"}],
        ["Digit Span", {edit:true,type:"select",options:["1","2","3"]}, "", {edit:true,type:"input",inputType:"number"}, {edit:true,type:"input",inputType:"number"}],
        ["Symbol Search", {edit:true,type:"select",options:["1","2","3"]}, "", {edit:true,type:"input",inputType:"number"}, {edit:true,type:"input",inputType:"number"}],
        ["Coding", {edit:true,type:"select",options:["1","2","3"]}, "", {edit:true,type:"input",inputType:"number"}, {edit:true,type:"input",inputType:"number"}],
    ]

    
}

const apTableSchema = {
    headers: [
        "Test", "Score", "Age when taken", "Year taken"
    ],

    body: [
        ["2D Art and Design", "", "", "", ""],
        ["3D Art and Design", "", "", "", ""],
        ["African American Studies", "", "", "", ""],
        ["Art History", "", "", "", ""],
        ["Biology", "", "", "", ""],
        ["Calculus AB", "", "", "", ""],
        ["Calculus BC", "", "", "", ""],
        ["Chemistry", "", "", "", ""],
        ["Chinese Language and History", "", "", "", ""],
        ["Comparative Government and Politics", "", "", "", ""],
        ["Computer Science A", "", "", "", ""],
        ["Computer Science Principals ", "", "", "", ""],
        ["Drawing", "", "", "", ""],
        ["English Language and Composition", "", "", "", ""],
        ["English Literature and Composition", "", "", "", ""],
        ["Environmental Science", "", "", "", ""],
        ["European History", "", "", "", ""],
        ["French Language and Culture", "", "", "", ""],
        ["Human Geography", "", "", "", ""],
        ["Italian Language and Culture", "", "", "", ""],
        ["Japanese Language and Culture", "", "", "", ""],
        ["Latin", "", "", "", ""],
        ["Macroeconomics", "", "", "", ""],
        ["Microeconomics", "", "", "", ""],
        ["Music Theory", "", "", "", ""],
        ["Physics 1: Algebra Based", "", "", "", ""],
        ["Physics 2: Algebra Based", "", "", "", ""],
        ["Physics C: Electricity and Magnetism", "", "", "", ""],
        ["Physics C: Mechanics", "", "", "", ""],
        ["Precalculus", "", "", "", ""],
        ["Psychology", "", "", "", ""],
        ["Research", "", "", "", ""],
        ["Seminar", "", "", "", ""],
        ["Spanish Language and Culture", "", "", "", ""],
        ["Spanish Literature and Culture", "", "", "", ""],
        ["Statistics", "", "", "", ""],
        ["United States Government and Politics", "", "", "", ""],
        ["United States History", "", "", "", ""],
        ["World History Modern", "", "", "", ""],
    ]

    
}

const createTableFromSchema = (schema,headers,savedData) => {
    const tableHeader = document.createElement("div")
    tableHeader.classList.add("user-stats-table-header")
    schema.headers.forEach((header) => {
        const headerText = document.createElement("p")
        headerText.textContent = header
        tableHeader.appendChild(headerText)
    })

    const tableBody = document.createElement("div")
    tableBody.classList.add("user-stats-table-body")
    //generalize to avoid the IQ table schema explicitly
    schema.body.forEach((row) => {

        const tableBodyRow = document.createElement("div")
        tableBodyRow.classList.add("user-stats-table-body-row")
        row.forEach((column,columnIndex) => {
            if (column?.edit)  {
                if (column.type === "input") {
                    const columnInput = document.createElement("input")
                    columnInput.type = column.inputType || "text"
                    columnInput.classList.add("user-stats-table-input")

                    const columnInputName = row[0].toLowerCase().replace(/\s+/g, '-') + '_' + headers[columnIndex].toLowerCase().replace(/\s+/g, '-')
                    console.log(columnInputName)
                    columnInput.name = columnInputName
                    if (savedData){
                        columnInput.value=savedData[columnInputName] || ""
                    }
                    tableBodyRow.appendChild(columnInput)
                } else if (column.type === "select") {
                    const columnSelect = document.createElement("select")
                    columnSelect.classList.add("user-stats-table-input")
                    const columnSelectName = row[0].toLowerCase().replace(/\s+/g, '-') + '_' + headers[columnIndex].toLowerCase().replace(/\s+/g, '-')
                    console.log(columnSelectName)
                    columnSelect.name = columnSelectName
                    tableBodyRow.appendChild(columnSelect)
                    column.options.forEach((option) => {
                        const optionElement = document.createElement("option")
                        optionElement.value = option
                        optionElement.textContent = option
                        columnSelect.appendChild(optionElement)
                    })
                }
            } else {
                const columnText = document.createElement("p")
                columnText.textContent = column
                tableBodyRow.appendChild(columnText)
            }
        })

        tableBody.append(tableBodyRow)

        statsFormtable.innerHTML = ""
        statsFormtable.append(tableHeader)
        statsFormtable.append(tableBody)
        //make a submit button
        const submitButton = document.createElement("button")
        submitButton.type = "submit"
        submitButton.textContent = "Save"
        statsFormtable.appendChild(submitButton)
    })
}

statsForm.onsubmit = async(event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const submitData = {}
    for (const [key, value] of formData.entries()) {
        submitData[key] = value
    }
    console.log(submitData)
    // Send the data to the server or process it as needed
    try {
        const res = await fetch("http://localhost:3000/api/user-stats/save", {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem("auth"),
                "content-type": "application/json"
            },
            body: JSON.stringify({
                category: tableCategorySelected.value,
                data: submitData
            })
        })
        const resJson = await res.json()
        console.log(resJson, "resjson")

    } catch (error) {
        console.log(error)
    }
}

showaddAPtable.effect(() => {
    if (showaddAPtable.value) {
        createTableFromSchema()
    }
})

addAPButton.onclick = () => {
    showaddAPtable.value = true
}

showaddIQtable.effect(() => {
    if (showaddIQtable.value) {
        createTableFromSchema(iqTableSchema, iqTableSchema.headers,statsstore.iqStats.value?.data)
    }
})

addIQButton.onclick = () => {
    showaddIQtable.value = true
    tableCategorySelected.value = "IQ"
}

// profileForm.onsubmit = async (event) => {
//     event.preventDefault()
//     const formData = new FormData(event.target)
//     const submitData = {}
//     for (const [key, value] of formData.entries()) {
//         submitData[key] = value
//     }
//     console.log(submitData)
//     try {
//         const res = await fetch("http://localhost:3000/api/users/profile", {
//             method: "PUT",
//             headers: {
//                 "Authorization": localStorage.getItem("auth"),
//                 "content-type": "application/json"
//             },
//             body: JSON.stringify(submitData)
//         })
//         const resJson = await res.json()
//         console.log(resJson, "resjson")

//     } catch (error) {
//         console.log(error)
//     }
// }
//getUserInfo()