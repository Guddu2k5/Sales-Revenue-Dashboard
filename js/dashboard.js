Papa.parse("data/sales.csv",{

download:true,

header:true,

complete:function(results){

const data=results.data.filter(row=>row.OrderID);

console.log(data);

}

});