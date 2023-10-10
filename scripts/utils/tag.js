import searchRecipe from "./searchRecipe.js"

//Class de la mise en forme et le fonctionnement d'un tag
export default class tag{
    constructor(nameTag="", nameDropdown = "", searchRecipe = "") {
        this._nameTag = nameTag,
        this._nameDropdown = nameDropdown,
        this._searchRecipe = searchRecipe
    } 

    get nameTag() {
        return this.nameTag
    }

    get nameDropdown() {
        return this.nameDropdown
    }
 
    get searchRecipe() {
        return this.searchRecipe
    }

    //Met les tags qui sont selectionner dans un tableau
    registerTagTab(nom) {
        //Creation du tableau des tags qui sont dans la div tag-content
        const tagTab = []
        //recuperer tous les tag dans la div tag-content
        const allNameTags = document.querySelectorAll(`.tag[data-filter="${nom}"] .tag__button p`)

        for (let i = 0; i < allNameTags.length; i++) {
            tagTab.push(allNameTags[i].textContent)
            
        }
        return tagTab

    }


    //Met les tags qui sont selectionner dans un tableau
    registerTagTabCopie() {
        //Creation du tableau des tags qui sont dans la div tag-content
        const tagTab = []
        //recuperer tous les tag dans la div tag-content
        const allNameTags = document.querySelectorAll(`.tag .tag__button p`)

        for (let i = 0; i < allNameTags.length; i++) {
            tagTab.push(allNameTags[i].textContent)
            
        }
        return tagTab

    }

    //Fermer le tag
    closeTag() {

    }

    //Rechercher les tags
    searchTags(nameTag, searchRecipe) {

    }

    //Mise en forme des tags
    displayTag(nom,name) {
        //const { divTagDropdown} = this.getVariable()

        //div tag du dropdown
        const divTagDropdown = document.querySelector(`.tag[data-filter="${name}"]`)


        //div du tag
        //const divTag = document.querySelector(`.tag[data-filter="${this.nameDropdown}"] .tag__button[data-filter="${this.nameTag}"]`)
        const divTag = document.createElement("div")
        divTag.setAttribute("class","tag__button")
        divTag.dataset.filter = `${nom}`
        divTagDropdown.appendChild(divTag)

        //Le nom du tag
        //const pTag = document.querySelector(`.tag[data-filter="${this.nameDropdown}"] .tag__button[data-filter="${this.nameTag}"] p`)
        const pTag = document.createElement("p")
        pTag.textContent = `${nom}`
        divTag.appendChild(pTag)

        //Le boutton du tag
        const iBtnTag = document.createElement("i")
        iBtnTag.setAttribute("class","fa-solid fa-xmark fa-xl")
        //const btnTag = document.querySelector(`.tag[data-filter="${this.nameDropdown}"] .tag__button[data-filter="${this.nameTag}"] button`)
        const btnTag = document.createElement("button")
        btnTag.appendChild(iBtnTag)
        divTag.appendChild(btnTag)

        
        
    }


}