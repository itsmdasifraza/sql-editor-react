const splitQueryToList = (query) => {
    let str = "";
    let splittedQuery = [];
    let flag = false;
    for(let i = 0; i < query.length; i++){
        if(query[i] === "'" || query[i] === "`"  || query[i] === '"'){
            flag = !flag; 
        }
        if(flag === false){
            if(query[i] === " "){
                str = str.replace(/[`'";]/g, "");
                splittedQuery.push(str);
                str = "";
            }
            else{
                str += query[i];
            }
        }
        else{
            str += query[i];
        }
        
    }
    
    str = str.replace(/[`'";]/g, "");
    splittedQuery.push(str);
    return splittedQuery;
}
const extractClause = (splittedQuery) => {
    let [tableName, whereClause] = [null, null];
    for(let i = 0; i < splittedQuery.length; i++){
        if(splittedQuery[i].toLowerCase() === 'from'){
            if(splittedQuery[i + 1])
               tableName = splittedQuery[i + 1];
        }
        else if(splittedQuery[i].toLowerCase() === 'where'){
            if(splittedQuery[i + 1] && splittedQuery[i + 2] && splittedQuery[i + 3])
                whereClause = [splittedQuery[i + 1], splittedQuery[i + 2], splittedQuery[i + 3] ];
        }
    }
    return [tableName, whereClause];
}

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