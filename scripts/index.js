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
 * renvoie un boolean, si le mot {sentence} correspond a un ingredient renvoie true
 * 
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
 * 
 */
const filterRecipe = (listDeleteRecipeArray, recipeId) => {
    let boolean = false
    listDeleteRecipeArray.forEach((deleteRecipe) => {
        console.log(deleteRecipe.id + " === " + recipeId)
        deleteRecipe.id === recipeId ? boolean = true : null
    })

    console.log(boolean)
    return boolean
}

/**
 * Renvoie un Array de recettes qui contiennent au moins le mot {sentence} soit aux niveaux de : 
 * le titre de la recette, 
 * la liste des ingrédients de la recette, 
 * ou la description de la recette 
 * @param {string} sentence
 * @returns {Array}
 */
const gatArrayRecipe = (sentence) => {

    //Les recettes a supprimer
    const arrayRecipeDelete = getArrayRecipeDelete(sentence)

    //Les recette a gerder
    const recipeArray = recipes.filter((recipe) => filterRecipe(arrayRecipeDelete,recipe.id) === false)


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
 * Affiche les tags qui sont selectionées sur la page dans la section tag-content
 * 
 * @param {Array} tagArray
 * 
 */
const displayAllTag = (tagArray) => {

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
 * Affiche un tag qui a été selectionées sur la page dans la section tag-content
 * 
 * @param {String} dataTag
 * @param {String} dataDropdown
 * 
 */
const displayTag = (dataTag, dataDropdown) => {

}






// Variable globales du site

//Input de la recherche principale
const input = document.getElementById("search")

//Array des dropdowns
const ArrayDropdowns = document.querySelectorAll(".dropdown")

//Array de tous les tags qui sont selectionnés
const arrayTags = document.querySelectorAll(".tag")






// Actions primaire de l'utilisateur 

//L'utilisateur rentre des caracteres dans la bar de recherche principale
input.addEventListener("keyup", (e) => {

  });

  //L'utilisateur clique sur le bouton de la bar de recherche principale
input.addEventListener("click", (e) => {

});

//L'utilisateur ajoute un tag
ArrayDropdowns.forEach((dropdown) => {
    //Array des tags d'un dropdown
    const arrayTagsDropdown = dropdown.children[2]
    arrayTagsDropdown.addEventListener("click", (e) => {

    });
});

//L'utilisateur supprime un tag

//Boucle sur la liste de tags selectionnés d'un dropdown 
/*arrayTags.forEach((tag) => {
        const btnCloseTag = tag.children[1]
        btnCloseTag.addEventListener("click", (e) => {

            });
    
});*/





// Actions Secondaire du site
//Rajouter fonction updateDisplayRecipe() CAR L’interface est actualisée avec les résultats de recherche !!


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

    //Fonction principale qui fonctionne
    console.log(gatArrayRecipe("lait de Coco"))
}


/**
 * Fonction globale secondaire du site
 * Mise a jour de la mise en forme et fonctionnement de la page index.html
 */
const updateInit = () => {

}





//Declaration de la fonction globales principale du site

init()


