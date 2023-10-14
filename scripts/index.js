//Importation de la class principale des recettes
import { recipes } from "../data/recipes.js"



// Action primaire du site

/**
 * Cherche un tag sur tous les dropdown via l'input de la recherche principale
 * 
 * @param {string} sentence
 */
const mainSearchTagAllDropdown = (sentence) => {

}

/**
 * Renvoie un Array de recettes qui contiennent au moins le mot {sentence} soit aux niveaux de : 
 * le titre de la recette, 
 * la liste des ingrédients de la recette, 
 * ou la description de la recette 
 * 
 * @param {string} sentence
 * @returns {Array}
 */
const searchRecipe = (sentence) => {
    const recipeArray = []

    return recipeArray
}

/**
 * Renvoie un Array de recettes qui correspond au moins à un tag selectionnées
 * 
 * @returns {Array} 
 * 
 */
const tagMatchRecipe = () => {
    const recipeArray = []

    return recipeArray
}

/**
 * Renvoie un Array des tags selectionnés 
 * 
 * @returns {Object} 
 * 
 */
const createTagArrayAllDropdown = () => {
    const tagArray = []

    return {tagArray}
}

/**
 * Renvoie l'Array principal des recettes qui correspond a l'array de la fonction searchRecipe et tagMatchRecipe
 * 
 * @param {Array} ArraySearchRecipe
 * @param {Array} ArraytagMatchRecipe
 * @returns {Array} 
 * 
 */
const recipeArray = (ArraySearchRecipe, ArraytagMatchRecipe) => {
    const tagArray = []

    return tagArray
}

/**
 * Affiche les recettes sur la page
 * 
 * @param {Array} recipeArray
 * 
 */
const displayRecipe = (recipeArray) => {

}

/**
 * Renvoie un array de tous les tags des differents dropdown qui correspond au recette(s) selectionée(s)
 * 
 * @param {Array} recipeArray
 * @returns {Object}
 * 
 */
const getAllTagDropdownMatchRecipe = (recipeArray) => {
    const tagDropdownArray = []

    return {tagDropdownArray}
}

/**
 * Affiche les tags dans les différents dropdown sur la page
 * 
 * @param {Object} tagDropdownArray
 * 
 */
const displayAllTagDropdown = (tagDropdownArray) => {

}

/**
 * Affiche les tags qui sont selectionées sur la page dans la section tag-content
 * 
 * @param {Array} tagArray
 * 
 */
const displayAllTag = (tagArray) => {

}

/**
 * Affiche un tag qui a été selectionées sur la page dans la section tag-content
 * 
 * @param {String} dataTag
 * @param {String} dataDropdown
 * 
 */
const displayTag = (dataTag, dataDropdown) => {

}

// Actions primaire de l'utilisateur


// Actions Secondaire du site


/**
 * renvoie un Array des tags d'un dropdown qui correspond a la phrase ecrit via l'input de la recherche d'un dropdown 
 * 
 * @param {String} sentence
 * @returns {object} 
 * 
 */
const dropdownSearchTagDropdown = (sentence) => {
    const tagDropdownArray = []

    return {tagDropdownArray}
}

/**
 * Met a jour l'afffichage des tags d'un dropdown 
 * 
 * @param {Array} sentence
 * 
 */
const updateDisplayTagDropdown = (sentence) => {

}


// Actions secondaire de l'utilisateur


/**
 * Fonction globale principale du site
 * Mise en forme et fonctionnement de la page index.html
 * @param {function updateInit() {}}
 */
const init = () => {


    updateInit()
}


/**
 * Fonction globale secondaire du site
 * Mise a jour de la mise en forme et fonctionnement de la page index.html
 */
const updateInit = () => {

}

//Declaration de la fonction globales principale du site

init()


