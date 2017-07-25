//Slider

$('.owl-carousel').owlCarousel({
	loop:true,
	margin:25,
	dots: true,
	autoplay: true,
	autoplayTimeout: 5000,
	responsive:{
			0:{
					items:1
			},
			600:{
					items:3
			},
			1000:{
					items:3,
					dots: true
			}
	}
});

//Tabs(фильтр товаров)

var Filter = {
	//Сортирует элементы по категориям
	sort: function(items) {
		items.fadeIn(500);
		$('.products-list').find('.product').not(items).hide();
	},
	//Показывает все товары
	showAll: function(items) {
		items.fadeIn(500);
	},
	//Определяет выбор категории
	doSort: function() {
		$('a', '.categories').on('click', function(event) {

			var $a = $(this);
			if (!$a.is('.all')) {

				var items = $('.product[data-cat=' + $a.data('cat') + ']', '.products-list');

				Filter.sort(items);

			} else {

				Filter.showAll($('.product', '.products-list'));

			}

			//Добавляем категории вид активной ссылки
			$('.categories').find('a.active').removeClass('active');
			$a.addClass('active');

			event.preventDefault();

		});
	}
};

//Вызывает метод по клику
Filter.doSort();