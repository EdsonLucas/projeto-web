var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
},{ timestamps: true });

module.exports = mongoose.model('Message', messageSchema);