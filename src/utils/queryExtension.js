const splitQueryToList = (query) => {
    let str = "";
    let splittedQuery = [];
    let flag = false;
    for(let i = 0; i < query.length; i++){
        if(query[i] === "'" || query[i] === "`"  || query[i] === '"'){
            flag = !flag; 
        }
        if(flag == false){
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
export { splitQueryToList };