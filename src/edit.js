/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { BlockControls, MediaPlaceholder, MediaUpload } = wp.blockEditor;
const { Toolbar, Button } = wp.components;
const { Component } = wp.element;

/**
 * Internal dependencies
 */

import "./editor.scss";

import Inspector from "./inspector";

export default class Edit extends Component {
	render() {
		const { isSelected, attributes, setAttributes } = this.props;
		const {
			header,
			content,
			effectName,
			imageURL,
			imageID,
			imageHeight,
			imageWidth,
			imageAltTag,
			headerColor,
			contentColor,
			newWindow,
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
			link,
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

		const headerStyles = {
			color: headerColor || "#ffffff",
			fontFamily: headerFontFamily,
			fontSize: headerFontSize
				? `${headerFontSize}${headerFontSizeUnit}`
				: undefined,
			fontWeight: headerFontWeight,
			textTransform: headerTextTransform,
			textDecoration: headerTextDecoration,
			letterSpacing: headerLetterSpacing
				? `${headerLetterSpacing}${headerLetterSpacingUnit}`
				: undefined,
			lineHeight: headerLineHeight
				? `${headerLineHeight}${headerLineHeightUnit}`
				: undefined,
		};

		const contentStyles = {
			color: contentColor || "#ffffff",
			fontFamily: contentFontFamily,
			fontSize: contentFontSize
				? `${contentFontSize}${contentFontSizeUnit}`
				: undefined,
			fontWeight: contentFontWeight,
			textTransform: contentTextTransform,
			textDecoration: contentTextDecoration,
			letterSpacing: contentLetterSpacing
				? `${contentLetterSpacing}${contentLetterSpacingUnit}`
				: undefined,
			lineHeight: contentLineHeight
				? `${contentLineHeight}${contentLineHeightUnit}`
				: undefined,
		};

		const figureStyles = {
			height: imageHeight ? `${imageHeight}px` : "100%",
			width: imageWidth ? `${imageWidth}px` : "100%",
			position: "relative",
			overflow: "hidden",
			borderWidth: `${borderTop}px ${borderRight}px ${borderBottom}px ${borderLeft}px`,
			borderStyle: borderStyle,
			borderColor: borderColor,
			borderRadius: `${borderRadius || 0}${radiusUnit}`,
			boxShadow: `${hOffset || 0}px ${vOffset || 0}px ${shadowBlur || 0}px ${
				shadowSpread || 0
			}px ${shadowColor || "#000000"}`,
		};

		const imageStyles = {
			minWidth: "100%",
		};

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

		return [
			isSelected && <Inspector {...this.props} />,
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

			<div className="eb-interactive-promo-container">
				<div className="eb-interactive-promo hover-effect">
					<figure className={`effect-${effectName}`} style={figureStyles}>
						<img src={imageURL} alt={imageAltTag} style={imageStyles} />
						<figcaption>
							<h2 className="eb-interactive-promo-header" style={headerStyles}>
								{header}
							</h2>
							<p className="eb-interactive-promo-content" style={contentStyles}>
								{content}
							</p>
							<a
								href={link}
								target={newWindow ? "_blank" : "_self"}
								rel="noopener noreferrer"
							/>
						</figcaption>
					</figure>
				</div>
			</div>,
		];
	}
}
