jQuery(function ($) {
	"use strict";

	/* ----------------------------------------------------------- */
	/*  Fixed header
	/* ----------------------------------------------------------- */

	$(window).on('scroll', function () {
		if ($(window).scrollTop() > 70) {
			$('.navdown, .header-two').addClass('navbar-fixed');
		} else {
			$('.navdown, .header-two').removeClass('navbar-fixed');
		}
	});

	/* ----------------------------------------------------------- */
	/*  Mobile Menu
	/* ----------------------------------------------------------- */

	jQuery(".nav.navbar-nav li a").on("click", function () {
		jQuery(this).parent("li").find(".dropdown-menu").slideToggle();
		jQuery(this).find("i").toggleClass("fa-angle-down fa-angle-up");
	});


	/* ----------------------------------------------------------- */
	/*  Contact Map 
	/* -----------------------------------------------------------*/

	if ($('#map').length > 0) {

		var contactmap = {
			lat: 40.742964,
			lng: -73.992277
		};

		$('#map')
			.gmap3({
				zoom: 13,
				center: contactmap,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				scrollwheel: false
			})

			.marker({
				position: contactmap
			})

			.infowindow({
				position: contactmap,
				content: "NYC Seminar and Conference Center, New York"
			})

			.then(function (infowindow) {
				var map = this.get(0);
				var marker = this.get(1);
				marker.addListener('click', function () {
					infowindow.open(map, marker);
				});
			});
	}


	/* ----------------------------------------------------------- */
	/*  Main slideshow
	/* ----------------------------------------------------------- */

	$('#main-slide').carousel({
		pause: true,
		interval: 100000,
	});




	/* ----------------------------------------------------------- */
	/*  Site search
	/* ----------------------------------------------------------- */

	$('.nav-search').on('click', function () {
		$('.search-block').fadeIn(350);
	});

	$('.search-close').on('click', function () {
		$('.search-block').fadeOut(350);
	});



	/* ----------------------------------------------------------- */
	/*  Owl Carousel
	/* ----------------------------------------------------------- */


	//Project slide

	$("#project-slide").owlCarousel({

		loop: true,
		animateOut: 'fadeOut',
		nav: true,
		margin: 15,
		dots: false,
		mouseDrag: true,
		touchDrag: true,
		slideSpeed: 800,
		navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
		items: 4,
		responsive: {
			0: {
				items: 2
			},
			600: {
				items: 4
			}
		}

	});


	//Testimonial slide

	$("#testimonial-slide").owlCarousel({

		loop: false,
		margin: 30,
		nav: false,
		dots: true,
		items: 3,
		responsive: {
			0: {
				items: 1
			},


			600: {
				items: 1
			}
		}

	});



	//Partners slide

	$("#partners-carousel").owlCarousel({

		loop: true,
		margin: 20,
		nav: false,
		dots: false,
		mouseDrag: true,
		touchDrag: true,
		items: 5,
		responsive: {
			0: {
				items: 2
			},
			600: {
				items: 5
			}
		}

	});

	//Page slide

	$(".page-slider").owlCarousel({

		loop: true,
		animateOut: 'fadeOut',
		autoplay: true,
		autoplayHoverPause: true,
		nav: true,
		margin: 0,
		dots: false,
		mouseDrag: true,
		touchDrag: true,
		slideSpeed: 500,
		navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
		items: 1,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 1
			}
		}

	});


	//Team slide

	$("#team-slide").owlCarousel({

		loop: false,
		animateOut: 'fadeOut',
		nav: true,
		navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
		margin: 20,
		dots: false,
		mouseDrag: true,
		touchDrag: true,
		slideSpeed: 800,
		items: 4,
		responsive: {
			0: {
				items: 1
			},
			480: {
				items: 2
			},
			1000: {
				items: 4,
				loop: false
			}
		}

	});


	/* ----------------------------------------------------------- */
	/*  Video popup
	/* ----------------------------------------------------------- */
	$(document).ready(function () {

		$(".gallery-popup").colorbox({
			rel: 'gallery-popup',
			transition: "fade",
			innerHeight: "500"
		});

		$(".popup").colorbox({
			iframe: true,
			innerWidth: 600,
			innerHeight: 400
		});

	});


	// -----------------------------
	//  Count Up
	// -----------------------------
	function counter() {
		var oTop;
		if ($('.counterUp').length !== 0) {
			oTop = $('.counterUp').offset().top - window.innerHeight;
		}
		if ($(window).scrollTop() > oTop) {
			$('.counterUp').each(function () {
				var $this = $(this),
					countTo = $this.attr('data-count');
				$({
					countNum: $this.text()
				}).animate({
					countNum: countTo
				}, {
					duration: 1000,
					easing: 'swing',
					step: function () {
						$this.text(Math.floor(this.countNum));
					},
					complete: function () {
						$this.text(this.countNum);
					}
				});
			});
		}
	}
	$(window).on('scroll', function () {
		counter();
	});



	/* ----------------------------------------------------------- */
	/*  Contact form
	/* ----------------------------------------------------------- */

	$('#contact-form').submit(function () {

		var $form = $(this),
			$error = $form.find('.error-container'),
			action = $form.attr('action');

		$error.slideUp(750, function () {
			$error.hide();

			var $name = $form.find('.form-control-name'),
				$email = $form.find('.form-control-email'),
				$subject = $form.find('.form-control-subject'),
				$message = $form.find('.form-control-message');

			$.post(action, {
					name: $name.val(),
					email: $email.val(),
					subject: $subject.val(),
					message: $message.val()
				},
				function (data) {
					$error.html(data);
					$error.slideDown('slow');

					if (data.match('success') != null) {
						$name.val('');
						$email.val('');
						$subject.val('');
						$message.val('');
					}
				}
			);

		});

		return false;

	});





	/* ----------------------------------------------------------- */
	/*  Back to top
	/* ----------------------------------------------------------- */

	$(window).scroll(function () {
		if ($(this).scrollTop() > 50) {
			$('#back-to-top').fadeIn();
		} else {
			$('#back-to-top').fadeOut();
		}
	});

	// scroll body to 0px on click
	$('#back-to-top').on('click', function () {
		$('#back-to-top').tooltip('hide');
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});

	$('#back-to-top').tooltip('hide');

	/* ----------------------------------------------------------- */
	/*  Cargar datos slider
	/* ----------------------------------------------------------- */
	$(document).ready(function () {
		var jsonSlider = {
				"1":["Matemáticas para postgrados","Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.","Contactanos"],
				"2":["Duis ornare eros eu enim dictum faucibus","Aliquam imperdiet vel nisi","Ver Mas"],
				"3":["Duis ornare eros eu enim dictum faucibus","Aliquam imperdiet vel nisi","Ver Mas"]
			  };
		for (var clave in jsonSlider){
		  // Controlando que json realmente tenga esa propiedad
		  if (jsonSlider.hasOwnProperty(clave)) {
			// Mostrando en pantalla la clave junto a su valor
			$('#titslide'+clave).html(jsonSlider[clave][0]);
			$('#stitslide'+clave).html(jsonSlider[clave][1]);
			$('#btnslide'+clave).html(jsonSlider[clave][2]);
		  }
		}
	});
	
	/* ----------------------------------------------------------- */
	/*  Cargar datos contenidos
	/* ----------------------------------------------------------- */
	$(document).ready(function () {
		var jsonCont = {
				"1":["Nuestros programas","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sed gravida leo","Septiembre 22, 2019"],
				"2":["programas para niños y jovenes","Nullam at lorem libero. Nulla blandit, augue non faucibus tempus, odio massa pellentesque","Septiembre 22, 2019"],
				"3":["Programas para organizaciones","Aliquam imperdiet vel nisi ac tempor. Cras tortor lacus","Septiembre 22, 2019"]
			  };
		for (var clave in jsonCont){
		  // Controlando que json realmente tenga esa propiedad
		  if (jsonCont.hasOwnProperty(clave)) {
			// Mostrando en pantalla la clave junto a su valor
			$('#titcont'+clave).html(jsonCont[clave][0]);
			$('#stitcont'+clave).html(jsonCont[clave][1]);
			$('#fechacont'+clave).html(jsonCont[clave][2]);
		  }
		}
	});
	
});