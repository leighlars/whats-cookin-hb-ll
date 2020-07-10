
class User {
  constructor(user, allIngredients) {
    this.id = this.checkNumber(user.id);
    this.name = this.checkName(user.name);
    this.pantry = user.pantry;
    this.favoriteRecipes = [];
    this.plannedRecipes = [];
    this.allIngredients = allIngredients;
  }

  checkName = (user) => {
    return typeof user === 'string' ? user : JSON.stringify(user);
  }

  checkNumber = (user) => {
    return typeof user === 'number' ? user : Date.now();
  }

  addFavoriteRecipe = (recipe) => {
      this.favoriteRecipes.push(recipe);
  }

  deleteFavoriteRecipe = (recipe) => {
    let i = this.favoriteRecipes.indexOf(recipe);
    this.favoriteRecipes.splice(i, 1);
  }

  addPlannedRecipe = (recipe) => {
    this.plannedRecipes.push(recipe);
  }

  filterFavoriteByTag = (tag) => {
    return this.favoriteRecipes.filter(faveRecipe => faveRecipe.tags.includes(tag));
  }

  filterPlannedByTag = (tag) => {
    return this.plannedRecipes.filter(plannedRecipe => plannedRecipe.tags.includes(tag));
  } 

  searchSavedRecipesByName = (query) => {
    let allSaved = this.favoriteRecipes.concat(this.plannedRecipes);
    return allSaved.filter(recipe => {
      return recipe.name.toLowerCase().includes(query);
    });    
  }  

  searchSavedRecipesByIngred = (query) => {
    let allSaved = this.favoriteRecipes.concat(this.plannedRecipes);
    let ingredientID = this.changeIngredientNameToID(query);
    return allSaved.filter(recipe => {
      return this.makeIngredientList(recipe).includes(ingredientID);
    })
  }
  
  changeIngredientNameToID = (ingredientName) => {
    let ingredient = this.allIngredients.find(ingredient => ingredient.name.includes(ingredientName)); 
    return ingredient ? ingredient.id : 0;
  }

  makeIngredientList = (recipe) => {
    return recipe.ingredients.map(ingredient => ingredient.id);
  }

  searchByIngredAndName = (query) => {
    let allRecipes = this.searchSavedRecipesByIngred(query).concat(this.searchSavedRecipesByName(query));
    let filterDuplicates = [...new Set(allRecipes)];
    return filterDuplicates;
  }

}

if (typeof module !== 'undefined') {
  module.exports = User;
}