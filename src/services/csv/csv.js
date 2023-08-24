const parseCSV = (text, rowDelimiter = "\n", entryDelimiter = ",") => {
    const lines = text.split(rowDelimiter);
    const headers = lines[0].split(entryDelimiter);
    const rows = [];
    lines.slice(1, lines.length - 1).forEach((line) => {
        const entries = line.split(entryDelimiter);
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = index < entries.length ? entries[index] : null;
        });
        rows.push(obj);
    });
    return rows;
};

const getFieldDetails = (fieldName) => {
    if (fieldName.search("ID") !== -1) {
        return {
            type: "Number",
            processFn: parseInt,
        };
    }
    return {
        type: "String",
        processFn: (x) => x,
    };
};


let fetchCSVData = (tableName) =>{
    return new Promise((resolve, reject) => {
        fetch(`https://api.github.com/repos/graphql-compose/graphql-compose-examples/contents/examples/northwind/data/csv/${tableName}.csv?ref=master`)
        .then(response => response.json())
        .then(
            (res) => {
                try{
                    // GitHub sends over base64 encoded content
                    const rawResults = parseCSV(atob(res.content))
                    let table = rawResults.map((rawResult) => {
                        // Use the custom processing function for each field type.
                        Object.keys(rawResult).forEach((key) => {
                            rawResult[key] = getFieldDetails(key).processFn(
                                rawResult[key]
                            );
                        });
                        return rawResult;
                    })
                    resolve(table);
                }catch(e){
                    reject(`${tableName} table doesn't exist!`);
                }
            },
            (err) => {
                reject("Something went wrong!");
            }
        )
    });
}
export {fetchCSVData};