const db = require("../config/db");

const schema = new db.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        default:18
    },
    sex:{
        type:Number,
        default:1
    }
});

module.exports = db.model("student",schema);