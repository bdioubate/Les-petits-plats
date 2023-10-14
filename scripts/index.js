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
        deleteRecipe.id === recipeId ? boolean = true : null
    })
    return boolean
}

/**
 * Renvoie un Array de recettes qui contiennent au moins le mot entré par l'utilisateur aux niveaux : 
 * du titre de la recette, 
 * de la liste des ingrédients de la recette, 
 * ou de la description de la recette 
 * @param {string} sentence
 * @returns {Array}
 */
const getArrayRecipe = (sentence) => {

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
const createTagArray = () => {

    const arrayTags = []

    //Array de tous les tags qui sont selectionnés
    const arrayDivTags = document.querySelectorAll(".tag")

    //Boucle sur les div tags
    arrayDivTags.forEach((divTag) => {
        divTag?.forEach((tag) => {
        const dataTag = tag.dataset.tag.textContent
        const dataDropdown = tag.dataset.dropdown.textContent
        
        //Creation de l'objet tag
        const ObjectTag = {
            tag : String(dataTag),
            dropdown : String(dataDropdown)
        }

        //Ajout l'objet tag a l'array
        arrayTags.push(ObjectTag)
        })
        
})

    return {arrayTags}
}




/**
 * supprime les tags selectionnés 
 * 
 */
const deleteAllTag = () => {
    //Array de tous les tags qui sont selectionnés
    const tagContent = document.getElementById("tag-content")

    //Boucle sur les div tags
    /*arrayDivTags.forEach((divTag) => {
        divTag?.forEach((tag) => {
            HTMLDivElement(tag).remove()
        })
    })*/

    tagContent.innerHTML = ``
}



/**
 * Affiche les tags qui sont selectionées sur la page dans la section tag-content
 * 
 */
const displayAllTag = () => {
    //div tag-content
    const tagContent = document.getElementById("tag-content")
    //Recuperation des objects tags
    const {tagArray} = createTagArray()

    //Supression des tags selectionnés
    deleteAllTag()

    //Mise en forme des tags selectionés
    tagArray.forEach((divTag) => {
        const tag = document.querySelector(`#tag-content .tag[data-dropdown="${divTag.dropdown}"] .tag__button[data-tag="${divTag.tag}"][data-dropdown="${divTag.dropdown}"]`)
        tag.innerHTML = `
        <p>${divTag.tag}</p>
        <button><i class="fa-solid fa-xmark fa-xl"></i></button>
        `
    })
}


/**
 * Renvoie un Array de recettes qui correspond au moins à un tag selectionnées
 * 
 * @param {string} sentence
 * @returns {Array} 
 * 
 *//*
const tagMatchRecipe = (sentence) => {

    const recipeArray = getArrayRecipe(sentence)
    const tagArray = createTagArray()

    const recipeAndTagArray = recipeArray.filter((recipe) => {
        Object.entries(tagArray).some((tag) => Object.values(tag.tag) === `${recipe}.${Object.values(tag.tag)}`)
    })

    return recipeAndTagArray
}*/

/**
 * Renvoie l'Array principal des recettes qui correspond a l'array de la fonction searchRecipe et tagMatchRecipe
 * 
 * @param {Array} ArraySearchRecipe Array de recettes qui contiennent au moins le mot entré par l'utilisateur aux niveaux : 
 * du titre de la recette, 
 * de la liste des ingrédients de la recette, 
 * ou de la description de la recette 
 * @param {Array} ArraytagMatchRecipe Array de recettes qui correspond au moins à un tag selectionnées
 * @returns {Array} 
 * 
 */
const recipeArray = (ArraySearchRecipe, ArraytagMatchRecipe = recipes) => {
    ArraySearchRecipe.map((searchRecipe) => {
        ArraytagMatchRecipe.some((tagMatchRecipe) => tagMatchRecipe.id === searchRecipe.id) === true 
    })

    const arrayRecipe = [...ArraySearchRecipe]

    return arrayRecipe
}

/**
 * Supprime les recettes sur la page
 * 
 * @param {Array} recipeArray
 * 
 */
const deleteAllRecipe = () => {
    const recipeSection = getElementById("recipe_section")

    recipeSection.innerHTML = ``
}

/**
 * Affiche et ajoute les ingredients d'une recette dans article card-recipe sur la page
 * 
 */
const displayAddIngredients = () => {

}

/**
 * Affiche une recette dans section recipe_section sur la page
 * 
 */
const displayRecipeCard = () => {

}

/**
 * Affiche les recettes sur la page
 * 
 * @param {Array} recipeArray
 * 
 */
const displayAllRecipe = (ArraySearchRecipe, ArraytagMatchRecipe = recipes) => {
    const recipeSection = getElementById("recipe_section")

    const recipeArray = recipeArray(ArraySearchRecipe, ArraytagMatchRecipe = recipes)

    recipeArray.forEach((recipe) => {
        const listIngredients = document.createElement("div")
        listIngredients.setAttribute("class","card-recipe__text__ingredients__list")

        Object.entries(recipe.ingredients).forEach((listIngredients) => {
            //const = document
            Object.values(listIngredients.ingredient)
        })

        const recipeCard = document.createElement("article")
        recipeCard.setAttribute("class","card-recipe")

        recipeSection.appendChild(recipeCard)
    })
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
    console.log(recipeArray(getArrayRecipe("coco")))
}


/**
 * Fonction globale secondaire du site
 * Mise a jour de la mise en forme et fonctionnement de la page index.html
 */
const updateInit = () => {

}





//Declaration de la fonction globales principale du site

init()


