function insertText(word, field) {
	if (document.selection) {
		field.focus();
		var sel = document.selection.createRange();
		sel.text = word;
		sel.select();
	} else if (field.selectionStart || field.selectionStart == "0") {
		field.focus();
		var start = field.selectionStart;
		var end = field.selectionEnd;
		var scroll = field.scrollTop;
		field.value = field.value.substring(0, start) + word + field.value.substring(end, field.value.length);
		field.focus();
		field.selectionStart = start + word.length;
		field.selectionEnd = start + word.length;
		field.scrollTop = scroll;
	} else {
		field.focus();
		field.value += word;
		field.focus();
	}
}

function include (url, ext) {
	if (ext == undefined || ext == true) {
		url = chrome.extension.getURL(url);
	};
	if (url.substr(-3, 3) == ".js") {
		var element = document.createElement('script');
		element.type = "text/javascript";
		element.src = url;
	} else if (url.substr(-4, 4) == ".css") {
		var element = document.createElement('link');
		element.rel = "stylesheet";
		element.type = "text/css";
		element.href = url;
	};
	document.head.appendChild(element);
}

include('forumge/forumge.css');

var _DOMParser = new DOMParser();

var postInput = document.getElementsByName('Post')[0];

var addImageIcon = document.createElement('a');
addImageIcon.href = 'javascript:';
addImageIcon.id = 'forum_plus_imagepost';

var addImageInput = document.createElement('input');
addImageInput.type = 'file';
addImageInput.style.display = 'none';

postInput.parentNode.insertBefore(addImageIcon, postInput);
postInput.parentNode.insertBefore(addImageInput, postInput);

addImageInput.onchange = function () {
	addImageIcon.classList.add('loading');

	var formData = new FormData();
	var file = this.files[0];
	reader = new FileReader();
	reader.readAsDataURL(file);
	formData.append('file_1', file);
	formData.append("reducesize", "off");
	formData.append("maxsize", "640");
	formData.append("ispublic", "on");
	formData.append("submit", "\u10d0\u10e2)u10d5\u10d8\u10e0\u10d7\u10d5\u10d0!");
	formData.append("image_text", "");
	formData.append("text_size", "3");
	formData.append("text_color", "000000");
	formData.append("text_transparency", "6");
	formData.append("text_halign", "-1");
	formData.append("text_valign", "-1");
	formData.append("text_font", "1");

	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'http://www.picz.ge/scripts/up.py');
	xhr.onreadystatechange = function () {
		if (xhr.readyState == 4) {
			addImageIcon.classList.remove('loading');

			var responseDOM = _DOMParser.parseFromString(xhr.responseText, 'text/html')
			var imageURL = responseDOM.getElementsByTagName('input')[0].value;
			if (imageURL.substring(0, 4) == "http") {
				insertText("[IMG]" + imageURL + "[/IMG]", postInput);
			} else {
				alert("ფოტოს ატვირთვა ვერ მოხერხდა");
			}
		}
	}
	xhr.send(formData);
};

addImageIcon.onclick = function () {
	var _event = document.createEvent("HTMLEvents");
	_event.initEvent('click', true, true);
	_event.eventName = 'click';
	addImageInput.dispatchEvent(_event);
};
