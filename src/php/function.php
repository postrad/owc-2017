<?php

function my-custom-styles() {
  // Register my custom stylesheet
  wp_register_style( 'custom-styles', get_template_directory_uri().'/styles/custom-styles.css' ) );
  // Load my custom stylesheet
  wp_enqueue_style( 'custom-styles' );
}
add_action( 'wp_enqueue_scripts', 'my_custom_styles' );

?>
