import searchRecipe from "./searchRecipe.js"
import tag from "./tag.js"

//Class de la mise en forme et le fonctionnement d'un dropdown
export default class dropdown{ 

    constructor(recipes, nameDropdown, searchRecipe = "") {
        this._recipes = recipes,
        this._nameDropdown = nameDropdown,
        this._searchRecipe = searchRecipe
    }

    get recipes() {
        return this._recipes
    }

    get nameDropdown() {
        return this._nameDropdown
    }

    get searchRecipe() {
        return this._searchRecipe
    }

    getVariable() {
        //Boutton dropdown
        const btnDropdown = document.querySelector(`.dropdown[data-filter="${this.nameDropdown}"] .dropdown__btn`)

        //div recherche du dropdown
        const searchDropdown = document.querySelector(`.dropdown[data-filter="${this.nameDropdown}"] .dropdown__search`)

        //Input de la recherche principale
        const input = document.querySelector(`input#${this.nameDropdown}__search`)

        //div recherche du dropdown
        const ingredientsDropdown = document.querySelector(`.dropdown[data-filter="${this.nameDropdown}"] .dropdown__ingredient`)

        //div des tags
        const tagsDropdown = document.querySelector(`.dropdown[data-filter="${this.nameDropdown}"] .dropdown__btn`)

        //Tab des bouttons des tag 
        const btnTags =  document.querySelectorAll(`.dropdown[data-filter="${this.nameDropdown}"] .dropdown__ingredient button`)

        return { btnDropdown, searchDropdown, input, ingredientsDropdown, btnTags }
    }

    showDropdown() {
        const { btnDropdown, searchDropdown, ingredientsDropdown } = this.getVariable() 

        //Au click boutton dropdown
        btnDropdown.addEventListener("click", () => {
            if(btnDropdown.dataset.btn === "true") {
                this.closeDropdown()
                //btnDropdown.style.borderRadius = "10px";
                //btnDropdown.dataset.btn = "false";
            } else{
                searchDropdown.style.display = "grid";
                ingredientsDropdown.style.display = "block";
                btnDropdown.style.borderRadius = " 10px 10px 0 0";
                btnDropdown.dataset.btn = "true";
            }
        })

    }

    closeDropdown() {
        const { btnDropdown, searchDropdown, ingredientsDropdown } = this.getVariable()

        //Au click boutton dropdown
        //btnDropdown.addEventListener("click", () => {
            searchDropdown.style.display = "none";
            ingredientsDropdown.style.display = "none";
            btnDropdown.style.borderRadius = "10px";//
            btnDropdown.dataset.btn = "false";//
        //})

    }

    //Mise en forme des dropdown
    displayDropdown(tab = this.recipes) {

        //div search Dropdown
        this.showDropdown()

        //div Dropdown ingredients
        this.displayTagsDropdown(tab)

    }

    getSearchDropdown() {
        const { btnDropdown, searchDropdown, input, ingredientsDropdown } = this.getVariable()

        input.addEventListener("change", () => {
        //Tab des bouttons des tag 
        const btnTags =  document.querySelectorAll(`.dropdown[data-filter="${this.nameDropdown}"] .dropdown__ingredient button`)

        for (let i = 0; i < btnTags.length; i++) {
            btnTags[i].remove()
            
        }

        //Valeur du champ
        const sentence = input.value 

            this.displayTagsDropdown(this.recipes, sentence)
        })
        
        
        //return sentence
        
    }

    //Obtenir le chemin des tags
    laneTags(){

        //creation de l'objetNameType
        const names = []

        if(this.nameDropdown.indexOf('-')) {
            for (let i = 0; i < this.nameDropdown.split('-').length; i++) {
                Object(names).push(this.nameDropdown.split('-')[i])
                
            }
        } else {
            names.push(this.nameDropdown)
        }

        return names
    }

    findTags(tab = this.recipes) {
        let tags = []
        //chemin des tags
        if(this.laneTags().length === 1 ){
            //nom de la propriete de l'objet
            const nameProperty = this.laneTags()[0]

           tags = this.typeTags(nameProperty,tab)
        } else if(this.laneTags().length === 2 ){
            //nom des proprietes de l'objet
            const nameProperty = this.laneTags()[0]
            const namePropertyChild = this.laneTags()[1]

            const objectParentProperty = this.typeTags(nameProperty,tab)
           tags = this.typeTags(namePropertyChild, objectParentProperty)
        }
            
        return tags
    }

    typeTags(tag, tab = this.recipes) {
        const nameTags = []

        for (const recipe of tab) { 

            //nom de la propriete de l'objet
            const nameProperty = recipe[`${tag}`]
        
            if(typeof nameProperty === "string") {
                nameTags.includes(nameProperty.toLowerCase()) ? 
                    nameTags 
                    :
                    nameTags.push(nameProperty.toLowerCase())    
            } else {
                for (const tags of nameProperty) {
                    nameTags.includes(tags) ? 
                    nameTags 
                    :
                    nameTags.push(tags) 
                }
            }

        }
        return nameTags




    }

    displayTagsDropdown(tab = this.recipes, sentenceSearchTag = "") {
        const { ingredientsDropdown } = this.getVariable()

        //Creation des tags
        for (let i = 0; i < this.findTags(tab).length; i++) {
            if(this.findTags(tab)[i].includes(sentenceSearchTag.toLowerCase())){
            const tagBtn = document.createElement("button")
            const tagP = document.createElement("p")
            tagP.textContent = this.findTags(tab)[i].toLowerCase()
            tagBtn.ariaLabel = this.findTags(tab)[i].toLowerCase()
            tagBtn.appendChild(tagP)
            ingredientsDropdown.appendChild(tagBtn)
            }
            
        }

        //Au click sur un bouton tag
        this.tagsDropdown()

        //Au changement de l'input efface les tagsqui correspond pas
        this.getSearchDropdown()


    }

    //Au click sur un bouton tag
    tagsDropdown() {
        const { btnTags } = this.getVariable()

        for (const btnTag of btnTags) {
            btnTag.addEventListener("click", () => { 
                
                //Supprimer le boutton du drpdown
                btnTag.remove()
                //Creation de la div tag
                new tag().displayTag(btnTag.ariaLabel, this.nameDropdown)
                //Enregistre le tag dans la tableau des tag qui sont active
                /*const tabBangali = */new tag().registerTagTab(this.nameDropdown)
                /*
                //Mis a jour des card recettes
                //new searchRecipe().updateDisplay(this.recipes)
                //console.log(new searchRecipe().conditionWithTags(this.nameDropdown,tabBangali,this.recipes))
                this.closeDropdown()*/
                //console.log(new searchRecipe().updateDisplay(new searchRecipe().Twocondition()))
            })    
        }
            
    }
}