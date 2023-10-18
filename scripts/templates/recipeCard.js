/**
 * Affiche et ajoute les ingredients d'une recette dans article card-recipe sur la page
 * RecipeCard
 * @param {Array} arrayListIngredients
 * @returns {HTMLDivElement} 
 * 
 */
const displayAddIngredients = (arrayListIngredients) => {
    const newArrayList = [...arrayListIngredients]

    const divListIngredients = document.createElement("div")
    divListIngredients.setAttribute("class","card-recipe__text__ingredients__list")
    


    newArrayList.forEach((elm) => {
        const listIngredients = document.createElement("div")
        listIngredients.setAttribute("class","card-recipe__text__ingredients__list__ingredient")
        listIngredients.dataset.tag = elm.ingredient
        listIngredients.innerHTML = `
            <h5>${elm.ingredient}</h5>
            <p>${elm.quantity} ml</p>
        `
        divListIngredients.appendChild(listIngredients)
    })

    return {divListIngredients}
}

/**
 * Affiche une recette dans section recipe_section sur la page
 * RecipeCard
 * @param {Array} arrayRecipe
 */
export const displayRecipeCard = (arrayRecipe) => {
    const newArrayRecipe = arrayRecipe

    const article = document.createElement("article")
    article.setAttribute("class","card-recipe")
    article.dataset.recipe = newArrayRecipe.name

    const {divListIngredients} = displayAddIngredients(newArrayRecipe.ingredients)

    article.innerHTML = `
        <figure class="card-recipe__figure">
            <div class="card-recipe__figure__encart">
                <p>${newArrayRecipe.time}min</p>
            </div>
            <img class="card-recipe__figure__img" src="../../assets/recipes/${newArrayRecipe.image}">
            <figcaption class="card-recipe__figure__figcaption">
                <h3>${newArrayRecipe.name}</h3>
            </figcaption>
        </figure>
        <div class="card-recipe__text">
            <div class="card-recipe__text__recette">
                <h4>RECETTE</h4>
                <p>${newArrayRecipe.description}</p>
            </div>
            <div class="card-recipe__text__ingredients">
                <h4>INGRÉDIENTS</h4>
    <span>${article.appendChild(divListIngredients)}</span>
    ${article.innerHTML +=`
    </div>
    </div>
    `}
    `

    return article
}