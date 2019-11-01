import Component from '@ember/component';
import { get } from '@ember/object';

export default Component.extend({
	actions: {
		getMask() {
			console.log(get(this, 'someData'));
		}
	}
});
