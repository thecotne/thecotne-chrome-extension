function translate_link(val){
	return 'https://translate.google.com/#auto/auto/'
	+ encodeURIComponent( val );
};
function update_href(translate_button_a,e){
	translate_button_a.setAttribute('href', translate_link( this.value ) );
};
function insert_translate_button(){
	var input = document.getElementById('lst-ib');
	var more_button = document.getElementById('hdtb_more');
	var more_div = document.getElementById('hdtb_more_mn');
	if ( input && more_button && more_div ) {
		var translate_button = document.createElement('div');
		translate_button.setAttribute('class','hdtb_mitem');
		var translate_button_a = document.createElement('a');
		translate_button_a.setAttribute('class','q qs');
		translate_button_a.setAttribute('href', translate_link( input.value ) );
		translate_button_a.innerText = 'Translate';
		translate_button.appendChild(translate_button_a);
		if (!input.onkeyup) {
			input.onkeyup = update_href.bind(input,translate_button_a)
		};
		more_button.parentNode.insertBefore( translate_button, more_button );
		while(more_div.childNodes[0]){
			more_button.parentNode.insertBefore( more_div.childNodes[0], more_button );
		};
		more_button.style.display = 'none';
		more_div.style.display = 'none';
	};
};
document.addEventListener('DOMContentLoaded', function(){
	insert_translate_button();
});
document.addEventListener('DOMNodeInserted', function(e){
	if (e.target.id == 'hdtb' || (e.target.querySelector && e.target.querySelector('#hdtb'))) {
		insert_translate_button();
	};
});


