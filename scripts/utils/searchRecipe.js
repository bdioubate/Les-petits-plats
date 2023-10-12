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
        let tabNewRecipe = []

        //Input de la recherche principale
        const champ = document.querySelector("input#search")

        //La valeur du champ
        const sentence = champ.value

        //Verifie d'abord si il ya les 3 caracteres minimun 
        if(sentence.length < 3 ){
            tabNewRecipe = this.recipes
        } else if(3 > sentence.length > 0) {
            this.updateDisplay(this.recipes)
        } else {

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
    }
        return tabNewRecipe

    }

    Twocondition() { 
        let tabNewRecipe = []

        //Supprimer la valeur des input des dropdown
        const input = document.querySelectorAll("#dropdown-content input")

        for (let i = 0; i < input.length; i++) {
            input[i].value = ""
            
        }
        
        const sentenceSearch = String(this.getSearchRecipe())

        const tagTag = this.conditionWithTagsCopie()
        const tagRecipe = this.conditionWithRecipe(sentenceSearch)
        
        if(this.recipes.length === tagTag.length){
            tabNewRecipe = tagRecipe
        } else {
            for (let i = 0; i < tagRecipe.length; i++) {
                for (let j = 0; j < tagTag.length; j++) {
                    if(JSON.stringify(tagRecipe[i]) === JSON.stringify(tagTag[j])){
                            tabNewRecipe.push(tagRecipe[i])
                    }
                    
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

        if(tabTags.length != 0) {
        if(tabRecipe != undefined){
            const newTabRecipe = tabRecipe 
        
        
        //Recuperation des nom des dropdown
        const tabNameDropdown = document.querySelectorAll("#tag-content .tag")
        //iteration sur le tableau des recettes recu
            for(let i = 0; i < newTabRecipe.length; i++){ 
                let existTag = false
                let calTag = 0

        //iteration sur le tableau des dropdown
        for (const divNameDropdown of tabNameDropdown) {
            const nameDropdown = divNameDropdown.dataset.filter

                //iteration sur le tableau des tags
                for (let j = 0; j < tabTags.length; j++) {
                    //String
                    if(typeof newTabRecipe[i][`${nameDropdown}`] === "string") {
                        if((newTabRecipe[i][`${nameDropdown}`].toLowerCase()) === (tabTags[j]).toLowerCase()){
                            existTag = true
                            calTag++
                        }else{
                            existTag = false
                        }
                    }
                    //Object
                    else if(typeof newTabRecipe[i][`${nameDropdown}`] === "object") {
                        for (let x = 0; x < newTabRecipe[i][`${nameDropdown}`].length; x++) {
                            if(newTabRecipe[i][`${nameDropdown}`][x].toLowerCase() === (tabTags[j]).toLowerCase()){
                                existTag = true
                                calTag++
                            }else{
                                existTag = false 
                            }
                            
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
        return this.recipes
    }

    //A voir supprimer cette fonction ne sert a rien renvoie la meme chose
    //fonctionnement de la section recipe_section
    getRecipe(tabRecipe = this.recipes, newSearchRecipe = "") {

        //Copie entier du tableau des recettes
        const newRecipe = [...tabRecipe]

        //Si le parametre et vide tableau ne change pas sinon on le modifie
        if(newSearchRecipe === "") {
            newRecipe

        }
        //retourne un nouveau tableau des recettes
        return newRecipe
    }

    updateDisplay(newRecipe = this.recipes, sentenceSearch = "") { 
        //Input de la recherche principale
        const champ = document.querySelector("input#search")

        //La valeur du champ
        const sentence = champ.value

        //La section html des recettes
        const cardRecipe = document.querySelectorAll(".card-recipe")

        //Suppression des card recette
        for(let i = 0; i < cardRecipe.length; i++){
            if(cardRecipe){
                cardRecipe[i].remove()
            }
        }
        //ajout de(s) nouvelle(s) card(s)
        new recipeSection(newRecipe).displayRecipe(newRecipe)  

        //a completer
        new dropdown(this.recipes, "ingredients-ingredient").displayTagsDropdown(newRecipe,sentenceSearch)
        new dropdown(this.recipes, "appliance").displayTagsDropdown(newRecipe, sentenceSearch)
        new dropdown(this.recipes, "ustensils").displayTagsDropdown(newRecipe, sentenceSearch)
 
        //Nombre de recette 
        const nbRecipe = newRecipe.length

        //Affiche le nombre de recette
        const divNbRecipe = document.querySelector("#nb-recipes h2 span")
        divNbRecipe.textContent = nbRecipe
         

        //Afficher le message si la recherche correspond pas a une recette

        const divTextMessage = document.getElementById("no-recipe")

        if(sentence && (nbRecipe === 0)) {
            
            divTextMessage.style.display = "block"
            const textMessage = document.querySelector("#no-recipe h3")

            //Verifie si il y a des tags selectionnés
            const nbDeTagActive = new tag().registerTagTabCopie().length
            if(nbDeTagActive === 0){
                textMessage.textContent = `Aucune recette ne contient '${sentence}' vous pouvez chercher « tarte aux pommes », « poisson », etc.`
                }else {
                    textMessage.textContent = `Aucune recette ne contient '${sentence}' avec ce(s) tag(s) sélectionné(s) peut-être chercher sans où vous pouvez chercher « tarte aux pommes », « poisson », etc.`
                }
        } else {
            divTextMessage.style.display = "none"
        }

    }

    displayNewRecipe() { 
        //Input de la recherche principale
        const champ = document.querySelector("input#search")

        
        //Au changement de l'input
        champ.addEventListener("change", () => {

            //La valeur du champ
            const sentence = champ.value

            if(sentence.length > 0 ){
                this.updateDisplay(this.Twocondition())
            }
        })

        //Au click de l'input de la recherche principale
        const btnChamp = document.querySelector("#search-content button")

        btnChamp.addEventListener("click", () => {

            //La valeur du champ
        const sentence = champ.value

            if(sentence.length >= 3 ){
               this.updateDisplay(this.Twocondition(), sentence) 
            } else if(3 > sentence.length > 0) {
                this.updateDisplay(this.Twocondition())
            }

            
        })

    }
}