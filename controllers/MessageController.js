const Conversation = require('../model/conversation');
const Message = require('../model/message');

class MessageController {
    static async sendMessage (req, res, next){
        try {
            res.send("ini send message")
        } catch (err) {
            next(err)
        }
    }
}

module.exports = MessageController;
