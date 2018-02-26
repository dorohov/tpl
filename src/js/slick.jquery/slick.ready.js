'use strict';
$(function() { 
	$('.slick-country').slick({
		slidesToShow: 6,
		slidesToScroll: 6,
		arrows: true,
		//appendArrows: '.content-block__cols.is--slick-btn .work-news',
		infinite: false,
		responsive: [
		    {
				breakpoint: 900,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
				}
		    },
		    {
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
		    }
		],
		prevArrow: '<button type="button" class="slick-prev  is--horizontal"><svg class="icon-svg icon-slick-left" role="img"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg/sprite.svg#slick-left"></use></svg></button>',
		nextArrow: '<button type="button" class="slick-next  is--horizontal"><svg class="icon-svg icon-slick-right" role="img"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg/sprite.svg#slick-right"></use></svg></button>'
		//asNavFor: "#sl-nav",
		//fade: true,
		//customPaging: 20,
		//draggable: false,
		//swipe: false,
		//fade: true,
		//variableWidth: true,
		//centerMode: true,
	});
	$('.slick-gallery').slick({
		centerMode: true,
		centerPadding: '15px',
		slidesToShow: 3,
		//slidesToScroll: 4,
		arrows: true,
		//infinite: false,
		draggable: false,
		swipe: false,
		dots: false,
		responsive: [
		    {
				breakpoint: 900,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					//dots: true,
				}
		    },
		    {
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					//dots: false,
					centerMode: false,
					centerPadding: '15px', 
				}
		    }
		],
		prevArrow: '<button type="button" class="slick-prev  is--horizontal"><svg class="icon-svg icon-slick-left" role="img"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg/sprite.svg#slick-left"></use></svg></button>',
		nextArrow: '<button type="button" class="slick-next  is--horizontal"><svg class="icon-svg icon-slick-right" role="img"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="/img/svg/sprite.svg#slick-right"></use></svg></button>'
		//asNavFor: "#sl-nav",
		//fade: true,
		//customPaging: 20,
		//fade: true,
		//variableWidth: true,
		//centerMode: true,
	});
}); 