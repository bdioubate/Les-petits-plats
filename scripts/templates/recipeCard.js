//Class de la mise en forme d'une card recette
export default class recipeCard{ 

    constructor(data) {
        this._image = data.image
        this._time = data.time
        this._name = data.name
        this._description = data.description
        this._ingredients = data.ingredients
    }

    get image() {
        return `./assets/recipes/${this._image}`
    }

    get time() {
        return this._time
    }

    get name() {
        return this._name
    }

    get description() {
        return this._description
    }

    get ingredients() {
        return this._ingredients
    }

    //Creation et recuperation des variables globales 
    getVariablesRecipeCard() {
        //Section des cards de recette
        const recipeSection = document.getElementById("recipe_section")

        //Creation de la balise article pour une card d'une recette
        const recipeArticle = document.createElement("article")
        recipeArticle.setAttribute("class","card-recipe")
        recipeSection.appendChild(recipeArticle)

        //Creation de la balise figure de l'article
        const recipeArticleFigure = document.createElement("figure")
        recipeArticleFigure.setAttribute("class","card-recipe__figure")
        recipeArticle.appendChild(recipeArticleFigure)

        //Creation de la div encart de la figure
        const recipeArticleFigureEncart = document.createElement("div")
        recipeArticleFigureEncart.setAttribute("class","card-recipe__figure__encart")
        recipeArticleFigure.appendChild(recipeArticleFigureEncart)

        //Creation de la balise p de l'encart
        const recipeArticleFigureEncartP = document.createElement("p")
        recipeArticleFigureEncart.appendChild(recipeArticleFigureEncartP)

        //Creation de la balise img de la figure
        const recipeArticleFigureImg = document.createElement("img")
        recipeArticleFigureImg.setAttribute("class","card-recipe__figure__img")
        recipeArticleFigure.appendChild(recipeArticleFigureImg)

        //Creation de la balise figcaption de la figure
        const recipeArticleFigureFigcaption = document.createElement("figcaption")
        recipeArticleFigureFigcaption.setAttribute("class","card-recipe__figure__figcaption")
        recipeArticleFigure.appendChild(recipeArticleFigureFigcaption)

        //Creation de la balise h3 de la figcaption
        const recipeArticleFigureFigcaptionH3 = document.createElement("h3")
        recipeArticleFigureFigcaption.appendChild(recipeArticleFigureFigcaptionH3)

        //Creation de la div text de l'article
        const recipeArticleText = document.createElement("div")
        recipeArticleText.setAttribute("class","card-recipe__text")
        recipeArticle.appendChild(recipeArticleText)

        //Creation de la div description recette de la div text
        const recipeArticleTextRecette = document.createElement("div")
        recipeArticleTextRecette.setAttribute("class","card-recipe__text__recette")
        recipeArticleText.appendChild(recipeArticleTextRecette)

        //Creation de la balise titre Recette h4 de la description recette
        const recipeArticleTextRecetteH4 = document.createElement("h4")
        recipeArticleTextRecetteH4.textContent = "RECETTE"
        recipeArticleTextRecette.appendChild(recipeArticleTextRecetteH4)

        //Creation de la balise p de la description recette
        const recipeArticleTextRecetteP = document.createElement("p")
        recipeArticleTextRecette.appendChild(recipeArticleTextRecetteP)

        //Creation de la div description ingredients de la div text
        const recipeArticleTextIngredients = document.createElement("div")
        recipeArticleTextIngredients.setAttribute("class","card-recipe__text__ingredients")
        recipeArticleText.appendChild(recipeArticleTextIngredients)

        //Creation de la balise titre h4 de la description ingredients
        const recipeArticleTextIngredientsH4 = document.createElement("h4")
        recipeArticleTextIngredientsH4.textContent = "INGRÉDIENTS"
        recipeArticleTextIngredients.appendChild(recipeArticleTextIngredientsH4)

        //Creation de la div list de la description ingredients
        const recipeArticleTextIngredientsList = document.createElement("div")
        recipeArticleTextIngredientsList.setAttribute("class","card-recipe__text__ingredients__list")
        recipeArticleTextIngredients.appendChild(recipeArticleTextIngredientsList)

        //Creation de la balise h5 de l'ingredient
        const recipeArticleTextIngredientsListIngredientH5 = document.createElement("h5")

        //Creation de la balise p de l'ingredient
        const recipeArticleTextIngredientsListIngredientP = document.createElement("p")

        return { recipeSection, recipeArticle, recipeArticleFigure, recipeArticleFigureEncart, recipeArticleFigureEncartP, recipeArticleFigureImg, recipeArticleFigureFigcaption, recipeArticleFigureFigcaptionH3, recipeArticleText, recipeArticleTextRecette, recipeArticleTextRecetteH4, recipeArticleTextRecetteP, recipeArticleTextIngredients, recipeArticleTextIngredientsH4, recipeArticleTextIngredientsList, recipeArticleTextIngredientsListIngredientH5, recipeArticleTextIngredientsListIngredientP }
    }

    //mise en forme d'une card recette
    getRecipeCard() {

        const { recipeArticleFigureEncartP, recipeArticleFigureImg, recipeArticleFigureFigcaptionH3, recipeArticleTextRecetteP, recipeArticleTextIngredientsList } = this.getVariablesRecipeCard()
 

        //Encart de la duree de la recette 
        recipeArticleFigureEncartP.textContent = `${this.time}min`

        //Image de la recette
        recipeArticleFigureImg.src = this.image

        //Titre de la recette
        recipeArticleFigureFigcaptionH3.textContent = this.name

        //Description de la recette
        recipeArticleTextRecetteP.textContent = this.description

        //Ajout des ingredients
        this.addIngredients(recipeArticleTextIngredientsList)
    }

    //mise en forme et ajout des ingredients
    addIngredients(recipeArticleTextIngredientsList) {

        //Boucle d'ajout des ingredients a la div card-recipe__text__ingredients__list
        for (const ingredient of this.ingredients) {
            //Creation du titre de l'ingredient
            const h5 = document.createElement("h5")
            h5.textContent = ingredient.ingredient
            //Creation de la description de l'ingredient
            const p = document.createElement("p")

            //si unité existe
            ingredient.unit ? 
                p.textContent = `${ingredient.quantity} ${ingredient.unit}` 
                :
                //si quantité existe
                ingredient.quantity ? 
                    p.textContent = ingredient.quantity
                    :
                    p.textContent = "-"

            //Creation de la div ingredient de la list
            const recipeArticleTextIngredientsListIngredient = document.createElement("div")
            recipeArticleTextIngredientsListIngredient.setAttribute("class","card-recipe__text__ingredients__list__ingredient")

            recipeArticleTextIngredientsListIngredient.appendChild(h5)
            recipeArticleTextIngredientsListIngredient.appendChild(p)

            recipeArticleTextIngredientsList.appendChild(recipeArticleTextIngredientsListIngredient)
        }
            
    }


}