//Importation de la class principale des recettes
import recipeSection from "./templates/recipeSection.js"
import tag from "./utils/tag.js"
import dropdown from "./utils/dropdown.js"
import { recipes } from "../data/recipes.js"
import searchRecipe from "./utils/searchRecipe.js"

//Mise en forme et fonctionnement de la page index.html
function init() {

    /*//Mise en forme des dropdown
    new dropdown(ingredients-ingredient, newSearchRecipe).displayTagsDropdown()
    new dropdown(appliance, newSearchRecipe).displayTagsDropdown()
    new dropdown(ustensils, newSearchRecipe).displayTagsDropdown()*/

    //Mise en forme des recettes
    new recipeSection(recipes).displayRecipe()

    /*//Mise en forme des tags (tag.js)
    new tag(ingredients-ingredient, newSearchRecipe).displayTag()
    new tag(appliance, newSearchRecipe).displayTag()
    new tag(ustensils, newSearchRecipe).displayTag()*/

    //Ecoute sur le champ de recherche principale
    new searchRecipe(recipes).getSearchRecipe()
}

init()


