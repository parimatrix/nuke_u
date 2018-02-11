$(function() {

    /****************/
    var base_price = 50;
    var new_price = base_price;

    var base_balance = 100;
    var new_balance = base_balance;
    $('#get_bill').click(function () {
        $('#cost').html('');
        $('#cost').append("Calculated Cost = " + new_price*parseInt($('#num_records').val()) + '<br>');
    });

    $('#get_bill_upload').click(function () {
        $('#cost_upload').html('');
        $('#cost_upload').append("Calculated Earnings = " + new_price*parseInt($('#num_records_upload').val()) + '<br>');
    });

    $('#request').click(function() {
		var num_records = parseInt($('#num_records').val());
		var factor = 0.2;
		var name = $('#aadhar').val();
		var inc = num_records/100 * factor;
		new_price = new_price + inc ;

		$('#curr_price').html('');
		$('#curr_price').append("Current Price: " + new_price);

        $('#balance').html('');
        new_balance = new_balance + 0.1 * num_records;
        $('#balance').append("Balance : " + new_balance);


        $.get('/insert_price?price=' + new_price,function (data) {
           console.log("inserted price");
        });

		$.get('/addblock?name='+name+'&num='+num_records,function (data) {
            $('#request').html('Order Placed')
		    console.log(data);
        });
	});

    $('#request_upload').click(function () {
        var num_records = parseInt($('#num_records_upload').val());
        var factor = 0.3;
        var name = $('#disease').val();
        var inc = -1*num_records/100 * factor;
        new_price = new_price + inc ;

        $('#curr_price').html('');
        $('#curr_price').append("Current Price: $" + new_price);

        $('#balance').html('');
        new_balance = new_balance - 0.1 * num_records;
        $('#balance').append("Balance : $" + new_balance);

        $.get('/insert_price?price=' + new_price,function (data) {
            console.log("inserted price");
        });

        $.get('/addblock?name='+name+'&num='+num_records,function (data) {
            $('#request').html('Order Placed')

            console.log(data);
        });
    });

    /***********************/

    var ctx = document.getElementById('myChart').getContext('2d');
    var prices = [10,20];
    $.get('/get_prices',function (data) {
        prices = JSON.parse(data);
        $('#curr_price').append(prices[prices.length-1]);
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: ["01", "02", "03", "04", "05", "06", "08"],
                datasets: [{
                    label: "MediCoin Price Chart for February",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data: prices,
                }]
            },

            // Configuration options go here
            options: {
                fill: false
            }
        });
        $('#mychart').css("width", "80%");

    });

});