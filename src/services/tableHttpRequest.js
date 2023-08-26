/**
 * Parse CSV data sent from Github.
 * @param {string} text - Stores csv raw data.
 * @return {array} table rows json data.
*/
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

/**
 * Extract data for each column of a table rows.
 * @param {string} fieldName - Stores key as a column name.
 * @return {string} value for each column of a row.
*/
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

/**
 * Invoke api calls to get table rows.
 * @param {string} tableName - Stores name of the table used to make http request.
 * @return {array} table rows json data.
*/
let fetchCSVData = (tableName) =>{
    return new Promise((resolve, reject) => {
        fetch(`https://api.github.com/repos/graphql-compose/graphql-compose-examples/contents/examples/northwind/data/csv/${tableName}.csv?ref=master`)
        .then(response => response.json())
        .then(
            (res) => {
                try{
                    const rawResults = parseCSV(atob(res.content));  // base64 encoded content.
                    let table = rawResults.map((rawResult) => {
                        // Use the custom processing function for each field type.
                        Object.keys(rawResult).forEach((key) => {
                            rawResult[key] = getFieldDetails(key).processFn(rawResult[key]);
                        });
                        return rawResult;
                    })
                    resolve(table);
                }catch(e){
                    reject(`No records found, try different query?`);
                }
            },
            (err) => {
                reject("Something went wrong, please try again.");
            }
        )
    });
}
export {fetchCSVData};