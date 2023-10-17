//Importation de la class principale des recettes
import { recipes } from "../data/recipes.js"

// Action primaire du site

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

/* 
const actionDropdown = (a) => {

//Array des dropdowns
//const a = document.querySelectorAll(".dropdown__btn")
    
//L'utilisateur clique sur un dropdown
a.forEach((dropdown) => {
    let bool = false
    dropdown.addEventListener("click", (e) => {
        e.target.dataset.btn ?
            e.target.dataset.btn === "true" ?
                (e.target.dataset.btn = "false",
                console.log(e.target.parentNode),
                bool = true)
                //e.target.parentNode.style.display = "none")
                //e.target.style.borderRadius = "10px";
                    :
                    bool === true ? 
                    (e.target.dataset.btn = "true",
                    console.log(e.target.parentNode+" bb"),
                    //e.target.parentNode.style.display = "grid") 
                    bool=true)
                    : null
                :
            null
    })
})

}*/

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
 * 
 */
const displayAllTag = () => {
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
 * 
 * @param {string} sentence
 * @returns {Array} 
 * 
 */
const tagMatchRecipe = (sentence) => {

    const recipeArray = getArrayRecipe(sentence)
    const tagArray = createTagArray()

    const recipeAndTagArray = recipeArray.filter((recipe) => boolTagMatchRecipe(recipe,tagArray) === true)

    return recipeAndTagArray
}

/**
 * Renvoie un Array de recettes qui correspond au moins à un tag selectionnées
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
 * Affiche et ajoute les ingredients d'une recette dans article card-recipe sur la page
 * @param {Array} arrayListIngredients
 * @returns {HTMLDivElement} 
 * 
 */
const displayAddIngredients = (arrayListIngredients) => {
    const newArrayList = [...arrayListIngredients]

    const divListIngredients = document.createElement("div")
    divListIngredients.setAttribute("class","card-recipe__text__ingredients__list")

    newArrayList.forEach((elm) => {
        const listIngredients = document.createElement("div")
        listIngredients.setAttribute("class","card-recipe__text__ingredients__list__ingredient")
        listIngredients.dataset.tag = elm.ingredient
        listIngredients.innerHTML = `
            <h5>${elm.ingredient}</h5>
            <p>${elm.quantity} ml</p>
        `
        divListIngredients.appendChild(listIngredients)
    })

    return divListIngredients
}

/**
 * Affiche une recette dans section recipe_section sur la page
 * @param {Array} arrayRecipe
 */
const displayRecipeCard = (arrayRecipe) => {
    const newArrayRecipe = arrayRecipe

    const article = document.createElement("article")
    article.setAttribute("class","card-recipe")
    article.dataset.recipe = newArrayRecipe.name

    const a = displayAddIngredients(newArrayRecipe.ingredients)

    article.innerHTML = `
    <article class="card-recipe">
        <figure class="card-recipe__figure"><div class="card-recipe__figure__encart">
            <p>${newArrayRecipe.time}min</p></div>
            <img class="card-recipe__figure__img" src="./assets/recipes/${newArrayRecipe.image}">
            <figcaption class="card-recipe__figure__figcaption">
                <h3>${newArrayRecipe.name}</h3>
            </figcaption>
        </figure><div class="card-recipe__text">
        <div class="card-recipe__text__recette">
        <h4>RECETTE</h4><p>${newArrayRecipe.description}</p>
        </div>
        <div class="card-recipe__text__ingredients">
            <h4>INGRÉDIENTS</h4>
            <div class="card-recipe__text__ingredients__list">
            ${a}
            </div>
        </div>
        </article>
    `

    return article
}

/**
 * Affiche les recettes sur la page
 * 
 * @param {Array} recipeArray
 * 
 */
const displayAllRecipe = (ArraySearchRecipe, ArraytagMatchRecipe = recipes) => {

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
/**
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
/**
 * @param {object} arrayRecipe
 */
const updateNbRecipe = (arrayRecipe) => {
    const nbRecipe = arrayRecipe.length

    const divNbRecipe = document.querySelector("#nb-recipes h2 span")
    divNbRecipe.innerHTML = ``
    divNbRecipe.textContent = nbRecipe
}


//Obtenir le chemin des tags
const laneTags = (nameDropdown) => {

        //creation de l'objetNameType
        const names = []

        if(nameDropdown.indexOf('-')) {
            for (let i = 0; i < nameDropdown.split('-').length; i++) {
                Object(names).push(nameDropdown.split('-')[i])
                
            }
        } else {
            names.push(nameDropdown)
        }

        return names
}


const findTags = (nameDropdown,tab = recipes) => {
        let tags = []
        //chemin des tags
        if(laneTags(nameDropdown).length === 1 ){
            //nom de la propriete de l'objet
            const nameProperty = laneTags(nameDropdown)[0]

           tags = typeTags(nameProperty, tab)
        } else if(laneTags(nameDropdown).length === 2 ){
            
            //nom des proprietes de l'objet
            const nameProperty = laneTags(nameDropdown)[0]
            const namePropertyChild = laneTags(nameDropdown)[1]
            const objectParentProperty = typeTags(nameProperty,tab)
           tags = typeTags(namePropertyChild, objectParentProperty)
        }

        const unique = []
        tags.forEach((tag) => {
            unique.includes(String(tag).toLowerCase()) ? null : unique.push(String(tag).toLowerCase())
        })

        return unique
}


const typeTags = (tag, tab = recipes) => {
        const nameTags = []

        for (const recipe of tab) {
            //nom de la propriete de l'objet
            const nameProperty = recipe[`${tag}`]

                if(typeof nameProperty === "string") {
                    nameTags.includes(nameProperty.toLowerCase()) ? 
                        null 
                        :
                        nameTags.push(nameProperty.toLowerCase())    
                }else {
                    nameProperty.forEach((tags) => nameTags.includes(tags) ? null : nameTags.push(tags))
                }

        }
        return nameTags

}


/**
 * Verifie si le tag d'un dropdown n'est pas affiché
 * 
 * @param {Object} object
 * @returns {boolean}
 * 
 */
const verifTagDropdown = (arrayObject, string) => {

    const bool = arrayObject.some((object) => (`${object.tag} - ${object.dropdown}`) === string)

    return bool
}

/**
 * Affiche les tags dans les différents dropdown sur la page
 * 
 * @param {Object} arrayNameTagDropdown
 * 
 */
const displayAllTagDropdown = (tab = recipes) => {
    const arrayDropdown = document.querySelectorAll(".dropdown")

    const tagsArray = createTagArray()

    arrayDropdown.forEach((dropdown) => { 
        const divDropdownTag = document.querySelector(`.dropdown[data-filter="${dropdown.dataset.filter}"] .dropdown__tags`)
        divDropdownTag.innerHTML = ``
        findTags(dropdown.dataset.filter,tab).forEach((tag) => {
            const button = document.createElement("button")
            Object.values(tagsArray)[0][0] ? 
                verifTagDropdown(Object.values(tagsArray)[0], `${tag} - ${dropdown.dataset.filter}`) === true ? 
                    null
                :
                    (
                    button.ariaLabel = tag,
                    button.innerHTML = `
                    <p>${tag}</p>
                    `,
                    divDropdownTag.appendChild(button)
                    )
            :
                (
                button.ariaLabel = tag,
                button.innerHTML = `
                <p>${tag}</p>
                `,
                divDropdownTag.appendChild(button)
                )
        })
    })
}

/**
 * Affiche un tag qui a été selectionées sur la page dans la section tag-content
 * 
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


/**
 * Fonction globale principale du site
 * Mise en forme et fonctionnement de la page index.html
 * @param {string} a
 */
const init = (a = "") => {
    
    
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

    const sentence = a

    sentence.length > 2 ?
        a
    :
        a = ""

    displayAllRecipe(tagMatchRecipe(a))
    closeTag()

    return {input,ArrayDropdowns,ArrayBtnDropdowns,arrayTags, tagContent, tagContentSection,t,btnInput,inputDropdown}
}

const {input,ArrayDropdowns,ArrayBtnDropdowns,arrayTags, tagContent,tagContentSection,t,btnInput,inputDropdown} = init()


//Fonctionne
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
            null
    })
})

//reprendre la
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


//Declaration de la fonction globales principale du site

init()


//A regler
//les balise p dans les btn tag remplacer par span ou autre
//au clique des dropdown open or close 
//les ingredients des card de recette
//regler pour le probleme saladier
//mettre dans les differents fichiers
//mettre les reglege pour le bon affichage sur mobile comme ohmyfood