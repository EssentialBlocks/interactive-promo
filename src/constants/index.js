import { __ } from "@wordpress/i18n";
import { Dashicon } from "@wordpress/components";

export const EFFECTS_LIST = [
	{ label: __("Apollo", "interactive-promo"), value: "apollo" },
	{ label: __("Bubba", "interactive-promo"), value: "bubba" },
	{ label: __("Chico", "interactive-promo"), value: "chico" },
	{ label: __("Dexter", "interactive-promo"), value: "dexter" },
	{ label: __("Duke", "interactive-promo"), value: "duke" },
	{ label: __("Goliath", "interactive-promo"), value: "goliath" },
	{ label: __("Jazz", "interactive-promo"), value: "jazz" },
	{ label: __("Julia", "interactive-promo"), value: "julia" },
	{ label: __("Layla", "interactive-promo"), value: "layla" },
	{ label: __("Lexi", "interactive-promo"), value: "lexi" },
	{ label: __("Lily", "interactive-promo"), value: "lily" },
	{ label: __("Marley", "interactive-promo"), value: "marley" },
	{ label: __("Milo", "interactive-promo"), value: "milo" },
	{ label: __("Ming", "interactive-promo"), value: "ming" },
	{ label: __("Moses", "interactive-promo"), value: "moses" },
	{ label: __("Oscar", "interactive-promo"), value: "oscar" },
	{ label: __("Ruby", "interactive-promo"), value: "ruby" },
	{ label: __("Roxy", "interactive-promo"), value: "roxy" },
	{ label: __("Romeo", "interactive-promo"), value: "romeo" },
	{ label: __("Sadie", "interactive-promo"), value: "sadie" },
	{ label: __("Selena", "interactive-promo"), value: "selena" },
	{ label: __("Sarah", "interactive-promo"), value: "sarah" },
];

export const WRAPPER_UNITS = [
	{ label: "px", value: "px" },
	{ label: "%", value: "%" },
];

export const IMAGE_HEIGHT = [
	{ label: "px", value: "px" },
	{ label: "vh", value: "vh" },
];

export const IMAGE_WIDTH = [
	{ label: "px", value: "px" },
	{ label: "vw", value: "vw" },
];

export const ALIGNMENT = [
	{ label: __(<Dashicon icon={"editor-alignleft"} />), value: "left" },
	{ label: __(<Dashicon icon={"editor-aligncenter"} />), value: "center" },
	{ label: __(<Dashicon icon={"editor-alignright"} />), value: "right" },
];

// Responsive Range Controller
export const imageHeight = "imgHeight";
export const imageWidth = "imgWidth";

// responsive dimension controller
export const wrapperMargin = "wrpMargin";
export const wrapperPadding = "wrpPadding";

// border & shadow
export const wrapperBorderShadow = "wrpBrdShdw";
export const imageBorderShadow = "imgBrdShdw";
