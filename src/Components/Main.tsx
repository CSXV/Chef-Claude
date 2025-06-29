import { useEffect, useRef, useState } from "react";
import IngredientsList from "./IngredientsList";
import CludeRecipe from "./CludeRecipe";
import getRecipeFromMistral from "./ai";

// ------------------------------------------------------------------------------------------------
function Main() {
  // ingredients
  const [recipe, setRecipe] = useState("");
  const [ingredients, setIngredient] = useState<string[]>([]);
  // <i key={index} onClick={() => handleRemove(index)}>{i}</i>
  const ingredientsList = ingredients.map((i, index) => (
    <div key={index} className="pill" onClick={() => handleRemove(index)}>
      <span>{i}</span>
    </div>
  ));

  // ui
  const [loading, setLoading] = useState(false);

  // magic text :)
  const magicalPrompts = [
    "Summon a recipe by entering at least 4 ingredients — the AI chef will conjure a delicious creation just for you!",
    "Whisper 4 or more ingredients into the cauldron, and behold — a magical recipe shall appear!",
    "Toss in 4 ingredients and let the culinary magic unfold!",
    "Name 4 ingredients, and a spellbinding dish will rise from the mist!",
    "Feed the AI with 4+ ingredients, and watch it craft your enchanted meal!",
    "Offer 4 ingredients to the recipe spirits — they’re always hungry for inspiration!",
    "Drop 4 ingredients into the potion pot and let the flavor sorcery begin!",
    "Reveal 4 ingredients, and the spellbound cookbook shall open just for you!",
    "Gather at least 4 tasty artifacts and awaken the ancient AI chef!",
    "Add 4 magical morsels, and a recipe shall materialize from the ether!",
    "Four ingredients is all it takes to cast your culinary spell!",
    "Enter 4 ingredients and let the enchanted kitchen bring your vision to life!",
    "List 4 ingredients — the recipe oracle awaits your offering!",
    "Speak 4 food items aloud (or just type them), and let the magic commence!",
    "Present 4 flavorful runes to unlock the next chapter of your meal quest!",
  ];
  const randomPrompt =
    magicalPrompts[Math.floor(Math.random() * magicalPrompts.length)];

  // scroll to section when text generated
  const recipeSection = useRef<HTMLElement>(null);
  useEffect(() => {
    if (recipe !== "" && recipeSection.current !== null) {
      recipeSection.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipe]);

  // ----------------------------------------------------------------------------------------------
  function handleRemove(indexToRemove: number) {
    setIngredient((prevIngredients) =>
      prevIngredients.filter((_, index) => index !== indexToRemove),
    );
  }

  function addIngredient(formData: FormData) {
    const newIngredient = formData.get("ingredient") as string;

    if (newIngredient.length <= 0) return;

    setIngredient([...ingredients, newIngredient]);
  }

  async function getRecipe() {
    setLoading(true);

    const aiText: string | undefined = await getRecipeFromMistral(ingredients);
    aiText !== undefined && setRecipe(aiText);

    setLoading(false);
  }

  // ----------------------------------------------------------------------------------------------
  return (
    <main className="main-container">
      <form action={addIngredient} className="main-form">
        <input
          className="form-input"
          aria-label="Add ingredient"
          placeholder="e.g Tomatos"
          name="ingredient"
        ></input>

        <button className="form-button">Add ingredient</button>
      </form>

      {ingredientsList.length > 0 && (
        <IngredientsList
          ingredientsList={ingredientsList}
          getRecipe={getRecipe}
        />
      )}

      {ingredientsList.length < 4 && (
        <div className="help-container">
          <p>
            <i className="nf nf-oct-info info-icon"></i> {randomPrompt}
          </p>
        </div>
      )}

      {loading && <p>Generating...</p>}

      {recipe && <CludeRecipe markdown={recipe} ref={recipeSection} />}
    </main>
  );
}

// ------------------------------------------------------------------------------------------------
export default Main;
