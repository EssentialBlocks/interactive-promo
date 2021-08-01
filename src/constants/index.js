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

export const FONT_SIZES = [
	{ name: __("Small"), size: 12, slug: "s" },
	{ name: __("Medium"), size: 16, slug: "m" },
	{ name: __("Large"), size: 24, slug: "l" },
	{ name: __("Extra Large"), size: 36, slug: "xl" },
];

export const BORDER_STYLES = [
	{ label: __("None"), value: "none" },
	{ label: __("Dashed"), value: "dashed" },
	{ label: __("Solid"), value: "solid" },
	{ label: __("Dotted"), value: "dotted" },
	{ label: __("Double"), value: "double" },
	{ label: __("Groove"), value: "groove" },
	{ label: __("Inset"), value: "inset" },
	{ label: __("Outset"), value: "outset" },
	{ label: __("Ridge"), value: "ridge" },
];

export const FONT_WEIGHTS = [
	{ label: __("Lighter"), value: "lighter" },
	{ label: __("Normal"), value: "normal" },
	{ label: __("Bold"), value: "bold" },
	{ label: __("Bolder"), value: "bolder" },
];

export const TEXT_TRANSFORM = [
	{ label: __("None"), value: "none" },
	{ label: __("Lowercase"), value: "lowercase" },
	{ label: __("Capitalize"), value: "capitalize" },
	{ label: __("Uppercase"), value: "uppercase" },
];

export const TEXT_DECORATION = [
	{ label: __("Initial"), value: "initial" },
	{ label: __("Overline"), value: "overline" },
	{ label: __("Line Through"), value: "line-through" },
	{ label: __("Underline"), value: "underline" },
	{ label: __("Underline Oveline"), value: "underline overline" },
];

export const WRAPPER_UNITS = [
	{ label: "px", value: "px" },
	{ label: "%", value: "%" },
];

export const ALIGNMENT = [
	{ label: __(<Dashicon icon={"editor-alignleft"} />), value: "left" },
	{ label: __(<Dashicon icon={"editor-aligncenter"} />), value: "center" },
	{ label: __(<Dashicon icon={"editor-alignright"} />), value: "right" },
];

// Responsive Range Controller
export const wrapperWidth = "wrpWidth";

// responsive dimension controller
export const wrapperMargin = "wrpMargin";
export const wrapperPadding = "wrpPadding";

// border & shadow
export const wrapperBorderShadow = "wrpBrdShdw";
export const imageBorderShadow = "imgBrdShdw";
