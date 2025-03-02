const faiss = require("faiss-node");
const { scrapeDocumentation } = require("./scraper");

// Initialize FAISS index
let index = new faiss.IndexFlatL2(512);
let docStore = {};  // Stores doc ID -> text mapping

const indexDocs = async (cdp) => {
  const scrapedData = await scrapeDocumentation(cdp);
  if (scrapedData.error) return scrapedData;

  // Convert text to a dummy vector (Replace with real embeddings)
  let vector = Array.from({length: 512}, () => Math.random());

  // Store in FAISS index
  let docId = Object.keys(docStore).length;
  index.add(vector);
  docStore[docId] = scrapedData.content;

  return { success: `Indexed documentation for ${cdp}.` };
};

module.exports = { indexDocs, index, docStore };