//Importation de la class principale des recettes
import recipeSection from "./templates/recipeSection.js"
import tag from "./utils/tag.js"
import dropdown from "./utils/dropdown.js"
import { recipes } from "../data/recipes.js"
import searchRecipe from "./utils/searchRecipe.js"

//Mise en forme et fonctionnement de la page index.html
function init() {

    /*//Mise en forme des tags (tag.js)
    new tag(recipes, ingredients-ingredient, newSearchRecipe).displayTag()
    new tag(recipes, appliance, newSearchRecipe).displayTag()
    new tag(recipes, ustensils, newSearchRecipe).displayTag()*/

    //Mise en forme des dropdown
    new dropdown(recipes, "ingredients-ingredient").displayDropdown()
    new dropdown(recipes, "appliance").displayDropdown()
    new dropdown(recipes, "ustensils").displayDropdown()

    //Mise en forme des recettes
    new recipeSection(recipes).displayRecipe()

    //Mise a jour de la mise en forme des recettes
    new searchRecipe(recipes).displayNewRecipe()

    //test 
    //console.log(new dropdown(recipes, "ingredients-ingredient").laneTags())
    //console.log(new dropdown(recipes, "appliance").laneTags())
    //console.log(new dropdown(recipes, "ustensils").laneTags())
    //new dropdown(recipes, "ingredients-ingredient").displayTagsDropdown()
    //new dropdown(recipes, "appliance").displayTagsDropdown()
    //new dropdown(recipes, "ustensils").displayTagsDropdown()

    //console.log(new dropdown(recipes, "ingredients-ingredient").typeTags("ingredients", recipes))
    //console.log(new dropdown(recipes, "appliance").typeTags("appliance", recipes))
    //console.log(new dropdown(recipes, "ustensils").typeTags("ustensils", recipes))
    
    

    
}

init()


