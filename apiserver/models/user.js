const db = require("../config/db");

const schema = new db.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:"http://10.36.136.85:3000/ni.jpg"
    }
});

module.exports = db.model("user",schema);