//importation des class
import recipeCard from "./recipeCard.js"
import searchRecipe from "../utils/searchRecipe.js"

//Class de la mise en forme et fonctionnement des recettes
export default class recipeSection{ 

    constructor(recipes) {
        this._recipes = recipes
    }

    get recipes() { 
        return this._recipes
    }

    

    //Mise en forme de la section recipe_section
    //parametre correspond a la fonction getSearchRecipe() de la class searchRecipe
    displayRecipe(tab = this.recipes) { 
        //Copie entier du tableau des recettes
        const newRecipe = [...tab]

        //Ajout et mise en forme des recettes
        for (const recipe of new searchRecipe(newRecipe).getRecipe()) {
            new recipeCard(recipe).displayRecipeCard()
        }
    }
}

