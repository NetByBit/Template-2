/*global $, alert, console*/

$(function() {
    'use strict';


    // Adjust header height
    var myHeader = $('.header');
    var mySlider = $('.bxslider');

    myHeader.height($(window).height());

    $(window).resize(function() {
        myHeader.height($(window).height());
        mySlider.each(function() {
            $(this).css('paddingTop', ($(window).height() - $('.bxslider li').height()) / 2);
        });
    });
    // Links add active class
    $('.links li a').click(function() {
        $(this).parent().addClass('active').siblings().removeClass('active');
    });

    // adjust bx list item center
    mySlider.each(function() {
        $(this).css('paddingTop', ($(window).height() - $('.bxslider li').height()) / 2);
    });

    // trigger bx slider

    mySlider.bxSlider({
        pager: false,
        auto: true,
        autoHover: true
    });

    // smooth scroll
    $('.links li a').click(function() {
        $('html, body').animate({
            scrollTop: $('#' + $(this).data('value')).offset().top
        }, 1000);

    });

    // Auto slider
    (function autoSlider() {
        $('.slider .active').each(function() {
            if (!$(this).is(':last-child')) {
                $(this).delay(3000).fadeOut(1000, function() {
                    $(this).removeClass('active').next().fadeIn(1000).addClass('active');
                    autoSlider();
                });
            } else {
                $(this).delay(3000).fadeOut(1000, function() {
                    $(this).removeClass('active');
                    $('.slider div').eq(0).fadeIn(1000).addClass('active');
                    autoSlider();
                });
            }
        });
    }());
    // Trigger mixItUp
    $('.gallery').mixItUp();
    // Adjust Shuffle Links
    $('.shuffle li').click(function() {
        $(this).addClass('selected').siblings().removeClass('selected');
    });

    // trigger nice scroll
    $("html").niceScroll({
        cursorcolor: '#368CBF',
        cursorwidth: '10px',
        cursorborder: '1px solid #368CBF',
        cursorborderradius: 0
    });


    $('.image-popup-no-margins').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
        image: {
            verticalFit: true
        },
        zoom: {
            enabled: true,
            duration: 300 // don't foget to change the duration also in CSS
        }
    });

});
