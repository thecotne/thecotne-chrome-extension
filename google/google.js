function translateLink(text) {
	return 'https://translate.google.com/#auto/auto/' + encodeURIComponent(text);
}

function updateHref(translateButtonA, e) {
	translateButtonA.href = translateLink(this.value);
}

function insertTranslateButton() {
	var input = document.getElementById('lst-ib');
	var moreButton = document.getElementById('hdtb-more');
	if (input && moreButton) {
		var translateButton = document.createElement('div');
		translateButton.className = 'hdtb-mitem hdtb-imb';
		var translateButtonA = document.createElement('a');
		translateButtonA.className = 'q qs';
		translateButtonA.href = translateLink(input.value);
		translateButtonA.innerText = 'Translate';
		translateButton.appendChild(translateButtonA);
		if ( ! input.onkeyup) {
			input.onkeyup = updateHref.bind(input, translateButtonA)
		}
		moreButton.parentNode.insertBefore(translateButton, moreButton);
	}
}

function DOMNodeInserted(e) {
	if (e.target.id == 'hdtb' || (e.target.querySelector && e.target.querySelector('#hdtb'))) {
		insertTranslateButton();
	}
}

document.addEventListener('DOMNodeInserted', DOMNodeInserted);
