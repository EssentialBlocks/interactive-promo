/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { InspectorControls, PanelColorSettings, MediaUpload } = wp.blockEditor;
const {
	PanelBody,
	Button,
	BaseControl,
	TextControl,
	ToggleControl,
	SelectControl,
	RangeControl,
	FontSizePicker,
	Dropdown,
	TabPanel,
} = wp.components;
const { useEffect } = wp.element;
const { select } = wp.data;

/**
 * Internal dependencies
 */
import ImageAvatar from "../util/image-avatar/";
import {
	BORDER_STYLES,
	EFFECTS_LIST,
	FONT_SIZES,
	FONT_WEIGHTS,
	TEXT_TRANSFORM,
	TEXT_DECORATION,
} from "./constants";
import objAttributes from "./attributes";
import DimensionsControl from "../util/dimensions-control";
import UnitControl from "../util/unit-control";
import FontPicker from "../util/typography-control/FontPicker";
import ColorControl from "../util/color-control";
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
		imageHeight,
		imageWidth,
		imageAltTag,
		newWindow,
		headerColor,
		contentColor,
		borderType,
		borderTop,
		borderRight,
		borderBottom,
		borderLeft,
		borderStyle,
		borderColor,
		borderRadius,
		shadowColor,
		hOffset,
		vOffset,
		shadowBlur,
		shadowSpread,
		radiusUnit,
		headerFontFamily,
		headerFontSize,
		headerFontSizeUnit,
		headerFontWeight,
		headerTextTransform,
		headerTextDecoration,
		headerLetterSpacing,
		headerLetterSpacingUnit,
		headerLineHeight,
		headerLineHeightUnit,
		contentFontFamily,
		contentFontSize,
		contentFontSizeUnit,
		contentFontWeight,
		contentTextTransform,
		contentTextDecoration,
		contentLetterSpacing,
		contentLetterSpacingUnit,
		contentLineHeight,
		contentLineHeightUnit,
	} = attributes;

	console.log(imageURL);

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

	const HEADER_SIZE_MAX = headerFontSizeUnit === "em" ? 10 : 100;
	const HEADER_SIZE_STEP = headerFontSizeUnit === "em" ? 0.1 : 1;

	const HEADER_SPACING_MAX = headerLetterSpacingUnit === "em" ? 10 : 100;
	const HEADER_SPACING_STEP = headerLetterSpacingUnit === "em" ? 0.1 : 1;

	const HEADER_LINE_HEIGHT_MAX = headerLineHeightUnit === "em" ? 10 : 100;
	const HEADER_LINE_HEIGHT_STEP = headerLineHeightUnit === "em" ? 0.1 : 1;

	const CONTENT_SIZE_MAX = contentFontSizeUnit === "em" ? 10 : 100;
	const CONTENT_SIZE_STEP = contentFontSizeUnit === "em" ? 0.1 : 1;

	const CONTENT_SPACING_MAX = contentLetterSpacingUnit === "em" ? 10 : 100;
	const CONTENT_SPACING_STEP = contentLetterSpacingUnit === "em" ? 0.1 : 1;

	const CONTENT_LINE_HEIGHT_MAX = contentLineHeightUnit === "em" ? 10 : 100;
	const CONTENT_LINE_HEIGHT_STEP = contentLineHeightUnit === "em" ? 0.1 : 1;

	return (
		<InspectorControls key="controls">
			<div className="eb-panel-control">
				<TabPanel
					className="eb-parent-tab-panel"
					activeClass="active-tab"
					// onSelect={onSelect}
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
									<PanelBody title={__("Promo Settings")}>
										<TextControl
											label={__("Header")}
											value={header}
											onChange={(header) => setAttributes({ header })}
										/>

										<TextControl
											label={__("Content")}
											value={content}
											onChange={(content) => setAttributes({ content })}
										/>
										<TextControl
											label={__("Link")}
											value={link}
											onChange={(link) => setAttributes({ link })}
										/>

										<SelectControl
											label={__("Promo Effect")}
											value={effectName}
											options={EFFECTS_LIST}
											onChange={(newEffect) =>
												setAttributes({ effectName: newEffect })
											}
										/>

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
											<RangeControl
												label={__("Image Height")}
												value={imageHeight}
												allowReset
												onChange={(newSize) =>
													setAttributes({ imageHeight: newSize })
												}
												min={200}
												max={600}
											/>
										)}

										{imageURL && (
											<RangeControl
												label={__("Image Width")}
												value={imageWidth}
												allowReset
												onChange={(newSize) =>
													setAttributes({ imageWidth: newSize })
												}
												min={0}
												max={600}
											/>
										)}

										{imageURL && (
											<TextControl
												label={__("Image alt tag")}
												value={imageAltTag}
												onChange={(newValue) =>
													setAttributes({ imageAltTag: newValue })
												}
											/>
										)}

										<ToggleControl
											label={__("Open in new window")}
											checked={newWindow}
											onChange={() => setAttributes({ newWindow: !newWindow })}
										/>

										<BaseControl
											label={__("Header Typography")}
											className="eb-typography-base"
										>
											<Dropdown
												className="eb-typography-dropdown"
												contentClassName="my-popover-content-classname"
												position="bottom right"
												renderToggle={({ isOpen, onToggle }) => (
													<Button
														isSmall
														onClick={onToggle}
														aria-expanded={isOpen}
														icon="edit"
													></Button>
												)}
												renderContent={() => (
													<div style={{ padding: "1rem" }}>
														<FontPicker
															label={__("Font Family")}
															value={headerFontFamily}
															onChange={(headerFontFamily) =>
																setAttributes({ headerFontFamily })
															}
														/>

														<UnitControl
															selectedUnit={headerFontSizeUnit}
															unitTypes={[
																{ label: "px", value: "px" },
																{ label: "em", value: "em" },
																{ label: "%", value: "%" },
															]}
															onClick={(headerFontSizeUnit) =>
																setAttributes({ headerFontSizeUnit })
															}
														/>

														<RangeControl
															label={__("Font Size")}
															value={headerFontSize}
															allowReset
															onChange={(headerFontSize) =>
																setAttributes({ headerFontSize })
															}
															step={HEADER_SIZE_STEP}
															min={0}
															max={HEADER_SIZE_MAX}
														/>

														<SelectControl
															label={__("Font Weight")}
															value={headerFontWeight}
															options={FONT_WEIGHTS}
															onChange={(headerFontWeight) =>
																setAttributes({ headerFontWeight })
															}
														/>

														<SelectControl
															label={__("Text Transform")}
															value={headerTextTransform}
															options={TEXT_TRANSFORM}
															onChange={(headerTextTransform) =>
																setAttributes({ headerTextTransform })
															}
														/>

														<SelectControl
															label={__("Text Decoration")}
															value={headerTextDecoration}
															options={TEXT_DECORATION}
															onChange={(headerTextDecoration) =>
																setAttributes({ headerTextDecoration })
															}
														/>

														<UnitControl
															selectedUnit={headerLetterSpacingUnit}
															unitTypes={[
																{ label: "px", value: "px" },
																{ label: "em", value: "em" },
																{ label: "%", value: "%" },
															]}
															onClick={(headerLetterSpacingUnit) =>
																setAttributes({ headerLetterSpacingUnit })
															}
														/>

														<RangeControl
															label={__("Letter Spacing")}
															value={headerLetterSpacing}
															allowReset
															onChange={(headerLetterSpacing) =>
																setAttributes({ headerLetterSpacing })
															}
															step={HEADER_SPACING_STEP}
															min={0}
															max={HEADER_SPACING_MAX}
														/>

														<UnitControl
															selectedUnit={headerLineHeightUnit}
															unitTypes={[
																{ label: "px", value: "px" },
																{ label: "em", value: "em" },
															]}
															onClick={(headerLineHeightUnit) =>
																setAttributes({ headerLineHeightUnit })
															}
														/>

														<RangeControl
															label={__("Line Height")}
															value={headerLineHeight}
															allowReset
															onChange={(headerLineHeight) =>
																setAttributes({ headerLineHeight })
															}
															step={HEADER_LINE_HEIGHT_STEP}
															min={0}
															max={HEADER_LINE_HEIGHT_MAX}
														/>
													</div>
												)}
											/>
										</BaseControl>

										<BaseControl
											label={__("Content Typography")}
											className="eb-typography-base"
										>
											<Dropdown
												className="eb-typography-dropdown"
												contentClassName="my-popover-content-classname"
												position="bottom right"
												renderToggle={({ isOpen, onToggle }) => (
													<Button
														isSmall
														onClick={onToggle}
														aria-expanded={isOpen}
														icon="edit"
													></Button>
												)}
												renderContent={() => (
													<div style={{ padding: "1rem" }}>
														<FontPicker
															label={__("Font Family")}
															value={contentFontFamily}
															onChange={(contentFontFamily) =>
																setAttributes({ contentFontFamily })
															}
														/>
														<UnitControl
															selectedUnit={contentFontSizeUnit}
															unitTypes={[
																{ label: "px", value: "px" },
																{ label: "em", value: "em" },
																{ label: "%", value: "%" },
															]}
															onClick={(contentFontSizeUnit) =>
																setAttributes({ contentFontSizeUnit })
															}
														/>
														<RangeControl
															label={__("Font Size")}
															value={contentFontSize}
															allowReset
															onChange={(contentFontSize) =>
																setAttributes({ contentFontSize })
															}
															step={CONTENT_SIZE_STEP}
															min={0}
															max={CONTENT_SIZE_MAX}
														/>
														<SelectControl
															label={__("Font Weight")}
															value={contentFontWeight}
															options={FONT_WEIGHTS}
															onChange={(contentFontWeight) =>
																setAttributes({ contentFontWeight })
															}
														/>
														<SelectControl
															label={__("Text Transform")}
															value={contentTextTransform}
															options={TEXT_TRANSFORM}
															onChange={(contentTextTransform) =>
																setAttributes({ contentTextTransform })
															}
														/>
														<SelectControl
															label={__("Text Decoration")}
															value={contentTextDecoration}
															options={TEXT_DECORATION}
															onChange={(contentTextDecoration) =>
																setAttributes({ contentTextDecoration })
															}
														/>
														<UnitControl
															selectedUnit={contentLetterSpacingUnit}
															unitTypes={[
																{ label: "px", value: "px" },
																{ label: "em", value: "em" },
																{ label: "%", value: "%" },
															]}
															onClick={(contentLetterSpacingUnit) =>
																setAttributes({ contentLetterSpacingUnit })
															}
														/>
														<RangeControl
															label={__("Letter Spacing")}
															value={contentLetterSpacing}
															allowReset
															onChange={(contentLetterSpacing) =>
																setAttributes({ contentLetterSpacing })
															}
															step={CONTENT_SPACING_STEP}
															min={0}
															max={CONTENT_SPACING_MAX}
														/>
														<UnitControl
															selectedUnit={contentLineHeightUnit}
															unitTypes={[
																{ label: "px", value: "px" },
																{ label: "em", value: "em" },
															]}
															onClick={(contentLineHeightUnit) =>
																setAttributes({ contentLineHeightUnit })
															}
														/>
														<RangeControl
															label={__("Line Height")}
															value={contentLineHeight}
															allowReset
															onChange={(contentLineHeight) =>
																setAttributes({ contentLineHeight })
															}
															step={CONTENT_LINE_HEIGHT_STEP}
															min={0}
															max={CONTENT_LINE_HEIGHT_MAX}
														/>
													</div>
												)}
											/>
										</BaseControl>
									</PanelBody>

									<PanelColorSettings
										title={__("Colors")}
										initialOpen={false}
										colorSettings={[
											{
												label: __("Header Color"),
												value: headerColor,
												onChange: (newColor) =>
													setAttributes({ headerColor: newColor }),
											},
											{
												label: __("Content Color"),
												value: contentColor,
												onChange: (newColor) =>
													setAttributes({ contentColor: newColor }),
											},
										]}
									/>

									<PanelBody
										title={__("Content Font Size")}
										initialOpen={false}
									>
										<FontSizePicker
											fontSizes={FONT_SIZES}
											withSlider
											value={contentFontSize}
											onChange={(newSize) =>
												setAttributes({ contentFontSize: newSize })
											}
										/>
									</PanelBody>

									<PanelBody title={__("Border Settings")} initialOpen={false}>
										<DimensionsControl
											label={__("Border Width")}
											top={borderTop}
											right={borderRight}
											bottom={borderBottom}
											left={borderLeft}
											onChange={({ top, right, bottom, left }) =>
												setAttributes({
													borderTop: top,
													borderRight: right,
													borderBottom: bottom,
													borderLeft: left,
												})
											}
										/>

										<SelectControl
											label={__("Border Type")}
											value={borderType}
											onChange={(newType) =>
												setAttributes({ borderType: newType })
											}
										/>

										<SelectControl
											label={__("Border Styles")}
											value={borderStyle}
											options={BORDER_STYLES}
											onChange={(newStyle) =>
												setAttributes({ borderStyle: newStyle })
											}
										/>

										<ColorControl
											label={__("Border Color")}
											color={borderColor}
											onChange={(borderColor) => setAttributes({ borderColor })}
										/>

										<UnitControl
											selectedUnit={radiusUnit}
											unitTypes={[
												{ label: "px", value: "px" },
												{ label: "em", value: "em" },
												{ label: "%", value: "%" },
											]}
											onClick={(radiusUnit) => setAttributes({ radiusUnit })}
										/>

										<RangeControl
											label={__("Border Radius")}
											value={borderRadius}
											allowReset
											onChange={(newSize) =>
												setAttributes({ borderRadius: newSize })
											}
											min={0}
											max={100}
										/>
									</PanelBody>

									<PanelBody title={__("Shadow Settings")} initialOpen={false}>
										<ColorControl
											label={__("Shadow Color")}
											color={shadowColor}
											onChange={(shadowColor) => setAttributes({ shadowColor })}
										/>

										<RangeControl
											label={__("Horizontal Offset")}
											value={hOffset}
											allowReset
											onChange={(newValue) =>
												setAttributes({ hOffset: newValue })
											}
											min={0}
											max={100}
										/>

										<RangeControl
											label={__("Vertical Offset")}
											value={vOffset}
											allowReset
											onChange={(newValue) =>
												setAttributes({ vOffset: newValue })
											}
											min={0}
											max={100}
										/>

										<RangeControl
											label={__("Blur")}
											value={shadowBlur}
											allowReset
											onChange={(newValue) =>
												setAttributes({ shadowBlur: newValue })
											}
											min={0}
											max={100}
										/>

										<RangeControl
											label={__("Spread")}
											value={shadowSpread}
											allowReset
											onChange={(newValue) =>
												setAttributes({ shadowSpread: newValue })
											}
											min={0}
											max={100}
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
