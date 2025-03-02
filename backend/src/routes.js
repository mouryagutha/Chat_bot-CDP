const express = require("express");
const { indexDocs } = require("./services/indexer");
const { retrieveAnswer } = require("./services/retriever");

const router = express.Router();

// Index CDP documentation
router.get("/index/:cdp", async (req, res) => {
  const result = await indexDocs(req.params.cdp);
  res.json(result);
});

// Retrieve answer
router.get("/ask", async (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: "Query required." });

  const answer = await retrieveAnswer(query);
  res.json({ answer });
});

module.exports = router;
