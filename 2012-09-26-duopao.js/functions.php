<?php
error_reporting( E_CORE_ERROR | E_CORE_WARNING | E_COMPILE_ERROR | E_ERROR | E_WARNING | E_PARSE | E_USER_ERROR | E_USER_WARNING | E_RECOVERABLE_ERROR );
function is_home(){
	return is_page('home');
}
function is_page($page_slug=''){
	global $page;
	return $page==$page_slug;
}

if($_REQUEST['action']=='test'){
	//sleep(2);
	$res='console.dir(Duopao())';
	echo ($res);
	exit();
}