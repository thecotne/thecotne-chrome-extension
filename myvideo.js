var jwscript = document.querySelectorAll('.mv_video_player [type="text/javascript"]');
if (jwscript) {
	var video_url = jwscript[jwscript.length-1].textContent.match(/'file'.+'(.+)'/)[1];
	var video_statistic_left = document.querySelector(".mv_video_statistic > .left");
	var video_name = video_url.match(/(?=[^\/]*$)[^\&]*/)[0]
	;
	var dl_button_str = '<a class="mv_download mv_ico_button_spaned"'
		+'href="'+video_url+'"'
		+'download="'+video_name+'">'
		+'<span>ჩამოტვირთე</span>'
		+'</a>'
	;
	var div = document.createElement('div');
	var mv_movie_single_act_buttons = document.querySelector('.mv_movie_single_act_buttons');
	if (mv_movie_single_act_buttons) {
		div.innerHTML = '<div class="mv_user_favorite_cont left">'+dl_button_str+'</div>';
		mv_movie_single_act_buttons.insertBefore(div.firstChild, mv_movie_single_act_buttons.lastElementChild);
	}else{
		div.innerHTML = dl_button_str;
		video_statistic_left.appendChild(div.firstChild);
	}
};