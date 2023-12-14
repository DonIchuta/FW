/*#############################################################################################################################
#####      Variables de control
#############################################################################################################################*/
window.tab_active=false; // esta la tab de la web activa ?
ancho_documento=window.innerWidth;
alto_documento=window.innerHeight;

/* #####      ELIMINAR CARGA EN IFRAMES  ###########
if (top != self) top.location.href = location.href;
*/


/*##############################################################
###  Retorna un numero aleatorio
##############################################################*/
function rand(){
	var random=Math.floor(Math.random()*10010);
	return random
}


/*#############################################################################################################################
#####      SCROLL A UN ID
#############################################################################################################################*/
function scroll_to (id,velocidad) {

	if ( typeof(velocidad) =="undefined" ){velocidad='slow';}

	//$.scrollTo($("#"+id), { duration: 1000});
	switch (id){
		case "top":
			$('html, body').animate({scrollTop:0}, velocidad );
			break;

		case "bottom":
			$('html, body').animate({scrollTop:$(document).height()}, velocidad );
			break;

		default:
			if ( existe(id) ) {
				$('html,body').animate({scrollTop: $('#'+id).offset().top},velocidad );
			}else{
				$('html, body').animate({scrollTop:0}, velocidad );
			}
			break;
	}

}

/*#############################################################################################################################
#####      PANTALLA COMPLETA
#############################################################################################################################*/
function full_screen(id) {pantalla_completa(id);}
function pantalla_completa(id) {
	// contenido a maximizar
	if (typeof(id)=="undefined"){
		elemento=document.documentElement;
	}else{
		elemento=document.getElementById(id);
	}

    if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (elemento.requestFullScreen) {
            elemento.requestFullScreen();
        } else if (elemento.mozRequestFullScreen) {
            elemento.mozRequestFullScreen();
        } else if (elemento.webkitRequestFullScreen) {
            elemento.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (elemento.msRequestFullscreen) {
            elemento.msRequestFullscreen();
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}


/*#############################################################################################################################
#####    ORIENTACON DISPOSITIVOS MÓVILES
#############################################################################################################################*/
var orientacion_dispositivo;
if (window.screen.orientation) {
	orientacion_dispositivo = window.screen.orientation.type;
	window.addEventListener("orientationchange", function () {
		orientacion_dispositivo=window.screen.orientation.type;
	});
} else if (window.screen.msOrientation) {
	orientacion_dispositivo = window.screen.msOrientation
	window.addEventListener("orientationchange", function () {
		orientacion_dispositivo=window.screen.msOrientation;
	});
}


/*#############################################################################################################################
#####      POSICIÓN DEL RATON
#############################################################################################################################*/
var mouse_x=0;
var mouse_y=0;
/*
document.querySelector('body').onmousemove = function(p){
	({pageX: mouse_x, pageY: mouse_y} = p);
};
*/
$(document).mousemove( function(p) {
 	mouse_x=p.pageX;
 	mouse_y=p.pageY;
});



/*#############################################################################################################################
#####
#####      DOCUMENT READY
#####*/
document.addEventListener("DOMContentLoaded", function(event) {
//!jq $(document).ready(function() {

	/*#############################################################################################################################
	#####      TAMAÑO documento
	#############################################################################################################################*/
	ancho_documento=window.innerWidth; //!jq ancho_documento=$(window).width();
	alto_documento=window.innerHeight; //!jqalto_documento=$(window).height();

	/*#############################################################################################################################
	#####   Dispositivo en funcion de las dimensiones.
	#############################################################################################################################*/
    dispositivo();


	/*#############################################################################################################################
	#####      SCROLL TOP APARECE / DESAPARECE
	#############################################################################################################################*/

	document.onscroll = (function() { //!jq $(window).scroll(function(){
		if (window.scroll_y > 300) { //!jq if ($(this).scrollTop() > 300) {
			$('.scrolltop').fadeIn();
		} else {
			$('.scrolltop').fadeOut();
		}
	});
	/*Evento pulsacion el en scroll*/
	// document.querySelector('.scrolltop').onclick = function () {$("html, body").animate({ scrollTop: 0 }, 600);return false;};
	$('.scrolltop').click(function(){$("html, body").animate({ scrollTop: 0 }, 600);return false;});


	/* ###############################################################
	####	Parametros de seguimiento
	###############################################################  */

	$("a[href]").not("[rel='nofollow']").each(function( index ) {
		//console.log( index + ": " + $( this ).text() );
		var url = $(this).attr("href");
		if((url.length > 0) && (url.indexOf("javascript:") == -1 && url.indexOf("mailto:") == -1) && (url.indexOf("#") == -1) && (url.indexOf("?af=") == -1) && (url.indexOf("&af=") == -1) && (url.indexOf("?ref=") == -1) && (url.indexOf("&ref=") == -1))	{
			//console.log(index + ": " + url);
			var new_url = url;
			// af
			if( typeof(af) !="undefined" ) {
				if (url.indexOf("?") > -1) {new_url +="&";}else{new_url +="?";}
				new_url += "af="+af;
			}
			// ref
			if( typeof(ref) !="undefined" ) {
				if (new_url.indexOf("?") > -1) {new_url +="&";}else{new_url +="?";}
				new_url += "ref="+ref;
			}

			// a_consola(index + ": " + new_url);
			$(this).attr("href",new_url);
		}
	});

	/*#############################################################################################################################
	#####      Estado del tab ( se esta viendo la web )
	#############################################################################################################################*/
	$(window).on("blur focus", function (e) {
		var prevType = $(this).data("prevType");
		if (prevType != e.type) { //  reduce double fire issues
			switch (e.type) {
				case "blur":
					window.tab_active=false;
					break;
				case "focus":
					window.tab_active=true;
					break;
			}
		}
		$(this).data("prevType", e.type);
	});



});

/*####
#####      DOCUMENT READY
#####
#############################################################################################################################*/


/*#############################################################################################################################
#####
#####      dispositivo ( desktop, mobil tablet )
#####*/
var device="";
function dispositivo(){
	device="desktop";
	if ( ancho_documento < 992 ){ device="tablet"; }
	if ( ancho_documento < 768 ){ device="movil"; }
	/*entorno debug*/
	if (existe('resolucion')){
		document.getElementById('resolucion').innerHTML =" ["+ancho_documento+" x "+alto_documento+"] "+device;
	}
	/*entorno maquetacion*/
	if (document.querySelector('#dimensions .width')) document.querySelector('#dimensions .width').innerHTML = ancho_documento; //!jq $("#dimensions .width").html($(window).width());

	return(device);
}
/*#####
#####      dispositivo ( desktop, mobil tablet )
##################################################################################################################################*/



/*#############################################################################################################################
#####
#####      Propagar contenidos por distintos elementos del doom
#####*/
function propagar(elemento,valor){
	a_consola("propagar("+elemento+","+valor+");");


	switch(valor){
		case "++":
			document.querySelectorAll(elemento).forEach(function(x) {
				x.textContent++;
			});
		break;

		case "--":
			document.querySelectorAll(elemento).forEach(function(x) {
				x.textContent--;
			});
		break;

		default:
			document.querySelectorAll(elemento).forEach(function(x) {
				x.textContent=valor;
			});
		break;
	}

}
/*#####
#####
##################################################################################################################################*/

/*#############################################################################################################################
#####
#####      doom replace
#####
#####*/
function document_replace(search,replace,item){
	a_consola("document_replace("+search+","+replace+")","info");
	aviso("Pendiente afinar la funcion que actualiza la imagen.<br>");
	//document.body.innerHTML = document.body.innerHTML.replace(new RegExp(search, "g"), replace );
}
/*#####
#####
##################################################################################################################################*/

/*#############################################################################################################################
#####
#####      WINDOW RESIZE
#####*/

document.body.onresize = function () { //!jq $(window).resize(function() {
	ancho_documento = window.innerWidth; //!jq $(window).width();
	alto_documento = window.innerHeight; //!jq $(window).height();
	/*entorno maquetacion*/
	if (document.querySelector('#dimensions .width')) document.querySelector('#dimensions .width').innerHTML = ancho_documento; //!jq $("#dimensions .width").html($(window).width());

	/*Mantenemos actualizada la variable device que nos identifica el dispositovo por resolucion.*/
	dispositivo();

	/*Mantenemos la popups ubicadas en su sitio*/
	if ( existe('pop_iframe') && visible('pop_iframe') ) {
		setTimeout(function(){abrir_pop();},500);
	}

	/*mvl*/
	if ( existe('popup') && visible('popup') ) {
		//if ($('#contenido_popup').height() > alto_documento ){
		if (alto_documento < 300 )	{
			// [...document.querySelectorAll('.popup')].map((popupElement) => {
			// 	popupElement.classList.add('full_screen');
			// 	popupElement.classList.remove('popup');
			// })
			$('.popup').addClass('full_screen');
			$('.popup').removeClass('popup');
		}else{
			// [...document.querySelectorAll('.full_screen')].map((fsElement) => {
			// 	fsElement.classList.add('popup');
			// 	fsElement.classList.remove('full_screen');
			// });
			$('.full_screen').addClass('popup');
			$('.popup').removeClass('full_screen');

			if (document.querySelector('.popup').offsetHeight > alto_documento) { //!jq if ($('.popup').outerHeight() > alto_documento ){
				document.getElementById('contenido_popup').style.height = (alto_documento - 100) + 'px'; //!jq $('#contenido_popup').height(alto_documento-100);
			}else{
				//a_consola($('#contenido_popup > div.contenido').height()+" > "+alto_documento);clientHeigh
				if (document.querySelector('#contenido_popup > div.contenido').offsetHeight > alto_documento) { //!jq if ($('#contenido_popup > div.contenido').height() > alto_documento) {
					document.getElementById('contenido_popup').style.height = (alto_documento - 100) + 'px'; //!jq $('#contenido_popup').height(alto_documento-100);
				}else{
					document.getElementById('contenido_popup').style.height = 'inherit'; //!jq  $('#contenido_popup').height("inherit");
				}
			}
		}
	}
};


/*####
#####      WINDOW RESIZE
#####
#############################################################################################################################*/


/*#############################################################################################################################
#####
#####      SCROLL
#####*/

var scroll_y=0;
window.onscroll = ( function() { //!jq $( window ).scroll( function(){

	/*#####    almacenamos la posicion del scroll en una vble ########################################################################## */
	if ( window.pageYOffset ){
        scroll_y = window.pageYOffset;
    }else{
        scroll_y = (document.body.parentElement) ? document.body.parentElement.scrollTop : 0;
	}

	/* #####     SCROLL TOP     ##########################################################################	*/
	if ( scroll_y > 300) {
		$('#go_top').fadeIn();
	} else {
		$('#go_top').fadeOut();
	}

});

/*####
#####      SCROLL
#####
#############################################################################################################################*/


/*#############################################################################################################################
#####      EVENTOS POPUP
#############################################################################################################################*/
function pop (source,method) {
	if ( typeof(source) != "undefined" ){
		a_consola("pop("+source+");","info");

		if ( typeof(method) == "undefined" ){	method="div"; }
		//ES5: method = method || 'div'

		// contruccion de  popup al vuelo.
		if (!existe("popup") ){
			var html_popup = '';
			html_popup += '	<div id="popup" class="modalcenter" style="display:none;">';
			//html_popup += '		<div class="modal">';
			//html_popup += '			<div id="cerrar_popup" class="modal-content modal-cerrar img-circle"><a href="javascript:cerrar_pop();">X</a></div>';
			html_popup += '			<div id="contenido_popup" class="modal" style="overflow: hidden auto;">Aquí el contenido de la pop / modal</div>';
			//html_popup += '		</div>';
			html_popup += '	</div>';

			$( "body" ).prepend( html_popup );
			update=true
		}

		if ( source.substr(0, 4)=="http" ){
			if (method=="iframe"){
				// document.getElementById('contenido_popup').innerHTML = '';
				// let iframe = Object.assign(document.createElement('iframe'), {src: source, frameborder: 0, scrolling: 'auto'});
				// Object.assign(iframe.style, {width: '100%', minHeight: '500px'});
				// document.getElementById('contenido_popup').append(iframe);  // esto no carga el javascript.
				$('#contenido_popup').html('<iframe src="'+source+'" style="width:100%;min-height:500px" frameborder=0 scrolling="auto" ></iframe>');
				$('#popup').fadeIn('fast');
			}else{
				$.ajax({
					type: 'GET',
					url: source,
					success: function(data) {
						document.getElementById('contenido_popup').innerHTML = data; //!jq $('#contenido_popup').html(data);
						$('#popup').fadeIn('fast');
					},
				})
			}
		}else{
			document.getElementById('contenido_popup').innerHTML = source; //!jq $('#contenido_popup').html(source);
			$('#popup').fadeIn('fast');
		}

		// control del alto maximo de la pop
		var pop_height=$('#contenido_popup').height();
		if ( pop_height > (alto_documento-100) ) {
			console.log(pop_height+" > "+(alto_documento-100)+"px");
			document.getElementById('contenido_popup').style.height = (alto_documento - 100) + 'px';
		}else{
			console.log(pop_height+" < "+(alto_documento-100)+"px");
			document.getElementById('contenido_popup').style.height = 'inherit';
		}

	}
}

function cerrar_pop(){
	$('#popup').fadeOut('fast',function(){
		document.getElementById('contenido_popup').innerHTML = ''; //!jq $('#contenido_popup').html('');
	});
}

function cerrar(id){
	$('#'+id).fadeOut('fast',function(){
		document.getElementById(id).innerHTML = ''; //!jq $('#'+id).html('');
		document.getElementById(id).remove(); //!jq $('#'+id).remove();
	});
}


/** ###############################################################
 LOGIN
###############################################################   */
function login (form) {
	a_consola("------------------------------------------------------------------ login form ["+form+"]");
	var submit_form=true;
	var url=web_url+"backend/login.php?r="+rand();
	var submit_text="LOGIN";

	if (typeof(form) !="undefined"){
		var form_data = $( "#"+form ).serialize();
		//var form = document.getElementById(form);

		//if (document.getElementById('enviar') ){var submit_text=document.getElementById('enviar').value;	}
		if (document.getElementById('login') ){var submit_text=document.getElementById('login').value;	}

	}else{

		form_data="";
		if ( typeof(document.getElementById('l_usuario')) == "string" ){ form_data+="&l_usuario="+l_usuario; }else{error("Es necesario introducir un nombre de usuario.<br>");submit_form=false;}
		if ( typeof(document.getElementById('l_password')) == "string" ){ form_data+="&l_password="+l_password; }else{error("Es necesario introducir una contraseña.<br>");submit_form=false;}
		if ( typeof(document.getElementById('l_recordar')) == "string" ){ form_data+="&l_recordar="+l_recordar; }
		if ( typeof(document.getElementById('seccion')) == "string" ){ form_data+="&seccion="+seccion; }

		//if (document.getElementById('enviar') ){var submit_text=document.getElementById('enviar').value;	}
		if (document.getElementById('login') ){var submit_text=document.getElementById('login').value;	}

	}

	if (submit_form){
		//if (document.getElementById('enviar')){ document.getElementById('enviar').value = 'Verificando...';		}
		if (document.getElementById('login')){ document.getElementById('login').value = 'Verificando...';		}

		$.ajax({
			type: "POST",
			url: url,
			data: form_data,
			success: function(data) {
				procesar_json(data);
				//if (document.getElementById('enviar')){ document.getElementById('enviar').value = submit_text; }
				if (document.getElementById('login')){ document.getElementById('login').value = submit_text; }
			},
			error:function(data) {
				error('No ha sido posible la identificación.<br>Intentalo pasados unos minutos.');
				//if (document.getElementById('enviar')){ document.getElementById('enviar').value = submit_text; }
				if (document.getElementById('login')){ document.getElementById('login').value = submit_text; }
			},
			complete:function() {
				//if (document.getElementById('enviar')){ document.getElementById('enviar').value = submit_text; }
				if (document.getElementById('login')){ document.getElementById('login').value = submit_text; }
			}
		});


	}


}


/*##############################################################
###  CARGANDO ....
###*/
/*
function cargando(text){
	a_consola("Cargando ["+text+"] ...");
	if (document.querySelector('#menu-puntos')) document.querySelector('#menu-puntos').hide(); //!jq $('#menu-puntos').hide();
	if (document.querySelector('#cargando')) document.querySelector('#cargando').show(); //!jq $('#cargando').show();

	a_consola("Procesando ["+text+"] ...");
	if ( existe('progress') ){
		if (!visible('progress')){muestra_id('progress','fast','fade');}
	}

}

function cargando_fin(){
	a_consola("Fin Carga ...");
	if (document.querySelector('#menu-puntos')) document.querySelector('#menu-puntos').show(); //!jq $('#menu-puntos').show();
	if (document.querySelector('#cargando')) document.querySelector('#cargando').hide(); //!jq $('#cargando').hide();


	a_consola("Fin del proceso activo...");
	if ( existe('progress') ){
		if (visible('progress')){oculta_id('progress','fast','fade');}
	}

	// ocultamos el menu desplegable de la Izquierda
	if (existe('menuinfouser') && visible('menuinfouser')){
	    oculta_id('menuinfouser','fast','slide');
	}
	// ocultamos el menu desplegable de la derecha
	if (existe('menuright') && visible('menuright')){
		oculta_id('menuright','fast','slide');
	}
}
*/

/*##############################################################
### Cargando ...
##############################################################*/
function cargando (texto, porcentaje) {
	// Verificacion de parametros
 	if ( typeof(texto) == 'undefined' ) {texto='Cargando ... ';}
 	if ( typeof(porcentaje) == 'undefined' ) {porcentaje=100;}
 	texto=texto.replace("_"," ");
 	texto=texto.replace("-"," ");
 	a_consola("cargando("+texto+","+porcentaje+")");

	// indicador de carga show / hide
	var target="cargando";
	if (  $('#'+target).css('display') == 'none' ){
		top.$('#menu-puntos').hide();
		top.$('#'+target).show();
	}


	// Progreso de carga
	target="barra-progreso";
	if ( !existe(target) ){target="mensajes";}
	barra='<div id="progress-data" class="progress-bar progress-bar-azul big progress-bar-striped active" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: '+porcentaje+'%;"><span class="glyphicons glyphicons-hourglass rotate-right" style="padding-top:2px"></span>&nbsp;&nbsp;'+texto+'</div>';
 	top.$('#'+target).html(barra);
 	if (  $('#'+target).css('display') == 'none' ){
		top.$('#'+target).hide();
 	}

}

function cargando_fin(){fin_carga();}
function fin_carga(){
	a_consola("fin_carga()");

	// indicador de carga show / hide
	var target="cargando";
	if (  $('#'+target).css('display') != 'none' ){
		top.$('#'+target).hide();
		top.$('#menu-puntos').show();
	}

	// Progreso de carga
	if (visible('barra-progreso')){oculta_id('barra-progreso','fast','fade');}
}



/*##############################################################
### Uploading
##############################################################*/
function subiendo (texto, porcentaje) {
 	if ( typeof(texto) == 'undefined' ) {texto='Cargando ... ';}
 	if ( typeof(porcentaje) == 'undefined' ) {porcentaje=100;}
 	a_consola("enviando() "+texto+" "+porcentaje);

	// indicador de upload show / hide
	var target="uploading";
	if ( !existe("uploading") ){target="uploading";}
	if (  $('#'+target).css('display') == 'none' ){top.$('#'+target).show('fast'); 	}

	// Progreso de upload
	target="barra-upload";
	if ( !existe(target) ){target="mensajes";}
	barra='<div id="upload-data" class="progress-bar progress-bar-verde big progress-bar-striped active" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: '+porcentaje+'%;"><span class="glyphicons glyphicons-hourglass rotate-right" style="padding-top:2px"></span>&nbsp;&nbsp;'+texto+'</div>';
 	top.$('#'+target).html(barra);
 	if (  $('#'+target).css('display') == 'none' ){
		muestra_id(target,'fast','fade');
 	}

}

function subiendo_fin(){fin_subiendo();}
function fin_subiendo(){
	a_consola("fin_subiendo()");
	top.$('uploading').hide('fast');
	if (visible('barra-upload')){oculta_id('barra-upload','fast','fade');}
}





/** ###############################################################
TIGGER CLICK
###############################################################   */
function clic (id) { return click (id);}
function click (id) {
	var e = document.getElementById(id) || false;
	if (e) {
		e.dispatchEvent(new MouseEvent('click', {view: window}));
	}else{
		a_consola("clic("+id+") => "+id+" No existe.");
	}
}



/** ###############################################################
 OPEN URL
###############################################################   */
function link (url,target) {
	if (typeof(target)=="undefined")	{target="_self";}

	if (typeof(url)=="undefined"){
		alert ('No se ha especificado la url a cargar.');
	}else{
		if (target=="_self"){
			// Abrimos la url en la misma tab
			setTimeout(function(){
				top.location.href = url;
			},300);
			top.location.assign(url);

		}else{

			// Abrimos la url en una nueva tab
			//window.open(url,target); // esto lo para el bloqueador de popups

			// hijack first anchor that has target=_blank, change href, next document click triggers it
			/*
			var a = $('a[target="'+target+'"]')[0];
			a.setAttribute('href', url);
			$(document).click(function(){
			    $('a[target="'+target+'"]')[0].click();
			});
			*/

			// create an anchor, add to body, next document click triggers it
			var a = document.createElement('a');
			a.setAttribute('href', url );
			a.setAttribute('target', target );
			document.body.appendChild(a);
			//$(document).click(function(){a.click();});
			a.click();

		}
	}

}


function post_variable (variable,valor,action) {
	if ( (variable != "") && (valor != "") ) {

		var variable=variable;
		var valor=valor;

		/*Creamos un nuevo objeto Formualrio*/
		var nuevo_formulario = document.createElement("form");// creamos el formulario
		nuevo_formulario.name = 'onthefly_form';
		nuevo_formulario.id = 'onthefly_form';
		if (typeof(action)=="undefined"){
			nuevo_formulario.action = document.URL;
		}else{
			nuevo_formulario.action = link_url;
		}
		nuevo_formulario.target = '_self';
		nuevo_formulario.method = 'post';
        /*Añadimos el formulario al documento */
		document.body.appendChild(nuevo_formulario);

		/*metemos el objeto formulario en un avariable*/
		var form  = document.getElementById('onthefly_form');

		/*Creamos un nuevo objeto input*/
		var nuevo_input = document.createElement("input");
		nuevo_input.type = "hidden";
		nuevo_input.name = variable;
		nuevo_input.value = valor;
        /*añadimos el campo input al formulario*/
		form.appendChild(nuevo_input);
		/*document.getElementById('onthefly_form').appendChild(nuevo_input);*/

		/*Enviamos el formulario*/
		form.submit();

	}else{
		error( 'Error en los parametros de la funcion post_variable(' + variable + ',' + valor + ').' );
	}
}


/* ###################################################   FUNCION JAVASCRIPT QUE ENVIA POR POST LA VARIABLE SECCION
###########
###########   seccion : La seccion que ha de ser cargada
###########
###########
###########   (c) Grupo5.com | http://www.grupo5.com
###########
###########   */

function seccion (seccion){
	link("?seccion="+seccion);
	/*post_variable ('seccion',seccion);*/
}

function logout (){
	cargando("Cerrando sesión.....");
	url=web_url+"backend/logout.php?r="+rand();
	$.get( url, function (data) {
		procesar_json(data);}
	);
}


function toggle_password (campo){
	if ( $('#'+campo).attr('type') =="password" ){
		$('#'+campo).attr('type', 'text');
	}else{
		$('#'+campo).attr('type', 'password');
	}
}


/* ###################################################   FUNCION JAVASCRIPT QUE ENVIA POR POST LA VARIABLE SECCION
###########
###########   PROCESAR RESULTADO JSON
###########
###########   (c) Grupo5.com | http://www.grupo5.com
###########
###########   */
function procesar_respuesta(data){procesar_json(data);}
function procesar_json(data){
	/*El script responde en formato JSon */
	var data_type =typeof(data); // tipo de dato recibido
	a_consola("procesar_json "+data_type);

	switch (data_type) {
		case "object":
			respuesta = data;
		break;

		case "string":
			if (es_json(data)){
				respuesta = JSON.parse(data);
			}else{
				respuesta = [];
				respuesta["resultado"] = "KO";
				respuesta["error"] = "Unespected data format.<br>";
				respuesta["mensaje"] = "";
				respuesta["aviso"] ="";
				if ( typeof(dev)!="undefined" ){respuesta["aviso"] =data;}
			}
		break;

		default:
			respuesta = [];
			respuesta["resultado"] = "KO";
			respuesta["error"] = "Unable to process "+data_type+".<br>";
			respuesta["mensaje"] = "";
			respuesta["aviso"] ="";
		break;
	}

	if (respuesta.mensaje!=""){mensaje(respuesta.mensaje);}
	if (respuesta.aviso!=""){aviso(respuesta.aviso);}
	if (respuesta.error!=""){error(respuesta.error);}
	if ($('#cargando').length!=false){cargando_fin();}

	if ( typeof (respuesta.accion) != "undefined" ){
		/*Si se retorna la variable js con algun valor */
		if (respuesta.accion!=""){
			if(!jQuery) {
				eval(respuesta.accion);
			}else{
				jQuery.globalEval(respuesta.accion);
			}
		}
	}

	if ( typeof (respuesta.redireccion) != "undefined" && respuesta.redireccion!="" ){
		setTimeout(function(){ link(respuesta.redireccion); }, 2000);
	}

	/*RESULTADO EN FUNCION DE LA RESPUESTA */
	if (respuesta.resultado=="OK"){
		return respuesta;
	}else{
		return false;
	}

}


/* #############################################################################################################################
#####
#####     VISUALIZACION DE MENSAJES
#####
#############################################################################################################################*/

function aviso(contenido,retardo){
	mensaje(contenido,'aviso',retardo);
	console.log("AVISO: "+contenido);
}
function error(contenido,retardo){
	mensaje(contenido,'error',retardo);
	console.log("ERROR: "+contenido);
}


function mensaje(txt,tipo,retardo){

	if (typeof(tipo) == "undefined" ){ tipo="mensaje"; }
	if (typeof(retardo) == "undefined" ){ retardo=0; }

	/*caracteres especiales*/
	//txt=encodeURI(txt);

	$("#mensajes").css("height","auto");

	/*nuevo mensaje*/
	nuevo_mensaje='';
	nuevo_mensaje+='<div id="'+tipo+'" style="display:none;">';
	nuevo_mensaje+='	<div class="'+tipo+'" >';
	nuevo_mensaje+='		<div class="cerrar-mensajes"><a href="javascript:ocultar_mensaje(\''+tipo+'\');">X</a></div>';
	nuevo_mensaje+='		<p  id="texto_'+tipo+'" style="max-height:300px;overflow:auto;" >'+txt+'</p>';
	nuevo_mensaje+='	</div>';
	nuevo_mensaje+='</div>';

	/*
	nuevo_mensaje+='<div id="'+tipo+'" style="display:none;" onClick="ocultar_mensaje(this.id);" >';
	nuevo_mensaje+='	<div class="'+tipo+' sombra"  id="texto_'+tipo+'">'+txt+'</div>';
	nuevo_mensaje+='</div>';
	*/



	/*Verificamos si existe la capa*/
	if ( $('#'+tipo).length==false ){
		/*si no existe añadimos el div*/
		$('#mensajes').append(nuevo_mensaje);
	}

	if ( $("#"+tipo).css('display') == 'none' ){
		$("#texto_"+tipo).html(txt);
		$("#"+tipo).slideDown('fast');
	}else{
		$("#"+tipo).slideUp('fast',function(){
			tmp=$("#texto_"+tipo).html();
			if (txt!=tmp){tmp+=txt;	}
			$("#texto_"+tipo).html(tmp);
			$("#"+tipo).slideDown('fast');
		});
	}


	/*Auto cocultado de mensajes*/
	switch (tipo) {
		case "mensaje":
			/*Si hay un mensaje visible , eliminamos el auto coultado*/
			if ( typeof(timeout_mensaje) != 'undefined'  ) {clearTimeout(timeout_mensaje);}
			if (retardo==0) {retardo=5000;}
			timeout_mensaje=setTimeout(function(){ocultar_mensaje(tipo);},retardo);
			break;
		case "aviso":
			/*Si hay un aviso visible , eliminamos el auto coultado*/
			if ( typeof(timeout_aviso) != 'undefined'  ) {clearTimeout(timeout_aviso);}
			if (retardo==0) {retardo=10000;}
			timeout_aviso=setTimeout(function(){ocultar_mensaje(tipo);},retardo);
			break;
		case "error":
			/*Si hay un aviso visible , eliminamos el auto coultado*/
			if ( typeof(timeout_error) != 'undefined'  ) {clearTimeout(timeout_error);}
			if (retardo==0) {retardo=10000;}
			timeout_error=setTimeout(function(){ocultar_mensaje(tipo);},retardo);
			break;
	}

}
/*Fincion para cultar mensajes*/
function ocultar_mensaje(tipo){
	//$("."+estilo).hide("fast");
	$("#"+tipo).slideUp("fast");
}


/* #####    IFRAMES
#############################################################################################################################*/
function cargar_iframe(id,url){
	var $iframe = $('#' + id);
	if ( $iframe.length ) {
		$iframe.attr('src',url);
		return true;
	}
    return false;
}

function actualizar_iframe(id){
	var $iframe = $('#' + id);
	if ( $iframe.length ) {
		//aviso("reload "+id+"<br>");
		var iframe = document.getElementById(id);
		iframe.src = iframe.src;
		//document.getElementById(id).contentWindow.location.reload()
		return true;
	}
    return false;
}

/* #####     CAPAS
#############################################################################################################################*/
function muestra_id(id,velocidad,modo){
	if (typeof(velocidad)=="undefined"){velocidad=0;}
	if (typeof(modo)=="undefined"){modo="";}
	if ( $('#'+id).css('display') == 'none' ){
		switch(modo){
			case "fade":
				$('#'+id).fadeIn(velocidad);
				break;
			case "slide":
				$('#'+id).slideToggle(velocidad);
				break;
			case "slidedown":
				$('#'+id).slideDown(velocidad);
				break;
			case "slideup":
				$('#'+id).slideUp(velocidad);
				break;
			default:
				$('#'+id).show(velocidad);
				break;
		}
	}
}

function oculta_id(id,velocidad,modo){

	if (typeof(velocidad)=="undefined"){velocidad=0;}
	if (typeof(modo)=="undefined"){modo="";}

	if ( $("#"+id).css("display") != "none" ){
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
				$("#"+id).slideDown(velocidad);
				break;
			default:
				$("#"+id).hide(velocidad);
				break;
		}
	}

}


/*id visivility toggle*/
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
		default:
			$('#'+id).toggle(velocidad);
			break;
	}
}


/*Comprobamos si exies un id*/
function existe(id){
	if ( ( typeof(id) == "undefined" ) || id.length <= 0 ){
		return false;
	}else{
		if ( $('#'+id).length ){
			return true;
		}else{
			return false;
		}
	}
}

/*Comprobamos es visible un id*/
function visible(id){
	if ( typeof(id) !== 'undefined') {
		if ( document.getElementById(id) ){
			return document.getElementById(id).style.display !== 'none';
		}
	}
	return false;
}

/*Imprimir un id */
function print_id(elem){
    var mywindow = window.open('', 'PRINT', 'height=800,width=600');

    mywindow.document.write('<html><head><title>' + document.title  + '</title>');
    mywindow.document.write('</head><body >');
    mywindow.document.write('<h1>' + document.title  + '</h1>');
    mywindow.document.write(document.getElementById(elem).innerHTML);
    mywindow.document.write('</body></html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10*/

    mywindow.print();
    mywindow.close();

    return true;
}

/*Comprobamos si un string  contiene un Json*/
function es_json(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


/*#############################################################################
####  Cambio de tabs
#### No funciona en el href
#############################################################################*/
function  switch_tab(tab){
	a_consola("switch_tab ('"+tab+")';");
	console.log(tab);

    //var tab_group = $("[id=tab_"+tab_id+"]")[0].parentNode.children;
	var tab_group = tab.parentNode.children;
	console.log(tab_group);
	for (let item of tab_group) {
		var container_id=item.id.replace("tab_","tabcontent_");
		var container=document.getElementById(container_id);

		item.classList.remove("active");
		item.classList.remove("selected");
		item.classList.remove("linkactivo");
		container.style.display = "none";

		if ( item.id == tab.id ){
			item.classList.add("active");
			item.classList.add("selected");
			item.classList.add("linkactivo");
			container.style.display = "block";
		}
	}
}



/*##############################################################
###  No se exactamente que devuelve esto.
##############################################################*/

function normalizar_texto(texto){

	if (typeof(texto)=="undefined"){texto="";}

	var ltr = ['[àáâãä]','[èéêë]','[ìíîï]','[òóôõö]','[ùúûü]','ñ','ç','[iÿ]',' ','[\[(){}*+?^$-_,:;"\'&@<>|]'];
	var rpl = ['a','e','i','o','u','n','c','y','',''];

    var resultado="";
    for (var i = 0, c = ltr.length, r = String(texto.toLowerCase()); i < c; i++){
		var rg = new RegExp(ltr[i],'g');
		resultado+= r.replace(rg,rpl[i]);
     };

	return resultado;
};


/*### CONTROL DE SESSIONES ##########################################################################*/
function session(nombre,valor) {
	url=web_url+"backend/session.php?r="+rand();
	url+="&nombre="+nombre+"&valor="+valor;
	$.get( url, function (data) { procesar_json(data);} );
}

/*### CONTROL DE COOKIES ##########################################################################*/
function cookie(nombre,valor) {
	url=web_url+"backend/cookie.php?r="+rand();
	url+="&nombre="+nombre+"&valor="+valor;
	$.get( url, function (data) { procesar_json(data);} );
}

function aceptar_cookies(){
	$("#cookies").empty();
	$("#cookies").load(web_url+"backend/cookie.php?nombre=cookies_aceptadas&valor=" + Date.now());
}


/*### Extraer parametros de la url o de un string  ##########################################################################
name : nombre del parametro a extraer.
url : es opcional si no se proporciona se usa el valor de la barra de direccion.
*/
function url_extract(name,url) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	if ( typeof(url) == "undefined" ){
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	    results = regex.exec(location.search);
	}else{
	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(url);
	}
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}



/*
##############################################################
###  ENVIO DE ARCHIVOS
###  Necesario para el sistema de envio de archicos con Jquery.
###
*/

function upload(param, opciones){

	if ($("#fireUpload").length) {return;}

	a_consola('upload('+param+','+opciones+') -- general.js');

	/* IS UPLOADING ¿?  */
	if (window.uploading || false){
		aviso('Se esta enviando un archivo, espere a que termine<br>');
	}else{

		var clase = "all";
		if ( param.indexOf("video") >= 0 ) {clase = "video";}
		if ( param.indexOf("foto") >= 0 ) {clase = "foto";}
		if ( param.indexOf("imagen") >= 0 ) {clase = "foto";}
		if ( param.indexOf("captura") >= 0 ) {clase = "foto";}


		var button = document.getElementById('fileupload');
		var allowedExtensions;
		var multiple;
		var sizeLimit = 8 * 1024 * 1024;
		var uuidName = '';

		/*Parametros upload */
		var params = {opcion: clase};



		var uploader_callback = web_url + 'backend/fileupload.php?param=' + param;


		// OPTIONS
		switch (clase) {
			case 'foto':
				allowedExtensions = ['jpg','jpeg','png','gif'];
				multiple = opciones.multi || false;
				sizeLimit = opciones.tamano || sizeLimit;
			break;

			case 'video':
				sizeLimit = 1024 * 1024 * 1024; // 1GB maximo
				allowedExtensions = ['mp4','mpg','avi','mov','mkv','wmv','webm','ogg','3gp'];
				multiple = opciones.multi || false;
				sizeLimit = opciones.tamano || sizeLimit;
			break;

			default :
				allowedExtensions = ['jpg','jpeg','png','gif','mp4','avi','mov','wmv','webm','ogg','3gp','zip','rar','doc','docx'];
				multiple = opciones.multi || false;
				sizeLimit = opciones.tamano || sizeLimit;
			break;
		}

		a_consola('uploader callback -> '+uploader_callback );


		window.uploader = new qq.FineUploaderBasic({
			button: button,
			multiple: multiple,
			autoUpload: true,
			chunking: { enabled: false },
			validation: { allowedExtensions: allowedExtensions, sizeLimit: sizeLimit },
			request: {
				endpoint: uploader_callback ,
				uuidName: uuidName,
				params: params
			},
			callbacks: {
				onSubmit: function(id, name) {
					a_consola('Submit  ['+id+'] '+name);
					window.uploading = true;
				},
				onUpload: function(id, file) {
					 a_consola('Upload  ['+id+']  '+file);
				},
				onProgress:function(id, file, loaded, total) {
					 a_consola('Uploading  ['+id+'] '+file+' : '+Math.round(loaded / total * 100)+'% ');
					 subiendo("Enviando "+file+" ...", Math.round(loaded / total * 100));
				},
				onSubmitted: function(id, file) {
					 a_consola('submitted  ['+id+'] '+file);
				},
				onComplete: function(id, file, resp) {
					a_consola('upload complete ['+id+'] '+file+" -> "+resp+" ");
					window.uploading = false;
					subiendo_fin();
					button.innerHTML = '';
					if (typeof(window.upload_complete) == 'function') {
						window.upload_complete(file, param, resp);
					}
				},
				onError: function(id, file, resp) {
					a_consola('upload error '+file+' ['+resp+'] ' );
					subiendo_fin();
					window.uploading = false;
					button.innerHTML = '';
				},
				onCancel: function () {
					debugger;
				}
			},
			debug: true
		})

		button.firstElementChild.id = 'fireUpload';
		clic('fireUpload');
		$("#fireUpload").remove();
	}

}

function  upload_complete(file,data,resp){
	a_consola("upload_complete("+file+","+data+","+resp+");");
	if (data!=""){

		top.cargando('Preparando archivo....');

		url=web_url+"backend/procesar_archivo.php?r="+rand();

		form_data="";
		form_data+="&file="+file;
		form_data+="&data="+data;

		$.ajax({
			type: "POST",
			url: url,
			data: form_data,
			success: function(data) {
				procesar_json(data);
			},
			error:function(data) {
				aviso('No ha sido posible procesar el archivo.<br>Intentalo pasados unos minutos.');
			},
			complete:function() {
			}
		});


	}else{
		mensaje("Archivo almacenado correctamente.<br>");
	}
}

/*
##############################################################
###  function actualizar_coordenadas()
###
###   * Obtenemos y almacnamos la longitud y la latitud
##############################################################
*/
/*
##############################################################
###  Actualizar coordenadas
###
*/

function actualizar_coordenadas(tabla,registro){
	a_consola("Getting browser Coordinates.","info");
	if ( navigator.geolocation ) {
		navigator.geolocation.getCurrentPosition(function(position) {
			if ( (position.coords.latitude == 0 ) || (position.coords.latitude == "" ) ||  (position.coords.longitude == 0 )  ||  (position.coords.longitude == "" )  ){
				a_consola("Invalid coordinates lat:"+position.coords.latitude+" long:"+position.coords.longitude+".","error");

			}else{
				a_consola(" lat:"+position.coords.latitude+" long:"+position.coords.longitude+" OK.","info");
				var destino_formulario=top.web_url+"backend/procesar_registro.php?r="+rand();
				a_consola(' POST : '+destino_formulario);
				var datos_formulario="&tabla="+tabla;
				if (typeof(registro)!="undefined")	{
					datos_formulario+="&registro="+registro;
				}
				datos_formulario+="&accion=guardar";
				datos_formulario+="&latitud="+position.coords.latitude;
				datos_formulario+="&longitud="+position.coords.longitude;
				datos_formulario+="&mute";


				$.ajax({
					type: "POST",
					url: destino_formulario,
					data: datos_formulario,
					success: function(json_data) {
						procesar_json(json_data);
					}
				});

			}

			},
			function(error_pos) {
				a_consola("Browser "+browser+" ERROR "+error+".","error");
			},
			{maximumAge:60000, timeout:5000, enableHighAccuracy: true}
		);
	}else{
		a_consola("Browser "+browser+" not suported.","error");
	}
}

/*
##############################################################
###  a consola ENVIAR TEXTO A LA CONSOLA DE JS
##############################################################
*/

// function a_consola(texto,option="log") {
function a_consola(texto,option) {
	option = option || 'log;'

	if ( typeof(dev)!="undefined" &&  typeof(console) != "undefined"){


		if ( typeof(a_console_items) == "undefined")	{window.a_console_items=0;}else{window.a_console_items++;}
		if (window.a_console_items > 200 ){
			console.clear();
			console.log('---------------------[ auto clear '+a_console_items+' ]--------------------');
			window.a_console_items=0;
		}


		switch(texto){

			case "clear":
				console.clear();
				console.log('---------------------[ clear ]--------------------');
			break;

			default:
				switch(option){

					case "ko":
					case "error":
						console.error(texto);
					break;

					case "warn":
					case "warning":
					case "aviso":
						console.warn(texto);
					break;

					case "ok":
					case "msg":
					case "mensaje":
						console.info('%c'+texto,'color:#00ff00');
					break;


					case "info":
						console.info('%c'+texto,'background: #0000ff;color:#ffffff');
						break;


					default:
						console.log('%c'+texto,'color: #0066ff');
					break;
				}
			break;
		}
	}

}

/**
 * Genera un Identificador Universal Único (UUID) v4 (RFC4122 https://tools.ietf.org/html/rfc4122)
 * Extraído de https://gist.github.com/kaizhu256/4482069
 * @return	{string} xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 */
function uuid4() {
	var uuid = '', ii;
	for (ii = 0; ii < 32; ii += 1) {
		switch (ii) {
			case 8:
			case 20:
				uuid += '-';
				uuid += (Math.random() * 16 | 0).toString(16);
			break;
			case 12:
				uuid += '-';
				uuid += '4';
			break;
			case 16:
				uuid += '-';
				uuid += (Math.random() * 4 | 8).toString(16);
			break;
			default:
				uuid += (Math.random() * 16 | 0).toString(16);
		}
	}
	return uuid; //// xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 }

/* application/json */
$.postJSON = function(url, payload, expectType) {
	return $.ajax({
		url: url + ((url.indexOf("?") < 0) ? "?" : "&") +  "r=" + rand(),
		method: "POST",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(payload),
		dataType: expectType || "json",
	});
}
