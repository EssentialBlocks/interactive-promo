<?php

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}

class InteractivePromoAdmin
{
    public function __construct() {
        add_action('admin_enqueue_scripts', array($this, 'enqueue_styles'));
    }

    public function enqueue_styles() {
        if ($this->eb_is_edit_page() || $this->eb_is_site_editor()) {
            // hover effects
            $hover_style      = "assets/css/hover-effects.css";
            $hover_style_path = INTERACTIVE_PROMO_DIR . "/$hover_style";
            wp_enqueue_style(
                'hover-effects-style',
                // Relative to the plugin root, not to this file's `includes/` dir.
                plugins_url($hover_style, INTERACTIVE_PROMO_DIR . '/interactive-promo.php'),
                array(),
                file_exists($hover_style_path) ? filemtime($hover_style_path) : false,
                'all'
            );
        }
    }

    /**
     * eb_is_site_editor
     * Whether the current screen is the Full Site Editor.
     *
     * The promo effects live entirely in hover-effects.css, so without this the
     * `effect-*` classes render unstyled inside the site editor even though they
     * work in the post editor and on the frontend.
     *
     * @return boolean
     */
    public function eb_is_site_editor() {
        global $pagenow;

        if (!is_admin()) return false;

        if ($pagenow === 'site-editor.php') return true;

        // Legacy Gutenberg-plugin route for the site editor.
        $query_string = isset($_SERVER['QUERY_STRING']) ? sanitize_text_field(wp_unslash($_SERVER['QUERY_STRING'])) : '';

        return $pagenow === 'themes.php' && !empty($query_string) && str_contains($query_string, 'gutenberg-edit-site');
    }

    /**
     * eb_is_edit_page
     * function to check if the current page is a post edit page
     * 
     * @author Ohad Raz <admin@bainternet.info>
     * 
     * @param  string  $new_edit what page to check for accepts new - new post page ,edit - edit post page, null for either
     * @return boolean
     */
    public function eb_is_edit_page($new_edit = null) {
        global $pagenow;
        //make sure we are on the backend
        if (!is_admin()) return false;

        
        if($new_edit == "edit")
            return in_array( $pagenow, array( 'post.php',  ) );
        elseif($new_edit == "new") //check for new post page
            return in_array( $pagenow, array( 'post-new.php' ) );
        else //check for either new or edit
            return in_array( $pagenow, array( 'post.php', 'post-new.php' ) );
    }
}

new InteractivePromoAdmin();
