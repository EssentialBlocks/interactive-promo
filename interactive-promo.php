<?php
/**
 * Plugin Name:     Interactive Promo
 * Plugin URI:      https://essential-blocks.com
 * Description:     Engage your potential audience with an exciting promo.
 * Version:         1.0.1
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
define('INTERACTIVE_PROMO_DIR', dirname( __FILE__ ));

require_once __DIR__ . '/includes/font-loader.php';
require_once __DIR__ . '/includes/post-meta.php';
require_once __DIR__ . '/includes/admin-enqueue.php';
require_once __DIR__ . '/lib/style-handler/style-handler.php';

function create_block_interactive_promo_block_init() {
	$dir = dirname( __FILE__ );

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "block/interactive-promo" block first.'
		);
	}
	$index_js     = 'build/index.js';
	wp_register_script(
		'create-block-interactive-promo-block-editor',
		plugins_url( $index_js, __FILE__ ),
		array(
			'wp-blocks',
			'wp-i18n',
			'wp-element',
			'wp-block-editor',
		),
		filemtime("$dir/$index_js")
	);

	$editor_css = 'build/index.css';
	wp_register_style(
		'create-block-interactive-promo-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$hover_style = 'assets/css/hover-effects.css';
	wp_register_style(
		'hover-effects-style',
		plugins_url( $hover_style, __FILE__ ),
		array(),
		filemtime( "$dir/$hover_style" ),
		'all'
	);

	if( ! WP_Block_Type_Registry::get_instance()->is_registered( 'essential-blocks/interactive-promo' ) ) {
    register_block_type( 'interactive-promo/interactive-promo', array(
      'editor_script' => 'create-block-interactive-promo-block-editor',
      'editor_style'  => 'create-block-interactive-promo-block-editor',
	  'render_callback' => function( $attributes, $content ) {
		if( !is_admin() ) {
            wp_enqueue_style('hover-effects-style',);
		}
		return $content;
	}
    ) );
  }
}
add_action( 'init', 'create_block_interactive_promo_block_init' );
