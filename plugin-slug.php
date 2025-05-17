<?php
/**
 * Plugin Name: Plugin Name
 * Description: Short description of the plugin
 * Version: 1.0.0
 * Author: bPlugins
 * Author URI: https://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: b-blocks
 */

// ABS PATH
if ( !defined( 'ABSPATH' ) ) { exit; }

// Constant
define( 'PREFIX_VERSION', isset( $_SERVER['HTTP_HOST'] ) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.0' );
define( 'PREFIX_DIR_URL', plugin_dir_url( __FILE__ ) );
define( 'PREFIX_DIR_PATH', plugin_dir_path( __FILE__ ) );

require_once PREFIX_DIR_PATH . 'admin/admin.php';

if( !class_exists( 'PREFIXPlugin' ) ){
	class PREFIXPlugin{
		function __construct(){
			add_action( 'init', [ $this, 'onInit' ] );
			add_action( 'admin_init', [$this, 'registerSettings'] );
			add_action( 'rest_api_init', [$this, 'registerSettings'] );
		}

		function onInit(){
			register_block_type( __DIR__ . '/build' );
		}

		function registerSettings(){
			register_setting( 'prefixUtils', 'prefixUtils', [
				'show_in_rest'		=> [
					'name'			=> 'prefixUtils',
					'schema'		=> [ 'type' => 'string' ]
				],
				'type'				=> 'string',
				'default'			=> wp_json_encode( [ 'nonce' => wp_create_nonce( 'admin-dashboard' ) ] ),
				'sanitize_callback'	=> 'sanitize_text_field'
			] );
		}
	}
	new PREFIXPlugin();
}

require_once PREFIX_DIR_PATH. 'settings/Settings.php';



add_shortcode('murad_vai', function(){
	ob_start();
	$data = get_option('admin-dashboard', []);
	echo "<pre>";
	print_r($data);
	echo "</pre>";

	return ob_get_clean();
});