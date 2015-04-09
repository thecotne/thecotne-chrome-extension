function download(fileURL, fileName) {
	if (!window.ActiveXObject) {
		var save = document.createElement('a');
		save.href = fileURL;
		save.target = '_blank';
		save.download = fileName || 'unknown';
		var event = document.createEvent('Event');
		event.initEvent('click', true, true);
		save.dispatchEvent(event);
		(window.URL || window.webkitURL).revokeObjectURL(save.href);
	} else if (!!window.ActiveXObject && document.execCommand) {
		var _window = window.open(fileURL, '_blank');
		_window.document.close();
		_window.document.execCommand('SaveAs', true, fileName || fileURL)
		_window.close();
	}
}

function $_GET(key) {
	var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
	return result && unescape(result[1]) || "";
}

function createSaveAsLink(text, fileName, src, appendTo) {
	var link = document.createElement('a');
	link.classList.add('fbvdl');
	link.textContent = text;
	link.setAttribute('href', 'javascript:');
	link.onclick = function () {
		download(src, fileName);
	};
	appendTo.appendChild(document.createTextNode('  -  '));
	appendTo.appendChild(link);
}

function getParent(className, childObj) {
	var testObj = childObj;
	while (true) {
		testObj = testObj.parentNode;
		if (testObj.nodeType != 1) {
			return false;
		} else if (testObj.classList.contains(className)) {
			return testObj
		}
	}
}

window.addEventListener('DOMNodeInserted', function (e) {
	if (e.target.nodeType != 1) {
		return;
	};
	if (e.target.tagName.toLowerCase() == 'embed') {
		var fbxPhoto = getParent('fbxPhoto', e.target);
		if (fbxPhoto && Boolean(fbxPhoto.querySelector(".UIActionLinks .fbvdl")) == false) {
			var params = decodeURIComponent(e.target.getAttribute('flashvars'))
			params = params.substr(params.indexOf('{'));
			params = params.substr(0, 1 + params.indexOf('}&'));
			var title = $_GET('v');
			var aLinks = JSON.parse(params)['video_data'][0];
			var UIActionLinks = fbxPhoto.querySelector('.UIActionLinks');
			if (aLinks.hd_src) {
				createSaveAsLink('Download HD', 'hd_' + title + '.mp4', aLinks.hd_src, UIActionLinks);
			};
			if (aLinks.sd_src) {
				createSaveAsLink('Download SD', 'sd_' + title + '.mp4', aLinks.sd_src, UIActionLinks);
			};
		};
	};
}, false);
