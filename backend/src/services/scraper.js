const axios = require("axios");
const cheerio = require("cheerio");

const CDP_DOCS = {
  segment: "https://segment.com/docs/connections/sources/catalog/",
  mparticle: "https://docs.mparticle.com/",
  lytics: "https://docs.lytics.com/",
  zeotap: "https://docs.zeotap.com/home/en-us/",
};

const scrapeDocumentation = async (cdp) => {
  if (!CDP_DOCS[cdp]) return { error: "Invalid CDP selected." };

  try {
    const { data } = await axios.get(CDP_DOCS[cdp]);
    const $ = cheerio.load(data);
    
    let textContent = $("body").text().replace(/\s+/g, " ").trim();

    return { cdp, content: textContent };
  } catch (error) {
    return { error: "Failed to fetch documentation.", details: error.message };
  }
};

module.exports = { scrapeDocumentation };
