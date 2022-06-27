$(document).ready(function () {
	getRows();

	$('#addDollar').click(function() {
		addMoney(1.00);
	});

	$('#addQuarter').click(function() {
		addMoney(0.25);
	});

	$('#addDime').click(function() {
		addMoney(0.10);
	});

	$('#addNickel').click(function() {
		addMoney(0.05);

	});
    

	$('#purchase').click(function() {
		var money = $('#moneyinput').val();
		var id = $('#itemid').val();

		purchase(money, id);

	});

	$('#returnChange').click(function() {
		totalMoney = 0;
		$('#moneyinput').val('');
		$('#itemid').val('');
		$('#message').val('');
		$('#changereturn').val('');

	});


});

function purchase(money, id) {

	$.ajax({
		type: 'POST',
		url: '	http://vending.us-east-1.elasticbeanstalk.com/money/' + money + '/item/' + id,
		success : function(item) {
			var change = "Quarters: " + item.quarters + " | Dimes: " + item.dimes + " | Nickels: " + item.nickels + " | Pennies: " + item.pennies;
			$('#message').val("Thank You!");

			$('#changereturn').val(change);
		},

		error : function(jqXHR) {
			var error = jqXHR.responseJSON.message;
			console.log(jqXHR);
			$('#message').val(error);
		}
	})
};

function getRows(){

	$.ajax({
		type: 'GET',
		url:  'http://vending.us-east-1.elasticbeanstalk.com/items',
		success : function(data) {
			console.log(data);

			$.each(data, function(index, item){
				var d = "<button type='button' value='" + item.id + "'style='border: black solid' class='itemButton btn btn-white col-3 m-2'>";

				 d += "<h5>" + item.id + "</h5>";
				 d += "<h5 style='text-align: center'>" + item.name + "</h5>";
				 d += "<h5 style='text-align: center'>" + "$" + item.price + "</h5><br>";
				 d += "<h5 style='text-align: center'>" + "Quantity Left: " + item.quantity + "</h5>";

				 d += '</button>';
				 $('#itemRow').append(d);

				 $('.itemButton').click(function () {
					var id = $(this).val();
					$('#itemid').val(id);
				});

			});
		},
		error : function(jqXHr) {
      		console.log(jqXHr);
    	}

	});

};

var totalMoney = 0;
function addMoney(amount) {
	totalMoney += amount;
	$('#moneyinput').val((totalMoney).toFixed(2));
};
