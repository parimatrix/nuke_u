var blockchain = [];
var curr_len = 1;
function calc_hash(x)
{
	return (x.length)%7;
}
blockchain[0] = {name: "Parikansh" , amount: 30 , hash : calc_hash("Parikansh")}

function add_block(name , amount)
{
	var obj = {};
	obj.name = name;
	obj.amount = amount;
	obj.hash = calc_hash(blockchain[curr_len].hash + calc_hash(name));
	blockchain[curr_len] = obj;
	curr_len++; 
	console.log(obj);
}
