import Markdown from "react-markdown";

function CludeRecipe({ markdown, ref }: any) {
  return (
    <section ref={ref} className="ai-recipe-container" aria-live="polite">
      <h2 className="ai-recipe-header">Chef Claude recommends:</h2>

      <article className="ai-recipe-article">
        <Markdown>{markdown}</Markdown>
      </article>
    </section>
  );
}

export default CludeRecipe;
