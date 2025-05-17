<?php
if( !class_exists('BPLSettings') ){
	class BPLSettings{
		public function __construct(){
			add_action( 'wp_ajax_bPlSettingsOptions', [$this, 'bPlSettingsOptions'] );
			add_action( 'wp_ajax_nopriv_bPlSettingsOptions', [$this, 'bPlSettingsOptions'] );
			add_action( 'wp_ajax_getDynamicData', [$this, 'getDynamicData'] );
			add_action( 'wp_ajax_nopriv_getDynamicData', [$this, 'getDynamicData'] );
			add_action( 'admin_enqueue_scripts', [$this, 'adminEnqueueScripts'] );
			// add_action( 'wp_ajax_getPageList', [$this, 'getPageList'] );
			// add_action( 'wp_ajax_nopriv_getPageList', [$this, 'getPageList'] );
			// add_action( 'wp_ajax_getCategories', [$this, 'getCategories'] );
			// add_action( 'wp_ajax_nopriv_getCategories', [$this, 'getCategories'] );
		}

		function adminEnqueueScripts( $hook ){
				wp_enqueue_media();
				wp_enqueue_editor();
		}

		function bPlSettingsOptions(){
			$nonce = sanitize_text_field( $_POST['_wpnonce'] ?? null );

			$key = sanitize_text_field( $_POST['id'] ?? '' );
			
			if( !wp_verify_nonce( $nonce, $key ) ){
				wp_send_json_error( 'Invalid Request' );
			}

			$js_data = json_decode( wp_kses_stripslashes( sanitize_text_field( $_POST['jsdata'] ?? null ) ), true );

			$db_data = get_option($key, [] );
			if( !$js_data && $db_data ){
				wp_send_json_success($db_data);
			}

			if($js_data){
				update_option( $key, $js_data );
			}

			wp_send_json_success( $js_data );
		}

		function getDynamicData(){
			$nonce = sanitize_text_field( $_POST['_wpnonce'] ?? null) ;
			
			if( !wp_verify_nonce( $nonce, 'admin-dashboard' ) ){
				wp_send_json_error( 'Invalid Request' );
			}

			$dataType = sanitize_text_field( $_POST['dataType'] ) ?? 'posts';

			$postsList = array_map(function($post) {
				return [
					'value' => $post->ID,
					'label' => $post->post_title,
					'url'   => $post->guid
				];
			}, get_posts([
				'post_type'				=> 'pages' === $dataType ? 'page' : 'post',
				'orderby'					=> 'name',
				'posts_per_page'	=> -1,
				'post_status'     => 'publish'
			]));

			$categories = array_values(
				array_map(function($cat) {
					return [
						'value' => $cat->term_id,
						'label' => $cat->name
					];
				},get_categories( [
					'orderby' => 'name',
					'order' => 'DESC'
				] ) )
			);

			$roles = array_map(function($key, $value) {
				return [
					'label' => $key,
					'value' => $value['name']
				];
			}, array_keys(get_editable_roles()), get_editable_roles());

			$users =array_map(function($user){
				return [
					'label' => $user->display_name,
					'value' => $user->ID
				];
			}, get_users());


			$post_type = [];
			foreach(array_keys(get_post_types(['public' => true],"object")) as $key){
				if($key !== 'attachment'){
					$post_type[] = [
						'label' => get_post_types(['public' => true],"object")[$key]->label,
						'value' => get_post_types(['public' => true],"object")[$key]->name
					];
				}
			};

			$menus = array_map(function($menu) {
				return [
					'label' => $menu->name,
					'value' => $menu->slug
				];
			}, wp_get_nav_menus());

			$data = [];

			switch( $dataType ){
				case 'pages':
					$data = $postsList;
					break;
				case 'categories':
					$data = $categories;
					break;
				case 'roles':
					$data = $roles;
					break;
				case 'users':
					$data =$users;
					break;
				case 'postTypes':
					$data = $post_type;
					break;
				case 'menus':
					$data = $menus;
					break;
				case 'taxonomies':
					$data = [];
					break;
				default :
					$data = $postsList;
			}

			wp_send_json_success( $data );
		}
}
	new BPLSettings();
}
