//Importation de la class principale des recettes
import recipeSection from "./templates/recipeSection.js"
import tag from "./utils/tag.js"
import dropdown from "./utils/dropdown.js"
import { recipes } from "../data/recipes.js"
import searchRecipe from "./utils/searchRecipe.js"

//Mise en forme et fonctionnement de la page index.html
function init() {

    //Mise en forme des dropdown
    new dropdown(recipes, "ingredients-ingredient").displayDropdown()
    new dropdown(recipes, "appliance").displayDropdown()
    new dropdown(recipes, "ustensils").displayDropdown()

    //Mise en forme des recettes
    new recipeSection(recipes).displayRecipe()

    //Action sur l'input principale
    new searchRecipe(recipes).actionSearchBar()
}

init()


