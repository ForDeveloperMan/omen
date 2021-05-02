$(document).ready(function() {





var timerInfoel;

$(document).on('click', '.info-el__title', function() {
	clearInterval(timerInfoel);
	var wrap = $(this).closest('.block-info');
	wrap.find('.info-el').removeClass('is-active');
	var el = $(this).closest('.info-el');
	wrap.find('.info-el__body').slideUp(200);
	el.find('.info-el__timer span').css({
		height: '25%',
	});
	if ( el.hasClass('is-active') ) {

	}else{
		var procentLoad = 25;
		timerInfoel = setInterval(setLoad, 10);
		el.addClass('is-active');
		el.find('.info-el__body').slideDown(200);
		function setLoad() {
			procentLoad += 0.1;
			if ( procentLoad >= 100 ) {
				el.removeClass('is-active');
				el.find('.info-el__body').slideUp(200);
				el = el.next('.info-el');
				if ( !el.length ) {
					el = wrap.find('.info-el').eq(0);
				}
				el.addClass('is-active');
				el.find('.info-el__body').slideDown(200);
				// clearInterval(timerInfoel);
				procentLoad = 25;
			}else{
				el.find('.info-el__timer span').css({
					height: procentLoad + '%',
				});
			}
		}
	}
});

$('.block-info').each(function() {
	$(this).find('.info-el').eq(0).find('.info-el__title').click();
});

$('.specifications-el__top').on('click', function() {
	var wrap = $(this).closest('.specifications-el');
	if ( wrap.hasClass('active') ) {
		wrap.removeClass('active');
		wrap.find('.specifications-el__body').slideUp(200);
	}else{
		wrap.addClass('active');
		wrap.find('.specifications-el__body').slideDown(200);
	}
});


WOW.prototype.addBox = function(element) {
	this.boxes.push(element);
};
var wow = new WOW({
	boxClass:     	'wow',
	animateClass: 	'animated',
	offset: 		200,
	live: 			true,
	callback:     function(box) {
      if ( $(box).hasClass('sec-specifications__right') ) {
      		setTimeout(start, 850);
      		function start() {
      			$('.block-specifications__el').eq(1).find('.specifications-el__top').click();
      		}
      }
    },
});
wow.init();

var showStartRivew = 0;
var arrReviews = $('.sec-review__content').data('reviews');


$('.review-block__info .info-slides__arrows-next').on('click', function() {
	var wrap = $(this).closest('.sec-review__content');
	showStartRivew = showStartRivew+1;
	if ( showStartRivew >= arrReviews.reviews.length ) {
		showStartRivew = 0;
	}
	for ( var key in arrReviews.reviews ) {
		if ( showStartRivew === key-0 ) {
			setReview(key);
		}	
	}
	return false;
});
$('.review-block__info .info-slides__arrows-prev').on('click', function() {
	var wrap = $(this).closest('.sec-review__content');
	showStartRivew = showStartRivew - 1;
	if ( showStartRivew < 0 ) {
		showStartRivew = arrReviews.reviews.length - 1;
	}
	for ( var key in arrReviews.reviews ) {
		if ( showStartRivew === key-0 ) {
			setReview(key);
		}	
	}
	return false;
});

function setReview(count) {
	var reviw = arrReviews.reviews[count];
	$('.info-slides__text-count').text(parseInt(count) + 1);

	$('.review-block__title').remove();
	$('.review-block__body').remove();
	$('.review-block__man').remove();
	$('.review-block__right-title').remove();
	$('.review-block__btn').remove();
	$('.review-block__line').remove();
	$('.review-block__dec').remove();
	$('.review-block__img').remove();
	$('.sec-review__diamond').remove();

	$('.review-block__left').prepend('<h2 class="review-block__title title title_sec slideInLeft wow" style="">'+ reviw['title'] +'</h2>');
	$('.review-block__left').append('<div class="review-block__body wow slideInLeft">'+ reviw['content'] +'</div>');
	$('.review-block__right').prepend('<div class="review-block__man wow slideInRight"><img src="'+ reviw['userIcon'] +'" alt="" class="review-block__man-img"><div class="review-block__man-text">'+reviw['name']+'</div></div>');
	$('.review-block__right').append('<h2 class="title title_main review-block__right-title wow slideInRight">'+reviw['titleRight']+'</h2>');
	$('.review-block__right').append('<a href="'+reviw['btnUrl']+'" class="btn btn_small review-block__btn wow slideInRight"><span class="btn__text">Читать статью</span></a>');
		
	$('.review-block__center').append('<img src="../img/review/line.svg" alt="" class="review-block__line wow fadeIn" data-wow-delay="1s">');
	$('.review-block__center').append('<img src="../img/dec/thromb.svg" alt="" class="review-block__dec wow fadeIn" data-wow-delay="1s" data-wow-duration="1s">');
	$('.review-block__center').append('<img src="../img/review/notebook.png" alt="" class="review-block__img wow slideInDown" data-wow-delay="1s" data-wow-duration="800ms">');

	$('.sec-review').prepend('<div class="sec-review__dec sec-review__diamond diamond-dec-2 wow slideInRight" data-wow-delay="1s"></div>');
}


$('.sec-specifications__btn').on('click', function() {
	var wrap = $(this).closest('.sec-specifications');
	if ( $(this).hasClass('active') ) {
		$(this).removeClass('active');
		$(this).text('Все спецификации');
		wrap.find('.block-specifications__el.showed').fadeOut(200);
	}else{
		$(this).addClass('active');
		wrap.find('.block-specifications__el:nth-child(n+7)').fadeIn(200);
		wrap.find('.block-specifications__el:nth-child(n+7)').addClass('showed');
		$(this).text('Скрыть часть');
	}
	return false;
});


}); //end ready