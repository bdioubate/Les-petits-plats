//Importation de la class principale des recettes
    //recipe.js
    import { recipes } from "../../data/recipes.js"
    //tag.js
    import { displayAllTag } from "../utils/tag.js"
    //searchRepipe.js
    import { recipeArray } from "../utils/searchRecipe.js"
    //recipeCard.js
    import { displayRecipeCard } from "./recipeCard.js"
/**
 * Affiche les recettes sur la page
 * RecipeSection
 * @param {Array} recipeArray
 * 
 */
export const displayAllRecipe = (ArraySearchRecipe, ArraytagMatchRecipe = recipes) => {

    displayAllTag()

    const recipeSection = document.getElementById("recipe_section")

    //Suppression des articles
    recipeSection.innerHTML = ``

    recipeArray(ArraySearchRecipe, ArraytagMatchRecipe).forEach((recipe) => {
        const recipeCard = displayRecipeCard(recipe)

        recipeSection.appendChild(recipeCard)
    })

    

    const newRecipeArray = recipeArray(ArraySearchRecipe, ArraytagMatchRecipe)

    displayAllTagDropdown(newRecipeArray)

    updateNbRecipe(newRecipeArray)

    showMessage(newRecipeArray)

    return {newRecipeArray}
}

//Affiche le message quand la recherche ne trouva pas de recette
/**RecipeSection
 * @param {object} arrayRecipe
 */
const showMessage = (arrayRecipe) => {
    const nbRecipe = arrayRecipe.length

    const recipeSection = document.getElementById("recipe_section")

    const divMessage = document.createElement("div")
    divMessage.setAttribute("id","no-recipe")

    const h3 = document.createElement("h3")

    const input = document.getElementById("search")

    const sentence = input.value

    nbRecipe === 0 ? 
    (
            h3.textContent = `
        « Aucune recette ne contient ‘${sentence}’ vous pouvez chercher « tarte aux pommes », « poisson », etc.
        `,
        divMessage.style.display = "block",
        divMessage.appendChild(h3),
        recipeSection.appendChild(divMessage))
    :
        (null)
        

}


//Met a jour le nombre de cette recette sur la page
/**RecipeSection
 * @param {object} arrayRecipe
 */
const updateNbRecipe = (arrayRecipe) => {
    const nbRecipe = arrayRecipe.length

    const divNbRecipe = document.querySelector("#nb-recipes h2 span")
    divNbRecipe.innerHTML = ``
    divNbRecipe.textContent = nbRecipe
}