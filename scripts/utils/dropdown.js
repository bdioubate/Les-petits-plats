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

        return { btnDropdown, searchDropdown, input, ingredientsDropdown }
    }

    showDropdown() {
        const { btnDropdown, searchDropdown, ingredientsDropdown } = this.getVariable() 

        const closeDropdown = this.closeDropdown()

        //Au click boutton dropdown
        btnDropdown.addEventListener("click", () => {
            if(btnDropdown.dataset.btn === "true") {
                closeDropdown
                btnDropdown.style.borderRadius = "10px";
                btnDropdown.dataset.btn = "false";
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
        btnDropdown.addEventListener("click", () => {
            searchDropdown.style.display = "none";
            ingredientsDropdown.style.display = "none";
        })

    }

    displayDropdown() {

        //div search Dropdown
        this.showDropdown()

        //div Dropdown ingredients
        this.displayTagsDropdown()

    }

    searchDropdown() {
        const { btnDropdown, searchDropdown, input, ingredientsDropdown } = this.getVariable()

        //Valeur du champ
        const sentence = input.value 
        
        return sentence
        
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

    findTags() {
        let tags = []
        //chemin des tags
        if(this.laneTags().length === 1 ){
            //nom de la propriete de l'objet
            const nameProperty = this.laneTags()[0]

           tags = this.typeTags(nameProperty)
        } else if(this.laneTags().length === 2 ){
            //nom des proprietes de l'objet
            const nameProperty = this.laneTags()[0]
            const namePropertyChild = this.laneTags()[1]

            const objectParentProperty = this.typeTags(nameProperty)
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
                nameTags.includes(nameProperty) ? 
                    nameTags 
                    :
                    nameTags.push(nameProperty)    
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

    displayTagsDropdown() {
        const { ingredientsDropdown } = this.getVariable()

        for (let i = 0; i < this.findTags().length; i++) {
            const tagBtn = document.createElement("button")
            const tagP = document.createElement("p")

            tagP.textContent = this.findTags()[i]
            tagBtn.appendChild(tagP)
            ingredientsDropdown.appendChild(tagBtn)
            
        }


    }

    tagsDropdown() {
        

    }
}