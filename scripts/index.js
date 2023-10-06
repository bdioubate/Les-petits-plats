//Importation des classes
import { recipes } from "../data/recipes.js"
import recipeSectionTemplate from "./templates/indexTemplate.js"

//Mise en forme de la section recipe_section
function displayRecipe() {

    //Ajout des dropdown

    //Ajout et mise en forme des recettes
    for (const recipe of recipes) {
        new recipeSectionTemplate(recipe).getRecipeCard()
      }
}

//Mise en forme de la page index.html
function init() {
    displayRecipe()
}

init()