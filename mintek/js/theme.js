/* Sticky Navigation */
$(function() {
  
  var sticky = $('.sticky');
  var contentOffset;
  var nav_height;
  
  if (sticky.length) {
    
    if ( sticky.data('offset') ) {
      contentOffset = sticky.data('offset');
    }
    else {
      contentOffset = sticky.offset().top;
    }
    nav_height = sticky.height();
  }
  
  var scrollTop = $(window).scrollTop();
  var window_height = $(window).height();
  var doc_height = $(document).height();
  
  $(window).bind('resize', function() {
    scrollTop = $(window).scrollTop();
    window_height = $(window).height();
    doc_height = $(document).height();
    navHeight();
  });
  
  $(window).bind('scroll', function() {
    stickyNav();
  });
  
  function navHeight() {
    sticky.css('max-height', window_height + 'px');
  }
  
  function stickyNav() {
    scrollTop = $(window).scrollTop();
    if (scrollTop > contentOffset) {
      sticky.addClass('fixed');
    }
    else {
      sticky.removeClass('fixed');
    }
  }
  
});

$('document').ready(function() {
  var nav_height = 70;
  
  $("a[data-role='smoothscroll']").click(function(e) {
    e.preventDefault();
    
    var position = $($(this).attr("href")).offset().top - nav_height;
    
    $("body, html").animate({
      scrollTop: position
    }, 1000 );
    return false;
  });
});

$('document').ready(function() {
  // Back to top
  var backTop = $(".back-to-top");
  
  $(window).scroll(function() {
    if($(document).scrollTop() > 400) {
      backTop.css('visibility', 'visible');
    }
    else if($(document).scrollTop() < 400) {
      backTop.css('visibility', 'hidden');
    }
  });
  
  backTop.click(function() {
    $('html').animate({
      scrollTop: 0
    }, 1000);
    return false;
  });
});


$('document').ready(function() {
  
  // Loader
  $(window).on('load', function() {
    $('.loader-container').fadeOut();
  });
  
  // Tooltips
  $('[data-toggle="tooltip"]').tooltip();
  
  // Popovers
  $('[data-toggle="popover"]').popover();
  
  // Page scroll animate
  new WOW().init();
});

$('document').ready(function() {
  $('#testimonials').owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayHoverPause: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
  });
});

/*
 *  Counter
 *
 *  Require(" jquery.animateNumber.min.js ", " jquery.waypoints.min.js ")
 */
$(document).ready(function() {
  var counterInit = function() {
    if ( $('.counter-section').length > 0 ) {
      $('.counter-section').waypoint( function( direction ) {

        if( direction === 'down' && !$(this.element).hasClass('animated') ) {

          var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(',')
          $('.number').each(function(){
            var $this = $(this),
              num = $this.data('number');
            $this.animateNumber(
              {
                number: num,
                numberStep: comma_separator_number_step
              }, 5000
            );
          });
          
        }

      } , { offset: '95%' } );
    }

  }

  counterInit();
});

/*
 *  Code to hide and show the content of the tabs
 *
 *  Require(" jquery.appear.js ")
 */
$(function() {
  const btn1 = $('#other-features-btn1');
  const btn2 = $('#other-features-btn2');
  const btn3 = $('#other-features-btn3');

  btn1.click(function() {
    $('#other-features-content1').fadeIn(500);
    $('#other-features-content1').addClass('d-block');
    $('#other-features-content2').removeClass('d-block');
    $('#other-features-content3').removeClass('d-block');
  });

  btn2.click(function() {
    $('#other-features-content1').removeClass('d-block');
    $('#other-features-content2').fadeIn(500);
    $('#other-features-content2').addClass('d-block');
    $('#other-features-content3').removeClass('d-block');
  });

  btn3.click(function() {
    $('#other-features-content1').removeClass('d-block');
    $('#other-features-content2').removeClass('d-block');
    $('#other-features-content3').addClass('d-block');
  });

  $('#other-features-content1').addClass('d-block');

});
