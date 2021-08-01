/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { InspectorControls, MediaUpload } = wp.blockEditor;
const {
	PanelBody,
	Button,
	ButtonGroup,
	BaseControl,
	TextControl,
	TextareaControl,
	ToggleControl,
	SelectControl,
	TabPanel,
} = wp.components;
const { useEffect } = wp.element;
const { select } = wp.data;

/**
 * Internal dependencies
 */
import {
	ALIGNMENT,
	EFFECTS_LIST,
	WRAPPER_UNITS,
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
import ImageAvatar from "../util/image-avatar";
import objAttributes from "./attributes";
import ColorControl from "../util/color-control";
import ResponsiveRangeController from "../util/responsive-range-control";
import TypographyDropdown from "../util/typography-control-v2";
import ResponsiveDimensionsControl from "../util/dimensions-control-v2";
import BorderShadowControl from "../util/border-shadow-control";
import {
	mimmikCssForResBtns,
	mimmikCssOnPreviewBtnClickWhileBlockSelected,
} from "../util/helpers";

const Inspector = ({ attributes, setAttributes }) => {
	const {
		resOption,
		effectName,
		header,
		content,
		link,
		imageURL,
		imageAltTag,
		newWindow,
		headerColor,
		contentColor,
		isWrapperMaxWidth,
		imageAlignment,
	} = attributes;
	// this useEffect is for setting the resOption attribute to desktop/tab/mobile depending on the added 'eb-res-option-' class only the first time once
	useEffect(() => {
		setAttributes({
			resOption: select("core/edit-post").__experimentalGetPreviewDeviceType(),
		});
	}, []);

	// this useEffect is for mimmiking css for all the eb blocks on resOption changing
	useEffect(() => {
		mimmikCssForResBtns({
			domObj: document,
			resOption,
		});
	}, [resOption]);

	// this useEffect is to mimmik css for responsive preview in the editor page when clicking the buttons in the 'Preview button of wordpress' located beside the 'update' button while any block is selected and it's inspector panel is mounted in the DOM
	useEffect(() => {
		const cleanUp = mimmikCssOnPreviewBtnClickWhileBlockSelected({
			domObj: document,
			select,
			setAttributes,
		});
		return () => {
			cleanUp();
		};
	}, []);

	const resRequiredProps = {
		setAttributes,
		resOption,
		attributes,
		objAttributes,
	};

	return (
		<InspectorControls key="controls">
			<div className="eb-panel-control">
				<TabPanel
					className="eb-parent-tab-panel"
					activeClass="active-tab"
					tabs={[
						{
							name: "general",
							title: "General",
							className: "eb-tab general",
						},
						{
							name: "styles",
							title: "Styles",
							className: "eb-tab styles",
						},
						{
							name: "advance",
							title: "Advance",
							className: "eb-tab advance",
						},
					]}
				>
					{(tab) => (
						<div className={"eb-tab-controls " + tab.name}>
							{tab.name === "general" && (
								<>
									<PanelBody title={__("Content")}>
										<BaseControl label={__("Background Image")}>
											<MediaUpload
												onSelect={(media) =>
													setAttributes({
														imageURL: media.url,
													})
												}
												type="image"
												value={imageURL}
												render={({ open }) =>
													!imageURL && (
														<Button
															className="eb-cia-upload-button"
															label={__("Upload Image")}
															icon="format-image"
															onClick={open}
														/>
													)
												}
											/>
											{imageURL && (
												<ImageAvatar
													imageUrl={imageURL}
													onDeleteImage={() =>
														setAttributes({ imageURL: null })
													}
												/>
											)}
										</BaseControl>
										{imageURL && (
											<TextControl
												label={__("Image alt tag")}
												value={imageAltTag}
												onChange={(newValue) =>
													setAttributes({ imageAltTag: newValue })
												}
											/>
										)}
										<TextControl
											label={__("Header")}
											value={header}
											onChange={(header) => setAttributes({ header })}
										/>
										<TextareaControl
											label={__("Content")}
											value={content}
											onChange={(content) => setAttributes({ content })}
										/>
										<TextControl
											label={__("Link")}
											value={link}
											onChange={(link) => setAttributes({ link })}
										/>
										<ToggleControl
											label={__("Open in new window")}
											checked={newWindow}
											onChange={() => setAttributes({ newWindow: !newWindow })}
										/>
									</PanelBody>

									<PanelBody
										title={__("Settings", "interactive-promo")}
										initialOpen={false}
									>
										<SelectControl
											label={__("Promo Effect")}
											value={effectName}
											options={EFFECTS_LIST}
											onChange={(newEffect) =>
												setAttributes({ effectName: newEffect })
											}
										/>
										<ToggleControl
											label={__(
												"Set Max Width For The Container",
												"interactive-promo"
											)}
											checked={isWrapperMaxWidth}
											onChange={() =>
												setAttributes({ isWrapperMaxWidth: !isWrapperMaxWidth })
											}
										/>
										{isWrapperMaxWidth && (
											<ResponsiveRangeController
												baseLabel={__(
													"Container Max Width",
													"interactive-promo"
												)}
												controlName={wrapperWidth}
												resRequiredProps={resRequiredProps}
												min={0}
												max={1000}
												step={1}
												units={WRAPPER_UNITS}
											/>
										)}
									</PanelBody>
								</>
							)}
							{tab.name === "styles" && (
								<>
									<PanelBody
										title={__("Header", "interactive-promo")}
										initialOpen={false}
									>
										<>
											<TypographyDropdown
												baseLabel={__("Typography")}
												typographyPrefixConstant={typoPrefix_header}
												resRequiredProps={resRequiredProps}
											/>
											<ColorControl
												label={__("Color")}
												color={headerColor}
												onChange={(headerColor) =>
													setAttributes({ headerColor })
												}
											/>
										</>
									</PanelBody>
									<PanelBody
										title={__("Content", "interactive-promo")}
										initialOpen={false}
									>
										<>
											<TypographyDropdown
												baseLabel={__("Typography")}
												typographyPrefixConstant={typoPrefix_content}
												resRequiredProps={resRequiredProps}
											/>
											<ColorControl
												label={__("Color")}
												color={contentColor}
												onChange={(contentColor) =>
													setAttributes({ contentColor })
												}
											/>
										</>
									</PanelBody>
									<PanelBody
										title={__("Image", "interactive-promo")}
										initialOpen={false}
									>
										<BaseControl>
											<h3 className="eb-control-title">
												{__("Alignment", "interactive-promo")}
											</h3>
											<ButtonGroup>
												{ALIGNMENT.map((item) => (
													<Button
														isLarge
														isPrimary={imageAlignment === item.value}
														isSecondary={imageAlignment !== item.value}
														onClick={() =>
															setAttributes({
																imageAlignment: item.value,
															})
														}
													>
														{item.label}
													</Button>
												))}
											</ButtonGroup>
										</BaseControl>
										<BaseControl>
											<h3 className="eb-control-title">
												{__("Border", "interactive-promo")}
											</h3>
										</BaseControl>
										<BorderShadowControl
											controlName={imageBorderShadow}
											resRequiredProps={resRequiredProps}
											noShadow
										/>
									</PanelBody>
								</>
							)}
							{tab.name === "advance" && (
								<>
									<PanelBody>
										<ResponsiveDimensionsControl
											resRequiredProps={resRequiredProps}
											controlName={wrapperMargin}
											baseLabel={__("Margin", "interactive-promo")}
										/>
										<ResponsiveDimensionsControl
											resRequiredProps={resRequiredProps}
											controlName={wrapperPadding}
											baseLabel={__("Padding", "interactive-promo")}
										/>
									</PanelBody>
									<PanelBody
										title={__("Border & Shadow", "interactive-promo")}
										initialOpen={false}
									>
										<BorderShadowControl
											controlName={wrapperBorderShadow}
											resRequiredProps={resRequiredProps}
										/>
									</PanelBody>
								</>
							)}
						</div>
					)}
				</TabPanel>
			</div>
		</InspectorControls>
	);
};

export default Inspector;
