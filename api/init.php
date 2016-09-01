<?php
$js = '';
$js = $js . 'window.xcard = {}; (function(xcard){';
$js = $js . file_get_contents('../source/template.js');
$js = $js . file_get_contents('../source/controler.js');
$js = $js . file_get_contents('../source/animation.js');
$js = $js . file_get_contents('../source/contacts.js');
$js = $js . '}(xcard));';

$output['js'] = $js;


$css = '';
$css = $css . file_get_contents('../css/index.css');
$output['css'] = $css;

echo json_encode($output);
