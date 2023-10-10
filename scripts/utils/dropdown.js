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
        //Boutton dropdown
        const btnDropdown = document.querySelector(`.dropdown[data-filter="${this.nameDropdown}"] .dropdown__btn`)

        //div recherche du dropdown
        const searchDropdown = document.querySelector(`.dropdown[data-filter="${this.nameDropdown}"] .dropdown__search`)

        //div recherche du dropdown
        const ingredientsDropdown = document.querySelector(`.dropdown[data-filter="${this.nameDropdown}"] .dropdown__ingredient`)

        //Au click boutton dropdown
        btnDropdown.addEventListener("click", () => {
            if(btnDropdown.dataset.btn === "true") {
                this.closeDropdown()
            } else{
                searchDropdown.style.display = "grid";
                ingredientsDropdown.style.display = "block";
                btnDropdown.style.borderRadius = " 10px 10px 0 0";
                btnDropdown.dataset.btn = "true";
            }
        })

    }

    closeDropdown() {
        //Boutton dropdown
        const btnDropdown = document.querySelector(`.dropdown[data-filter="${this.nameDropdown}"] .dropdown__btn`)

        //div recherche du dropdown
        const searchDropdown = document.querySelector(`.dropdown[data-filter="${this.nameDropdown}"] .dropdown__search`)

        //div recherche du dropdown
        const ingredientsDropdown = document.querySelector(`.dropdown[data-filter="${this.nameDropdown}"] .dropdown__ingredient`)

        //Au click boutton dropdown
        //btnDropdown.addEventListener("click", () => {
            searchDropdown.style.display = "none";
            ingredientsDropdown.style.display = "none";
            btnDropdown.style.borderRadius = "10px";//
            btnDropdown.dataset.btn = "false";//
        //})

    }

    //Mise en forme des dropdown
    displayDropdown(tab = this.recipes, sentenceSearchTag = "") {

        //div search Dropdown
        this.showDropdown()

        //div Dropdown ingredients
        this.displayTagsDropdown(tab,sentenceSearchTag)

    }

    //tester
    updateDisplayDropdown(tab = this.recipes, sentenceSearchTag = "") {

        //Input de la recherche principale
        const input = document.querySelector(`input#${this.nameDropdown}__search`)

        //effacer l'input du dropdown
        input.value = ""

        this.updateDisplayTagsDropdown(tab)

    }

    getSearchDropdown() {
        //Input de la recherche principale
        const input = document.querySelector(`input#${this.nameDropdown}__search`)

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
        //div recherche du dropdown
        const ingredientsDropdown = document.querySelector(`.dropdown[data-filter="${this.nameDropdown}"] .dropdown__ingredient`)

        //TEST
        //Tab des bouttons des tag 
        const btnTags =  document.querySelectorAll(`.dropdown[data-filter="${this.nameDropdown}"] .dropdown__ingredient button`)

        const ingredientsDropdownBtn = btnTags

        console.log(ingredientsDropdownBtn)


        //effacement des ancien tags
           for (let i = 0; i < ingredientsDropdownBtn.length; i++) {
                //console.log(ingredientsDropdownBtn.childNodes[i].childNodes[0].textContent)
                console.log("jai supprimer "+ ingredientsDropdownBtn[i])
                ingredientsDropdownBtn[i].remove()
                //console.log(ingredientsDropdownBtn.childNodes[i])
                
            }
            
        //TEST

        //Creation des tags
        for (let i = 0; i < this.findTags(tab).length; i++) {
            
            if(this.findTags(tab)[i].includes(sentenceSearchTag.toLowerCase())){
                //Verifie s'il existe pas dans la div tag-content
                let NoExist = true

                const tabTag = new tag().registerTagTabCopie()

                for (let j = 0; j < tabTag.length; j++) {

                    if(this.findTags(tab)[i].toLowerCase() === String(new tag().registerTagTabCopie()[j]).toLowerCase()) {
                        NoExist = false
                        }
                    
                }
                    if(NoExist){
                        //Bangali revient
                        
                        
                        const tagBtn = document.createElement("button")
                        const tagP = document.createElement("p")
                        tagP.textContent = this.findTags(tab)[i].toLowerCase()
                        tagBtn.ariaLabel = this.findTags(tab)[i].toLowerCase()
                        tagBtn.appendChild(tagP)
                        ingredientsDropdown.appendChild(tagBtn)    
                    }
                    
            }
            
        }

        //Au click sur un bouton tag
        this.tagsDropdown()

        //Au changement de l'input efface les tagsqui correspond pas
        this.getSearchDropdown()

        //Au click d'un bouton croix d'un tag
        this.closeTag()


    }

    //tester
    updateDisplayTagsDropdown(tab = this.recipes, sentenceSearchTag = "") {
        //div recherche du dropdown
        const ingredientsDropdown = document.querySelector(`.dropdown[data-filter="${this.nameDropdown}"] .dropdown__ingredient`)

        //Tab des bouttons des tag 
        const btnTags =  document.querySelectorAll(`.dropdown[data-filter="${this.nameDropdown}"] .dropdown__ingredient button`)

        const ingredientsDropdownBtn = btnTags

        console.log(ingredientsDropdownBtn)


        //effacement des ancien tags
           for (let i = 0; i < ingredientsDropdownBtn.length; i++) {
                //console.log(ingredientsDropdownBtn.childNodes[i].childNodes[0].textContent)
                console.log("jai supprimer "+ ingredientsDropdownBtn[i])
                ingredientsDropdownBtn[i].remove()
                //console.log(ingredientsDropdownBtn.childNodes[i])
                
            }

        
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

        this.tagsDropdown()

    }

    //Au click sur un bouton tag
    tagsDropdown() {

        //Tab des bouttons des tag 
        const btnTags =  document.querySelectorAll(`.dropdown[data-filter="${this.nameDropdown}"] .dropdown__ingredient button`)
        //tester
        console.log(btnTags.length)

        for (const btnTag of btnTags) {
            btnTag.addEventListener("click", () => { 
                
                //Supprimer le boutton du drpdown
                btnTag.remove()
                //Creation de la div tag
                new tag().displayTag(btnTag.ariaLabel, this.nameDropdown)

                //tester
                new searchRecipe(this.recipes).updateDisplay(new searchRecipe(this.recipes).Twocondition())
            })    
        }
            
    }

    //Au click de un bouton croix d'un tag 
    closeTag() {
        const btnTag = document.querySelectorAll(`.tag__button button`)

        const Tag =  document.querySelectorAll(`.tag__button`)

        for (let i = 0; i < btnTag.length; i++) {
            btnTag[i].addEventListener("click", () => { 
                console.log("jai toucher")
                Tag[i].remove()
                //tester
                new searchRecipe(this.recipes).updateDisplay(new searchRecipe(this.recipes).Twocondition())
            })   
            
            
        }
    }
}