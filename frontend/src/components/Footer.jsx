function Footer({ input, setInput, handleSubmit, isLoading, isIndexed }) {
  return (
    <footer className="bg-gray-100 py-4 fixed bottom-0 w-full shadow-md">
      <div className="container mx-auto px-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ask a question..."
            disabled={isLoading || !isIndexed}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg disabled:opacity-50"
            disabled={isLoading || !isIndexed}
          >
            Send
          </button>
        </form>
      </div>
    </footer>
  );
}

export default Footer;
