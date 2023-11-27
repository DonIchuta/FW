/*SCROLL TOP APARECE*/

$(document).ready(function(){ 
			
	$(window).scroll(function(){
		if ($(this).scrollTop() > 800) {
			$('.scrolltop').fadeIn();
		} else {
			$('.scrolltop').fadeOut();
		}
		if ($(this).scrollTop() > 0) {
			$('.pedir-cita').fadeIn();
		} else {
			$('.pedir-cita').fadeOut();
		}
	}); 
			
	$('.scrolltop').click(function(){
		$("html, body").animate({ scrollTop: 0 }, 600);
		return false;
	});

});




/*GO TOP ICONO*/
$(document).ready(function(){ 
	$(window).scroll(function() {
		if ( $(this).scrollTop() > 300 ) {
			$('.scrolltop-icono').addClass('show').fadeIn();
		} else {
			$('.scrolltop-icono').removeClass('show').fadeOut();
		}
	}); 
	$('.scrolltop-icono').on('click', function() {            
		$("html, body").animate({ scrollTop: 0 }, 600);
		return false;
	});
});


/*Comprobamos es visible un id*/
function visible (id) {
	var respuesta=false;
	var cs,
		el = document.getElementById(id);
	if (el) {
		cs = window.getComputedStyle(el);
		if (cs.position !== 'fixed') {
			respuesta = (el.offsetParent !== null);
		} else {
			respuesta = (cs.display !== 'none');
		}
	}
	return respuesta;
}



/*
*	DISPLAY THE SCREEN WIDTH
*/


$(window).resize(function() {
  $("#dimensions .width").html($(window).width());
});

$(document).ready(function() { 
	$("#dimensions .width").html($(window).width());
	 // Handler for .ready() called.
});
