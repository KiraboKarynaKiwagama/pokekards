# Karyna's Poké Kards

A small, responsive Pokémon card gallery built with HTML, CSS, and vanilla JavaScript. The gallery fetches Pokémon data from [PokéAPI](https://pokeapi.co/) and presents it as interactive cards.

## Features

- Displays the first 28 Pokémon returned by PokéAPI.
- Searches the loaded cards by Pokémon name or type.
- Plays a Pokémon's cry when you select **My cry**.
- Reveals the Pokémon's first listed ability and switches to its shiny artwork when you select **My ability**.
- Adjusts the card grid for tablet and phone screens.

## What you need

- A modern web browser with JavaScript enabled.
- An internet connection to load Pokémon data, artwork, and cries from PokéAPI.
- A local web server for running the project during development. No package installation or build step is required.

## Run locally

1. Download or clone this repository.
2. Open the project folder in a terminal.
3. Start a local web server. For example, if Python is installed:

   ```sh
   python -m http.server 8000
   ```

4. Visit [http://localhost:8000](http://localhost:8000) in your browser.

Alternatively, open the folder in Visual Studio Code and use an extension such as Live Server.

## Use the gallery

- Enter a Pokémon name or type in the search field to filter the cards. Clear the field to show them all again.
- Select **My cry** to play the Pokémon's cry, if one is available.
- Select **My ability** to reveal its first listed ability and display its shiny artwork when available.

## Project files

- `index.html` — page structure and introductory text.
- `style.css` — layout, card styles, and responsive design.
- `script.js` — PokéAPI requests, card rendering, search, and interactions.

## Data and limitations

The app requests Pokémon records from PokéAPI at runtime, so the gallery needs internet access. It currently loads Pokémon IDs 1–28 in sequence. Search only filters cards that have already loaded, and each card displays the first ability returned by the API.
