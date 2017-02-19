





// -------------------------Buttons for next--------------------------//


var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function currentDiv(n) {
  showDivs(slideIndex = n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
    for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" w3-red", "");
  }
  x[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " w3-red";
}


//function showDiv() {
//   document.getElementById('welcomeDiv').style.display = "block";
//}


// -------------------------------------------------------------------//


$(window).load(function() {
    $(".preloader").fadeOut("slow", function(){
      	$(".preloader-left").addClass("slide-left");
      	$(".preloader-right").addClass("slide-right");
      	$("#portfolio-case").addClass("full-portfolio");
    });
});

(function(){

    //Portfolio masonry
    var $container = $('#projects');
    $container.isotope({
      masonry: {
       columnWidth: 0
      },
      itemSelector: '.project'
    });

    //Portfolio filters
    $('#filters').on( 'click', 'li', function() {
      $('#filters li').removeClass('active');
      $(this).addClass('active');
      var filterValue = $(this).attr('data-filter');
      $container.isotope({ filter: filterValue });
    });

})();

	//Portfolio Modal
	$('.open-project').on('click', function(){
		var projectUrl = $(this).attr("href");
		var project = '<div class="modal fade" id="project-modal"><div class="inline-menu-container"><a id="modal-close" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></a></div><div class="modal-dialog"><div class="modal-content"></div></div></div>';

		$(project).modal({
		  remote: projectUrl + ' #project'

		})

		return false;

	});

	//Blog post Modal
	$('.open-post').on('click', function(){
		var postUrl = $(this).attr("href");

		var post = '<div class="modal" id="post-modal"><div class="inline-menu-container"><a id="modal-close" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span></a></div><div class="modal-dialog"><div class="modal-content"></div></div></div>';

		$(post).modal({
		  remote: postUrl + ' #post'
		})

		return false;

	});

	//On Click Open Menu Items
	$('.menu-item').on( 'click', function() {
      $('.name-block').addClass('reverse');
	  $('.name-block-container').addClass('reverse');
	  $('.menu-blocks').addClass('hidex');
	  $('.inline-menu-container').removeClass('hidex');
	  $('.inline-menu-container').addClass('showx');
    });
	//On Click Open About/Resume Block
	$('.about').on( 'click', function() {
	  $('.content-blocks').removeClass('showx');
	  $('.content-blocks').addClass('hidex');
	  $('.content-blocks.about').removeClass('hidex');
	  $('.content-blocks.about').addClass('showx');
	  $('.menu-item').removeClass('active');
	  $('.menu-item.about').addClass('active');
    });
	//On Click Open Portfolio Block
	$('.portfolio').on( 'click', function() {
	  $('.content-blocks').removeClass('showx');
	  $('.content-blocks').addClass('hidex');
	  $('.content-blocks.portfolio').removeClass('hidex');
	  $('.content-blocks.portfolio').addClass('showx');
	  $('.menu-item').removeClass('active');
	  $('.menu-item.portfolio').addClass('active');
    });
	//On Click Open Blog Block
	$('.blog').on( 'click', function() {
	  $('.content-blocks').removeClass('showx');
	  $('.content-blocks').addClass('hidex');
	  $('.content-blocks.blog').removeClass('hidex');
	  $('.content-blocks.blog').addClass('showx');
	  $('.menu-item').removeClass('active');
	  $('.menu-item.blog').addClass('active');
    });
	//On Click Open Contact Block
	$('.contact').on( 'click', function() {
	  $('.content-blocks').removeClass('showx');
	  $('.content-blocks').addClass('hidex');
	  $('.content-blocks.contact').removeClass('hidex');
	  $('.content-blocks.contact').addClass('showx');
	  $('.menu-item').removeClass('active');
	  $('.menu-item.contact').addClass('active');
    });

	//On Click Close Blocks
	$('#close').on( 'click', function() {
	  $('.name-block').removeClass('reverse');
	  $('.name-block-container').removeClass('reverse');
	  $('.menu-blocks').removeClass('hidex');
      $('.content-blocks').removeClass('showx');
	  $('.content-blocks').addClass('hidex');
	  $('.inline-menu-container').removeClass('showx');
	  $('.inline-menu-container').addClass('hidex');
	  $('.menu-item').removeClass('active');
    });


	//Placeholder
    $('input,textarea').on( 'focus', function(){
       $(this).data('placeholder',$(this).attr('placeholder'))
       $(this).attr('placeholder','');
    });
    $('input,textarea').blur(function(){
       $(this).attr('placeholder',$(this).data('placeholder'));
    });

	$('input, textarea').placeholder();
