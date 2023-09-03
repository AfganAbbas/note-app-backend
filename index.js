const app = require("./app");
const http = require("http");
const server = http.createServer(app);
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
