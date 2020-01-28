import Component from '@ember/component';
import { set } from '@ember/object';

export default Component.extend({
	source: '',
	actions: {
		callChildFunction(mask) {
			set(this, 'source', mask.picture);
		}
}
});
