/**	- SCRIPTS WEBSITE - **/

$(document).ready(function(){


	/*----------------------------------------------------*/
    /* Zona oculta derecha 
    /*----------------------------------------------------*/
    $('.cerrar-zona-oculta,.aside-right,.capaoscura').on('click',function(){
        if( $(".zona-oculta-derecha").hasClass('open') ){
            $(".zona-oculta-derecha").removeClass('open')
            $('body').attr('style','overflow:auto');            
        }
        else{
            $(".zona-oculta-derecha").addClass('open')
            $('body').attr('style','overflow:hidden');            
        }
		muestra_oculta_id('capaoscura','slow','fade');
        return false
    });

    /*----------------------------------------------------*/
    /* Zona oculta menu card 
    /*----------------------------------------------------*/
    $('.pulsa-menu, .toggle-overlay').on('click',function(){
        if( $(".toggle-slide").hasClass('open') ){
            $(".toggle-slide").removeClass('open')           
        }
        else{
            $(".toggle-slide").addClass('open')            
        }
		muestra_oculta_id('toggle-overlay','fast','fade');		
        return false
    });

    /*----------------------------------------------------*/
    /* Menú vertical
	/*----------------------------------------------------*/
	$('.verticalmenu li.active').addClass('open').children('ul').show();
	$('.verticalmenu li.has-sub>a').on('click', function(){
		$(this).removeAttr('href');
		var element = $(this).parent('li');
		if (element.hasClass('open')) {
			element.removeClass('open');
			element.find('li').removeClass('open');
			element.find('ul').slideUp(300);
		}
		else {
			element.addClass('open');
			element.children('ul').slideDown(300);
			element.siblings('li').children('ul').slideUp(300);
			element.siblings('li').removeClass('open');
			element.siblings('li').find('li').removeClass('open');
			element.siblings('li').find('ul').slideUp(300);
		}
	});
    
});


/*=========================
	       DROPDOWN
=========================*/

/*añadimos la acción onclick a la clase boton_dropdown*/
//$(".boton_dropdown").attr("onclick","ocultar_dropdown(this);return false;");

$(".boton_dropdown").on("click",function(){
	muestra_oculta_dropdown(this);
});

function muestra_oculta_dropdown(elemento){
	var boton=elemento.id;
	/*recuperamos recuperamos el identidficador del elemento que vamos a cambiar*/
	var elemento=boton.replace("boton_","");
	$("[aria-labelledby='"+elemento+"']").slideToggle('fast');
}

window.addEventListener("click", function(event){
	var procesar=false;
	var boton="";
	if(typeof(event.target)==="undefined"){

	}else{
		if(typeof(event.target.attributes.id)==="undefined"){

		}else{
			boton=event.target.attributes.id.nodeValue;
		}
	}
	if($('.dropdown-menu')){
		if($('.dropdown-menu').is(":visible")){
			procesar=true;
		}
	}

	if(procesar==true){
		$('.dropdown-menu').each(function( i ){
			if($(this).is(":visible")){
				if($(this).attr("aria-labelledby")!=boton.replace("boton_","")){
					$(this).slideToggle('fast');
				}
			}
		});
	}
});

/*=========================
	  MUESTRA OCULTA
=========================*/

function muestra_oculta_id(id,velocidad,modo){
	if (typeof(velocidad)=="undefined"){velocidad=0;}
	if (typeof(modo)=="undefined"){modo="";}
	switch(modo){
		case "fade":
			$('#'+id).fadeToggle(velocidad);
			break;
		case "slide":
			$('#'+id).slideToggle(velocidad);
		break;
		case "slidedown":
			$('#'+id).slideToggle(velocidad);
			break;
		case "slideup":
			$('#'+id).slideToggle(velocidad);
			break;
		case "fadein":
			$('#'+id).fadeIn(velocidad);
			break;
		case "fadeout":
			$('#'+id).fadeOut(velocidad);
			break;
		default:
			$('#'+id).toggle(velocidad);
		break;
	}
}


function oculta_id(id,velocidad,modo){
	if (typeof(velocidad)=="undefined"){velocidad=0;}
	if (typeof(modo)=="undefined"){modo="";}

	if ( $('#'+id).css('display') != 'none' ){
		switch(modo){
			case "fade":
				$('#'+id).fadeOut(velocidad);
				break;
			case "slide":
				$('#'+id).slideToggle(velocidad);
				break;
			case "slidedown":
				$('#'+id).slideUp(velocidad);
				break;
			case "slideup":
				$('#'+id).slideDown(velocidad);
				break;
			default:
				$('#'+id).hide(velocidad);
				break;
		}
	}

}


// Efecto para mostrar la capa
//-----------------------------------------------
function mostrar_quickview(capa){
	muestra_oculta_id(capa,'slow','fade');
	$('body').attr('style','overflow:hidden'); 
}

function oculta_quickview(capa){
	oculta_id(capa,'slow','fade');
	$('body').attr('style','overflow:auto'); 
}


/*=========================
       MODO DIA/NOCHE
=========================*/

$('#dia_noche').change(function() {
	if ($(this).prop('checked')) {
		$("#dia_noche").prop('checked', true);
		$('body').removeClass("dark");
		$("#dark_style").prop('disabled', true);
		$(".flaticon-noche").removeClass("checked").addClass("unchecked")
		$(".flaticon-dia").removeClass("unchecked").addClass("checked");
	}else{
		$("#dia_noche").prop('checked', false);
		$("#dark_style").prop('disabled', false);
		$("body").addClass("dark");

		$(".flaticon-noche").removeClass("unchecked").addClass("checked");	
		$(".flaticon-dia").removeClass("checked").addClass("unchecked");
	}

});

/*=========================
		TREE MENU (seo)
========================*/

$(function()	{
	$('.tree-view-menu-list .openable a').click(function()	{
		var parentElm = $(this).parent();
		parentElm.toggleClass('open');	
		parentElm.children('.subtree').slideToggle(200);
		return false;
	});
});

/*=========================
     JAVASCRIPT CLICK
=========================*/


$('.modal-default').click(function(){mostrar_quickview('default');});
$('.modal-s-size').click(function(){mostrar_quickview('s-size');});
$('.modal-l-size').click(function(){mostrar_quickview('l-size');});
$('.modal-xl-size').click(function(){mostrar_quickview('xl-size');});
$('.modal-full').click(function(){mostrar_quickview('full');});
$('.modal-fullscreen').click(function(){mostrar_quickview('fullscreen');});

$('.modal-header-verde').click(function(){mostrar_quickview('header-verde');});
$('.modal-header-cian').click(function(){mostrar_quickview('header-cian');});
$('.modal-header-azul').click(function(){mostrar_quickview('header-azul');});
$('.modal-header-gris').click(function(){mostrar_quickview('header-gris');});
$('.modal-header-light').click(function(){mostrar_quickview('header-light');});

$('.modal-footer-verde').click(function(){mostrar_quickview('footer-verde');});
$('.modal-footer-amarillo').click(function(){mostrar_quickview('footer-amarillo');});
$('.modal-footer-rojo').click(function(){mostrar_quickview('footer-rojo');});
$('.modal-footer-gris').click(function(){mostrar_quickview('footer-gris');});
$('.modal-footer-light').click(function(){mostrar_quickview('footer-light');});

$('.modal-planes').click(function(){mostrar_quickview('planes');});
$('.modal-login').click(function(){mostrar_quickview('login');});
$('.modal-tabs').click(function(){mostrar_quickview('tabs');});
$('.modal-correcto').click(function(){mostrar_quickview('correcto');});
$('.modal-error').click(function(){mostrar_quickview('error');});
$('.modal-selector').click(function(){mostrar_quickview('selector');});
$('.modal-borrar').click(function(){mostrar_quickview('borrar');});

$('.modal-promo1').click(function(){mostrar_quickview('promo1');});
$('.modal-promo2').click(function(){mostrar_quickview('promo2');});
$('.modal-promo3').click(function(){mostrar_quickview('promo3');});


/*===================================================
   AUTO HEIGHT TEXTAREA - Está en editar-email.htm
===================================================*/

function auto_grow(element) {
	element.style.height = "5px";
	element.style.height = (element.scrollHeight)+"px";
}

/*===================================================
  COPIAR TEXTO A CLIPBOARD - Está en flaticons.htm
===================================================*/

function copyToClipboard(element) {
	var $temp = $("<input>");
	$("body").append($temp);
	$temp.val($(element).text())
		.select();
	document.execCommand("copy");
	$temp.remove();
}