//importation des class
import recipeCard from "./recipeCard.js"
import { recipes }  from "../../data/recipes.js"

//Class de la mise en forme et fonctionnement des recettes
export default class recipeSection{ 

    //fonctionnement de la section recipe_section
    getRecipe() {
        //Copie entier du tableau des recettes
        const newRecipe = [...recipes]
        
        //Recherche par ecrit (searchRecipe)


        //Recherche par tag(s) (dropdown)

        //retourne un nouveau tableau des recettes
        return newRecipe
    }

    //Mise en forme de la section recipe_section
    displayRecipe() {

        //Ajout des tags (tag)

        //Ajout et mise en forme des recettes
        for (const recipe of this.getRecipe()) {
            new recipeCard(recipe).getRecipeCard()
        }
    }
}