//Importation de la class principale des recettes
    //recipe.js
    import { recipes } from "../data/recipes.js"
    //recipeCard.js
    import { displayRecipeCard } from "./templates/recipeCard.js"
    //dropdown.js 
    import { displayAllTagDropdown } from "./utils/dropdown.js"
    //recipeSection.js
    import {displayAllRecipe} from "./templates/recipeSection.js"
    //tag.js
    import { tagMatchRecipe  } from "./utils/tag.js"


// Variable globales du site

//Input de la recherche principale
const input = document.getElementById("search")

//Boutton d'envoi de la recherche principale
const btnInput = document.querySelector("#search-content button")

//Array des boutons dropdowns
const ArrayDropdowns = document.querySelectorAll(".dropdown")

//Array des dropdowns
const ArrayBtnDropdowns = document.querySelectorAll(".dropdown__btn")

//Array de tous les tags qui sont selectionnés
const arrayTags = document.querySelectorAll(".tag__button")

const tagContent = document.querySelectorAll(`#tag-content .tag`)

const tagContentSection = document.getElementById(`tag-content`)

const t = document.querySelectorAll(`#tag-content`)

const inputDropdown  = document.querySelectorAll(".dropdown__search")

/*const actionDropdown = () => {

//Array des dropdowns
const a = document.querySelectorAll(".dropdown__btn")
    
//L'utilisateur clique sur un dropdown
a.forEach((dropdown) => {
    dropdown.addEventListener("click", (e) => {
        e.target.dataset.btn ?
            e.target.dataset.btn !== "true" ?
                (
                e.target.parentNode.children[1].style.display = "none",
                e.target.parentNode.children[2].style.display = "none",
                e.target.style.borderRadius = "10px",
                e.target.dataset.btn = "true")
                    :
                    (
                    e.target.parentNode.children[1].style.display = "grid",
                    e.target.parentNode.children[2].style.display = "grid",
                    e.target.dataset.btn = "false"
                    )
                :
                e.target.parentNode.dataset.btn !== "true" ?
                (
                e.target.parentNode.parentNode.children[1].style.display = "none",
                e.target.parentNode.parentNode.children[2].style.display = "none",
                e.target.parentNode.style.borderRadius = "10px",
                e.target.parentNode.dataset.btn = "true")
                    :
                    (
                    e.target.parentNode.parentNode.children[1].style.display = "grid",
                    e.target.parentNode.parentNode.children[2].style.display = "grid",
                    e.target.parentNode.dataset.btn = "false"
                    )
    })
})
}

/**
 * Fonction globale principale du site
 * Mise en forme et fonctionnement de la page index.html
 * @param {string} a
 */

const init = (sentence = "") => {

    //const sentence = a

    sentence.length > 2 ? sentence : sentence = ""

    displayAllRecipe(tagMatchRecipe(sentence))
}

//Action utilisateur

//L'utilisateur rentre des caracteres dans la bar de recherche principale
input.addEventListener("keyup", (e) => {
    //La valeur de l'input
    const sentence = e.target.value
        init(sentence)
})

  //L'utilisateur clique sur le bouton de la bar de recherche principale
btnInput.addEventListener("click", (e) => {
    const sentence = input.value

    const {newRecipeArray} = displayAllRecipe(tagMatchRecipe(sentence))

    const {arrayTags} = createTagArray()

    ArrayDropdowns.forEach((dropdown) => {
        const result = arrayTags.some((e) => (e.tag === sentence) &&  (e.dropdown === dropdown.dataset.filter) === true )
        result ?
            null
        : 
            (
            findTags(dropdown.dataset.filter,newRecipeArray).includes(sentence) ? 
                (
                    displayTag(sentence,dropdown.dataset.filter),
                    init(sentence)
                ) 
            : 
                    null
            )
    })
})

//L'utilisateur ajoute un tag
ArrayDropdowns.forEach((dropdown) => {
    //Array des tags d'un dropdown
    const arrayTagsDropdown = dropdown
    arrayTagsDropdown.addEventListener("click", (e) => {
        let sentence
        e.target.ariaLabel ?
            (
                sentence = input.value,
                e.target.style.backgroundColor = "blue",
                displayTag(e.target.ariaLabel,e.target.parentNode.parentNode.dataset.filter),
                init(sentence),
                e.target.remove()
                
            )
        :
            (
                e.target.parentNode.ariaLabel ?
                    (
                    sentence = input.value,
                    e.target.parentNode.style.backgroundColor = "blue",
                    displayTag(e.target.parentNode.ariaLabel,e.target.parentNode.parentNode.parentNode.dataset.filter),
                    init(sentence),
                    e.target.parentNode.remove()
                    )
                :
                        null
                
            )
    })
})

//L'utilisateur rentre des caracteres dans la bar des dropdown
ArrayDropdowns.forEach((dropdown) => {
    const newInput = dropdown.children[1].children[0]
    newInput.addEventListener("keyup", (e) => {
        const allBtn = e.target.parentNode.nextSibling.nextSibling.children
        Object.values(allBtn).forEach((button) => {
            const inputValue = e.target.value
            const btnValue = button.ariaLabel
            const result = (btnValue.includes(inputValue))
            result === true ?
                button.style.display = "block"
            :
                button.style.display = "none"
        })
    })
    
})


//L'utilisateur clique sur un dropdown
ArrayBtnDropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", (e) => {
        e.target.dataset.btn ?
            e.target.dataset.btn !== "true" ?
                (
                e.target.parentNode.children[1].style.display = "none",
                e.target.parentNode.children[2].style.display = "none",
                e.target.style.borderRadius = "10px",
                e.target.dataset.btn = "true")
                    :
                    (
                    e.target.parentNode.children[1].style.display = "grid",
                    e.target.parentNode.children[2].style.display = "grid",
                    e.target.dataset.btn = "false"
                    )
        :
            e.target.parentNode.dataset.btn !== "true" ?
                (
                e.target.parentNode.parentNode.children[1].style.display = "none",
                e.target.parentNode.parentNode.children[2].style.display = "none",
                e.target.parentNode.style.borderRadius = "10px",
                e.target.parentNode.dataset.btn = "true"
                )
            :
                (
                e.target.parentNode.parentNode.children[1].style.display = "grid",
                e.target.parentNode.parentNode.children[2].style.display = "grid",
                e.target.parentNode.dataset.btn = "false"
                )
    })
})


/*
//Boucle sur la liste de tags selectionnés d'un dropdown 
tagContent.forEach((tagArray) => {
    console.log(typeof tagArray.children)
//arrayTags
Object.values(tagArray.children).forEach((tag) => {
    const btnCloseTag = tag.children[1]
    btnCloseTag.addEventListener("click", (e) => {
        let sentence
        e.target ?
        (
            console.log("zzzzzzzzzzzzzz"),
            sentence = input.value,
            e.target.parentNode.parentNode.remove(),
            init(sentence)
        )
        : null

    })

})
})*/
 
//Declaration de la fonction globales principale du site

init()
