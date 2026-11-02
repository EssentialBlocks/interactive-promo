/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect } from "@wordpress/element";
import { InspectorControls, MediaUpload } from "@wordpress/block-editor";
import {
	PanelBody,
	Button,
	ButtonGroup,
	BaseControl,
	TextControl,
	TextareaControl,
	ToggleControl,
	SelectControl,
	TabPanel
} from "@wordpress/components";
import { select } from "@wordpress/data";

/**
 * Internal dependencies
 */
import {
	ALIGNMENT,
	EFFECTS_LIST,
	imageHeight,
	imageWidth,
	wrapperMargin,
	wrapperPadding,
	imageBorderShadow,
} from "./constants";
import {
	typoPrefix_header,
	typoPrefix_content,
} from "./constants/typographyPrefixConstants";

import objAttributes from "./attributes";

const {
	ImageAvatar,
	ColorControl,
	ResponsiveRangeController,
	TypographyDropdown,
	ResponsiveDimensionsControl,
	BorderShadowControl,
	GradientColorControl,
	AdvancedControls,
} = window.EBInteractivePromoControls;

const Inspector = ({ attributes, setAttributes }) => {
	const {
		resOption,
		effectName,
		header,
		content,
		link,
		imageURL,
		imageID,
		imageAltTag,
		newWindow,
		headerColor,
		contentColor,
		imageAlignment,
		isBackgroundGradient,
		backgroundColor,
		backgroundGradient,
	} = attributes;

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
							title: __("General", "interactive-promo"),
							className: "eb-tab general",
						},
						{
							name: "styles",
							title: __("Style", "interactive-promo"),
							className: "eb-tab styles",
						},
						{
							name: "advance",
							title: __("Advanced", "interactive-promo"),
							className: "eb-tab advance",
						},
					]}
				>
					{(tab) => (
						<div className={"eb-tab-controls " + tab.name}>
							{tab.name === "general" && (
								<>
									<PanelBody>
										<BaseControl label={__("Background Image", "interactive-promo")}>
											<MediaUpload
												onSelect={(media) =>
													setAttributes({
														imageURL: media.url,
														imageID: media.id,
													})
												}
												allowedTypes={["image"]}
												value={imageID}
												render={({ open }) =>
													!imageURL && (
														<Button
															className="eb-cia-upload-button"
															label={__("Upload Image", "interactive-promo")}
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
														setAttributes({ imageURL: null, imageID: null })
													}
												/>
											)}
										</BaseControl>
										<ResponsiveRangeController
											baseLabel={__("Height", "interactive-promo")}
											controlName={imageHeight}
											resRequiredProps={resRequiredProps}
											min={200}
											max={1000}
											step={1}
											noUnits
										/>
										<ResponsiveRangeController
											baseLabel={__("Width", "interactive-promo")}
											controlName={imageWidth}
											resRequiredProps={resRequiredProps}
											min={0}
											max={1000}
											step={1}
											noUnits
										/>
										<TextControl
											label={__("Image alt tag", "interactive-promo")}
											value={imageAltTag}
											onChange={(newValue) =>
												setAttributes({ imageAltTag: newValue })
											}
										/>
										<TextControl
											label={__("Header", "interactive-promo")}
											value={header}
											onChange={(header) => setAttributes({ header })}
										/>
										<TextareaControl
											label={__("Content", "interactive-promo")}
											value={content}
											onChange={(content) => setAttributes({ content })}
										/>
										<TextControl
											label={__("Link", "interactive-promo")}
											value={link}
											onChange={(link) => setAttributes({ link })}
										/>
										<ToggleControl
											label={__("Open in New Tab", "interactive-promo")}
											checked={newWindow}
											onChange={() => setAttributes({ newWindow: !newWindow })}
										/>
										<BaseControl>
											<h3 className="eb-control-title">
												{__("Alignment", "interactive-promo")}
											</h3>
											<ButtonGroup>
												{ALIGNMENT.map((item, index) => (
													<Button
														key={index}
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
										<SelectControl
											label={__("Promo Effect", "interactive-promo")}
											value={effectName}
											options={EFFECTS_LIST}
											onChange={(newEffect) =>
												setAttributes({ effectName: newEffect })
											}
										/>
									</PanelBody>
								</>
							)}
							{tab.name === "styles" && (
								<>
									<PanelBody>
										<BaseControl>
											<h3 className="eb-control-title">
												{__("Background Color", "interactive-promo")}
											</h3>
										</BaseControl>
										<ToggleControl
											label={__("Show Gradient Color", "interactive-promo")}
											checked={isBackgroundGradient}
											onChange={() => {
												setAttributes({
													isBackgroundGradient: !isBackgroundGradient,
												});
											}}
										/>
										{isBackgroundGradient || (
											<ColorControl
												label={__("Color", "interactive-promo")}
												color={backgroundColor}
												onChange={(backgroundColor) =>
													setAttributes({ backgroundColor })
												}
											/>
										)}
										{isBackgroundGradient && (
											<>
												<GradientColorControl
													label={__("Gradient Color", "interactive-promo")}
													gradientColor={backgroundGradient}
													onChange={(backgroundGradient) =>
														setAttributes({ backgroundGradient })
													}
												/>
											</>
										)}
									</PanelBody>
									<PanelBody
										title={__("Header", "interactive-promo")}
										initialOpen={false}
									>
										<>
											<TypographyDropdown
												baseLabel={__("Typography", "interactive-promo")}
												typographyPrefixConstant={typoPrefix_header}
												resRequiredProps={resRequiredProps}
											/>
											<ColorControl
												label={__("Color", "interactive-promo")}
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
												baseLabel={__("Typography", "interactive-promo")}
												typographyPrefixConstant={typoPrefix_content}
												resRequiredProps={resRequiredProps}
											/>
											<ColorControl
												label={__("Color", "interactive-promo")}
												color={contentColor}
												onChange={(contentColor) =>
													setAttributes({ contentColor })
												}
											/>
										</>
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
											controlName={imageBorderShadow}
											resRequiredProps={resRequiredProps}
										/>
									</PanelBody>

									<AdvancedControls attributes={attributes} setAttributes={setAttributes} />
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
