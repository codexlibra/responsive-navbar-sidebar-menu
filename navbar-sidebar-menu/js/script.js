/*!
 * Responsive Navbar Sidebar Menu  v1.0.1
 * Copyright 2022 Codex Libra
 * Licensed under MIT (https://github.com/codexlibra/responsive-navbar-sidebar-menu/blob/master/LICENSE)
 */
let sidebar_links_dropdown = document.querySelectorAll(".navbar-link-dropdown");
let link_dropdown_submenu = sidebar_links_dropdown[1];

let sidebar_items_dropdown = document.querySelectorAll(".navbar-item-dropdown");
let item_dropdown1 = sidebar_items_dropdown[1];
let dropdown_submenu = item_dropdown1.children[1];

let sidebar = document.querySelector(".navbar-list");
let x_icon = document.querySelector(".bx-x");
let toggler_menu_icon = document.querySelector(".bx-menu.toggler-icon");
let overlay = document.querySelector(".overlay");

let link_dropdown_menu = sidebar_links_dropdown[0];
let parent_element;

let screen_width = window.innerWidth;
let loop1 = true;
let loop2 = true;
let loop3 = true;


if (screen_width >= 992) {
	link_dropdown_submenu.addEventListener('mouseenter', navbarDropdown);
}
if (screen_width >= 576 && screen_width < 992) {
	toggler_menu_icon.addEventListener('click', showSidebarOverlay);
	overlay.addEventListener('click', hideSidebarOverlay);
	link_dropdown_menu.addEventListener('click', toggleDropdownMenu);
	link_dropdown_submenu.addEventListener('click', toggleDropdownSubmenu);
	
}
if (screen_width < 576) {
	x_icon.addEventListener('click', hideSidebar);
	toggler_menu_icon.addEventListener('click', showSidebar);
	link_dropdown_menu.addEventListener('click', toggleDropdownMenu);
	link_dropdown_submenu.addEventListener('click', toggleDropdownSubmenu);
}

window.addEventListener("resize", resizeListener);

function resizeListener() {
	screen_width = window.innerWidth;
	
	if (screen_width >= 992 && loop1) {
		// When the screen is being resized, the methods are called again, that is, every time the screen changes a pixel, the events found in this conditional are executed again, to avoid this the letiables loop are used so that data is only called once
		loop1 = false;
		loop2 = true;
		loop3 = true;

		// When changing the width of the screen from less than 992px to greater than 992px the listener events that belong to the previous screen width continue to be executed and should not continue to be executed, only the functions corresponding to this screen width should be executed, to prevent this they are removed the above functions
		x_icon.removeEventListener('click', hideSidebar);
		toggler_menu_icon.removeEventListener('click', showSidebar);
		toggler_menu_icon.removeEventListener('click', showSidebarOverlay);
		overlay.removeEventListener('click', hideSidebarOverlay);
		link_dropdown_menu.removeEventListener('click', toggleDropdownMenu);
		link_dropdown_submenu.removeEventListener('click', toggleDropdownSubmenu);

		// Only execute the event for this screen width
		link_dropdown_submenu.addEventListener('mouseenter', navbarDropdown);

		// If when changing the width of the screen the sidebar was visible, it hides it again to prevent it from being hidden because the overlay would not be shown
		let sidebar_status = sidebar.classList[1];
		if (sidebar_status == "toggle") {
			sidebar.classList.remove("toggle");
		}
		// If the overlay was visible it hides it again
		let overlay_status = overlay.classList[1];
		if (overlay_status == "show") {
			overlay.classList.remove("show");
		}
		
	}
	if (screen_width >= 576 && screen_width < 992) {
		if (loop2) {
			// Similar to the previous case, allows procedures belonging to this screen width to be executed only once
			loop2 = false;
			loop1 = true;
			loop3 = true;
			
			// Check if the class of the submenu is on the left or right
			let submenu_class = dropdown_submenu.classList[0];

			// If the submenu has the class to the left, it changes it to dropdown-submenu so that it continues to be displayed correctly
			if (submenu_class == "dropdown-submenu-left"){
				dropdown_submenu.classList.replace("dropdown-submenu-left", "dropdown-submenu");
			}

			// Remove the events that should not be executed here
			link_dropdown_submenu.removeEventListener('mouseenter', navbarDropdown);
			x_icon.removeEventListener('click', hideSidebar);
			toggler_menu_icon.removeEventListener('click', showSidebar);

			// Only execute the event for this screen width
			toggler_menu_icon.addEventListener('click', showSidebarOverlay);
			overlay.addEventListener('click', hideSidebarOverlay);
			link_dropdown_menu.addEventListener('click', toggleDropdownMenu);
			link_dropdown_submenu.addEventListener('click', toggleDropdownSubmenu);

			// If when changing the width of the screen the sidebar was visible, it hides it again to prevent it from being hidden because the overlay would not be shown
			let sidebar_status = sidebar.classList[1];
			if (sidebar_status == "toggle") {
				sidebar.classList.remove("toggle");
			}
		}
	}

	if (screen_width < 576 && loop3) {
		loop3 = false;
		loop1 = true;
		loop2 = true;

		// Check if the class of the submenu is on the left or right
		let submenu_class = dropdown_submenu.classList[0];
		// If the submenu has the class to the left, it changes it to dropdown-submenu so that it continues to be displayed correctly
		if (submenu_class == "dropdown-submenu-left"){
			dropdown_submenu.classList.replace("dropdown-submenu-left", "dropdown-submenu");
		}

		// Remove the events that should not be executed here
		link_dropdown_submenu.removeEventListener('mouseenter', navbarDropdown);
		overlay.removeEventListener('click', hideSidebarOverlay);
		toggler_menu_icon.removeEventListener('click', showSidebarOverlay);

		// Only execute the event for this screen width
		x_icon.addEventListener('click', hideSidebar);
		toggler_menu_icon.addEventListener('click', showSidebar);
		link_dropdown_menu.addEventListener('click', toggleDropdownMenu);
		link_dropdown_submenu.addEventListener('click', toggleDropdownSubmenu);

		// If the overlay was visible it hides it again
		let overlay_status = overlay.classList[1];
		if (overlay_status == "show") {
			overlay.classList.remove("show");
		}
	}
	
}

function navbarDropdown() {
	let submenu_class = dropdown_submenu.classList[0];

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

function hideSidebar() {
	// Close sidebar
	sidebar.classList.remove("toggle");
}

function showSidebar() {
	// Show sidebar
	sidebar.classList.toggle("toggle");
}

function showSidebarOverlay() {
	// Show sidebar
	sidebar.classList.toggle("toggle");
	overlay.classList.add("show");
}

function hideSidebarOverlay() {
	// Close sidebar by touching the overlay
	sidebar.classList.remove("toggle");
	overlay.classList.remove("show");
}

function toggleDropdownMenu() {
	// Show / hide dropdown menu
	parent_element = link_dropdown_menu.parentElement;
	parent_element.classList.toggle("toggle");
}

function toggleDropdownSubmenu() {
	// Show / hide dropdown submenu
	parent_element = link_dropdown_submenu.parentElement;
	parent_element.classList.toggle("submenu-toggle");
}