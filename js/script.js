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
		var list = $('.products-list');
		list.find('.product').not(items).hide();
		list.find('.products-btn').not(items).hide();
	},
	//Показывает все товары
	showAll: function(items) {
		items.fadeIn(500);
	},
	//Определяет выбор категории
	doSort: function() {
		$(window).on('load', function() {
			$('.product, .products-btn').hide();
			$('[data-cat = all]').show();
		});
		$('a', '.categories').on('click', function(event) {

			var $a = $(this);


			var items = $('[data-cat=' + $a.data('cat') + ']', '.products-list');

			Filter.sort(items);

			//Добавляем категории вид активной ссылки
			$('.categories').find('a.active').removeClass('active');
			$a.addClass('active');

			event.preventDefault();

		});
	}
};

//Вызывает метод по клику
Filter.doSort();

//Phone-menu
$('.phone-menu').on('click', function() {

    $('.nav').slideToggle(300, function() {
        if ($(this).css('display') === 'none') {
            $(this).removeAttr('style');
        }
    });

});

//Ajax load products

$(function(){

	$('.products-btn').on('click', function(event) {
		var cat = $('.categories').find('a.active');
		var attribute = cat.attr('data-cat');

		$.ajax({
			url: attribute + '.json',
			dataType: 'json',
			success: function(data) {
				for (var i = 0; i < data.length; i++) {
					var currentItem = data[i],
						category = '.products-list-';
					$(category + attribute).append('<article class="product product-ajax" data-cat="' + currentItem.category + '">' +
						'<a href="#" class="product__overlay" data-id="' + currentItem.id + '">add to cart</a>' +
						'<a href="#" class="product__pic"><img src="' + currentItem.img + '" class="product__img" alt=""></a>' +
						'<div class="product__descr">' +
						'<div class="product__subtitle">' +
						'<a href="#" class="section-subtitle">' + currentItem.name + '</a>' +
						'</div>' +
						'<p class="section-descr">' + currentItem.description + '</p>' +
						'<div class="section-price product__price">' + currentItem.price + '</div>' +
						'</div></article>');
					if (i === data.length - 1) {
						$(event.target).remove();
					}
				}
			}
		});
		return false;
	});
});

/**
 * Корзина товаров
 * @type {{cartProd: {}, checkCart: cart.checkCart, showCart: cart.showCart, timerForClearCart: cart.timerForClearCart, addToCart: cart.addToCart}}
 */
var cart = {

    /**
	 * Создаем корзину товаров
     */
	cartProd: {},
    timer: null,

    /**
	 * Проверяет localStorage на наличие добавленных  товаров
     */
    checkCart: function(){
        if (localStorage.getItem('cart') !== null) {
            cart.cartProd = JSON.parse(localStorage.getItem('cart'));
        }
    },

    /**
	 * Показывает колличество товаров в корзине
     */
    showCart: function(){
        var num = 0;
        for (var prod in cart.cartProd) {
            num += cart.cartProd[prod];
        }
        $('.account__badge').text(num);
    },

    /**
	 * устанавливаем таймер и очищаем корзину через час
     */
    clearCart: function(){
    	clearTimeout(cart.timer);
    	cart.timer = setTimeout(function() {
            localStorage.removeItem('cart');
            $('.account__badge').text('0');
            cart.cartProd = {};
        }, 3600000);
    },

    /**
	 * Добавляем товар в корзину
     * @returns {boolean}
     */
    addToCart: function(){
            var idProduct = $('.product__overlay').attr('data-id');
            if (cart.cartProd[idProduct] === undefined) {
                cart.cartProd[idProduct] = 1;
            } else {
                cart.cartProd[idProduct]++;
            }
            localStorage.setItem('cart', JSON.stringify(cart.cartProd));
            cart.showCart();
            return false;
    }
};
$('document').ready(function(){
	var allProducts = $('.products-list');
    cart.checkCart();
    allProducts.on('click', '.product__overlay', cart.addToCart);
    allProducts.on('click', '.product__overlay', cart.clearCart);
});