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




}); //end ready