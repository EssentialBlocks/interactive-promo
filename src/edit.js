/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect } from "@wordpress/element";
import {
	useBlockProps,
	BlockControls,
	MediaPlaceholder,
	MediaUpload,
} from "@wordpress/block-editor";
import { ToolbarGroup, ToolbarItem, ToolbarButton } from "@wordpress/components";
import { select } from "@wordpress/data";

/**
 * Internal dependencies
 */
import classnames from "classnames";

import Inspector from "./inspector";

import Style from "./style";
import sanitizeLink from "./sanitize-link";

const {
	duplicateBlockIdFix,
} = window.EBInteractivePromoControls;

const Edit = (props) => {
	const { isSelected, attributes, setAttributes, className, clientId, name } = props;
	const {
		blockMeta,
		blockId,
		resOption,
		header,
		content,
		effectName,
		imageURL,
		imageID,
		imageAltTag,
		newWindow,
		link,
		classHook,
	} = attributes;

	// NOTE: every hook must run before the `!imageURL` early return below.
	// Returning ahead of them made the hook count differ between the
	// "no image yet" and "image selected" renders, which throws
	// "Rendered more hooks than during the previous render" the first time a
	// media item is picked — and left blockId ungenerated when it did.

	// this useEffect is for creating an unique id for each block's unique className by a random unique number
	useEffect(() => {
		const BLOCK_PREFIX = "eb-interactive-promo";
		duplicateBlockIdFix({
			BLOCK_PREFIX,
			blockId,
			setAttributes,
			select,
			clientId,
		});
	}, []);

	const blockProps = useBlockProps({
		className: classnames(className, `eb-guten-block-main-parent-wrapper`),
	});

	// Picking an image also takes its alt text, unless the user already set one.
	const onSelectImage = (media) =>
		setAttributes({
			imageURL: media.url,
			imageID: media.id,
			...(!imageAltTag && media.alt ? { imageAltTag: media.alt } : {}),
		});

	if (!imageURL) {
		// The placeholder still needs the block wrapper, or the block cannot be
		// selected and gets no toolbar until an image is picked.
		return (
			<div {...blockProps}>
				<MediaPlaceholder
					onSelect={onSelectImage}
					allowedTypes={["image"]}
					labels={{
						title: __("Images", "interactive-promo"),
						instructions: __(
							"Drag media file, upload or select files from your library.",
							"interactive-promo"
						),
					}}
				/>
			</div>
		);
	}

	return (
		<>
			{isSelected && (
				<Inspector attributes={attributes} setAttributes={setAttributes} />
			)}
			<BlockControls>
				<ToolbarGroup>
					<ToolbarItem>
						{() => (
							<MediaUpload
								onSelect={onSelectImage}
								allowedTypes={["image"]}
								value={imageID}
								render={({ open }) => (
									<ToolbarButton
										className="components-toolbar__control"
										label={__("Edit Image", "interactive-promo")}
										icon="edit"
										onClick={open}
									/>
								)}
							/>
						)}
					</ToolbarItem>
				</ToolbarGroup>
			</BlockControls>
			<div {...blockProps}>
				<Style {...props} />
				<div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
					<div className={`eb-interactive-promo-wrapper ${blockId}`}>
						<div
							className="eb-interactive-promo-container"
							data-effect={effectName}
						>
							<div className="eb-interactive-promo hover-effect">
								<figure className={`effect-${effectName}`}>
									<img src={imageURL} alt={imageAltTag} />
									<figcaption>
										<h2 className="eb-interactive-promo-header">{header}</h2>
										<p className="eb-interactive-promo-content">{content}</p>
										{link && (
											<a
												href={sanitizeLink(link)}
												target={newWindow ? "_blank" : "_self"}
												rel="noopener noreferrer"
												aria-label={header}
											/>
										)}
									</figcaption>
								</figure>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Edit;
