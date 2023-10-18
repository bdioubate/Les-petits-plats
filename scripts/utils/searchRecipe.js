//Importation de la class principale des recettes
    //recipe.js
    import { recipes } from "../../data/recipes.js"

/**
 * renvoie un boolean, si le mot {sentence} correspond a un ingredient renvoie true
 * searchRecipe
 */
const filterIngredient = (listIngredients, sentence) => {
    let boolean = false
    listIngredients.forEach((element) => {
        String(element.ingredient).toLowerCase().includes(String(sentence).toLowerCase())? boolean = true : null
    })

    return boolean
}

/**
 * renvoie un array des recettes a supprimer
 * searchRecipe
 * @param {string} sentence
 * @returns {Array} 
 */
const getArrayRecipeDelete = (sentence) => {
    //Filtre les recettes et renvoie un array des recettes a supprimer
    const deleteRecipeArray = recipes
    .filter((recipe) => !(String(recipe.name).toLowerCase().includes(String(sentence).toLowerCase())))
    ?.filter((recipe) => filterIngredient(recipe.ingredients, sentence) === false)
    ?.filter((recipe) => !(String(recipe.description).toLowerCase().includes(String(sentence).toLowerCase())))

    return deleteRecipeArray
}

/**
 * renvoie un boolean, si la recette doit etre supprimer grace a son id
 * searchRecipe
 */
const filterRecipe = (listDeleteRecipeArray, recipeId) => {
    let boolean = false
    listDeleteRecipeArray.forEach((deleteRecipe) => {
        deleteRecipe.id === recipeId ? boolean = true : null
    })
    return boolean
}

/**
 * Renvoie un Array de recettes qui contiennent au moins le mot entré par l'utilisateur aux niveaux : 
 * du titre de la recette, 
 * de la liste des ingrédients de la recette, 
 * ou de la description de la recette 
 * searchRecipe
 * @param {string} sentence
 * @returns {Array}
 */
export const getArrayRecipe = (sentence) => {

    //Les recettes a supprimer
    const arrayRecipeDelete = getArrayRecipeDelete(sentence)

    //Les recette a gerder
    const recipeArray = recipes.filter((recipe) => filterRecipe(arrayRecipeDelete,recipe.id) === false)


    return recipeArray
}

/**
 * Renvoie l'Array principal des recettes qui correspond a l'array de la fonction searchRecipe et tagMatchRecipe
 * searchRecipe
 * @param {Array} ArraySearchRecipe Array de recettes qui contiennent au moins le mot entré par l'utilisateur aux niveaux : 
 * du titre de la recette, 
 * de la liste des ingrédients de la recette, 
 * ou de la description de la recette 
 * @param {Array} ArraytagMatchRecipe Array de recettes qui correspond au moins à un tag selectionnées
 * @returns {Array} 
 * 
 */
export const recipeArray = (ArraySearchRecipe, ArraytagMatchRecipe = recipes) => {
    ArraySearchRecipe.map((searchRecipe) => {
        ArraytagMatchRecipe.some((tagMatchRecipe) => tagMatchRecipe.id === searchRecipe.id) === true 
    })

    const arrayRecipe = [...ArraySearchRecipe]

    return arrayRecipe
}