/**
 * Pre defined sets of query.
*/
const query = [ 
    "SELECT * FROM 'territories' WHERE 'territoryDescription' = 'NewYork';",
    "SELECT * FROM 'orders' WHERE 'employeeID' <= 5;",
    "SELECT * FROM 'products' WHERE 'categoryID' != 3;",
    "SELECT * FROM 'orders' WHERE 'shipName' = 'Wartian Herkku';",
    "SELECT * FROM 'shippers' WHERE 'shipperID' = 1;"
];
export {query};