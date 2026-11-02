/**
 * WordPress dependeincies
 */
import { __ } from "@wordpress/i18n";
import { registerBlockType } from "@wordpress/blocks";

/**
 * Internal dependencies
 */
import { InteractivePromoIcon } from "./icon";
import Edit from "./edit";
import Save from "./save";
import example from "./example";
import attributes from "./attributes";
import deprecated from "./deprecated";
import metadata from "../block.json";
const { ebConditionalRegisterBlockType } = EBInteractivePromoControls;

ebConditionalRegisterBlockType(metadata, {
	icon: InteractivePromoIcon,
	attributes,
	keywords: [
		__("promo", "interactive-promo"),
		__("message", "interactive-promo"),
		__("eb essential", "interactive-promo"),
		__("interactive", "interactive-promo"),
	],
	edit: Edit,
	save: Save,
	example,
	deprecated,
});
