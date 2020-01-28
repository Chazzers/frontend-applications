import Route from "@ember/routing/route";
import {set} from "@ember/object";

// URL to api-endpoint
const url =
	"https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-32/sparql";

// SPARQL query to get masks of indonesia
const query = `
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX edm: <http://www.europeana.eu/schemas/edm/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT ?cho ?placeName ?title ?picture ?type WHERE {
 <https://hdl.handle.net/20.500.11840/termmaster7745> skos:narrower* ?place .
 ?place skos:prefLabel ?placeName .

  VALUES ?type { "gezichtsmasker" "masker naar vorm" "dierenmasker" "doodshoofdmasker" "dodenmasker" "toneelmasker" "wajangmasker" "initiatiemasker" "masker" }

  ?cho 	dct:spatial ?place ;
        dc:title ?title ;
        dc:type ?type ;
        foaf:depiction ?picture .
		FILTER langMatches(lang(?title), "ned") .
} LIMIT 100
`;

export default Route.extend({
	// model() causes the functions placed in there to be automatically run when rendering the page
	model() {
		// Combining the SPARQL query and the url
		const connectionString =
			url + "?query=" + encodeURIComponent(query) + "&format=json";
		// return fetch to get the data.
		return fetch(connectionString)
			// transform received data to json
			.then(res => res.json())
			// promise chain to take the json data and use it in the next then function
			.then(json => {
				// Object destructuring: This basically says: let bindings = json.results.bindings
				let {bindings} = json.results;
				// Loop to transform data
				bindings.forEach((d,i) => {
					// Add an id to all data-items since Ember data expects all data items to have one
					d.id = i;
					// Add the property attributes to all data items since Ember data expects all the properties to be placed into attributes
					d.attributes = {};
					// place the value of cho in attributes
					d.attributes.cho = d.cho.value;
					// place the value of placeName in attributes
					d.attributes.placeName = d.placeName.value;
					// place the value of title in attributes
					d.attributes.title = d.title.value;
					// Make all the type-properties of the data-items mask
					set(d, "type", "mask");
					// place the value of picture in attributes
					d.attributes.picture = d.picture.value;
					// delete the upperlevel cho property
					delete d.cho;
					// delete the upperlevel placeName property
					delete d.placeName;
					// delete the upperlevel title property
					delete d.title;
					// delete the upperlevel picture property
					delete d.picture;
				});
				// Look at the pretty data
				console.log(bindings);
				// Push data into the store/cache the data
				this.store.push({data: bindings});
				// return the data
				return bindings;
			});
	}
});
