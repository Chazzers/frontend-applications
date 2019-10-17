# Concept

| Doelgroep | Onderwerp | Concept | Query |
| --- | --- | --- | --- |
| Toeristen die geïnteresseerd zijn in culturele maskers | Maskers uit Indonesië | Toeristen kunnen hun huidige locatie of specifieke locaties invoeren op de website. Hierna worden afbeeldingen en het verhaal achter maskers getoond die op de ingevoerde locatie zijn gevonden. | Filteren op locatie |
| Gamers die met het uiterlijk van Link (van de game: Zelda) willen spelen | Link's (Majorah's Mask) journey through Indonesia | Er kunnen maskers opgedaan worden bij Link uit verschillende regio's uit Indonesië. Er kan op deze maskers gestemd worden en de meest populaire maskers uit regios zullen vervolgens deze regio's presenteren. | Filteren op locatie en maskers |


## Link's Mask journey through Indonesia

Benodigdheden:

* Een background-removal tool
* Afbeeldingen uit de database
* Namen van afbeeldingen
* Een statische afbeelding van Link
* Titel van masker vóór de naam van Link (Bijvoorbeeld Barong Macang Link)

Hoe het werkt:

1. Klik op regio
	* Regio's worden opgehaald door middel van Google API of een statische kaart
	* Maskers van de regio worden ingeladen
2. Klik op masker
	* Het masker gebruikt de Remove.bg api om de achtergrond weg te halen van de afbeeldingen
	* Het masker verschijnt op Link's gezicht.
