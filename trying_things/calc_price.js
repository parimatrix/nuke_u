$(function() {
	
var blockchain = [];
var curr_len = 1;

function calc_hash(x,y)
{
	console.log(x);
	return (x.length)%7 + y%7;
}

blockchain[0] = {myname: "Parikansh" , amount: 30 , myhash : calc_hash("Parikansh",30), prev_hash: 0}


function add_block(name , amount)
{
	var obj = {};
	obj.myname = name;
	obj.amount = amount;
	obj.myhash = blockchain[curr_len-1].myhash + calc_hash(name,amount);
	obj.prev_hash = blockchain[curr_len-1].myhash;
	blockchain[curr_len] = obj;
	curr_len++; 
	console.log(obj);
}
	/****************/
	
	
	const base_price = 50;
	var new_price = base_price
	$('#buy').click(function() {
		var num_records = parseInt($('#number').val());
		var factor = 2;
		var name = $('#name').val();
		var inc = num_records/100 * factor;
		new_price = new_price + inc ;

		$('#current_price').html('');
		$('#current_price').append("Current Price: " + new_price);

		$('#transactions').append('<br>' + name + " bought " + num_records + " records.");
		add_block(name, num_records);
	});
});