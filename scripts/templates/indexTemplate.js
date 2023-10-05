//Class pour l'organisation de la page index.html
export default class recipeSectionTemplate{ 

    constructor(data) {
        this._image = data.image
        this._time = data.time
        this._name = data.name
        this._description = data.description
        this._ingredients = data.ingredients
    }

    get image() {
        return `/assets/recipes/${this._image}`
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

    //Recuperation des variables globales 
    getVariable() {
        //Section des cards de recette
        const recipeSection = document.getElementById("recipe_section")

        //Creation de la balise article pour une card d'une recette
        const recipeArticle = document.createElement("article")
        recipeArticle.setAttribute("class","card-recipe")
        recipeSection.appendChild(recipeArticle)

        //Creation de la balise figure de l'article
        const recipeArticleFigure = document.createElement("figure")
        recipeArticleFigure.setAttribute("class","figure-card-recipe")
        recipeArticle.appendChild(recipeArticleFigure)

        //Creation de la div encart de la figure
        const recipeArticleFigureEncart = document.createElement("div")
        recipeArticleFigureEncart.setAttribute("class","encard-figure-card-recipe")
        recipeArticleFigure.appendChild(recipeArticleFigureEncart)

        //Creation de la balise p de l'encart
        const recipeArticleFigureEncartP = document.createElement("p")
        recipeArticleFigureEncart.appendChild(recipeArticleFigureEncartP)

        //Creation de la balise img de la figure
        const recipeArticleFigureImg = document.createElement("img")
        recipeArticleFigureImg.setAttribute("class","img-figure-card-recipe")
        recipeArticleFigure.appendChild(recipeArticleFigureImg)

        //Creation de la balise figcaption de la figure
        const recipeArticleFigureFigcaption = document.createElement("figcaption")
        recipeArticleFigureFigcaption.setAttribute("class","figcaption-figure-card-recipe")
        recipeArticleFigure.appendChild(recipeArticleFigureFigcaption)

        //Creation de la balise h3 de la figcaption
        const recipeArticleFigureFigcaptionH3 = document.createElement("h3")
        recipeArticleFigureFigcaption.appendChild(recipeArticleFigureFigcaptionH3)

        //Creation de la div text de l'article
        const recipeArticleText = document.createElement("div")
        recipeArticleText.setAttribute("class","text-card-recipe")
        recipeArticle.appendChild(recipeArticleText)

        //Creation de la div description recette de la div text
        const recipeArticleTextRecette = document.createElement("div")
        recipeArticleTextRecette.setAttribute("class","recette-text-card-recipe")
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
        recipeArticleTextIngredients.setAttribute("class","ingredients-text-card-recipe")
        recipeArticleText.appendChild(recipeArticleTextIngredients)

        //Creation de la balise titre h4 de la description ingredients
        const recipeArticleTextIngredientsH4 = document.createElement("h4")
        recipeArticleTextIngredientsH4.textContent = "INGRÉDIENTS"
        recipeArticleTextIngredients.appendChild(recipeArticleTextIngredientsH4)

        //Creation de la div list de la description ingredients
        const recipeArticleTextIngredientsList = document.createElement("div")
        recipeArticleTextIngredientsList.setAttribute("class","list-ingredients-text-card-recipe")
        recipeArticleTextIngredients.appendChild(recipeArticleTextIngredientsList)

        //Creation de la balise h5 de l'ingredient
        const recipeArticleTextIngredientsListIngredientH5 = document.createElement("h5")

        //Creation de la balise p de l'ingredient
        const recipeArticleTextIngredientsListIngredientP = document.createElement("p")

        return { recipeSection, recipeArticle, recipeArticleFigure, recipeArticleFigureEncart, recipeArticleFigureEncartP, recipeArticleFigureImg, recipeArticleFigureFigcaption, recipeArticleFigureFigcaptionH3, recipeArticleText, recipeArticleTextRecette, recipeArticleTextRecetteH4, recipeArticleTextRecetteP, recipeArticleTextIngredients, recipeArticleTextIngredientsH4, recipeArticleTextIngredientsList, recipeArticleTextIngredientsListIngredientH5, recipeArticleTextIngredientsListIngredientP }
    }

    //Section header
    getRecipeCard() {

        const { recipeArticleFigureEncartP, recipeArticleFigureImg, recipeArticleFigureFigcaptionH3, recipeArticleTextRecetteP, recipeArticleTextIngredientsList } = this.getVariable()
 

        //Encart de la duree de la recette 
        recipeArticleFigureEncartP.textContent = `${this.time}min`

        //Image de la recette
        recipeArticleFigureImg.src = this.image

        //Titre de la recette
        recipeArticleFigureFigcaptionH3.textContent = this.name

        //Description de la recette
        recipeArticleTextRecetteP.textContent = this.description

        //Boucle d'ajout des ingredients a la div list-ingredients-text-card-recipe
        this.ingredients.forEach((ingredient) => {
            const h5 = document.createElement("h5")
            h5.textContent = ingredient.ingredient
            const p = document.createElement("p")
            if(ingredient.unit){
                if(String(ingredient.unit).charAt(0) === "c"){
                    p.textContent = `${ingredient.quantity} ${ingredient.unit}`
                }else{
                    p.textContent = `${ingredient.quantity}${ingredient.unit}`
                }
            } else {
                p.textContent = ingredient.quantity
            }

            //Creation de la div ingredient de la list
            const recipeArticleTextIngredientsListIngredient = document.createElement("div")
            recipeArticleTextIngredientsListIngredient.setAttribute("class","ingredient-list-ingredients-text-card-recipe")

            recipeArticleTextIngredientsListIngredient.appendChild(h5)
            recipeArticleTextIngredientsListIngredient.appendChild(p)

            recipeArticleTextIngredientsList.appendChild(recipeArticleTextIngredientsListIngredient)
        })
        

    }
}