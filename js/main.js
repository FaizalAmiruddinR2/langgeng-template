$('.card-carousel').first().addClass('active');
$('.card-carousel').each(function(i, card){
	var index = parseInt($(card).index());
	$(card).attr('data-value', index);
});

var initialHeight = Math.round(($('.card-carousel-container').height()-$('.card-carousel-container').offset().top) / $(window).height() * 100);

$('.card-carousel').width($(document).width()-($(document).width()*5/100)-($(document).width()*(($('.card-carousel').length-1)*1.5)/100));

$('#full-page-headline-caption').css('padding-top', $('.card-carousel.active').height()-($('.card-carousel.active').height()*30/100));

var min = $('.card-carousel').first().index();
var max = $('.card-carousel').last().index();

resetLayout();

function resetLayout() {
	$('.card-carousel').each(function(i, card){
		if ($(card).is('.active')) {
			$(card).css({'background': '#ffffff'});
			$('.card-carousel.active .carousel-content-header').css({
				'background': '#ffffff'
			});
		}
		else {
			$(card).css({'background': '#fef003'});
		}
		var value = parseInt($(card).attr('data-value'));
		var index = parseInt($(card).index());
		if(value < 0) {
			if(!$(card).is('.active')) {
				$(card).animate({
					height: (initialHeight-(1*2))+'%',
					left: (2.5+index*1.5)+'%',
					'margin-top': (1/2)+'%',
					'z-index': 20+value
				}, 250);
			}
			else {
				$(card).animate({
					height: (initialHeight)+'%',
					left: (2.5+index*1.5)+'%',
					'margin-top': '0%',
					'z-index': 20+value
				}, 250);
			}
		}
		else {
			if(!$(card).is('.active')) {
				$(card).animate({
					height: (initialHeight-(1*2))+'%',
					left: (2.5+index*1.5)+'%',
					'margin-top': (1/2)+'%',
					'z-index': 20-value
				}, 250);
			}
			else {
				$(card).animate({
					height: (initialHeight)+'%',
					left: (2.5+index*1.5)+'%',
					'margin-top': '0%',
					'z-index': 20-value
				}, 250);
			}
		}
	});
}

var cardState = 0;
$('.card-carousel').hover(function() {
	// if (!$(this).is($('.active')) && !$(this).is(':animated') && !$(this).parent().is(':animated') && cardState == 0) {
	if (!$(this).is($('.active')) && cardState == 0) {
		cardState = 1;
		$(this).css({'background': '#fef003'});
		var value = parseInt($(this).attr('data-value'));
		if(value < 0) {
			for (var i = value; i >= min; i--) {
				$('[data-value='+i+']').each(function(i, card) {
					var index = parseInt($(card).index());
					$(card).stop(true, true).animate({
						left: (2+index*1.5)+'%',
					}, 200);
				});
			}
		}
		else {
			for (var i = value; i <= max; i++) {
				$('[data-value='+i+']').each(function(i, card) {
					var index = parseInt($(card).index());
					$(card).stop(true, true).animate({
						left: (4+index*1.5)+'%',
					}, 200);
				});
			}
		}
	}
}, function() {
	if (!$(this).is($('.active')) && cardState == 1) {
		$(this).css({'background': '#fef003'});
		var value = parseInt($(this).attr('data-value'));
		for (var i = value; i <= max; i++) {
			$('[data-value='+i+']').each(function(i, card) {
				var index = parseInt($(card).index());
				$(card).stop(true, true).animate({
					left: (3+index*1.5)+'%',
				}, 200);
			});
		}
		
		cardState = 0;
	}
});

$('.card-carousel').click(function(event) {
	$('.card-carousel .carousel-content-header').css({
		'background': '#fef003', 
		'box-shadow': '0 0px 0px lightgrey'
	});
	cardState = 0;
	var value = parseInt($(this).attr('data-value'));
	var elm = [];
	var x = 0;
	for (var i = min; i <= max; i++) {
		elm[x] = $('[data-value='+i+']');
		x++;
	}

	if(value > 0) {
		elm.forEach(function(item, index, array) {
			var newVal = value - 0;
			var elmVal = parseInt($(item).attr('data-value'));
			$(item).attr('data-value', elmVal-newVal);
			if(index == 0) {
				min = $(item).attr('data-value');
			}
			max = $(item).attr('data-value');
		});
	}
	else {
		elm.forEach(function(item, index, array) {
			var newVal = 0 - value;
			var elmVal = parseInt($(item).attr('data-value'));
			$(item).attr('data-value', elmVal+newVal);
			if(index == 0) {
				min = $(item).attr('data-value');
			}
			max = $(item).attr('data-value');
		});
	}

	$('.card-carousel').removeClass('active');
	$(this).addClass('active');

	if($('.prod-sec').length > 0) {
		$('.navbar-nav li').removeClass('active');
		if($('.prod-sec').is('.active')) {
			$('#prod-nav').addClass('active');
		}
		else {
			$('#home-nav').addClass('active');
		}
	}

	resetLayout();
});

$('.card-carousel>.card-carousel-content').scroll(function(){
	if($(this).scrollTop() > 5) {
		$('.card-carousel.active .carousel-content-header').css({
			'box-shadow': '0 10px 10px lightgrey'
		});
	}
	else {
		$('.card-carousel.active .carousel-content-header').css({
			'box-shadow': '0 0px 0px lightgrey'
		});
	}
})

$('#product-carousel').on('slide.bs.carousel', function (carItem) {
	// console.log(carItem);
	$('#preview-select [data-slide-to='+carItem.from+']').removeClass('active');
	$('#preview-select [data-slide-to='+carItem.to+']').addClass('active');
})

$('.toggle-register').on('click', function() {
	$('.container-login').stop().addClass('active');
});

$('.close').on('click', function() {
	$('.container-login').stop().removeClass('active');
});