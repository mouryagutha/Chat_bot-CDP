const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`CDP Chatbot running on http://localhost:${PORT}`);
});
