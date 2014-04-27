var scrollTopBtn = null;

function scrollTopBtnClick() {
	scrollLoop((new Date()).getTime(), 200, document.body.scrollTop);
}

function scroll() {
	if (window.pageYOffset > 300) {
		if (!scrollTopBtn) {
			scrollTopBtn = document.createElement('a');
			scrollTopBtn.classList.add('thecotne_scroll_top_btn');
			scrollTopBtn.addEventListener('click', scrollTopBtnClick, false);
			document.body.appendChild(scrollTopBtn);
		}
		scrollTopBtn.style.opacity = '1';
		scrollTopBtn.style.pointerEvents = 'all';
	} else {
		if (scrollTopBtn) {
			scrollTopBtn.style.opacity = '0';
			scrollTopBtn.style.pointerEvents = 'none';
		}
	}
}

document.addEventListener('scroll', scroll, false);

function scrollLoop(beginTime, duration, scrollFrom) {
	var timePassed = (new Date()).getTime() - beginTime;
	var timeLeft = duration - timePassed;
	document.body.scrollTop = timeLeft * (scrollFrom/duration)
	if (timePassed < duration) {
		requestAnimationFrame(scrollLoop.bind(undefined,beginTime, duration, scrollFrom));
	}
}
