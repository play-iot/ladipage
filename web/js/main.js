'use strict';
/* 0. Initialization */
// Get height on Window resized
$(window).on('resize', function () {
    let slideHeight = $('.slick-track').innerHeight();
    return false;
});


// Smooth scroll <a> links 
let $root = $('html, body');
$('a.s-scroll').on('click', function () {
    let href = $.attr(this, 'href');
    $root.animate({
                      scrollTop: $(href).offset().top,
                  }, 500, function () {
        window.location.hash = href;
    });
    return false;
});

// Page Loader : hide loader when all are loaded
$(window).load(function () {
    $('#page-loader').addClass('hidden');
});


/* 1. Clock attribute */

let dateReadableText = 'Upcoming date';
if ($('.site-config').attr('data-date-readable') && ($('.site-config').attr('data-date-readable') != '')) {
    $('.timeout-day').text('');
    dateReadableText = $('.site-config').attr('data-date-readable');
    $('.timeout-day').text(dateReadableText);
}
$('.clock-countdown').downCount({
                                    date: $('.site-config').attr('data-date'),
                                    offset: +10,
                                }, function () {
    //callback here if finished
    //alert('YES, done!');
    let zerodayText = 'An upcoming date';
    if ($('.site-config').attr('data-zeroday-text') && ($('.site-config').attr('data-zeroday-text') != '')) {
        $('.timeout-day').text('');
        zerodayText = $('.site-config').attr('data-zeroday-text');
    }
    $('.timeout-day').text(zerodayText);
});


/* 2. Background for page / section */

let background = '#ccc';
let backgroundMask = 'rgba(255,255,255,0.92)';
let backgroundVideoUrl = 'none';

/* Background image as data attribut */
let bgi = $('.bg-img');

for (let i = 0; i < bgi.length; i++) {
    let src = bgi[i].getAttribute('data-image-src');
    bgi[i].style.backgroundImage = 'url(\'' + src + '\')';
    bgi[i].style.backgroundRepeat = 'no-repeat';
    bgi[i].style.backgroundPosition = 'center';
    bgi[i].style.backgroundSize = 'cover';
}

/* Background color as data attribut */
let bgc = $('.bg-color');
for (let i = 0; i < bgc.length; i++) {
    let src = bgc[i].getAttribute('data-bgcolor');
    bgc[i].style.backgroundColor = src;
}

/* Background slide show Background letiables  */
let imageList = $('.slide-show .img');
let imageSlides = [];
for (let i = 0; i < imageList.length; i++) {
    let src = imageList[i].getAttribute('data-src');
    imageSlides.push({ src: src });
}


/* Slide Background letiables */
let isSlide = false;
let slideElem = $('.slide');
let arrowElem = $('.p-footer .arrow-d');
let pageElem = $('.page');

/* 3. Init all plugin on load */
$(document).ready(function () {
    /* Init console to avoid error */
    let method;
    let noop = function () {
    };
    let methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn',
    ];
    let length = methods.length;
    let console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }

    /* Init Slidesow background */
    $('.slide-show').vegas({
                               delay: 5000,
                               shuffle: true,
                               slides: imageSlides,
                               //transition: [ 'zoomOut', 'burn' ],
                               animation: ['kenburnsUp', 'kenburnsDown', 'kenburnsLeft', 'kenburnsRight'],
                           });

    /* Init video background */
    $('.video-container video, .video-container object').maximage('maxcover');

    /* Init youtube video background */
    if (backgroundVideoUrl != 'none') {

        //disable video background for smallscreen
        if ($(window).width() > 640) {
            $.okvideo({ source: backgroundVideoUrl, adproof: true });
        }
    }

    /** Init fullpage.js */
    $('#mainpage').fullpage({
                                menu: '#qmenu',
                                anchors: ['home', 'register', 'about-us', 'contact'],
//        verticalCentered: false,
//        resize : false,
//		responsive: 900,
                                scrollOverflow: true,
                                css3: false,
                                navigation: true,
                                onLeave: function (index, nextIndex, direction) {
                                    arrowElem.addClass('gone');
                                    pageElem.addClass('transition');
//			$('.active').removeClass('transition');
                                    slideElem.removeClass('transition');
                                    isSlide = false;
                                },
                                afterLoad: function (anchorLink, index) {
                                    arrowElem.removeClass('gone');
                                    pageElem.removeClass('transition');
                                    if (isSlide) {
                                        slideElem.removeClass('transition');
                                    }
                                },

                                afterRender: function () {
                                },
                            });
});


// Email validation text, uncomment below to use them
/*
// Email registration 
let email_reg_elem = document.getElementById("reg-email");
email_reg_elem.oninvalid = function(e) {
	e.target.setCustomValidity("");
	if (!e.target.validity.valid) {
		e.target.setCustomValidity("This email field cannot be left blank");
	}
};
email_reg_elem.oninput = function(e) {
	e.target.setCustomValidity("");
};
// email message
let email_message_elem = document.getElementById("mes-email");
email_message_elem.oninvalid = function(e) {
	e.target.setCustomValidity("");
	if (!e.target.validity.valid) {
		e.target.setCustomValidity("This email field cannot be left blank");
	}
};
// name message
email_message_elem.oninput = function(e) {
	e.target.setCustomValidity("");
};
let name_message_elem = document.getElementById("mes-name");
name_message_elem.oninvalid = function(e) {
	e.target.setCustomValidity("");
	if (!e.target.validity.valid) {
		e.target.setCustomValidity("This name field cannot be left blank");
	}
};
// text message
name_message_elem.oninput = function(e) {
	e.target.setCustomValidity("");
};
let text_message_elem = document.getElementById("mes-text");
text_message_elem.oninvalid = function(e) {
	e.target.setCustomValidity("");
	if (!e.target.validity.valid) {
		e.target.setCustomValidity("This text field cannot be left blank");
	}
};
text_message_elem.oninput = function(e) {
	e.target.setCustomValidity("");
};
*/
