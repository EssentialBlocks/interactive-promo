const attributes = {
	header: {
		type: "string",
		source: "text",
		selector: "h2",
		default: "Header",
	},
	content: {
		type: "string",
		source: "text",
		selector: ".eb-interactive-promo-content",
		default: "Content Text",
	},
	effectName: {
		type: "string",
		selector: ".eb-interactive-promo-container",
		source: "attribute",
		attribute: "data-effect",
		default: "apollo",
	},
	imageURL: {
		type: "string",
		selector: "img",
		source: "attribute",
		attribute: "src",
	},
	imageID: {
		type: "string",
		default: null,
	},
	imageHeight: {
		type: "number",
	},
	imageWidth: {
		type: "number",
	},
	imageAltTag: {
		type: "string",
		selector: "img",
		source: "attribute",
		attribute: "alt",
		default: "image",
	},
	newWindow: {
		type: "boolean",
		default: false,
	},
	headerColor: {
		type: "string",
	},
	contentColor: {
		type: "string",
	},
	linkedBorderWidth: {
		type: "boolean",
		default: true,
	},
	borderTop: {
		type: "number",
		default: 0,
	},
	borderRight: {
		type: "number",
	},
	borderBottom: {
		type: "number",
		default: 0,
	},
	borderLeft: {
		type: "number",
		default: 0,
	},
	borderStyle: {
		default: "none",
	},
	borderColor: {
		type: "string",
	},
	borderRadius: {
		type: "number",
		default: 0,
	},
	shadowColor: {
		type: "string",
	},
	hOffset: {
		type: "number",
	},
	vOffset: {
		type: "number",
	},
	shadowBlur: {
		type: "number",
	},
	shadowSpread: {
		type: "number",
	},
	link: {
		type: "string",
	},
	radiusUnit: {
		type: "string",
		default: "px",
	},
	headerFontFamily: {
		type: "string",
	},
	headerFontSize: {
		type: "number",
	},
	headerFontSizeUnit: {
		type: "string",
		default: "px",
	},
	headerFontWeight: {
		type: "string",
		default: "normal",
	},
	headerLetterSpacing: {
		type: "number",
	},
	headerLetterSpacingUnit: {
		type: "string",
		default: "px",
	},
	headerLineHeight: {
		type: "number",
	},
	headerLineHeightUnit: {
		type: "string",
		default: "px",
	},
	headerTextTransform: {
		type: "string",
	},
	headerTextDecoration: {
		type: "string",
	},
	contentFontFamily: {
		type: "string",
	},
	contentFontSize: {
		type: "number",
	},
	contentFontSizeUnit: {
		type: "string",
		default: "px",
	},
	contentFontWeight: {
		type: "string",
		default: "normal",
	},
	contentLetterSpacing: {
		type: "number",
	},
	contentLetterSpacingUnit: {
		type: "string",
		default: "px",
	},
	contentLineHeight: {
		type: "number",
	},
	contentLineHeightUnit: {
		type: "string",
		default: "px",
	},
	contentTextTransform: {
		type: "string",
	},
	contentTextDecoration: {
		type: "string",
	},
};

export default attributes;
