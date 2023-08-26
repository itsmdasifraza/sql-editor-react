/**
 * Converts query to array.
 * for example - 'SELECT * FROM Orders' can be converted as ['SELECT', '*', 'FROM', 'Orders']
 * @param {string} query - Stores text from code editor.
 * @return {array} Splitted query.
*/
const splitQueryToList = (query) => {
    let str = "";
    let splittedQuery = [];
    let flag = false;
    for(let i = 0; i < query.length; i++){
        // Find opening and closing backticks, single quotes, and double quotes.
        if(query[i] === "'" || query[i] === "`"  || query[i] === '"'){
            flag = !flag; 
        }
        if(!flag){
            // Push computed str in splittedQuery on reaching white space. 
            if(query[i] === " "){
                str = str.replace(/[`'";]/g, "");
                splittedQuery.push(str);
                str = "";
            }
            else str += query[i];
        }
        else  str += query[i];
    }
    str = str.replace(/[`'";]/g, "");
    splittedQuery.push(str);
    return splittedQuery;
}

/**
 * Extract 'table name' and 'WHERE' clause from splitted query.
 * @param {array} splittedQuery - Stores splitted query for example ['SELECT', '*', 'FROM', 'Orders'].
 * @return {array} 'Table name' and 'WHERE' clause from splitted Query.
*/
const extractClause = (splittedQuery) => {
    let [tableName, whereClause] = [null, null];
    for(let i = 0; i < splittedQuery.length; i++){
        if(splittedQuery[i].toLowerCase() === 'from'){  // Find 'FROM' position in SQL query. 
            if(splittedQuery[i + 1])
               tableName = splittedQuery[i + 1];
        }
        else if(splittedQuery[i].toLowerCase() === 'where'){  // Find 'WHERE' position in SQL query.
            if(splittedQuery[i + 1] && splittedQuery[i + 2] && splittedQuery[i + 3])
                whereClause = [splittedQuery[i + 1], splittedQuery[i + 2], splittedQuery[i + 3] ];
        }
    }
    return [tableName, whereClause];
}

/**
 * Filter rows of a table using 'WHERE' SQL clause.
 * @param {array} res - Stores all rows of a particular table.
 * @param {array} whereClause - Stores 'WHERE' condition used to filter table rows.
 * @return {array} Filtered table rows.
*/
const whereClauseFilter = (res, whereClause) => {
    if(whereClause){
        let filterResponse = res.filter((elem)=>{
            const [field, operator, value] = whereClause;
            // eslint-disable-next-line eqeqeq
            if (operator === '=' && elem[field] == value) return true;
            else if (operator === '>' && elem[field] > value) return true;
            else if (operator === '<' && elem[field] < value) return true;
            else if (operator === '>=' && elem[field] >= value) return true;
            else if (operator === '<=' && elem[field] <= value) return true;
            // eslint-disable-next-line eqeqeq
            else if (operator === '<>' && elem[field] != value) return true;
            // eslint-disable-next-line eqeqeq
            else if (operator === '!=' && elem[field] != value) return true;
            return false;
        });
        return filterResponse;
    }
    return res;
}

export { splitQueryToList, extractClause, whereClauseFilter };