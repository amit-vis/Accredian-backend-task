const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 8000;
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use("/", require("./routes"))
app.listen(port, (err)=>{
    if(err){
        console.log("error in listing the server", err);
    }
    console.log("server is listening the port", port)
})