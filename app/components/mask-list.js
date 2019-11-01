import Component from '@ember/component';
import { set } from '@ember/object';

export default Component.extend({
	actions: {
		setMask(mask) {
			console.log(set(this, 'someData', mask.picture));
			return set(this, 'someData', mask.picture);
		}
	}
});
