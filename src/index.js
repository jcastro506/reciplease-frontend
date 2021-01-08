const homeImage = document.querySelector('#first-image')
const recipeList = document.querySelector('#recipe-list')
const menuImage = document.querySelector('#menu-image')
const reviewSubmit = document.querySelector('#submit-button')
const randomButton = document.querySelector('#random-form')
const sideImage = document.querySelector('#sideImage')


/* HELPER FUNCTIONS */ 

function renderFirstImage(recipeObj){
    homeImage.src = recipeObj.image_url 
}


function renderRecipeList(recipeArray){
    recipeArray.forEach(function(element){
        const h4 = document.createElement('h4')
        const p = document.createElement('p')

        p.className = "recipeText"
        p.dataset.id = element.id 
        p.innerText = element.description
        

        h4.innerText = element.name
        h4.className = "recipeHeader"
        h4.dataset.id = element.id 

        recipeList.append(h4, p)
    })
}


function renderToMain(recipeObject){
    menuImage.src = recipeObject.image_url
}


function renderIngredients(recipeObj){
    recipeObj.ingredients.forEach(function(ingred){
        

        const newDiv = document.createElement('div')
        
        const newIngreds = document.createElement('p')

        newIngreds.innerHTML = " "
        newIngreds.innerText = `${ingred.name} ${ingred.measurement}`

        newDiv.append(newIngreds)
        sideImage.append(newDiv)
    })
}


function remindUser (){
    alert("Click The Name Of A Recipe To See Its Ingredients!")
}

/* EVENT LISTENERS */

recipeList.addEventListener('click', function(event){
    if (event.target.className = ".recipeHeader") {
        const newId = event.target.dataset.id
        getNewRecipe(newId)
    }
})

setTimeout(remindUser, 5000)


/* FETCHES */ 


function getAllRecipes(){
    fetch(`http://localhost:3000/api/v1/recipes`)
    .then(response => response.json())
    .then(data => renderRecipeList(data));
}


function getARecipe(){
fetch(`http://localhost:3000/api/v1/recipes/11`)
    .then(response => response.json())
    .then(data => renderFirstImage(data));
}


function getNewRecipe(id){
    fetch(`http://localhost:3000/api/v1/recipes/${id}`)
    .then(response => response.json())
    .then(newObj => {
        renderToMain(newObj)
        renderIngredients(newObj)
    })
}

/* FETCHES */ 

getARecipe()
getAllRecipes()