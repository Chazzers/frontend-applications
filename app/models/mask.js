import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
	placeName: DS.attr(),
	title: DS.attr(),
	type: DS.attr()
});
