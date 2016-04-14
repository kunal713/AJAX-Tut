$(function () {
	var $orders = $('#orders');
	var $addOrder = $('#add');
	var $name = $('#name');
	var $drink = $('#drink');

	var orderTemplate = "" +
	"<li>" +
	"<p><strong>Name : </strong>{{name}}</p>" +
	"<p><strong>Drink : </strong>{{drink}}</p>" +
	"<button data-id='{{id}}' class='remove'>X</button>" +
	"</li>";

	function addOrders(order) {
		$orders.append(Mustache.render(orderTemplate, order));
	}

	$.ajax({
		type: 'GET',
		url: 'http://rest.learncode.academy/api/thevenin/orders',
		success: function (data) {
			$.each(data, function (i, item) {
				addOrders(item);
			})
		}
	});

	$($addOrder).on('click', function () {
		var order = {
			name: $name.val(),
			drink: $drink.val(),
		}

		$.ajax({
			type: 'POST',
			url: 'http://rest.learncode.academy/api/thevenin/orders',
			data: order,
			success: function (newOrder) {
				addOrders(newOrder);
			},
			error: function () {
				alert('lol u suk');
			}
		});
	});

	$orders.delegate('.remove', 'click', function () {
		var $parent = $(this).closest('li');
		$.ajax({
			type:'DELETE',
			url: 'http://rest.learncode.academy/api/thevenin/orders/' + $(this).attr('data-id'),
			success: function () {
				$parent.fadeOut(300, function () {
					$(this).remove();
				});
			}
		});
		
	});
	
});