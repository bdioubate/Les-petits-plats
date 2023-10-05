import { recipes } from "../data/recipes.js"
import recipeSectionTemplate from "./templates/indexTemplate.js"

//Mise en forme de la section recipe_section
function displayRecipe() {

    //Ajout et mise en forme des recettes
    recipes.forEach((recipe) => {
        new recipeSectionTemplate(recipe).getRecipeCard()
    })
}

function init() {
    displayRecipe()
}

init()