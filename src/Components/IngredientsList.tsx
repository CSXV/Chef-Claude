function IngredientsList({ ingredientsList, getRecipe }: any) {
  // <ul className="ingredients-list">{ingredientsList}</ul>

  return (
    <section className="section-container">
      <h2 className="section-head">Ingredients on hand:</h2>
      <div className="ingredients-pill">{ingredientsList}</div>

      {ingredientsList.length > 3 && (
        <div className="get-recipe-container">
          <div className="recipe-text-container">
            <h3>Ready for a recipe?</h3>

            <p className="recipe-text-p">
              Generate a recipe from your list of ingredients.
            </p>
          </div>

          <button className="recipe-button" onClick={getRecipe}>
            Get a recipe
          </button>
        </div>
      )}
    </section>
  );
}

export default IngredientsList;
