import Glide from '@glidejs/glide';

export default function createQuotesSliders() {
	const $next = document.querySelector('.quotes__slider2-next'),
		$prev = document.querySelector('.quotes__slider2-prev');

	const glide1 = new Glide('.quotes__slider1', {
	  type: 'carousel',
	  focusAt: 'center',
	  perView: 1,
	  dragDistance: false,
	  dragThreshold: false
	});

	const glide2 = new Glide('.quotes__slider2', {
	  type: 'carousel',
	  perView: 5,
	  focusAt: 'center',
	  dragDistance: false,
	  dragThreshold: false
	});

	$next.addEventListener('click', function () {
  		glide1.go('>');
	})

	$prev.addEventListener('click', function () {
  		glide1.go('<');
	})

	glide1.mount();
	glide2.mount();
}