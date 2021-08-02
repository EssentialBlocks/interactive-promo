import {
	wrapperWidth,
	wrapperMargin,
	wrapperPadding,
	imageBorderShadow,
	imageHeight,
	imageWidth,
	imageBackground,
} from "./constants";
import * as typoPrefixs from "./constants/typographyPrefixConstants";

import {
	generateResponsiveRangeAttributes,
	generateTypographyAttributes,
	generateBorderShadowAttributes,
	generateDimensionsAttributes,
	generateBackgroundAttributes,
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
		default: "#ffffff",
	},
	contentColor: {
		type: "string",
		default: "#ffffff",
	},
	link: {
		type: "string",
	},
	isWrapperMaxWidth: {
		type: "boolean",
		default: true,
	},
	imageAlignment: {
		type: "string",
		default: "center",
	},
	isBackgroundGradient: {
		type: "boolean",
		default: false,
	},
	backgroundColor: {
		type: "string",
	},
	backgroundGradient: {
		type: "string",
	},
	// typography attributes
	...generateTypographyAttributes(Object.values(typoPrefixs)),
	...generateResponsiveRangeAttributes(wrapperWidth, {
		defaultRange: 480,
	}),
	...generateResponsiveRangeAttributes(imageHeight),
	...generateResponsiveRangeAttributes(imageWidth),
	// dimension attributes
	...generateDimensionsAttributes(wrapperMargin, {
		top: 28,
		right: 0,
		bottom: 28,
		left: 0,
		isLinked: false,
	}),
	...generateDimensionsAttributes(wrapperPadding),
	// border & shadow attributes
	...generateBorderShadowAttributes(imageBorderShadow),
	// background control
	...generateBackgroundAttributes(imageBackground),
};

export default attributes;
