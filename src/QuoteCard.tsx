type QuoteCardProps = {
  quote: string;
  author: string;
  fetchQuote: () => void;
};

export default function QuoteCard({
  quote,
  author,
  fetchQuote,
}: QuoteCardProps): JSX.Element {
  return (
    <div
      className="fade-in,fade-out"
      id="quote-box"
      style={{ textAlign: "center" }}
    >
      <h1 id="title-text">Random Quotes</h1>

      <p id="text">{quote}</p>
      <div className="author-container">
        <p id="author">- {author}</p>
      </div>
      <div className="buttons-div">
        <button id="new-quote" onClick={fetchQuote}>
          New Quote
        </button>
        <a
          id="tweet-quote"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            `"${quote}" - ${author}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Tweet Quote
        </a>
      </div>
    </div>
  );
}
