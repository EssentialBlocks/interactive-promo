/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
	useBlockProps,
	BlockControls,
	MediaPlaceholder,
	MediaUpload,
} = wp.blockEditor;
const { Toolbar, Button } = wp.components;
const { useEffect } = wp.element;
const { select } = wp.data;

/**
 * Internal dependencies
 */
import "./editor.scss";
import Inspector from "./inspector";
import {
	wrapperWidth,
	wrapperMargin,
	wrapperPadding,
	wrapperBorderShadow,
	imageBorderShadow,
} from "./constants";
import {
	typoPrefix_header,
	typoPrefix_content,
} from "./constants/typographyPrefixConstants";
import {
	softMinifyCssStrings,
	isCssExists,
	mimmikCssForPreviewBtnClick,
	duplicateBlockIdFix,
	generateDimensionsControlStyles,
	generateBorderShadowStyles,
	generateTypographyStyles,
	generateResponsiveRangeStyles,
} from "../util/helpers";

const Edit = (props) => {
	const { isSelected, attributes, setAttributes, clientId } = props;
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
		headerColor,
		contentColor,
		newWindow,
		link,
		isWrapperMaxWidth,
		imageAlignment,
	} = attributes;

	if (!imageURL) {
		return (
			<MediaPlaceholder
				onSelect={(media) =>
					setAttributes({
						imageURL: media.url,
						imageID: media.id,
					})
				}
				allowTypes={["image"]}
				labels={{
					title: "Images",
					instructions:
						"Drag media file, upload or select files from your library.",
				}}
			/>
		);
	}

	// wrapper styles css in strings
	const {
		dimensionStylesDesktop: wrapperMarginStylesDesktop,
		dimensionStylesTab: wrapperMarginStylesTab,
		dimensionStylesMobile: wrapperMarginStylesMobile,
	} = generateDimensionsControlStyles({
		controlName: wrapperMargin,
		styleFor: "margin",
		attributes,
	});

	const {
		dimensionStylesDesktop: wrapperPaddingStylesDesktop,
		dimensionStylesTab: wrapperPaddingStylesTab,
		dimensionStylesMobile: wrapperPaddingStylesMobile,
	} = generateDimensionsControlStyles({
		controlName: wrapperPadding,
		styleFor: "padding",
		attributes,
	});

	const {
		styesDesktop: wrapperBdShadowStyesDesktop,
		styesTab: wrapperBdShadowStyesTab,
		styesMobile: wrapperBdShadowStyesMobile,
		stylesHoverDesktop: wrapperBdShadowStylesHoverDesktop,
		stylesHoverTab: wrapperBdShadowStylesHoverTab,
		stylesHoverMobile: wrapperBdShadowStylesHoverMobile,
		transitionStyle: wrapperBdShadowTransitionStyle,
	} = generateBorderShadowStyles({
		controlName: wrapperBorderShadow,
		attributes,
	});

	const {
		rangeStylesDesktop: wrapperMaxWidthDesktop,
		rangeStylesTab: wrapperMaxWidthTab,
		rangeStylesMobile: wrapperMaxWidthMobile,
	} = generateResponsiveRangeStyles({
		controlName: wrapperWidth,
		property: "max-width",
		attributes,
	});

	//header typography
	const {
		typoStylesDesktop: headerTypoStylesDesktop,
		typoStylesTab: headerTypoStylesTab,
		typoStylesMobile: headerTypoStylesMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: typoPrefix_header,
	});

	//Content typography
	const {
		typoStylesDesktop: contentTypoStylesDesktop,
		typoStylesTab: contentTypoStylesTab,
		typoStylesMobile: contentTypoStylesMobile,
	} = generateTypographyStyles({
		attributes,
		prefixConstant: typoPrefix_content,
	});

	// image border shadow
	const {
		styesDesktop: imageBorderDesktop,
		styesTab: imageBorderTab,
		styesMobile: imageBorderMobile,
		stylesHoverDesktop: imageBorderHoverDesktop,
		stylesHoverTab: imageBorderHoverTab,
		stylesHoverMobile: imageBorderHoverMobile,
		transitionStyle: imageTransitionStyle,
	} = generateBorderShadowStyles({
		controlName: imageBorderShadow,
		attributes,
		noShadow: true,
	});

	const imageAlign =
		imageAlignment === "left"
			? "margin: 0;"
			: imageAlignment === "right"
			? "margin: 0 0 0 auto;"
			: "margin: 0 auto;";

	const desktopStyles = `
		.eb-interactive-promo-wrapper.${blockId} {
			${wrapperMarginStylesDesktop}
			${wrapperPaddingStylesDesktop}
			${wrapperBdShadowStyesDesktop}
			transition: ${wrapperBdShadowTransitionStyle};
		}

		.eb-interactive-promo-wrapper.${blockId}:hover {
			${wrapperBdShadowStylesHoverDesktop}
		}

		.eb-interactive-promo-wrapper.${blockId} .eb-interactive-promo-header {
			${headerTypoStylesDesktop}
			${headerColor ? `color: ${headerColor};` : ""}
		}

		.eb-interactive-promo-wrapper.${blockId} .eb-interactive-promo-content {
			${contentTypoStylesDesktop}
			color: ${contentColor};
		}

		${
			isWrapperMaxWidth
				? `
				.eb-interactive-promo-wrapper.${blockId} .eb-interactive-promo {
					${wrapperMaxWidthDesktop}
				}
			`
				: ""
		}

		.eb-interactive-promo-wrapper.${blockId} .eb-interactive-promo {
			${imageAlign}
		}

		.eb-interactive-promo-wrapper.${blockId} .eb-interactive-promo figure {
			${imageBorderDesktop}
			position: relative;
			overflow: hidden;
			transition: ${imageTransitionStyle};
		}

		.eb-interactive-promo-wrapper.${blockId} .eb-interactive-promo img {
			min-width: 100%;
		}
		
		.eb-interactive-promo-wrapper.${blockId} .eb-interactive-promo:hover figure {
			${imageBorderHoverDesktop}
		}
	`;
	const tabStyles = `
		.eb-interactive-promo-wrapper.${blockId} {
			${wrapperMarginStylesTab}
			${wrapperPaddingStylesTab}
			${wrapperBdShadowStyesTab}
		}

		.eb-interactive-promo-wrapper.${blockId}:hover {
			${wrapperBdShadowStylesHoverTab}
		}

		.eb-interactive-promo-wrapper.${blockId} .eb-interactive-promo-header {
			${headerTypoStylesTab}
		}

		.eb-interactive-promo-wrapper.${blockId} .eb-interactive-promo-content {
			${contentTypoStylesTab}
		}

		${
			isWrapperMaxWidth
				? `
				.eb-interactive-promo-wrapper.${blockId} .eb-interactive-promo {
					${wrapperMaxWidthTab}
				}
			`
				: ""
		}

		.eb-interactive-promo-wrapper.${blockId} .eb-interactive-promo figure {
			${imageBorderTab}
		}

		.eb-interactive-promo-wrapper.${blockId} .eb-interactive-promo:hover figure {
			${imageBorderHoverTab}
		}
	`;
	const mobileStyles = `
		.eb-interactive-promo-wrapper.${blockId} {
			${wrapperMarginStylesMobile}
			${wrapperPaddingStylesMobile}
			${wrapperBdShadowStyesMobile}
		}

		.eb-interactive-promo-wrapper.${blockId}:hover {
			${wrapperBdShadowStylesHoverMobile}
		}
		
		.eb-interactive-promo-wrapper.${blockId} .eb-interactive-promo-header {
			${headerTypoStylesMobile}
		}

		.eb-interactive-promo-wrapper.${blockId} .eb-interactive-promo-content {
			${contentTypoStylesMobile}
		}

		${
			isWrapperMaxWidth
				? `
				.eb-interactive-promo-wrapper.${blockId} .eb-interactive-promo {
					${wrapperMaxWidthMobile}
				}
			`
				: ""
		}

		.eb-interactive-promo-wrapper.${blockId} .eb-interactive-promo figure {
			${imageBorderMobile}
		}

		.eb-interactive-promo-wrapper.${blockId} .eb-interactive-promo:hover figure {
			${imageBorderHoverMobile}
		}
	`;

	// all css styles for large screen width (desktop/laptop) in strings ⬇
	const desktopAllStyles = softMinifyCssStrings(`
		${isCssExists(desktopStyles) ? desktopStyles : " "}
	`);

	// all css styles for Tab in strings ⬇
	const tabAllStyles = softMinifyCssStrings(`
		${isCssExists(tabStyles) ? tabStyles : " "}
	`);

	// all css styles for Mobile in strings ⬇
	const mobileAllStyles = softMinifyCssStrings(`
		${isCssExists(mobileStyles) ? mobileStyles : " "}
	`);

	// Set All Style in "blockMeta" Attribute
	useEffect(() => {
		const styleObject = {
			desktop: desktopAllStyles,
			tab: tabAllStyles,
			mobile: mobileAllStyles,
		};
		if (JSON.stringify(blockMeta) != JSON.stringify(styleObject)) {
			setAttributes({ blockMeta: styleObject });
		}
	}, [attributes]);

	// this useEffect is for setting the resOption attribute to desktop/tab/mobile depending on the added 'eb-res-option-' class
	useEffect(() => {
		setAttributes({
			resOption: select("core/edit-post").__experimentalGetPreviewDeviceType(),
		});
	}, []);
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

	// this useEffect is for mimmiking css when responsive options clicked from wordpress's 'preview' button
	useEffect(() => {
		mimmikCssForPreviewBtnClick({
			domObj: document,
			select,
		});
	}, []);

	const blockProps = useBlockProps({
		className: `eb-guten-block-main-parent-wrapper`,
	});

	return [
		isSelected && (
			<Inspector attributes={attributes} setAttributes={setAttributes} />
		),
		<BlockControls>
			<Toolbar>
				<MediaUpload
					onSelect={(media) =>
						setAttributes({
							imageURL: media.url,
							imageID: media.id,
						})
					}
					allowedTypes={["image"]}
					value={imageID}
					render={({ open }) => (
						<Button
							className="components-toolbar__control"
							label={__("Edit Image")}
							icon="edit"
							onClick={open}
						/>
					)}
				/>
			</Toolbar>
		</BlockControls>,
		<div {...blockProps}>
			<style>
				{`
				 ${desktopAllStyles}
 
				 /* mimmikcssStart */
 
				 ${resOption === "Tablet" ? tabAllStyles : " "}
				 ${resOption === "Mobile" ? tabAllStyles + mobileAllStyles : " "}
 
				 /* mimmikcssEnd */
 
				 @media all and (max-width: 1024px) {	
 
					 /* tabcssStart */			
					 ${softMinifyCssStrings(tabAllStyles)}
					 /* tabcssEnd */			
				 
				 }
				 
				 @media all and (max-width: 767px) {
					 
					 /* mobcssStart */			
					 ${softMinifyCssStrings(mobileAllStyles)}
					 /* mobcssEnd */			
				 
				 }
				 `}
			</style>
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
										href={link}
										target={newWindow ? "_blank" : "_self"}
										rel="noopener noreferrer"
									/>
								)}
							</figcaption>
						</figure>
					</div>
				</div>
			</div>
		</div>,
	];
};

export default Edit;
