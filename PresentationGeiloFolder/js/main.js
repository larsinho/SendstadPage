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

	//On Click Open Menu Items

  var menuFunction = function() {
    $('.name-block').addClass('reverse');
	  $('.name-block-container').addClass('reverse');
	  $('.menu-blocks').addClass('hidex');
	  $('.inline-menu-container').removeClass('hidex');
	  $('.inline-menu-container').addClass('showx');
  };
  var aboutFun1 = function() {
    $('.content-blocks').removeClass('showx');
	  $('.content-blocks').addClass('hidex');
	  $('.content-blocks.about').removeClass('hidex');
	  $('.content-blocks.about').addClass('showx');
	  $('.menu-item').removeClass('active');
	  $('.menu-item.about').addClass('active');
    console.log($('.menu-item.about'));
  };
  var portfolioFun2 = function() {
    $('.content-blocks').removeClass('showx');
	  $('.content-blocks').addClass('hidex');
	  $('.content-blocks.portfolio').removeClass('hidex');
	  $('.content-blocks.portfolio').addClass('showx');
	  $('.menu-item').removeClass('active');
	  $('.menu-item.portfolio').addClass('active');
  };
  var blogFun3 = function() {
    $('.content-blocks').removeClass('showx');
	  $('.content-blocks').addClass('hidex');
	  $('.content-blocks.blog').removeClass('hidex');
	  $('.content-blocks.blog').addClass('showx');
	  $('.menu-item').removeClass('active');
	  $('.menu-item.blog').addClass('active');
  };

  var contactFun4 = function() {
    $('.content-blocks').removeClass('showx');
	  $('.content-blocks').addClass('hidex');
	  $('.content-blocks.contact').removeClass('hidex');
	  $('.content-blocks.contact').addClass('showx');
	  $('.menu-item').removeClass('active');
	  $('.menu-item.contact').addClass('active');
  };
  var closeFun = function() {
    $('.name-block').removeClass('reverse');
	  $('.name-block-container').removeClass('reverse');
	  $('.menu-blocks').removeClass('hidex');
    $('.content-blocks').removeClass('showx');
	  $('.content-blocks').addClass('hidex');
	  $('.inline-menu-container').removeClass('showx');
	  $('.inline-menu-container').addClass('hidex');
	  $('.menu-item').removeClass('active');
  };

  $(document).keydown (function(e) {
    menuFunction()
    console.log(e.key);
    if (e.key == 1) {aboutFun1();};
    if (e.key == 2) {portfolioFun2();};
    if (e.key == 3) {blogFun3();};
    if (e.key == 4) {contactFun4();};
    if (e.key == 5) {closeFun();};
    if (e.key == "Escape") {closeFun();};
    });

	$('.menu-item').on( 'click', function() {
    menuFunction()});

	//On Click Open About/Resume Block
	$('.about').on( 'click keypress', function() {
    aboutFun1()
    });
	//On Click Open Portfolio Block
	$('.portfolio').on( 'click', function() {
    portfolioFun2()
    });
	//On Click Open Blog Block
	$('.blog').on( 'click', function() {
    blogFun3()
    });
	//On Click Open Contact Block
	$('.contact').on( 'click', function() {
    contactFun4()
    });

	//On Click Close Blocks
	$('#close').on( 'click', function() {
    closeFun()
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
