function getURLMap(bodyHTML) {
	var urlMap = null;
	var urlMapStartIndex = bodyHTML.indexOf('"url_encoded_fmt_stream_map"');
	if (urlMapStartIndex != -1) {
		urlMap = bodyHTML.substring(urlMapStartIndex);
		var urlMapEndIndex = urlMap.indexOf('", ');
		if (urlMapEndIndex != -1) {
			urlMap = urlMap.substring(30, urlMapEndIndex);
		};
	};
	if (urlMap == null) throw 'Error: Couldn\'t find url map.';
	urlMap = urlMap.replace(/\\u0026/g, '&');
	return urlMap;
};
function getLinksAndFormats(urlMap) {
	var allLinks = urlMap.split(',');
	var linksAndFormats = new Array();
	var numOfLinks = 0;
	for (var i = 0; i < allLinks.length; i++) {
		var link = getCleanURL(allLinks[i]);
		var itagIndex = link.lastIndexOf('itag=');
		if (itagIndex != -1) {
			var fmt = parseInt(link.substring(itagIndex + 5));
			if (!isNaN(fmt)) {
				linksAndFormats[fmt.toString()] = link;
				numOfLinks++;
			};
		};
	};
	if (numOfLinks == 0) throw 'Failed to find download links.';
	linksAndFormats[0] = numOfLinks;
	return linksAndFormats;
};
function getKeyAndVal(str) {
	var m = str.match(/^([^=]*)=(.*)$/);
	if (m)
		return [m[1], m[2]];
	return null;
};
function getCleanURL(url) {
	var mainParams = {};
	var splits = url.split("&");
	for (var i = 0; i < splits.length; i++) {
		var keyVal = getKeyAndVal(splits[i]);
		if (keyVal) mainParams[keyVal[0]] = keyVal[1];
	};
	var cleanURL = null;
	if ('url' in mainParams)
		cleanURL = unescape(mainParams['url']);
	else {
		// use regex
		var regexes = ['url=(http.+?videoplayback.+?id=.+?)(\u0026|&)quality=', '(http.+?videoplayback.+?id=.+?)(\u0026|&)'];
		for (var i = 0; i < regexes.length; i++) {
			var match = new RegExp(regexes[i]).exec(url);
			if (match != null) {
				cleanURL = unescape(match[1]);
				break;
			};
		};
	};
	if (cleanURL) {
		// check for the signature
		if (cleanURL.indexOf('signature=') == -1 && cleanURL.indexOf('sig=') == -1) {
			var sig = null;
			if ('signature' in mainParams)
				sig = mainParams['signature'];
			else
				sig = mainParams['sig'];
			if (sig) cleanURL = cleanURL + '&signature=' + sig;
		} else if (cleanURL.indexOf('sig=') != -1) {
			cleanURL.replace(/sig=/g, 'signature=');
		};
		return cleanURL + '&title=' + document.title.match(/^(.*) - YouTube$/)[1];
	};

	return null;
};
function createMenuItem(link,title){
	return '<li role="menuitem">'+
		'<a href="'+link+'" class="yt-uix-button-menu-item">'+title+'</a>'+
	'</li>';
};
function getHTMLForLinks(linksAndFormats) {
	/** FMT mapping from youtube's videos' source:
	 *  37 = 1920X1080 MP4
	 *  46 = 1920X1080 WebM
	 *  22 = 1280X720  MP4
	 *  45 = 1280X720  WebM
	 *  35 = Large     FLV
	 *  44 = Large     WebM
	 *  34 = Medium    FLV
	 *  18 = Medium    MP4
	 *  43 = Medium    WebM
	 *  5  = Small     FLV
	 */
	var return_html = "";
	if (linksAndFormats['5']) {
		return_html += createMenuItem(linksAndFormats['5'],'Small FLV');
	};
	if (linksAndFormats['18']) {
		return_html += createMenuItem(linksAndFormats['18'],'Medium MP4');
	};
	if (linksAndFormats['34']) {
		return_html += createMenuItem(linksAndFormats['34'],'Medium FLV');
	};
	if (linksAndFormats['43']) {
		return_html += createMenuItem(linksAndFormats['43'],'Medium WebM');
	};
	if (linksAndFormats['35']) {
		return_html += createMenuItem(linksAndFormats['35'],'Large FLV');
	};
	if (linksAndFormats['44']) {
		return_html += createMenuItem(linksAndFormats['44'],'Large WebM');
	};
	if (linksAndFormats['22']) {
		return_html += createMenuItem(linksAndFormats['22'],'720p MP4');
	};
	if (linksAndFormats['45']) {
		return_html += createMenuItem(linksAndFormats['45'],'720p WebM');
	};
	if (linksAndFormats['37']) {
		return_html += createMenuItem(linksAndFormats['37'],'1080p MP4');
	};
	if (linksAndFormats['46']) {
		return_html += createMenuItem(linksAndFormats['37'],'1080p WebM');
	};
	return return_html;
};
if (document.URL.indexOf('.youtube.com/watch?v=') >= 0) {
	var error = null;
	var urlMap = null;
	var linksAndFormats = null;
	try {
		urlMap = getURLMap(document.body.innerHTML);
		linksAndFormats = getLinksAndFormats(urlMap);
	} catch (err) {
		error = err;
	};
	if (error == null) {
		document.getElementById('watch7-sentiment-actions').insertAdjacentHTML('beforeend', '<button onclick=";return false;" '
		+'class=" yt-uix-button yt-uix-button-default yt-uix-button-size-default" '
		+'type="button" data-button-menu-indicate-selected="false" '
		+'role="button" aria-pressed="false" aria-expanded="false" aria-haspopup="true">'
		+'<span class="yt-uix-button-content">Download</span>'
		+'<img class="yt-uix-button-arrow" src="https://s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif">'

		+'<ul class=" yt-uix-button-menu yt-uix-button-menu-default hid" '
		+'role="menu" aria-haspopup="true" style="">'
		+getHTMLForLinks(linksAndFormats)
		+'</ul></button>');
	};
};

