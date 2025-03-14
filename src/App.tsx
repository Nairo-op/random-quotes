import { useState, useEffect } from "react";
import "./App.css";
import QuoteCard from "./QuoteCard";

function App(): JSX.Element {
  const [quote, setQuote] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("https://api.quotable.io/quotes/random");
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      const data: Array<{ content: string; author: string }> =
        await response.json(); // Define the response as an array of objects
      if (data.length > 0) {
        setQuote(data[0].content || "No quote found."); // Access the first item in the array
        setAuthor(data[0].author || "Unknown");
      }
    } catch (err) {
      setError((err as Error).message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="app-container">
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">Error: {error}</p>
      ) : (
        <QuoteCard quote={quote} author={author} fetchQuote={fetchQuote} />
      )}
    </div>
  );
}

export default App;
