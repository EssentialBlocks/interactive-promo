import {
	wrapperWidth,
	wrapperMargin,
	wrapperPadding,
	wrapperBorderShadow,
} from "./constants";
import * as typoPrefixs from "./constants/typographyPrefixConstants";

import {
	generateResponsiveRangeAttributes,
	generateTypographyAttributes,
	generateBorderShadowAttributes,
	generateDimensionsAttributes,
} from "../util/helpers";

const attributes = {
	// the following 4 attributes is must required for responsive options and asset generation for frontend
	// responsive control attributes ⬇
	resOption: {
		type: "string",
		default: "Desktop",
	},
	// blockId attribute for making unique className and other uniqueness ⬇
	blockId: {
		type: "string",
	},
	blockRoot: {
		type: "string",
		default: "essential_block",
	},
	// blockMeta is for keeping all the styles ⬇
	blockMeta: {
		type: "object",
	},
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

	isWrapperMaxWidth: {
		type: "boolean",
		default: true,
	},
	// typography attributes
	...generateTypographyAttributes(Object.values(typoPrefixs)),
	...generateResponsiveRangeAttributes(wrapperWidth, {
		defaultRange: 480,
	}),
	// dimension attributes
	...generateDimensionsAttributes(wrapperMargin, {
		top: 0,
		right: 0,
		bottom: 25,
		left: 0,
		isLinked: false,
	}),
	...generateDimensionsAttributes(wrapperPadding),
	// border & shadow attributes
	...generateBorderShadowAttributes(wrapperBorderShadow),
};

export default attributes;
