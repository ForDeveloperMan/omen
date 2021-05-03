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
	offset: 		50,
	live: 			true,
	callback:     function(box) {
		let countTime = $(box).data('wow-delay');
		let countTimeDuration = $(box).data('wow-duration');
		if ( countTime === '1s' ) {
			countTime = 1000;
		}
		else if ( countTime === '2s' ) {
			countTime = 2000;
		}
		else if ( countTime === '1.8s' ) {
			countTime = 1800;
		}
		else if ( countTime === '500ms' ) {
			countTime = 500;
		}else{
			countTime = 0;
		}
		if ( countTimeDuration === '1s' ) {
			countTimeDuration = 1000;
		}
		else if ( countTimeDuration === '2s' ) {
			countTimeDuration = 2000;
		}
		else if ( countTimeDuration === '1.8s' ) {
			countTimeDuration = 1800;
		}
		else if ( countTime === '500ms' ) {
			countTimeDuration = 500;
		}else{
			countTimeDuration = 0;
		}
		countTime += 1000;
		countTime += countTimeDuration;
		console.log(countTime);
		setTimeout(reset, countTime);
		function reset() {
			$(box).css({
				'animation-name': 'none',
				'visibility': 'visible',
				'animation-delay': '0ms',
				'animation-duration': '1s',
				'animation-iteration-count': '0',
			});
			$(box).removeClass('animated');
		}
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
	$('.review-block .info-slides__text-count').text(parseInt(count) + 1);

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


var fixClicked = false;
var videReviewsCount = 0;

$('.block-videoreview .info-slides__arrows-next').on('click', function() {
	var wrap = $('.sec-videoreview');
	if ( fixClicked ) {
		return false;
	}
	fixClicked = true;

	var blockReviews = wrap.find('.block-videoreview');
	var slides = blockReviews.data('slides');
	videReviewsCount++;
	if ( videReviewsCount >= slides.length ) {
		videReviewsCount = 0;
	}
	setVideoreview(slides);
	setAnim();
	return false;
});
$('.block-videoreview .info-slides__arrows-prev').on('click', function() {
	var wrap = $('.sec-videoreview');
	if ( fixClicked ) {
		return false;
	}
	fixClicked = true;

	var blockReviews = wrap.find('.block-videoreview');
	var slides = blockReviews.data('slides');
	videReviewsCount--;
	if ( videReviewsCount < 0 ) {
		videReviewsCount = slides.length - 1;
	}
	setVideoreview(slides);
	setAnim();
	return false;
});

function setVideoreview(slides) {
	for(let key in slides){
		let slide = slides[key];
		if ( key-0 === videReviewsCount ) {
			var wrap = $('.block-videoreview');
			wrap.find('.block-videoreview__title').text(slide['title']);
			wrap.find('.block-videoreview-title_big').text(slide['titleBig']);
			wrap.find('.video-block').attr('href', slide['video']);
			wrap.find('.info-slides__text-count').text(parseInt(key) + 1);
			$('.block-videoreview__mans').empty();
			for(let i=0; i<slide['mans'].length; i++){
				$('.block-videoreview__mans').append('<div class="block-videoreview__man"><img src="'+ slide['mans'][i]['iconUrl'] +'" alt="" class="block-videoreview__man-img"><div class="block-videoreview__man-text">'+ slide['mans'][i]['name'] +'</div></div>');
			}
		}
	}
}

function setAnim() {
	var wrap = $('.sec-videoreview');

	$(wrap).find('.block-videoreview__left, .video-block, .block-videoreview__right-dec, .video-block__dec').addClass('animated');

	$(wrap).find('.block-videoreview__left').css({
		'animation-name': 'slideInLeft',
		'visibility': 'visible',
		'animation-duration': '1s',
		'animation-iteration-count': '1',
	});
	$(wrap).find('.video-block').css({
		'animation-name': 'slideInRight',
		'visibility': 'visible',
		'animation-duration': '1s',
		'animation-iteration-count': '1',
	});
	$(wrap).find('.block-videoreview__right-dec').css({
		'animation-name': 'fadeInRight',
		'visibility': 'visible',
		'animation-delay': '1s',
		'animation-duration': '500ms',
		'animation-iteration-count': '1',
	});
	$(wrap).find('.video-block__dec').css({
		'animation-name': 'fadeIn',
		'visibility': 'visible',
		'animation-duration': '500ms',
		'animation-delay': '1s',
		'animation-iteration-count': '1',
	});


	setTimeout(start, 1000);
	function start() {
		$(wrap).find('.block-videoreview__left, .video-block').css({
			'animation-name': 'none',
			'visibility': 'visible',
			'animation-duration': '1s',
			'animation-iteration-count': '0',
		});
		$(wrap).find('.block-videoreview__left, .video-block').removeClass('animated');

		setTimeout(elseStart, 500);
		function elseStart() {
			$(wrap).find('.block-videoreview__right-dec, .video-block__dec').css({
				'animation-name': 'none',
				'visibility': 'visible',
				'animation-duration': '1s',
				'animation-iteration-count': '0',
			});
			$(wrap).find('.block-videoreview__right-dec, .video-block__dec').removeClass('animated');
			fixClicked = false;
		}
	}
}

let commandCount = 0;
let fixCommandClick = false;

$('.sec-command__content .info-slides__arrows-next').on('click', function() {
	if ( fixCommandClick ) {
		return false;
	}
	fixCommandClick = true;
	var wrap = $('.sec-command__content');
	var slides = wrap.data('slides');
	commandCount++;
	if ( commandCount >= slides.length ) {
		commandCount = 0;
	}
	setCommandSlide(slides);
	setAnimCommand();
	return false;
});
$('.sec-command__content .info-slides__arrows-prev').on('click', function() {
	if ( fixCommandClick ) {
		return false;
	}
	fixCommandClick = true;
	var wrap = $('.sec-command__content');
	var slides = wrap.data('slides');
	commandCount--;
	if ( commandCount < 0 ) {
		commandCount = slides.length - 1;
	}
	setCommandSlide(slides);
	setAnimCommand();
	return false;
});

function setCommandSlide(slides) {
	for(let key in slides){
		if ( key-0 === commandCount ) {
			var wrap = $('.sec-command__content');
			let slide = slides[key];
			wrap.find('.sec-command__slides-title').text( slide['title'] );
			wrap.find('.sec-command__slides-text').text( slide['text'] );
			wrap.find('.command-notebook__slide').attr('src', slide['img'] );
			wrap.find('.info-slides__text-count').text(parseInt(key)+1);
		}
	}
}

function setAnimCommand() {
	var wrap = $('.sec-command__content');
	$(wrap).find('.sec-command__slides-title, .sec-command__slides-text').addClass('animated');
	$(wrap).find('.sec-command__slides-title, .sec-command__slides-text').css({
		'animation-name': 'slideInLeft',
		'visibility': 'visible',
		'animation-duration': '500ms',
		'animation-iteration-count': '1',
	});
	setTimeout(start, 500);
	function start() {
		$(wrap).find('.sec-command__slides-title, .sec-command__slides-text').css({
			'animation-name': 'none',
			'animation-iteration-count': '0',
		});
		$(wrap).find('.sec-command__slides-title, .sec-command__slides-text').removeClass('animated');
		fixCommandClick = false;
	}
}


}); //end ready