import { registerBlockType } from "@wordpress/blocks";
import { __ } from "@wordpress/i18n";

import "./style.scss";
import Edit from "./edit";
import save from "./save";
import icon from "./icon";
import attributes from "./attributes";

registerBlockType("block/interactive-promo", {
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
