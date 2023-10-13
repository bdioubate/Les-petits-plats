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
            searchDropdown.style.display = "none";
            ingredientsDropdown.style.display = "none";
            btnDropdown.style.borderRadius = "10px";
            btnDropdown.dataset.btn = "false";

    }

    //Mise en forme des dropdown
    displayDropdown(tab = this.recipes, sentenceSearchBar = "", sentenceSearchTag = "") {

        
        //div search Dropdown
        this.showDropdown()

        //Bar de recherche du dropdown
        this.getSearchDropdown(tab)

        //div Dropdown ingredients
        this.displayTagsDropdown(tab,sentenceSearchBar,sentenceSearchTag)

    }

    getSearchDropdown(tab = this.recipes) {
        //Input de la recherche principale
        const input = document.querySelector(`input#${this.nameDropdown}__search`)

        input.addEventListener("input", () => {

            //Valeur du champ
        const sentence = input.value 

        //Tab des bouttons des tag 
        const btnTags =  document.querySelectorAll(`.dropdown[data-filter="${this.nameDropdown}"] .dropdown__ingredient button`)

        for (let i = 0; i < btnTags.length; i++) {
            btnTags[i].remove()
            
        }

            this.displayTagsDropdown(tab,undefined,sentence)
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

    displayTagsDropdown(tab = this.recipes, sentenceSearchBar = "", sentenceSearchTag = "") {
        //Champ de l'input prinicipale
        const champ = document.getElementById("input#search")

        //div recherche du dropdown
        const ingredientsDropdown = document.querySelector(`.dropdown[data-filter="${this.nameDropdown}"] .dropdown__ingredient`)

        //Tab des bouttons des tag 
        const btnTags =  document.querySelectorAll(`.dropdown[data-filter="${this.nameDropdown}"] .dropdown__ingredient button`)

        const ingredientsDropdownBtn = btnTags


        //effacement des ancien tags
          for (let i = 0; i < ingredientsDropdownBtn.length; i++) {
                ingredientsDropdownBtn[i].remove()
            }

        //Creation des tags
        for (let i = 0; i < this.findTags(tab).length; i++) {
            
            if(this.findTags(tab)[i].includes(sentenceSearchTag.toLowerCase())){
                //Verifie s'il existe pas dans la div tag-content
                let NoExist = true

                const tabTag = new tag().registerTagTabCopie()

                for (let j = 0; j < tabTag.length; j++) {


                    if((this.findTags(tab)[i].toLowerCase() === String(new tag().registerTagTabCopie()[j]).toLowerCase())) {
                        NoExist = false
                        }
                    
                }
                    if(NoExist){
                        
                        const tagBtn = document.createElement("button")
                        const tagP = document.createElement("p")
                        tagP.textContent = this.findTags(tab)[i].toLowerCase()
                        tagBtn.ariaLabel = this.findTags(tab)[i].toLowerCase()
                        tagBtn.appendChild(tagP)
                        ingredientsDropdown.appendChild(tagBtn)    
                    }
                    
            }
            
        }

        //Test pour ces trois a deplacer
        
        //Au click sur un bouton tag
        this.tagsDropdown(sentenceSearchBar)

        
        //Au changement de l'input efface les tagsqui correspond pas
        //this.getSearchDropdown(tab)

        //Au click d'un bouton croix d'un tag
        this.closeTag()
        


    }

    //Au click sur un bouton tag
    tagsDropdown(sentence = "") {

        //Tab des bouttons des tag 
        const btnTags =  document.querySelectorAll(`.dropdown[data-filter="${this.nameDropdown}"] .dropdown__ingredient button`)

        for(let i = 0 ; i < btnTags.length ; i++) {
            //Si il y a une recherche par input
            if(btnTags[i].childNodes[0].textContent === sentence.toLowerCase() && ![new tag().registerTagTabCopie()].includes(sentence.toLowerCase())){
                
                btnTags[i].remove()  
                new tag().displayTag(btnTags[i].ariaLabel, this.nameDropdown)
                new searchRecipe(this.recipes).updateDisplay(new searchRecipe(this.recipes).Twocondition())
                new searchRecipe(this.recipes).updateDisplay(new searchRecipe(this.recipes).Twocondition())


            } else {
            btnTags[i].addEventListener("click", (e) => { 
                if(e.target.parentNode.parentNode) {
                //Supprimer le boutton du drpdown
                btnTags[i].remove()
                //e.target.remove()

                //Creation de la div tag
                new tag().displayTag(btnTags[i].ariaLabel, this.nameDropdown)

                new searchRecipe(this.recipes).updateDisplay(new searchRecipe(this.recipes).Twocondition())
                new searchRecipe(this.recipes).updateDisplay(new searchRecipe(this.recipes).Twocondition())
            }
            })  
        }
        }
            
    }

    //Au click de un bouton croix d'un tag 
    closeTag() {
        const btnTag = document.querySelectorAll(`.tag[data-filter="${this.nameDropdown}"] .tag__button button`)

        for (const btnTa of btnTag) {
            btnTa.addEventListener("click", (e) => {
                if(e.target.parentNode.parentNode.parentNode){
                btnTa.parentNode.remove()
                new searchRecipe(this.recipes).updateDisplay(new searchRecipe(this.recipes).Twocondition())
                new searchRecipe(this.recipes).updateDisplay(new searchRecipe(this.recipes).Twocondition())
            }
            })
        }

    }
}

//A regler pourquoi je dois appeler la fonction 2 fois pour bien fonctionner la fermuture et ouverture des dropdown avec la fonction showDropdow: 
//new searchRecipe(this.recipes).updateDisplay(new searchRecipe(this.recipes).Twocondition()) au fonctions : closeTag et tagDropdown
//Je pense parce que la fonctionne s'apelle elle meme apres plusieurs a regler la sortie de la fonction bien separer les fonction
//Ou soit les supprimer dropdown avant de les recreer

//Regler la mise a jour des tags dropdonw pendant la recherche d'un tag 