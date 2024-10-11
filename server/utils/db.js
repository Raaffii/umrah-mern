const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://<rafi>:<rabbani>@cluster0.lidkb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => console.log("Connected!"));
