//Importation de la class principale des recettes
    //recipe.js
    import { createTagArray } from "../utils/tag.js"

//Dropdown
//Obtenir le chemin des tags
const laneTags = (nameDropdown) => {

    //creation de l'objetNameType
    const names = []

    /*if(nameDropdown.indexOf('-')) {
        for (let i = 0; i < nameDropdown.split('-').length; i++) {
            Object(names).push(nameDropdown.split('-')[i])
            
        }
    } else {
        names.push(nameDropdown)
    }*/
    nameDropdown.indexOf('-') ? 
        nameDropdown.split('-').forEach((oneName) => Object(names).push(oneName))
    :
        names.push(nameDropdown)

    return names
}

//Dropdown
export const findTags = (nameDropdown,tab = recipes) => {
    let tags = []
    let nameProperty
    let namePropertyChild
    let objectParentProperty
    //chemin des tags
    /*if(laneTags(nameDropdown).length === 1 ){
        //nom de la propriete de l'objet
        const nameProperty = laneTags(nameDropdown)[0]

       tags = typeTags(nameProperty, tab)
    } else if(laneTags(nameDropdown).length === 2 ){
        
        //nom des proprietes de l'objet
        const nameProperty = laneTags(nameDropdown)[0]
        const namePropertyChild = laneTags(nameDropdown)[1]
        const objectParentProperty = typeTags(nameProperty,tab)
       tags = typeTags(namePropertyChild, objectParentProperty)
    }*/

    laneTags(nameDropdown).length === 1 ?
        (
            //nom de la propriete de l'objet
            nameProperty = laneTags(nameDropdown)[0],
            tags = typeTags(nameProperty, tab)
        )
    :
        laneTags(nameDropdown).length === 2 ?
                (
                    //nom des proprietes de l'objet
                    nameProperty = laneTags(nameDropdown)[0],
                    namePropertyChild = laneTags(nameDropdown)[1],
                    objectParentProperty = typeTags(nameProperty,tab),
                    tags = typeTags(namePropertyChild, objectParentProperty)
                )
        :
            null

            


    const unique = []
    tags.forEach((tag) => {
        unique.includes(String(tag).toLowerCase()) ? null : unique.push(String(tag).toLowerCase())
    })

    return unique
}

//Dropdown
const typeTags = (tag, tab = recipes) => {
    const nameTags = []

    /*for (const recipe of tab) {
        console.log(recipe)
        //nom de la propriete de l'objet
        const nameProperty = recipe[`${tag}`]
        console.log(nameProperty)

            if(typeof nameProperty === "string") {
                nameTags.includes(nameProperty.toLowerCase()) ? 
                    null 
                    :
                    nameTags.push(nameProperty.toLowerCase())    
            }else {
                nameProperty.forEach((tags) => nameTags.includes(tags) ? null : nameTags.push(tags))
            }

    }*/

    tab.forEach((recipe) => {
        //nom de la propriete de l'objet
        const nameProperty = recipe[`${tag}`]

        typeof nameProperty === "string" ?
            nameTags.includes(nameProperty.toLowerCase()) ? 
            null 
            :
            nameTags.push(nameProperty.toLowerCase())
        :
            nameProperty.forEach((tags) => nameTags.includes(tags) ? null : nameTags.push(tags))

    })
    return nameTags

}


/**
* Verifie si le tag d'un dropdown n'est pas affiché
* Dropdown
* @param {Object} object
* @returns {boolean}
* 
*/
const verifTagDropdown = (arrayObject, string) => {

const bool = arrayObject.some((object) => (`${object.tag} - ${object.dropdown}`) === string)

return bool
}

//Dropdown
const clearInput = () => {
//Array des boutons dropdowns
const ArrayDropdowns = document.querySelectorAll(".dropdown")

ArrayDropdowns.forEach((dropdown) => {
    const newInput = dropdown.children[1].children[0]
    newInput.value = ""
})
}

/**
* Affiche les tags dans les différents dropdown sur la page
* Dropdown
* @param {Object} arrayNameTagDropdown
* 
*/
export const displayAllTagDropdown = (tab = recipes) => {
const arrayDropdown = document.querySelectorAll(".dropdown")
clearInput()

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