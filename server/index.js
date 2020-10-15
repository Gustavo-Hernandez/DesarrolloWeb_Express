const express = require("express");
const routes = require("./routes");

// Sets up the Express App
const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(routes);

app.listen(PORT,()=>{
    console.log("Listening on port " + PORT);
});