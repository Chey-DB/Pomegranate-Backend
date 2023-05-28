require("dotenv").config();

const app = require("./app");

api.listen(process.env.PORT, () => {
    console.log(`API listening on ${process.env.PORT}`);
})
