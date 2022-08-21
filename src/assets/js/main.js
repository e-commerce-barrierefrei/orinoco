import { mobileToggles } from "./modules/mobile-toggles.js";
import { megaMenu } from "./modules/megamenu-2.js";
import { isMobile } from "./modules/_helpers";
import { initCarousel } from "./modules/carousel";
import { animations } from "./modules/animations";
import { sorting } from "./modules/sorting";
import { formManagement } from "./modules/form-management";
import A11yDialog from "a11y-dialog";

const cookieContainer = document.querySelector("#cookie-modal");
const cookieDialog = new A11yDialog(cookieContainer);

import { cart } from "./modules/cart";

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("cookiebanner") === "1") {
	cookieDialog.show();
}

if (document.getElementById("c")) {
	initCarousel();
}

if (document.querySelector(".xmas")) {
	animations();
}

if (document.querySelector("[data-order]")) {
	formManagement();
}

if (document.querySelector("#produktliste")) {
	sorting();
}

isMobile();
mobileToggles();
megaMenu();
cart();
