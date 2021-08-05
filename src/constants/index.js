const { __ } = wp.i18n;
const { Dashicon } = wp.components;

export const EFFECTS_LIST = [
	{ label: __("Apollo"), value: "apollo" },
	{ label: __("Bubba"), value: "bubba" },
	{ label: __("Chico"), value: "chico" },
	{ label: __("Dexter"), value: "dexter" },
	{ label: __("Duke"), value: "duke" },
	{ label: __("Goliath"), value: "goliath" },
	{ label: __("Jazz"), value: "jazz" },
	{ label: __("Julia"), value: "julia" },
	{ label: __("Layla"), value: "layla" },
	{ label: __("Lexi"), value: "lexi" },
	{ label: __("Lily"), value: "lily" },
	{ label: __("Marley"), value: "marley" },
	{ label: __("Milo"), value: "milo" },
	{ label: __("Ming"), value: "ming" },
	{ label: __("Moses"), value: "moses" },
	{ label: __("Oscar"), value: "oscar" },
	{ label: __("Ruby"), value: "ruby" },
	{ label: __("Roxy"), value: "roxy" },
	{ label: __("Romeo"), value: "romeo" },
	{ label: __("Sadie"), value: "sadie" },
	{ label: __("Selena"), value: "selena" },
	{ label: __("Sarah"), value: "sarah" },
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
