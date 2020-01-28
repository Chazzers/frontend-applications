import Component from '@ember/component';
import { set } from '@ember/object';

export default Component.extend({
	// make the source property of the component
	source: '',
	actions: {
		callChildFunction(mask) {
			// set the source property of this component to mask.picture
			set(this, 'source', mask.picture);
		}
}
});
