//Importation de la class principale des recettes
    //recipeSearch.js
    import { getArrayRecipe } from "./searchRecipe.js"

/**
 * Renvoie un Array des tags selectionnés 
 * tag
 * @returns {Object} 
 * 
 */
const createTagArray = () => {

    const arrayTags = []

    //Array de tous les tags qui sont selectionnés
    const arrayDivTags = document.querySelectorAll(".tag .tag__button")

    //Boucle sur les div tags
    arrayDivTags.forEach((tag) => {
            const dataTag = tag.dataset.filter
            const dataDropdown = tag.parentNode.dataset.filter
            
            //Creation de l'objet tag
            const ObjectTag = {
                tag : String(dataTag),
                dropdown : String(dataDropdown)
            }

            //Ajout l'objet tag a l'array
            arrayTags.push(ObjectTag)
        
})

    return {arrayTags}
}

/**
 * supprime les tags selectionnés 
 * tag
 * 
 */
const deleteAllTag = () => {
    //Array de tous les tags qui sont selectionnés
    const tagContent = document.querySelectorAll(`#tag-content .tag`)

    //Boucle sur les div tags
    tagContent.forEach((divTag) => {
        divTag.innerHTML = ``
    })

    
}

/**
 * Affiche les tags qui sont selectionées sur la page dans la section tag-content
 * tag
 * 
 */
export const displayAllTag = () => {
    //const tagContent1 = document.querySelector(`#tag-content`)
    
    //Recuperation des objects tags
    const {arrayTags} = createTagArray()

    //Supression des tags selectionnés
    deleteAllTag()

    arrayTags.length > 0 ?
    //Mise en forme des tags selectionés
    arrayTags.forEach((divTag) => {

        const tagContent1 = document.querySelector(`#tag-content .tag[data-filter="${divTag.dropdown}"]`)
        const tag = document.createElement("div")
        tag.setAttribute("class","tag__button")
        tag.dataset.filter = divTag.tag
        tag.innerHTML = `
        <p>${divTag.tag}</p>
        <button><i class="fa-solid fa-xmark fa-xl"></i></button>
        `
        tagContent1.appendChild(tag)
        
    }) : null
}


/**
 * Renvoie un Array de recettes qui correspond au moins à un tag selectionnées
 * tag
 * @param {string} sentence
 * @returns {Array} 
 * 
 */
export const tagMatchRecipe = (sentence) => {

    const recipeArray = getArrayRecipe(sentence)
    const tagArray = createTagArray()

    const recipeAndTagArray = recipeArray.filter((recipe) => boolTagMatchRecipe(recipe,tagArray) === true)

    return recipeAndTagArray
}

/**
 * Renvoie un booleen si la recette au moins à un tag selectionnées
 * tag
 * @param {object} recipe 
 * @param {object} objectTag
 * @returns {boolean} 
 * 
 */
const boolTagMatchRecipe = (recipe,objectTag) => {
    let p 
    let nameObject, nameStrings
    Object.values(objectTag).filter((tag) => (
    
    p = tag.every((t) => (

            typeof recipe[`${t.dropdown}`] === ("string") ?
            (recipe[`${t.dropdown}`].toLowerCase() === t.tag.toLowerCase()) === true
            :  
                typeof recipe[`${t.dropdown}`] === ("object") ?
                    recipe[`${t.dropdown}`].some((tagt) => (tagt.toLowerCase() === t.tag.toLowerCase()) === true)
                :   
                    
                         (
                            nameObject = t.dropdown.split("-")[0],
                            nameStrings = t.dropdown.split("-")[1],
                            filterIngredient(recipe[`${nameObject}`], t.tag) === true
                         )
                    
        ) === true) 
    ))
    return p 
}

/**
 * Affiche un tag qui a été selectionées sur la page dans la section tag-content
 * Tag
 * @param {String} dataTag
 * @param {String} dataDropdown
 * 
 */
const displayTag = (dataTag, dataDropdown) => {
    const tagDivDropdown = document.querySelector(`.tag[data-filter="${dataDropdown}"]`)

    const btnTag = document.createElement("div")
    btnTag.setAttribute("class","tag__button")
    btnTag.dataset.filter = dataTag
    btnTag.innerHTML = `
        <p>${dataTag}</p>
        <button>
            <i class="fa-solid fa-xmark fa-xl"></i>
        </button>
    `
    tagDivDropdown.appendChild(btnTag)
}

//Tag
const closeTag = () => {
    //Input de la recherche principale
const input = document.getElementById("search")

//Array de tous les tags qui sont selectionnés
const arrayTags = document.querySelectorAll(".tag__button")

    //Boucle sur la liste de tags selectionnés d'un dropdown 
    arrayTags.forEach((tag) => {
        const btnCloseTag = tag.children[1]
        btnCloseTag.addEventListener("click", (e) => {
            let sentence
            e.target ?
            (
                sentence = input.value,
                e.target.parentNode.parentNode.remove(),
                init(sentence)
            )
            : null

        })

    })
}