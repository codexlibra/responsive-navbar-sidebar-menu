// > 992px
// obtiene el link dropdown del navbar
var sidebar_links_dropdown = document.querySelectorAll(".navbar-link-dropdown");
var link_dropdown_submenu = sidebar_links_dropdown[1];
console.log("link_dropdown_submenu");
console.log(link_dropdown_submenu);

// obtiene el submenu
var sidebar_items_dropdown = document.querySelectorAll(".navbar-item-dropdown");
var item_dropdown1 = sidebar_items_dropdown[1];
var dropdown_submenu = item_dropdown1.children[1];
//console.log(dropdown_submenu);


// < 992px
var sidebar = document.querySelector(".navbar-list");
var x_icon = document.querySelector(".bx-x");
var toggler_menu_icon = document.querySelector(".bx-menu.toggler-icon");
var overlay = document.querySelector(".overlay");

var link_dropdown_menu = sidebar_links_dropdown[0];
/*let link_dropdown = document.querySelectorAll('.navbar-link-dropdown');
let dropdown_menu = link_dropdown[0];*/
console.log("link_dropdown_menu");
console.log(link_dropdown_menu);
//let dropdown_submenu = link_dropdown[1];
let parent_element;

let screen_width = window.innerWidth;
let loop1 = true;
let loop2 = true;


if (screen_width >= 992) {
	console.log("mayor 992px una vez");
	link_dropdown_submenu.addEventListener('mouseenter', function_navbar_dropdown);
} else {
	console.log("menor 992px una vez");
	x_icon.addEventListener('click', function_x_icon);
	// para < 992px
	toggler_menu_icon.addEventListener('click', function_toggler_menu_icon);
	// cerrar sidebar haciendo click en overlay
	overlay.addEventListener('click', function_overlay);

	// muestra/oculta dropdown menu
	link_dropdown_menu.addEventListener('click', function_dropdown_menu);
	// muestra/oculta dropdown submenu
	link_dropdown_submenu.addEventListener('click', function_dropdown_submenu);
}

// llama a la funcion resizeListener cuando se redimensiona la pantalla
window.addEventListener("resize", resizeListener);

function resizeListener() {
	// vuelve a obtener el ancho de la pantalla mientras se redimensiona
	screen_width = window.innerWidth;
	
	if (screen_width >= 992) {
		if (loop1) {
			console.log("screen >= 992px");

			// cuando se esta redimensionando la pantalla, los metodos se vuelven llaman, es decir, cada vez que la pantalla cambia un pixel se vuelven a ejecutar los eventos que ese encuentran en este condicional, para evitar esto se utilizan las variables loop1 y loop2 para que los datos solo sean llamados solo una vez
			loop1 = false;
			loop2 = true;

			// al cambiar el ancho de la pantalla de menor de 992 a mayor de 992 el evento listener continua ejecutando function2 que pertenece al anterior ancho de pantalla, la cual ya no debería seguir ejecutándose, solo debería ejecutarse la function1 que pertenese a este ancho de pantalla

			// detiene eventos que pudieran estar activos de < 992px
			x_icon.removeEventListener('click', function_x_icon);
			toggler_menu_icon.removeEventListener('click', function_toggler_menu_icon);
			overlay.removeEventListener('click', function_overlay);
			link_dropdown_menu.removeEventListener('click', function_dropdown_menu);
			link_dropdown_submenu.removeEventListener('click', function_dropdown_submenu);

			// llama al evento para pantalla > GL
			link_dropdown_submenu.addEventListener('mouseenter', function_navbar_dropdown);
		}
	} else {
		if (loop2) {
			console.log("screen < 992px");

			// similar al canso anterior, permite que solo se ejecute una sola vez los procedimientos pertenecientes a este ancho de banda
			loop2 = false;
			loop1 = true;
			// detiene el evento que solo debe funcionar en screen GL si es que estaba activo
			
			// primero verifica si la clase del submenu esta a la izquierda o derecha
			var submenu_class = dropdown_submenu.classList[0];
			// si el submenu tiene la clase hacia la izquierda lo cambia a dropdown-submenu para que se siga mostrando correctamente
			if (submenu_class == "dropdown-submenu-left"){
				dropdown_submenu.classList.replace("dropdown-submenu-left", "dropdown-submenu");
			}

			// detiene los eventos que pudieran estar activos de > 992px
			link_dropdown_submenu.removeEventListener('mouseenter', function_navbar_dropdown);

			// solo para < 576px (cerrar sidebar)
			x_icon.addEventListener('click', function_x_icon);
			// para < 992px
			// abir sidebar
			toggler_menu_icon.addEventListener('click', function_toggler_menu_icon);
			// cerrar sidebar haciendo click en overlay
			overlay.addEventListener('click', function_overlay);

			// muestra/oculta dropdown menu
			link_dropdown_menu.addEventListener('click', function_dropdown_menu);
			// muestra/oculta dropdown submenu
			link_dropdown_submenu.addEventListener('click', function_dropdown_submenu);
		}
	}
}

function function_navbar_dropdown() {
	//console.log("Muestra dropdown submenu");
	// obtiene la clase actual del submenu
	//var submenu_class_list = document.querySelector(".dropdown-submenu");
	var submenu_class = dropdown_submenu.classList[0];
	//console.log(dropdown_submenu);

	// cuando se posiciona el cursor por el dropdown que contiene el submenu se verifica si se debe colocar a la derecha o izquierda

	screen_width = window.innerWidth; // obtiene el ancho de la pantalla sin scroll

	// vuelve a verificar el ancho de la pantalla para verificar si cuenta con scroll
	let scroll_screen_width = document.documentElement.scrollWidth;

	// si el ancho de pantalla actual es mayor que el primero, coloca el submenu del lado izquierdo
	if (scroll_screen_width > screen_width) {		
		if (submenu_class == "dropdown-submenu") {
			//console.log("true");
			dropdown_submenu.classList.replace("dropdown-submenu", "dropdown-submenu-left");
			//submenu_class = "submenu-left";
		}/* else {
			console.log("false");
		}*/
	} else {
		// primero coloca el submenu a la derecha, despues verifica si se cambia de posicion
		if (submenu_class != "dropdown-submenu") {
			dropdown_submenu.classList.replace("dropdown-submenu-left", "dropdown-submenu");
			submenu_class = "dropdown-submenu";
		}/* else {
			console.log("false");
		}*/
		
		// si el ancho no es mayor coloca el submenu a la derecha
		// vuelve a comprobar el scroll width para prevenir que se salga de la pantalla cuando se vuelve a hacer hover cuando el submenu
		scroll_screen_width = document.documentElement.scrollWidth;

		if (scroll_screen_width > screen_width) {
			// coloca el submenu a la izquierda
			if (submenu_class == "dropdown-submenu"){
				//console.log("true");
				dropdown_submenu.classList.replace("dropdown-submenu", "dropdown-submenu-left");
			}/* else {
				console.log("false");
			}*/
		}
	}
}

//x_icon.addEventListener('click', function_x_icon);
function function_x_icon() {
	sidebar.classList.remove("toggle");
}

//toggler_menu_icon.addEventListener('click', function_toggler_menu_icon);
function function_toggler_menu_icon() {
	sidebar.classList.toggle("toggle");
	console.log("click en toggler_menu_icon");
}

function function_overlay() {
	sidebar.classList.remove("toggle");
}

function function_dropdown_menu() {
	parent_element = link_dropdown_menu.parentElement;
	parent_element.classList.toggle("toggle");
	console.log("click dropdown menu");
}

function function_dropdown_submenu() {
	parent_element = link_dropdown_submenu.parentElement;
	parent_element.classList.toggle("submenu-toggle");
	console.log("click dropdown submenu");
}