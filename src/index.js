const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;

import Edit from "./edit";
import save from "./save";
import icon from "./icon";
import attributes from "./attributes";

registerBlockType("interactive-promo/interactive-promo", {
	title: __("Interactive Promo", "interactive-promo"),
	description: __(
		"Engage your potential audience with exciting promo",
		"interactive-promo"
	),
	keywords: [__("promo", __("interactive"), __("essential"))],
	category: "widgets",
	icon,
	attributes,
	edit: Edit,
	save,
});
