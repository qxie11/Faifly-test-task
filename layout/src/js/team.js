import Glide from '@glidejs/glide';

export default function createTeamSlider() {

	const glide = new Glide('.team__slider', {
	  type: 'carousel',
	  perView: 4,
	  autoplay: 1500,
	  gap: 17.5,

	   breakpoints: {
	    970: {
	      perView: 3
	    },
	    650: {
	      perView: 2
	    },

	    460: {
	    	perView: 1
	    }
	  }
	})

	glide.mount();
}