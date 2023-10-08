import recipeSection from "../templates/recipeSection.js"

//Class du fonctionnement de la recherche d'une recette
export default class searchRecipe{

    constructor(recipes) {
        this._recipes = recipes
    }

    get recipes() {
        return this._recipes
    }

    getSearchRecipe() { 
        //Copie entier du tableau des recettes
        const newRecipe = [...this.recipes]

        //Input de la recherche principale
        const champ = document.querySelector("input#search")

        //Variable de la recherche
        let sentenceSearch = ""

        //Au changement de l'input
        champ.addEventListener("change", () => {
            //La section html des recettes
            const cardRecipe = document.querySelectorAll(".card-recipe")

            if(champ.value.length >= 3) {
                sentenceSearch = champ.value
                const newTabRecipe = this.getNewTabRecipe(sentenceSearch)

                //Supprimer des card recette
                for(let i = 0; i < cardRecipe.length; i++){
                    if(cardRecipe){
                        cardRecipe[i].remove()
                    }
                }
                //ajout de(s) nouvelle(s) card(s)
                new recipeSection(newTabRecipe).displayRecipe()
            } else {
                //Supprimer des card recette
                for(let i = 0; i < cardRecipe.length; i++){
                    if(cardRecipe){
                        cardRecipe[i].remove()
                    }
                }
                //ajout de tous les cards
                new recipeSection(newRecipe).displayRecipe()
            }
        })

    }

    getNewTabRecipe(sentenceNewSearch, TabRecipe = this.recipes) {

        //Copie de la phrase du champ de recherche
        const newSentence = sentenceNewSearch.toLowerCase()


        //Copie entier du tableau des recettes
        const newRecipe = [...TabRecipe]

        //Un tableau des ID des recettes correspondante
        const tabNewRecipe = []

        //iteration sur le tableau des recettes recu
        for(let i = 0; i < newRecipe.length; i++){
            let exist = false

            //si la phrase du champ correspond au titre ?
            if((newRecipe[i].name.toLowerCase()).includes(newSentence)){
                exist = true
            }

            //si la phrase du champ correspond a un des des ingrédients de la recette ?
            for(let j = 0; j < (newRecipe[i].ingredients).length; j++){
                if((newRecipe[i].ingredients[j].ingredient.toLowerCase()).includes(newSentence)){
                            exist = true
                    }      
            
            }
            //si la phrase du champ correspond a une partie de la description de la recette ?
            if((newRecipe[i].description).includes(newSentence)){
                exist = true
            }

            if(exist) {
                tabNewRecipe.push(newRecipe[i])
            }

            console.log(i)
        }

        return tabNewRecipe

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

    displaysearchRecipe() { 

    }
}