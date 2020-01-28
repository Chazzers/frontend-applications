import DS from 'ember-data';
const { Model } = DS;

// Make blueprint of the data that's going to be cached

export default Model.extend({
	// property cho is a string
	cho: DS.attr('string'),
	// property placeName is a string
	placeName: DS.attr('string'),
	// property title is a string
	title: DS.attr('string'),
	// property picture is a string
	picture: DS.attr('string')
});
