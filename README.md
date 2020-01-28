# frontend-applications

## Link's mask journey through Indonesia

![image](https://user-images.githubusercontent.com/33430669/73265497-5ea60700-41d5-11ea-838b-ab7319b30c77.png)

Link (Legend of Zelda) wilde naast zijn masker: "Majorah's Mask" ook een aantal andere maskers uitproberen. Met deze web-applicatie kun je bij Link een aantal maskers opdoen uit Indonesië. Vervolgens kunnen deze maskers geliket worden. De maskers met de meeste likes zullen de uitstraling per regio van Indonesië vormen.

## Data

De data fetch die gebruikt is in dit project maakt gebruik van een query taal genaamd SPARQL. SPARQL (SPARQL Protocol And RDF Query Language) is een RDF query taal dat gebruikt wordt om op RDF-gebaseerde data op te halen door middel van queries.

De data die opgehaald wordt uit de database en de lijst van maskers genereerd zijn maskers gevonden in Indonesië die nu in bezit zijn van de NMVW.

```
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
```
\**De data die opgehaald wordt is gelimiteerd aan een maximaal aantal om te voorkomen dat de applicatie traag laad*

### Data transformatie

Om de data te transformeren zodat het bruikbaar is voor Ember data, heb ik de volgende loop geschreven.

```JavaScript
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
})
```

Hierdoor komt de data er zo uit te zien:

```JavaScript
{
	type: "modelName",
	id: 4 || id:"4",
	attributes: {
		attributeOne: "attributeOne",
		etc: "etc"
	}
}
```

De data wordt opgeslagen in een store (data wordt gecached) door middel van de volgende regel code:

```JavaScript
this.store.push({data: bindings});
```

## Benodigdheden

Je zult de volgende programma's en pakketjes moeten installeren op jouw computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (met npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installatie

Open de terminal en type het volgende:

* `git clone https://github.com/Chazzers/frontend-applications`
* `cd frontend-applications`
* `npm install`

## Development

Om het programma uit te voeren type je het volgende in de terminal:

* `ember serve`
* De app kan bezocht worden op: [http://localhost:4200](http://localhost:4200).
* De tests kunnen bezocht worden op: [http://localhost:4200/tests](http://localhost:4200/tests).

### Code Generatoren

Maak gebruik van de vele code generatoren van de ember-cli. Dit kan gedaan worden door de code in de terminal in te typen: `ember help generate`.

### Tests uitvoeren

* `ember test`
* `ember test --server`

### Linten

Om fouten in de code op te sporen wordt gebruik gemaakt van een Linter, namelijk: eslint. Om hiervan gebruik te maken kan het volgende getypt worden in de terminal.

* `npm run lint:hbs`
* `npm run lint:js`
* `npm run lint:js -- --fix`

### Bouwen

Om de website klaar te maken voor gebruik kan gebruik gemaakt worden van de commando's:

* `ember build` (ontwikkelingsomgeving)
* `ember build --environment production` (productie-omgeving)

### Deploy (online zetten van website)

Om de app te deployen kun je gebruik maken van Github pages of Heroku.

Om Heroku te gebruiken kun je de instructies volgen op deze website: [https://www.heroku.com/emberjs](https://www.heroku.com/emberjs)

## Handige links

* [ember.js](https://emberjs.com/)
    - [Creating nested subroutes with dynamic segments](https://guides.emberjs.com/v3.14.0/tutorial/subroutes/)
    - [Using Ember Data](https://guides.emberjs.com/v3.14.0/tutorial/ember-data/)
    - [Creating a model](https://guides.emberjs.com/v3.14.0/tutorial/model-hook/)
    - [Creating routes](https://guides.emberjs.com/v3.14.0/tutorial/routes-and-templates/)
* [ember-cli](https://ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
