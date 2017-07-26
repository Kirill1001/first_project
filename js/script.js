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

//Tabs(������ �������)

var Filter = {
	//��������� �������� �� ����������
	sort: function(items) {
		items.fadeIn(500);
		$('.products-list').find('.product').not(items).hide();
	},
	//���������� ��� ������
	showAll: function(items) {
		items.fadeIn(500);
	},
	//���������� ����� ���������
	doSort: function() {
		$('a', '.categories').on('click', function(event) {

			var $a = $(this);
			if (!$a.is('.all')) {

				var items = $('.product[data-cat=' + $a.data('cat') + ']', '.products-list');

				Filter.sort(items);

			} else {

				Filter.showAll($('.product', '.products-list'));

			}

			//��������� ��������� ��� �������� ������
			$('.categories').find('a.active').removeClass('active');
			$a.addClass('active');

			event.preventDefault();

		});
	}
};

//�������� ����� �� �����
Filter.doSort();

//Phone-menu
$('.phone-menu').on('click', function() {

    $('.nav').slideToggle(300, function() {
        if ($(this).css('display') === 'none') {
            $(this).removeAttr('style');
        }
    });

});