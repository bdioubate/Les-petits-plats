import recipeSection from "../templates/recipeSection.js"
import dropdown from "./dropdown.js"
import tag from "./tag.js"

//Class du fonctionnement de la recherche d'une recette
export default class searchRecipe{

    constructor(recipes) { 
        this._recipes = recipes
    }

    get recipes() {
        return this._recipes
    }

    getSearchRecipe() { 
        //Input de la recherche principale
        const champ = document.querySelector("input#search")

        //Valeur du champ
        const sentenceNewSearch = champ.value
        
        return sentenceNewSearch

    }

    conditionWithRecipe(sentenceNewSearch = "", TabRecipe = this.recipes, nameDropdown = "", TabTags = []) {
        //Copie entier du tableau des recettes
        const newRecipe = [...TabRecipe]
        
        //Un tableau des nouvelles des recettes correspondante
        const tabNewRecipe = []

        //Copie de la phrase du champ de recherche
        const newSentence = sentenceNewSearch.toLowerCase()

        

        //iteration sur le tableau des recettes recu
        for(let i = 0; i < newRecipe.length; i++){
            let existRecipe = false

            //si la phrase du champ correspond au titre ?
            if((newRecipe[i].name.toLowerCase()).includes(newSentence)){
                existRecipe = true
            }

            //si la phrase du champ correspond a un des des ingrédients de la recette ?
            for(let j = 0; j < (newRecipe[i].ingredients).length; j++){
                if((newRecipe[i].ingredients[j].ingredient.toLowerCase()).includes(newSentence)){
                        existRecipe = true
                    }      
            
            }
            //si la phrase du champ correspond a une partie de la description de la recette ?
            if((newRecipe[i].description).includes(newSentence)){
                existRecipe = true
            }
                
            if(existRecipe) {
                    tabNewRecipe.push(newRecipe[i])
                }
        }
        return tabNewRecipe

    }

    Twocondition() {
        const tabNewRecipe = []
        
        const sentenceSearch = String(this.getSearchRecipe())

        const tagTag = this.conditionWithTagsCopie()
        const tagRecipe = this.conditionWithRecipe(sentenceSearch)
        for (let i = 0; i < tagRecipe.length; i++) {
            for (let j = 0; j < tagTag.length; j++) {
                if(JSON.stringify(tagRecipe[i]) === JSON.stringify(tagTag[j])){
                        tabNewRecipe.push(tagRecipe[i])
                }
                
            }
            
        }
        return tabNewRecipe

    }

    conditionWithTagsCopie(tabRecipe = this.recipes){
        //Creation du nouveau tab des recette qui va etre retourner
        const tabNewRecipe = []

        //Tous les tags active
        const tabTags = new tag().registerTagTabCopie()

        //Copie de l'object des recette
        //const newTabRecipe = await [...this.recipes]

        if(tabRecipe != undefined){
            const newTabRecipe = tabRecipe 
        
        
        //Recuperation des nom des dropdown
        const tabNameDropdown = document.querySelectorAll("#tag-content .tag")
        //a supprimer
            let nbT = 0
        //iteration sur le tableau des recettes recu
            for(let i = 0; i < newTabRecipe.length; i++){ 
                let existTag = false
                let calTag = 0

        //iteration sur le tableau des dropdown
        for (const divNameDropdown of tabNameDropdown) {
            //nbTour++
            const nameDropdown = divNameDropdown.dataset.filter

                //iteration sur le tableau des tags
                for (let j = 0; j < tabTags.length; j++) {
                    //String
                    if(typeof newTabRecipe[i][`${nameDropdown}`] === "string") {
                        if((newTabRecipe[i][`${nameDropdown}`].toLowerCase()) === (tabTags[j]).toLowerCase()){
                            existTag = true
                            calTag++
                            //tabNewRecipe.push(newRecipe[i])
                        }else{
                            existTag = false
                        }
                    }
                    //Object
                    else if(typeof newTabRecipe[i][`${nameDropdown}`] === "object") {
                        if((newTabRecipe[i][`${nameDropdown}`]).includes(tabTags[j])){
                            existTag = true
                            calTag++
                        }else{
                            existTag = false 
                        }
                    }
                    //Array
                    else {
                        const nameObject = nameDropdown.split("-")[0]
                        const nameStrings = nameDropdown.split("-")[1]

                        for (const stringTag of newTabRecipe[i][`${nameObject}`]) {
                            if( (stringTag[`${nameStrings}`]).toLowerCase() === (tabTags[j]).toLowerCase()){
                                existTag = true
                                calTag++
                                //tabNewRecipe.push(newRecipe[i])
                                
                            }else{
                                existTag = false 
                            }
                        }
                    }
                }                    
        }
                    
                        if(calTag === tabTags.length){ 
                        if(tabNewRecipe.includes(newTabRecipe[i])){
                        } else{
                            tabNewRecipe.push(newTabRecipe[i])  
                        }           
                        }

        }
        return tabNewRecipe
        }
    }

    conditionWithTags(nameDropdown = "", TabTags = [], tabRecipe = this.recipes){

        const tabCardRecipe = document.querySelectorAll(".card-recipe")
        for (const cardRecipe of tabCardRecipe) {
            cardRecipe.remove()
        }
        //Copie entier du tableau des recettes
        const newRecipe = [...tabRecipe]
        
        //Un tableau des nouvelles des recettes correspondante
        const tabNewRecipe = []

        if(nameDropdown){ 
            //iteration sur le tableau des recettes recu
            for(let i = 0; i < newRecipe.length; i++){ 
                    let existTag = false
                    let calTag = 0
                    for (let j = 0; j < TabTags.length; j++) {
                        //String
                        if(typeof newRecipe[i][`${nameDropdown}`] === "string") {
                            if((newRecipe[i][`${nameDropdown}`].toLowerCase()) === (TabTags[j]).toLowerCase()){
                                existTag = true
                                calTag += 1
                            }else{
                                existTag = false
                            }
                        }
                        //Object
                        else if(typeof newRecipe[i][`${nameDropdown}`] === "object") {
                            if((newRecipe[i][`${nameDropdown}`]).includes(TabTags[j])){
                                existTag = true
                                calTag += 1
                            }else{
                                existTag = false 
                            }
                        }
                        //Array
                        else {
                            const nameObject = nameDropdown.split("-")[0]
                            const nameStrings = nameDropdown.split("-")[1]

                            for (const stringTag of newRecipe[i][`${nameObject}`]) {
                                if( (stringTag[`${nameStrings}`]).toLowerCase() === (TabTags[j]).toLowerCase()){
                                    existTag = true
                                    calTag += 1
                                    //tabNewRecipe.push(newRecipe[i])
                                    
                                }else{
                                    existTag = false 
                                }
                            }
                        }
                    }
                    if(calTag === TabTags.length){ 
                        if(tabNewRecipe.includes(newRecipe[i])){
                        } else{
                            tabNewRecipe.push(newRecipe[i])
                        }
                        
                    }   
            }
        }else{
            tabNewRecipe = newRecipe
        }
        //return tabNewRecipe
        //this.updateDisplay(tabNewRecipe)

    }

    getNewTabRecipe(sentenceNewSearch = "", TabRecipe = this.recipes, nameDropdown = "", TabTags = []) { 

        this.updateDisplay(this.conditionWithRecipe(sentenceNewSearch))
    }

    //fonctionnement de la section recipe_section
    getRecipe(tabRecipe = this.recipes, newSearchRecipe = "") {

        //Copie entier du tableau des recettes
        const newRecipe = [...tabRecipe]

        //Si le parametre et vide tableau ne change pas sinon on le modifie
        if(newSearchRecipe === "") {
            newRecipe

        } else {
            //Recherche par ecrit (searchRecipe)



            //Recherche par tag(s) (dropdown)

        }
        //retourne un nouveau tableau des recettes
        return newRecipe
    }

    updateDisplay(/*tab = this.recipes, */newRecipe = this.recipes) { 
        //La section html des recettes
        const cardRecipe = document.querySelectorAll(".card-recipe")

        //Supprimer des card recette
        for(let i = 0; i < cardRecipe.length; i++){
            if(cardRecipe){
                cardRecipe[i].remove()
            }
        }
        //ajout de(s) nouvelle(s) card(s)
        new recipeSection(newRecipe).displayRecipe(newRecipe) 
    }

    displayNewRecipe() { 
        //Input de la recherche principale
        const champ = document.querySelector("input#search")
        //Au changement de l'input
        champ.addEventListener("change", () => {
            this.updateDisplay(this.Twocondition())
        })

        //au click des boutons des dropdown
        //Tab des bouttons des tag 
        const btnTags =  document.querySelectorAll(`.dropdown .dropdown__ingredient button`)
        for (const btnTag of btnTags) {
            btnTag.addEventListener("click", () => { 
                this.updateDisplay(this.Twocondition())
                //Supprimer le boutton du drpdown
                btnTag.remove()
            }) 
        }

        //Au click des boutons croix des tags

    }
}