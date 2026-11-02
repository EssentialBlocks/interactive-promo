// `image_url` is localized by Interactive_Promo_Helper::enqueues(); without it the
// preview would request "undefined/...", so fall back to no image (the placeholder).
const imageBase = window.EssentialBlocksLocalize?.image_url;

const example = {
    attributes: {
        imageURL: imageBase ? `${imageBase}/promo-example.svg` : undefined,
    },
};
export default example;
