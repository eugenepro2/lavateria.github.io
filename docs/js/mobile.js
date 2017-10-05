$(function() {

	//Открытие меню
  $$('.menu-open').on('click', function(){
  	if (!$('.view').is('[data-page=index]')) {
	  	$('.back').fadeToggle();
	  }
    $(this).toggleClass('on');
    $('.mobile-menu').fadeToggle();
  });

  $$('.mobile-menu a').on('click', function(){

  	if($(this).attr('href')) {      
    	$('.mobile-menu').fadeOut();
  		$('.menu-open').removeClass('on');

  		if (!$('.view').is('[data-page=index]')) {
	  		$('.back').fadeIn();
	  	}
		}

  });

  $('.mobile-city').on('click', function(){
  	$('.mobile-menu ul:first-child').addClass('hidden');
  	$('.mobile-menu__hidden').addClass('on');
  });

  $('.mobile-menu__back').on('click', function(){
  	$('.mobile-menu ul:first-child').removeClass('hidden');
  	$('.mobile-menu__hidden').removeClass('on');
  });


  if ($('.view').is('[data-page=index]')) {
  	$('.back').hide();
  }

	$(window).on('load', function () {
		setTimeout(function(){
			$('#loading').delay(350).fadeOut('slow');
		}, 3000);
	});






});

// Initialize app
var myApp = new Framework7();
 
// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;
 
// Add view
var mainView = myApp.addView('.view-main', {

});

myApp.onPageBeforeAnimation('*', function (page) {

		//Сброс
		// $$('.logo__mobile').on('click', function () {
		// 	$('.modal-button').text('Отменить');
		//     myApp.confirm('Все введеные данные не будут сохранены. Вы уверены?', function () {
		//         window.location.reload();
		//     });
		// });

		$$('.more').on('click', function () {
			$(this).siblings('.more-text').slideToggle();
			var text = $(this).text();
			$(this).text(
				text == "Подробнее" ? "Скрыть" : "Подробнее");
		});

		$$('.logo__mobile').on('click', function () {
		  myApp.modal({
		    title:  '',
		    text: 'Все введеные данные не будут сохранены. Вы уверены?',
		    buttons: [
		      {
		        text: 'Отменить',
		      },
		      {
		        text: 'Ок',
		        onClick: function() {
		          window.location.reload();
		        }
		      }
		    ]
		  })
		});

		//Профиль
			$('.profile__block--order').each(function(){
				if ($(this).is('.open')) {
					$(this).find('.profile__block__row').show();
				}else{
					$(this).find('.profile__block__row').hide();
				}
			});

			$('.profile__block__link').on('click', function(){
				$(this).closest('.profile__block').find('.profile__block__row').slideToggle();
				$(this).closest('.profile__block').toggleClass('open');
			});

			$('.profile__info__sub__name').each(function(){
				var height = $(this).height();
				$(this).closest('.row').find('.profile__info__sub__sum').height(height);
			});

			$('.change-pass').on('click', function(){
				$(this).closest('.profile__personal__block').find('.profile__personal__block__pass').slideToggle();
				$(this).slideToggle();
			});

			// $('.profile__personal__block__adress edit.').on('click', function(){
			// 	$(this).slideToggle();
			// 	$(this).closest('.profile__personal__block__adress').find('form').slideToggle();
			// });
			$('.profile__personal__block__adress__add .edit').on('click', function(){
				var text = $(this).val();
				$(this).val(
					text == "Редактировать" ? "Сохранить" : "Редактировать");
				$(this).closest('.profile__personal__block__adress__add').find('div').slideToggle();
			});
			$('.profile__personal__block__adress__add .add').on('click', function(){
				var text = $(this).val();
				$(this).val(
					text == "Добавить адрес" ? "Сохранить адрес" : "Добавить адрес");
				$(this).closest('.profile__personal__block__adress__add').find('div').slideToggle();
			});

			//- Two groups
			$$('.profile-contact').on('click', function () {
				$('.modal-button').text('Отмена');
			    var buttons1 = [
			        {
			            text: 'Обратная связь',
			            label: true
			        },
			        {
			            text: 'Написать',
			            bold: true
			        },
			        {
			            text: '<a class="external" href="tel:+7(800) 80-80-800">+7(800) 80-80-800</a>',
			        }
			    ];
			    var buttons2 = [
			        {
			            text: 'Отменить',
			            color: 'red'
			        }
			    ];
			    var groups = [buttons1, buttons2];
			    myApp.actions(groups);
			});


		//Кнопка Назад
		  if (page.name == 'index') {
			  $('.back').fadeOut();
			} else{
				$('.back').fadeIn();
			}

			$('.back').on('click', function(){
				mainView.router.back;
			})

		//Маска для телефона
			$("#phone, #tel").mask("+9(999)999-99-99");

		//Показать скрыть пароль
			$(".checkbox input").change(function() {
					if ($(this).is(':checked')) {
						$('#password').attr('type', 'text');
					} else{
						$('#password').attr('type', 'password');
					}
			});

		//Оформление заказа
			$('.checkout__step--1 .checkout__step__block').hide();
			$('.checkout__step--3 .checkout__step__block').hide();
			$('.checkout__step--4 .checkout__step__block').hide();
			$('.checkout__item').on('click', function(){
				var step = $(this).closest('.checkout__step').toggleClass('hidden');
				var stepBLock = $(this).closest('.checkout__step').find('.checkout__step__block').slideToggle();  			
			});

			$('.save').on('click', function(){
				var crr = $(this).closest('.checkout__step');
				crr.addClass('hidden');
				crr.find('.checkout__step__block').slideUp();
				crr.next('.checkout__step').removeClass('hidden');
				crr.next('.checkout__step').find('.checkout__step__block').slideDown();
			});

			$('.next').on('click', function(event){
				var crr = $(this).closest('.checkout__step');
				crr.addClass('hidden');
				crr.find('.checkout__step__block').slideUp();
				crr.next('.checkout__step').removeClass('hidden');
				crr.next('.checkout__step').find('.checkout__step__block').slideDown();
				event.preventDefault();
	      var id  = $(this).attr('href'),
	          top = $(id).offset().top - 600;
	       setTimeout(function(){
	       		 $('.page-content').animate({scrollTop: top}, 1500);
	       }, 500);
			});
			$('.checkout__ready__name').each(function(){
				var height = $(this).height();
				$(this).closest('.row').find('.checkout__ready__count').height(height);
				$(this).closest('.row').find('.checkout__ready__sum').height(height);
			});

			$('input, textarea').focus(function(){
				$(this).closest('.checkout__step').find('.checkout__item').addClass('active');
			});
			$('input, textarea').blur(function() {
		    if($("#adress").val() && $("#date").val()){
		    	$(this).closest('.checkout__step').find('.next').css('pointer-events', 'inherit')
		    } else if($("#name").val() && $("#tel").val()){
		    		$(this).closest('.checkout__step').find('.next').css('pointer-events', 'inherit')
		        $(this).closest('.checkout__step').find('.checkout__item').addClass('active');
		    } else {
		        $(this).closest('.checkout__step').find('.checkout__item').removeClass('active');
		    }
			});
			$('input').change(function(){
				if($("#adress").val() && $("#date").val()){
					$(this).closest('.checkout__step').find('.next').css('pointer-events', 'inherit')
		    } else if($("#name").val() && $("#tel").val()){
		    		$(this).closest('.checkout__step').find('.next').css('pointer-events', 'inherit')
		        $(this).closest('.checkout__step').find('.checkout__item').addClass('active-line');
		    } else {
		        $(this).closest('.checkout__step').find('.checkout__item').removeClass('active-line');
		    }
			})
			$(".checkout__step__payment input").change(function() {
					if ($(this).is(':checked')) {
						$(this).closest('.checkout__step').find('.checkout__item').addClass('active');
					} else{
						$(this).closest('.checkout__step').find('.checkout__item').removeClass('active');
					}
			});
			$('#date').focus(function(){
				$(this).css('border', '1px solid #01b3fd')
			});

			$('select').on('click', function(){
				$(this).closest('.item-input').addClass('active')
			});




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


				$(".checkbox input").change(function() {
					getSumWithDelivery($(this));
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
							var noActive = thisPrice.find('input').closest('.active');
							noActive.removeClass('no-active');
							if (newValue == 0) {
								noActive.addClass('no-active');
							} else {
								noActive.removeClass('no-active');
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
							var delivery = $('.cart-delivery')
							var price = e.data('deliveryPrice');
							var priceFree = e.data('deliveryPriceFree');
							var textCheckout = e.siblings('.label-checkout').text();

							if (e.is(":checked")) {
								delivery.find('.cart-delivery-sum').text(price);
								delivery.find('.cart-delivery-sum-free span').text(priceFree);
								$('.delivery').text(textCheckout);
							} else{
								$('.delivery').text("Самовывоз");
							}

							sumWithDeliveryPrice = price;
							sumWithDeliveryPriceFree = priceFree;
							freeDelivery();
							getSum();

						}
						//Получаем сумму
						var totalSum = 0;
						function getSum(){
							var a = $('.cart__sum--1 span').text();
							var b = $('.cart__sum--2 span').text();
							totalSum = +a + +b;
							freeDelivery();
						}


						//Бесплатная доставка
						function freeDelivery() {
							if (totalSum >= sumWithDeliveryPriceFree && sumWithDeliveryPriceFree > 1) {
								$('.total span').text(totalSum);
							} else{
								$('.total span').text(totalSum + sumWithDeliveryPrice);
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




			});

