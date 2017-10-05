$(function() {



	$('.add').click(function(){
		//Сохраняем значение атрибута href в переменной:
		var target = $(this).attr('href');
		$('html, body').animate({scrollTop: $(target).offset().top - 150}, 800);
		return false;
		});


	//Обязательно поле

	//Табы для личного кабинета
  $('ul.tabs__caption').on('click', 'li:not(.active)', function() {
    $(this)
      .addClass('active').siblings().removeClass('active')
      .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active fadeIn animated');
  });


  //Личный кабнет
  $('.account__block .btn--account').on('click', function() {
  	$('html, body').animate({
        scrollTop: $(this).closest('.account__block').offset().top - 120
    }, 500);
  	$(this).closest('.account__block').find('.account__block__inside').slideToggle();
  	$(this).closest('.account__block').find('.account__block__courier').fadeToggle();
  	var text = $(this).find('i').text();
		$(this).find('i').text(
			text == "Детали" ? "Скрыть" : "Детали");
  });
  $('.btn--addadress').on('click', function(){
  	$('#add').slideToggle();
  });
  $('.account__personal__adress__edit').on('click', function(){
  	$('#edit').slideToggle();
  });
  $('.account__personal__adress__delete').on('click', function(){
  	$('#adress-block').fadeOut();
  });



	//Календарь
	$("#date").flatpickr({
		"locale": "ru",
		dateFormat: "j.m.Y",
		onValueUpdate: function(){
			$('#date').css('border', '1px solid #01b3fd');
		}
	});

	$('input[type="checkbox"]').on('change', function() {
   $('input[type="checkbox"]').not(this).prop('checked', false);
	});

	//Анимация блоков
	new WOW().init();

	//Оформление заказа(Анимации)
	$('input, textarea').focus(function(){
		$(this).closest('.checkout__step').find('.checkout__item').addClass('active');
	});
	$('input, textarea').blur(function() {
    if($("#adress").val() && $("#date").val()){
        $(this).closest('.checkout__step').find('.checkout__item').addClass('active');
    } else if($("#name").val() && $("#tel").val()){
        $(this).closest('.checkout__step').find('.checkout__item').addClass('active');
    } else {
        $(this).closest('.checkout__step').find('.checkout__item').removeClass('active');
    }
	});
	$('input').change(function(){
		if($("#adress").val() && $("#date").val()){
        $(this).closest('.checkout__step').find('.checkout__item').addClass('active-line');
    } else if($("#name").val() && $("#tel").val()){
        $(this).closest('.checkout__step').find('.checkout__item').addClass('active-line');
    } else {
        $(this).closest('.checkout__step').find('.checkout__item').removeClass('active-line');
    }
	})
	$(".radio input").change(function() {
			if ($('input').is('#radio-3:checked')) {
				$('.btn--checkout i').text('Оплатить заказ');
			} else{
				$('.btn--checkout i').text('Оформить заказ');
			}
			if ($(this).is(':checked')) {
				$(this).closest('.checkout__step').find('.checkout__item').addClass('active');
			} else{
				$(this).closest('.checkout__step').find('.checkout__item').removeClass('active');
			}
	});

	//Фиксированый хедер
	$(window).scroll(function(){
		fixHeader();
	});
	$(window).scroll(function(){
		var sum = $('.checkout__sum--3');
		var bottom = $(window).scrollBottom();
		if (bottom > 350) {
			sum.addClass('fixed');
		} else{
			sum.removeClass('fixed')
		}
	});

	//Линия в оформлении заказа(Высота)
	$(window).on('load', function() {
    if ($('.checkout__item').is('.checkout__item--1')) {
			offsetBetween($('.checkout__item--1'), $('.checkout__item--2 .line'));
			offsetBetween($('.checkout__item--2'), $('.checkout__item--3 .line'));
			offsetBetween($('.checkout__item--3'), $('.checkout__item--4 .line'));
		}
	});
	new ResizeSensor($('.checkout__step--1'), function() {
	  if ($('.checkout__item').is('.checkout__item--1')) {
			offsetBetween($('.checkout__item--1'), $('.checkout__item--2'));
			offsetBetween($('.checkout__item--2'), $('.checkout__item--3'));
			offsetBetween($('.checkout__item--3'), $('.checkout__item--4'));
		}
	});

	

	//Прелоадер
	$(window).on('load', function () {
		$preloader = $('#loading');
		$preloader.delay(350).fadeOut('slow');
	});

	//Калькулятор
		//Добавить
		$('[data-action=add]').on('click', function(e){
			var newValue = getNewValue(e);
			setNewValue($(this), newValue);
		});
		//Уменьшить
		$('[data-action=substract]').on('click', function(e){
			var newValue = getNewValue(e);
			setNewValue($(this), newValue);
		});
		//Ввод числа в инпут
		$('[data-action=keyup]').keyup(function(e){
			var newValue = getNewValue(e);
			setNewValue($(this), newValue);
		});
		//Обнулить
		$('.offer__cart__reset').on('click', function(e){
			reset();
		});


	//Калькулятор Абонементов в Оформлении заказа
	$('.checkout__step--1__block__change').on('click', function(){
		var curr = $(this);
		$('.checkout__step--1__block__calc, .checkbox').slideToggle();
		curr.toggleClass('open');
		var text = curr.text();
		curr.text(
			text == "Изменить параметры заказа" ? "Сохранить параметры заказа" : "Изменить параметры заказа");
	});

	$('.checkout__step--1__block__change--2').on('click', function(){
		var curr = $(this);
		$('.checkout__step--1--subscription__block__select').slideToggle();
		curr.toggleClass('open');
		var text = curr.text();
		console.log(text);
		curr.text(
			text == "Изменить параметры абонемента" ? "Сохранить параметры абонемента" : "Изменить параметры абонемента");
	});

	$(".checkbox input").change(function() {
		getSumWithDelivery($(this));
	});

	//Города
	$('.header__city').on('click', function(){
		$('.header__city__hover').fadeToggle();
	});
	$('.header__city__hover a').on('click', function(){
		var city = $(this).text();
		$('.header__city span').text(city);
	});



	//Калькулятор Абонементы
	var blue = $('select.blue')
	var green = $('select.green')
	calculateAbonement(blue);
	calculateAbonement(green);
	blue.change(function(){
		calculateAbonement($(this));
	});
	green.change(function(){
		calculateAbonement($(this));
	});


	//Faq
	$('.faq__block').each(function(){
		var crr = $(this);
		$(this).find('a').on('click', function(){
			crr.find('.faq__block__answer').slideToggle();
			crr.find('.faq__block__title').toggleClass('faq__block__title--green');
			crr.find('.faq__block__title').text();
			var text = crr.find('.btn--faq i').text();
			crr.find('.btn--faq i').text(text == "Ответ" ? "Скрыть" : "Ответ");
		});
	});


	//Добавить к кнопкам тег span для анимации
	$('.btn').append('<span></span>');


	//Отзывы
	var review = $('.review__block').each(function() {
		var reviewFind = $(this).find('.icon-star').length;
		$(this).find('.star-count').text(reviewFind);
		if (reviewFind <= 2) {
			$(this).find('i').css('color', '#f12b2b');
			$(this).find('.review__block__star p').css('color', '#f12b2b');
		}
		if (reviewFind == 3) {
			$(this).find('i').css('color', '#1ace91');
			$(this).find('.review__block__star p').css('color', '#1ace91');
		}
		if (reviewFind >= 4) {
			$(this).find('i').css('color', '#00b5fc');
			$(this).find('.review__block__star p').css('color', '#00b5fc');
		}
	});


	//Анимация всех кнопок
	$('.add, .remove, .btn')
		.on('mouseenter', function(e) {
			var parentOffset = $(this).offset(),
					relX = e.pageX - parentOffset.left,
					relY = e.pageY - parentOffset.top;
			$(this).find('span').css({top:relY, left:relX})
		})
		.on('mouseout', function(e) {
			var parentOffset = $(this).offset(),
					relX = e.pageX - parentOffset.left,
					relY = e.pageY - parentOffset.top;
			$(this).find('span').css({top:relY, left:relX})
		});	

		$('.js-btn')


		//Селект синий
		$('select.blue').each(function(){
			var selectInstance = new Select({
				el: this,
				className: 'select-theme-blue',

			});
		});

		//Селект зеленый
		$('select.green').each(function(){
			var selectInstance = new Select({
				el: this,
				className: 'select-theme-green'
			});
		});


		var swiper = new Swiper('.swiper-container', {
			pagination: '.swiper-pagination',
			paginationClickable: true
		});
});



//Только два числа для ввода
function maxLengthCheck(object) {
	if (object.value.length > object.max.length)
		object.value = object.value.slice(0, object.max.length)
} 
function isNumeric (evt) {
	var theEvent = evt || window.event;
	var key = theEvent.keyCode || theEvent.which;
	key = String.fromCharCode (key);
	var regex = /[0-9]|\./;
	if ( !regex.test(key) ) {
		theEvent.returnValue = false;
		if(theEvent.preventDefault) theEvent.preventDefault();
	}
}






//Калькулятор(Функции)
	//Находим текущее значение
	function findOldValue(e) {
		var crr = $('*[data-price="'+ findPrice($(e)) +'"]');
		var oldValue = crr.find('.cart__count span').text();
		// $(e).closest('.calc').find("input").val(oldValue);

		return parseInt($(e).closest('.calc').find("input").val());
	}
	//Находим цену
	function findPrice(e){
		return $(e).closest('.calc').find("input").data('price');
	}
	//Валидация числа
	function validateNegativeNumbers(n){
		if (n < 0 || isNaN(n)) return 0;

		return parseInt(n);
	}
	//Валидация активен ли элемент
	function validateActive(newValue, thisPrice){
		var noActive = thisPrice;
		noActive.addClass('active');
		if (newValue == 0) {
			noActive.removeClass('active');
		} else {
			noActive.addClass('active');
		}
	}
	//Функции
	var ACTIONS = {
		'add':       function(value) {return ++value},
		'substract': function(value) {return --value},
		'keyup':     function(value) {return value}
	};
	//Получаем новое значение
	function getNewValue(e){
		var oldValue = findOldValue(e.currentTarget);
		var action = $(e.currentTarget).data("action");
		$('.offer__cart').fadeIn();
		$('.offer__block__free').fadeIn();
		var newValue = ACTIONS[action](oldValue);
				newValue = validateNegativeNumbers(newValue);

		return newValue;
	}
	//Записываем новое значение
	function setNewValue(e, newValue){
		$(e).closest('.calc').find("input").val(newValue);
		var thisPrice = $('*[data-price="'+ findPrice($(e)) +'"]');
		var sum = findPrice($(e));
		thisPrice.find('.cart__count span').text(newValue);
		thisPrice.find('.cart__sum span').text(sum * newValue);
		validateActive(newValue, thisPrice);
		getSum();
	}
	//Получаем сумму с доставкой
	var sumWithDeliveryPrice = 0;
	var sumWithDeliveryPriceFree = 0;
	function getSumWithDelivery(e) {
		var delivery = $('#cart-delivery')
		var price = e.data('deliveryPrice');
		var priceFree = e.data('deliveryPriceFree');
		var textCheckout = e.siblings('.label-checkout').text();

		if (e.is(":checked")) {
			delivery.find('#cart-delivery-sum').text(price);
			delivery.find('#cart-delivery-sum-free span').text(priceFree);
			$('.delivery').text(textCheckout);
		} else{
			$('.delivery').text("Самовывоз");
		}

		sumWithDeliveryPrice = price;
		sumWithDeliveryPriceFree = priceFree;
		freeDelivery();

	}
	//Получаем сумму
	var totalSum = 0;
	function getSum(){
		var a = $('.cart__sum--1 span').text();
		var b = $('.cart__sum--2 span').text();
		var c = $('.cart__sum--3 span').text();
		var d = $('.cart__sum--4 span').text();
		// var c = parseFloat($('#cart-delivery-sum').text());
		totalSum = +a + +b + +c + +d;
		// $('.total span').text(totalSum);
		freeDelivery();
	}


	//Бесплатная доставка
	function freeDelivery() {
		if (totalSum >= sumWithDeliveryPriceFree && sumWithDeliveryPriceFree > 1) {
			$('.total span').text(totalSum);
			$('.delivery--notification').fadeOut();
		} else{
			$('.total span').text(totalSum + sumWithDeliveryPrice);
			$('.delivery--notification').fadeIn();
		}
	}
	//Обнулить
	function reset(){
		// $('.offer__cart').fadeOut();	
		// $('.offer__block__free').fadeOut();
		// $('.offer__block__calc input').val(0);
		// $('.offer__cart__count span').text(0);
		// $('.offer__cart__sum span').text(0);
		// $('.active').addClass('no-active');
		// $('.checkbox input:checked').prop('checked', false);
		// $('#cart-delivery-sum').text(0);
		// $('#cart-delivery-sum-free').text('');

		window.location.reload();
	}

//Калькулятор абонементы(Функция)
	function calculateAbonement(e) {
		var firstSelect = $('.select-first');
		var secondSelect = $('.select-second');
		var first = firstSelect.find('option:selected');
		var second = secondSelect.find('option:selected');
		var valMonth = second.data('valueMonth');
		var ratioMonth = second.data('ratioMonth');
		var ratioBasket = first.data('ratio');
		var priceBasket = first.data('price');
		var val = first.data('value');
		var sum = (+val * +priceBasket * +ratioBasket) * (+valMonth * +ratioMonth);
		e.closest('.subscription__block').find('.subscription__block__total h3 span').text(sum);
	}

//Фиксированый хедер(Функция)
	function fixHeader(){
		var header = $('.header'),
				scroll = $(window).scrollTop();

		if (scroll >= 100) header.addClass('fixed');
		else header.removeClass('fixed');
	}


//Svg Inline
	jQuery('img.svg').each(function(){
		var $img = jQuery(this);
		var imgID = $img.attr('id');
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');

		jQuery.get(imgURL, function(data) {
				// Get the SVG tag, ignore the rest
				var $svg = jQuery(data).find('svg');

				// Add replaced image's ID to the new SVG
				if(typeof imgID !== 'undefined') {
						$svg = $svg.attr('id', imgID);
				}
				// Add replaced image's classes to the new SVG
				if(typeof imgClass !== 'undefined') {
						$svg = $svg.attr('class', imgClass+' replaced-svg');
				}

				// Remove any invalid XML tags as per http://validator.w3.org
				$svg = $svg.removeAttr('xmlns:a');

				// Check if the viewport is set, if the viewport is not set the SVG wont't scale.
				if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
						$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
				}

				// Replace image with new SVG
				$img.replaceWith($svg);

		}, 'xml');
	});


//Scroll Bottom
	$.fn.scrollBottom = function() { 
	  return $(document).height() - this.scrollTop() - this.height(); 
	};

//Растояние между элементами
	function offsetBetween(first, second) {
		var height =  $(second).offset().top - $(first).offset().top;
		first.find('.line').height(height);
	}
