import DS from 'ember-data';
const { Model } = DS;

export default Model.extend({
	cho: DS.attr('string'),
	placeName: DS.attr('string'),
	title: DS.attr('string'),
	picture: DS.attr('string')
});
