import Glide from '@glidejs/glide';

export default function createHeaderSlider() {

	const glide = new Glide('.header__slider', {
	  type: 'carousel',
	  focusAt: 'center',
	  perView: 1,
	  autoplay: 2500,
	  dragDistance: false,
	});

	glide.mount();
}