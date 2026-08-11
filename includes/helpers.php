<?php

/**
 * Load google fonts.
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

class Interactive_Promo_Helper
{

    private static $instance;

    /**
     * Registers the plugin.
     */
    public static function register()
    {
        if (null === self::$instance) {
            self::$instance = new self;
        }
        return self::$instance;
    }

    /**
     * The Constructor.
     */
    public function __construct()
    {
        add_action('admin_enqueue_scripts', array($this, 'enqueues'));
    }

    /**
     * Load fonts.
     *
     * @access public
     */
    public function enqueues($hook)
    {
        global $pagenow;

        /**
         * Only for admin add/edit pages/posts
         */
        $query_string = isset($_SERVER['QUERY_STRING']) ? sanitize_text_field(wp_unslash($_SERVER['QUERY_STRING'])) : '';

        if ($pagenow == 'post-new.php' || $pagenow == 'post.php' || $pagenow == 'site-editor.php' || ($pagenow == 'themes.php' && !empty($query_string) && str_contains($query_string, 'gutenberg-edit-site'))) {

            $controls_asset_path = INTERACTIVE_PROMO_BLOCKS_ADMIN_PATH . '/dist/modules.asset.php';
            if (!file_exists($controls_asset_path)) {
                return;
            }

            // NOTE: `require`, not `include_once` — an *_once include returns bool `true`
            // on a repeat include, and indexing that bool is a TypeError on PHP 8.
            $controls_dependencies = require $controls_asset_path;
            $controls_dependencies = is_array($controls_dependencies) ? $controls_dependencies : [];
            $controls_deps         = isset($controls_dependencies['dependencies']) ? (array) $controls_dependencies['dependencies'] : [];
            $controls_version      = isset($controls_dependencies['version']) ? $controls_dependencies['version'] : INTERACTIVE_PROMO_BLOCKS_VERSION;

            wp_register_script(
                "interactive-promo-blocks-controls-util",
                INTERACTIVE_PROMO_BLOCKS_ADMIN_URL . '/dist/modules.js',
                array_merge($controls_deps, ['lodash']),
                $controls_version,
                true
            );

            wp_localize_script('interactive-promo-blocks-controls-util', 'EssentialBlocksLocalize', array(
                // `eb_wp_version` stays a float for backward compatibility with existing
                // controls JS. It is lossy ("6.10" -> 6.1); prefer the raw string below
                // with a version_compare-style check for anything new.
                'eb_wp_version'        => (float) get_bloginfo('version'),
                'eb_wp_version_string' => get_bloginfo('version'),
                'rest_rootURL' => get_rest_url(),
                // Consumed by the controls' StyleComponent to build the editor's
                // tab/mobile media queries. Without these the editor emits
                // "max-width: undefinedpx" and silently drops every responsive
                // rule. Values MUST stay in sync with the breakpoints hardcoded
                // in style-handler's EbStyleHandlerParseCss::build_css(), which
                // generates the frontend CSS (1024px tab / 767px mobile).
                'responsiveBreakpoints' => array(
                    'tablet' => 1024,
                    'mobile' => 767,
                ),
            ));

            if ($pagenow == 'post-new.php' || $pagenow == 'post.php') {
                wp_localize_script('interactive-promo-blocks-controls-util', 'eb_conditional_localize', array(
                    'editor_type' => 'edit-post'
                ));
            } else if ($pagenow == 'site-editor.php' || $pagenow == 'themes.php') {
                wp_localize_script('interactive-promo-blocks-controls-util', 'eb_conditional_localize', array(
                    'editor_type' => 'edit-site'
                ));
            }

            wp_enqueue_style(
                'essential-blocks-editor-css',
                INTERACTIVE_PROMO_BLOCKS_ADMIN_URL . '/dist/modules.css',
                array('essential-blocks-animation'),
                $controls_version,
                'all'
            );
        }
    }
    public static function get_block_register_path($blockname, $blockPath)
    {
        if ((float) get_bloginfo('version') <= 5.6) {
            return $blockname;
        } else {
            return $blockPath;
        }
    }
}
Interactive_Promo_Helper::register();
