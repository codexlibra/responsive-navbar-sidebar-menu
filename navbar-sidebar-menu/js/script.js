/*!
 * Responsive Navbar Sidebar Menu  v1.0.0
 * Copyright 2022 Codex Libra
 * Licensed under MIT (https://github.com/codexlibra/responsive-navbar-sidebar-menu/blob/master/LICENSE)
 */
var sidebar_links_dropdown = document.querySelectorAll(".navbar-link-dropdown");
var link_dropdown_submenu = sidebar_links_dropdown[1];

var sidebar_items_dropdown = document.querySelectorAll(".navbar-item-dropdown");
var item_dropdown1 = sidebar_items_dropdown[1];
var dropdown_submenu = item_dropdown1.children[1];

var sidebar = document.querySelector(".navbar-list");
var x_icon = document.querySelector(".bx-x");
var toggler_menu_icon = document.querySelector(".bx-menu.toggler-icon");
var overlay = document.querySelector(".overlay");

var link_dropdown_menu = sidebar_links_dropdown[0];
let parent_element;

let screen_width = window.innerWidth;
let loop1 = true;
let loop2 = true;


if (screen_width >= 992) {
	link_dropdown_submenu.addEventListener('mouseenter', function_navbar_dropdown);
} else {
	x_icon.addEventListener('click', function_x_icon);
	toggler_menu_icon.addEventListener('click', function_toggler_menu_icon);
	overlay.addEventListener('click', function_overlay);
	link_dropdown_menu.addEventListener('click', function_dropdown_menu);
	link_dropdown_submenu.addEventListener('click', function_dropdown_submenu);
}

window.addEventListener("resize", resizeListener);

function resizeListener() {
	screen_width = window.innerWidth;
	
	if (screen_width >= 992) {
		if (loop1) {
			// When the screen is being resized, the methods are called again, that is, every time the screen changes a pixel, the events found in this conditional are executed again, to avoid this the variables loop1 and loop2 are used so that data is only called once
			loop1 = false;
			loop2 = true;

			// When changing the width of the screen from less than 992px to greater than 992px the listener events that belong to the previous screen width continue to be executed and should not continue to be executed, only the functions corresponding to this screen width should be executed, to prevent this they are removed the above functions
			x_icon.removeEventListener('click', function_x_icon);
			toggler_menu_icon.removeEventListener('click', function_toggler_menu_icon);
			overlay.removeEventListener('click', function_overlay);
			link_dropdown_menu.removeEventListener('click', function_dropdown_menu);
			link_dropdown_submenu.removeEventListener('click', function_dropdown_submenu);

			// Only execute the event for this screen width
			link_dropdown_submenu.addEventListener('mouseenter', function_navbar_dropdown);
		}
	} else {
		if (loop2) {
			// Similar to the previous case, allows procedures belonging to this screen width to be executed only once
			loop2 = false;
			loop1 = true;
			
			// Check if the class of the submenu is on the left or right
			var submenu_class = dropdown_submenu.classList[0];
			// If the submenu has the class to the left, it changes it to dropdown-submenu so that it continues to be displayed correctly
			if (submenu_class == "dropdown-submenu-left"){
				dropdown_submenu.classList.replace("dropdown-submenu-left", "dropdown-submenu");
			}

			// remove events that might be active from screen width greater than 992px
			link_dropdown_submenu.removeEventListener('mouseenter', function_navbar_dropdown);

			// Only execute the event for this screen width
			x_icon.addEventListener('click', function_x_icon);
			toggler_menu_icon.addEventListener('click', function_toggler_menu_icon);
			overlay.addEventListener('click', function_overlay);
			link_dropdown_menu.addEventListener('click', function_dropdown_menu);
			link_dropdown_submenu.addEventListener('click', function_dropdown_submenu);
		}
	}
}

function function_navbar_dropdown() {
	var submenu_class = dropdown_submenu.classList[0];

	screen_width = window.innerWidth;
	let scroll_screen_width = document.documentElement.scrollWidth;

	if (scroll_screen_width > screen_width) {		
		// If the scrolling screen width is greater than the screen width, set the submenu on the left side
		if (submenu_class == "dropdown-submenu") {
			dropdown_submenu.classList.replace("dropdown-submenu", "dropdown-submenu-left");
		}
	} else {
		// First set the submenu to the right, then check if it should be moved
		if (submenu_class != "dropdown-submenu") {
			dropdown_submenu.classList.replace("dropdown-submenu-left", "dropdown-submenu");
			submenu_class = "dropdown-submenu";
		}

		scroll_screen_width = document.documentElement.scrollWidth;
		// Check again if the screen width with scroll is greater than the screen width, to prevent the submenu from going off the screen when hovering over the link again
		if (scroll_screen_width > screen_width) {
			if (submenu_class == "dropdown-submenu"){
				// Set the submenu on the left side
				dropdown_submenu.classList.replace("dropdown-submenu", "dropdown-submenu-left");
			}
		}
	}
}

function function_x_icon() {
	// Close sidebar
	sidebar.classList.remove("toggle");
}

function function_toggler_menu_icon() {
	// Show sidebar
	sidebar.classList.toggle("toggle");
}

function function_overlay() {
	// Close sidebar by touching the overlay
	sidebar.classList.remove("toggle");
}

function function_dropdown_menu() {
	// Show / hide dropdown menu
	parent_element = link_dropdown_menu.parentElement;
	parent_element.classList.toggle("toggle");
}

function function_dropdown_submenu() {
	// Show / hide dropdown submenu
	parent_element = link_dropdown_submenu.parentElement;
	parent_element.classList.toggle("submenu-toggle");
}