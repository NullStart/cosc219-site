/*
  COSC 219 — Lab 9 · main.js
  The only file that touches the page.
*/

// import TRAIL_IDS from ./api.js
// import loadSome and uiState from ./app.js
import { TRAIL_IDS, fetchTrail } from "./api.js";
import { loadSome, uiState } from "./app.js";

/* Collect the four state panels by id. */
const panels = {
    loading: document.querySelector("#state-loading"),
    error: document.querySelector("#state-error"),
    empty: document.querySelector("#state-empty"),
    loaded: document.querySelector("#state-loaded")
};

const search = document.querySelector("#search");
const rating = document.querySelector("#rating");
const loadButton = document.querySelector("#load");

/* show(state) — toggle d-none so exactly ONE panel is visible.

   Bootstrap's d-none is display:none, so this needs no CSS of your own:
     el.classList.toggle("d-none", name !== state);
*/
function show(state) {
    for (const name in panels) {
        panels[name].classList.toggle("d-none", name !== state);
    }
}

/* card(trail) — one column holding a .card.

   You may build the card's shell with a template string, because it
   contains no data. The trail's name and description go in AFTERWARDS
   with textContent. Lab 7's rule has not changed. */
function card(trail) {
    const col = document.createElement("div");
    col.className = "col";

    col.innerHTML = `
        <div class="card h-100">
            <div class="card-body">
                <h2 class="card-title h5"></h2>
                <p class="card-text"></p>
            </div>
        </div>
    `;

    col.querySelector(".card-title").textContent = trail.name;
    col.querySelector(".card-text").textContent =
        `${trail.km} km - ${trail.rating}`;

    return col;
}

/* load() — the sequence:

     1. show the loading state
     2. await the data
     3. work out the state with uiState, fill the grid if it is "loaded"
     4. show that state
     5. if anything throws, put the message in the error panel and show it
*/
async function load() {
    show("loading");

    try {
        const result = await loadSome(TRAIL_IDS);

        if (result.failed > 0 && result.loaded.length === 0) {
            throw new Error("Unable to load trails");
        }

        const trails = await Promise.all(
            TRAIL_IDS.map(id => fetchTrail(id).catch(() => null))
        );

        const query = search.value.trim().toLowerCase();
        const selectedRating = rating.value;

        const items = trails.filter(trail =>
            trail !== null &&
            result.loaded.includes(trail.name) &&
            trail.name.toLowerCase().includes(query) &&
            (selectedRating === "" || trail.rating === selectedRating)
        );

        const state = uiState({ items });

        panels.loaded.textContent = "";

        if (state === "loaded") {
            for (const trail of items) {
                panels.loaded.append(card(trail));
            }
        }

        show(state);

    } catch (error) {
        panels.error.textContent = error.message;
        show("error");
    }
}

/* Wire the Load button, then call load() once so the page is not blank. */
loadButton.addEventListener("click", load);

load();