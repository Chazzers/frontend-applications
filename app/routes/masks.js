import Route from "@ember/routing/route";
import {set} from "@ember/object";

const url =
	"https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-32/sparql";

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
	model() {
		const connectionString =
			url + "?query=" + encodeURIComponent(query) + "&format=json";

		return fetch(connectionString)
			.then(res => res.json())
			.then(json => {
				let {bindings} = json.results;
				bindings.forEach((d,i) => {
					d.id = i;
					d.attributes = {};
					d.attributes.cho = d.cho.value;
					d.attributes.placeName = d.placeName.value;
					d.attributes.title = d.title.value;
					set(d, "type", "mask");
					d.attributes.picture = d.picture.value;
					delete d.cho;
					delete d.placeName;
					delete d.title;
					delete d.picture;
				});
				console.log(bindings);
				this.store.push({data: bindings});
				return bindings;
			});
	}
});
