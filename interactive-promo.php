<?php
/**
 * Plugin Name:     Interactive Promo
 * Plugin URI:      https://essential-blocks.com
 * Description:     Engage your potential audience with an exciting promo.
 * Version:         1.0.0
 * Author:          WPDeveloper
 * Author URI:      https://wpdeveloper.net
 * License:         GPL-3.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:     interactive-promo 
 *
 * @package         interactive-promo 
 */

/**
 * Registers all block assets so that they can be enqueued through the block editor
 * in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */

require_once __DIR__ . '/includes/font-loader.php';
require_once __DIR__ . '/includes/post-meta.php';

function create_block_interactive_promo_block_init() {
	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "block/interactive-promo" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'create-block-interactive-promo-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'create-block-interactive-promo-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

  wp_enqueue_style(
    'hover-effects-style',
    plugins_url('src/css/hover-effects.css', __FILE__),
    array()
  );

	if( ! WP_Block_Type_Registry::get_instance()->is_registered( 'essential-blocks/interactive-promo' ) ) {
    register_block_type( 'block/interactive-promo', array(
      'editor_script' => 'create-block-interactive-promo-block-editor',
      'editor_style'  => 'create-block-interactive-promo-block-editor',
      'style'         => 'create-block-interactive-promo-block',
    ) );
  }
}
add_action( 'init', 'create_block_interactive_promo_block_init' );
