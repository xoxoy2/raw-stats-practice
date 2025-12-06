export const test = true;
export const iqTableSchema = {
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

export const createTableFromSchema = (schema,headers,statsFormtable,savedData) => {
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
                    const columnInput = document.createElement("p")
                    columnInput.classList.add("user-stats-table-input")

                    const columnInputName = row[0].toLowerCase().replace(/\s+/g, '-') + '_' + headers[columnIndex].toLowerCase().replace(/\s+/g, '-')
                    // console.log(columnInputName)
                    // columnInput.name = columnInputName
                    if (savedData){
                        columnInput.textContent=savedData[columnInputName] || ""
                    }
                    tableBodyRow.appendChild(columnInput)
                } else if (column.type === "select") {
                    const columnSelect = document.createElement("p")
                    columnSelect.classList.add("user-stats-table-input")
                    const columnSelectName = row[0].toLowerCase().replace(/\s+/g, '-') + '_' + headers[columnIndex].toLowerCase().replace(/\s+/g, '-')
                    // console.log(columnSelectName)
                    // columnSelect.name = columnSelectName
                      if (savedData){
                        columnSelect.textContent=savedData[columnSelectName] || ""
                    }
                    tableBodyRow.appendChild(columnSelect)
                    // column.options.forEach((option) => {
                    //     const optionElement = document.createElement("option")
                    //     optionElement.value = option
                    //     optionElement.textContent = option
                    //     columnSelect.appendChild(optionElement)
                    // })
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
    })
}