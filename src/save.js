const Save = ({ attributes }) => {
	const {
		header,
		content,
		effectName,
		imageURL,
		imageHeight,
		imageWidth,
		imageAltTag,
		headerColor,
		contentColor,
		contentFontSize,
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
		radiusUnit
	} = attributes;

	const headerStyles = {
		color: headerColor || "#ffffff"
	};

	const contentStyles = {
		color: contentColor || "#ffffff",
		fontSize: `${contentFontSize || 14}px`
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
		boxShadow: `${hOffset || 0}px ${vOffset || 0}px ${shadowBlur ||
			0}px ${shadowSpread || 0}px ${shadowColor || "#000000"}`
	};

	const imageStyles = {
		minWidth: "100%"
	};

	return (
		<div className="eb-interactive-promo-container" data-effect={effectName}>
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
							className="eb-interactive-promo-link"
							target={newWindow ? "_blank" : "_self"}
							rel="noopener noreferrer"
						/>
					</figcaption>
				</figure>
			</div>
		</div>
	);
};

export default Save;
