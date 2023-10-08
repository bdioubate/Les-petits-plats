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

    /*
    //fonctionnement de la section recipe_section
    getRecipe(newSearchRecipe = "") {

        //Copie entier du tableau des recettes
        const newRecipe = [...this.recipes]

        //Si le parametre et vide tableau ne change pas sinon on le modifie
        if(newSearchRecipe === "") {
            newRecipe

        } else {
            //Recherche par ecrit (searchRecipe)



            //Recherche par tag(s) (dropdown)

        }
        

        //retourne un nouveau tableau des recettes
        return newRecipe
    } */

    

    //Mise en forme de la section recipe_section
    //parametre correspond a la fonction getSearchRecipe() de la class searchRecipe
    displayRecipe() { 
        //Copie entier du tableau des recettes
        const newRecipe = [...this.recipes]

        /*
        // l'actualisation des dropdown d'une sur le champ principale
        new dropdown(ingredients-ingredient, newSearchRecipe).displayTagsDropdown()
        new dropdown(appliance, newSearchRecipe).displayTagsDropdown()
        new dropdown(ustensils, newSearchRecipe).displayTagsDropdown()

        //verifie si le mot dans le champ recherche correspond a un tag dans tous les dropdown
        new tag(ingredients-ingredient, newSearchRecipe).displayTag()
        new tag(appliance, newSearchRecipe).displayTag()
        new tag(ustensils, newSearchRecipe).displayTag()*/

        //Ajout et mise en forme des recettes
        for (const recipe of new searchRecipe(newRecipe).getRecipe()) {
            new recipeCard(recipe).displayRecipeCard()
        }
    }
}

