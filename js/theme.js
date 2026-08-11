(function($) {
    "use strict";
    $(document).on("ready", function(e) {
		/*----------------------------------------------------*/
        /*  Boxed Layout
        /*----------------------------------------------------*/		
		$('body').addClass("full-width");
		$('.boxed').on('click',function(){
			$('body').addClass("boxed-layout");
			$('body').removeClass("full-width");
				
		});
		$('.fulll').on('click',function(){
				$('body').addClass("full-width");
				$('body').removeClass("boxed-layout");
		});
		
        /*----------------------------------------------------*/
        /*  Preloader
        /*----------------------------------------------------*/
        $(".preloader").fadeOut('slow');
        /*----------------------------------------------------*/
        /*  Main Slider
        /*----------------------------------------------------*/
        
        

        $('.home_slider').owlCarousel({
            loop:true,
            margin:0,
            nav: true,
			autoplay:true,
           autoplayTimeout:5000, 
			dots: true,
            navText: [
              "<span class='lnr lnr-chevron-left'></span>",
              "<span class='lnr lnr-chevron-right'></span>"
              ],
            items: 1
        });



        /*----------------------------------------------------*/
        /*  dropdown Slider
        /*----------------------------------------------------*/
        $('.dropdown_slider').owlCarousel({
            loop: true,
            margin: 0,
            nav: true,
            dots: true,
            autoplay: true,
            autoplayTimeout: 2000,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                }
            }
        });

		/*----------------------------------------------------*/
        /*  Toottip
        /*----------------------------------------------------*/  
		$('[data-toggle="tooltip"]').tooltip();
		
		/*----------------------------------------------------*/
        /*  Popover
        /*----------------------------------------------------*/  
		$('[data-toggle="popover"]').popover();
	
		/*----------------------------------------------------*/
        /*  Logo Slider
        /*----------------------------------------------------*/       
		$(".portfolio_slider").owlCarousel({
			loop:true,
			margin:0,
			nav:true,
			dots: true,
			navText: [
			  "<span class='lnr lnr-arrow-left'></span>",
			  "<span class='lnr lnr-arrow-right'></span>"
			  ],
			autoplay:true,            
			responsive:{
				0:{
					items:1
				},
				800:{
					items:4
				}
			}
		});
		
		//Gallery-Slider
		$('.gallery-slider .work').hover(
			function(){
				$(this).find('.layer').fadeIn( "fast" );
				$(this).find('.more').fadeIn( "fast" );
			}, 
			function(){
				$(this).find('.layer').fadeOut( "fast" );
				$(this).find('.more').fadeOut( "fast" );
			}
		);
		
		
	
		
		
		
		
        
        /*----------------------------------------------------*/
        /*  Find Domain Form Dropdown
        /*----------------------------------------------------*/
        $('.domain_search_drop').on("click",function(){
            $(this).toggleClass('rotate')
        });
		
		
        /*----------------------------------------------------*/
        /*  Pricing Plans Slider
        /*----------------------------------------------------*/
        
		
		/*----------------------------------------------------*/
        /*  Fixed Top Header
        /*----------------------------------------------------*/        
		$(".navbar-default").affix({
			offset: {
				top: $('.top_header').height()
			}
		});
	
        /*----------------------------------------------------*/
        /*  Pricing Slider
        /*----------------------------------------------------*/        
        
		
		/*----------------------------------------------------*/
        /*  dropdown Slider
        /*----------------------------------------------------*/        
        
		
		/*----------------------------------------------------*/
        /*  dropdown Slider
        /*----------------------------------------------------*/        
        
        
		 /*----------------------------------------------------*/
        /*  Logo Slider
        /*----------------------------------------------------*/       
			
			
		/*----------------------------------------------------*/
        /*  Domain Price Slider
        /*----------------------------------------------------*/       
			

        /*----------------------------------------------------*/
        /*  Testimonial Slider
        /*----------------------------------------------------*/        
       
        
        /*----------------------------------------------------*/
        /*  Domain Search Filter
        /*----------------------------------------------------*/    
		$('.searchFilters .dropdown-menu').find('a').on("click", function(e){
            e.preventDefault();
            var param = $(this).attr("href").replace("#","");
            var concept = $(this).text();
            $('.searchFilters span#searchFilterValue').text(concept);
            $('.input-group #search_param').val(param)
        });
        
        /*----------------------------------------------------*/
        /*  Counter Up - Fun Facts
        /*----------------------------------------------------*/
        $('.fact strong').counterUp({
            delay: 10,
            time: 1000
        });
        
        /*----------------------------------------------------*/
        /*  Counter Up - Fun Facts
        /*----------------------------------------------------*/
        $('.we_used .progress-bar').each(function(){
            var $this = $(this);
            var width = $(this).data('skill');
            $this.css({
                'transition' : 'width 2s'
            });
            
            setTimeout(function() {
                $this.waypoint(function(direction) {
                    if( direction === 'down' ) {
                        $this.css({
                            'width' : width + '%'
                        })
                    }
                } , { offset: '100%' } )
            }, 500)
        });
        
        /*----------------------------------------------------*/
        /*  PopUps
        /*----------------------------------------------------*/
        $('.portfolio-link').magnificPopup({
            type: 'image'
        });
				
        /*----------------------------------------------------*/
        /*  Back To Top Button
        /*----------------------------------------------------*/
		$(window).on("scroll", function(e) {
			if ($(this).scrollTop() > 300) {
				$('#back-to-top').fadeIn('slow');
			} else {
				$('#back-to-top').fadeOut('slow');
			}
		});
	
		$("#back-to-top").on("click", function(e){
			$("html, body").animate({
				scrollTop: 0
			}, 600);
			return false;
		})
		
		/*----------------------------------------------------*/
        /*  Background Cover Image
        /*----------------------------------------------------*/  	
		 $( ".cover-image").each(function() {
			  var attr = $(this).attr('data-image-src');
			
			  if (typeof attr !== typeof undefined && attr !== false) {
				  $(this).css('background', 'url('+attr+') center center');
			  }
		});
		
		 $( ".cover-image2").each(function() {
			  var attr = $(this).attr('data-image-src');
			
			  if (typeof attr !== typeof undefined && attr !== false) {
				  $(this).css('background', 'url('+attr+') center center');
			  }
		});

		/*----------------------------------------------------*/
        /*  TreeView
        /*----------------------------------------------------*/  
		$.fn.extend({
			treed: function (o) {
			  
			  var openedClass = 'glyphicon-minus-sign';
			  var closedClass = 'glyphicon-plus-sign';
			  
			  if (typeof o != 'undefined'){
				if (typeof o.openedClass != 'undefined'){
				openedClass = o.openedClass;
				}
				if (typeof o.closedClass != 'undefined'){
				closedClass = o.closedClass;
				}
			  };
			  
				//initialize each of the top levels
				var tree = $(this);
				tree.addClass("tree");
				tree.find('li').has("ul").each(function () {
					var branch = $(this); //li with children ul
					branch.prepend("<i class='indicator glyphicon " + closedClass + "'></i>");
					branch.addClass('branch');
					branch.on('click', function (e) {
						if (this == e.target) {
							var icon = $(this).children('i:first');
							icon.toggleClass(openedClass + " " + closedClass);
							$(this).children().children().toggle();
						}
					})
					branch.children().children().toggle();
				});
				//fire event from the dynamically added icon
			  tree.find('.branch .indicator').each(function(){
				$(this).on('click', function () {
					$(this).closest('li').click();
				});
			  });
				//fire event to open branch if the li contains an anchor instead of text
				tree.find('.branch>a').each(function () {
					$(this).on('click', function (e) {
						$(this).closest('li').click();
						e.preventDefault();
					});
				});
				//fire event to open branch if the li contains a button instead of text
				tree.find('.branch>button').each(function () {
					$(this).on('click', function (e) {
						$(this).closest('li').click();
						e.preventDefault();
					});
				});
			}
		});
		
		//Initialization of treeviews
		$('#tree1').treed();
		
		$('#tree2').treed({openedClass:'glyphicon-folder-open', closedClass:'glyphicon-folder-close'});
		
		$('#tree3').treed({openedClass:'glyphicon-chevron-right', closedClass:'glyphicon-chevron-down'});
	
		//set equalize height
		$('.equalize').equalize();

        /*----------------------------------------------------*/
        /*  Contact Form Height
        /*----------------------------------------------------*/
        $('#success, #error').each(function(){
            var line_height = $(this).height();
            $(this).find('p').css( "line-height", function(){
                return line_height + 'px'
            })
        })
        
    })
    
})(jQuery)