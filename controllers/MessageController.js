const Conversation = require("../model/conversation");
const Message = require("../model/message");
const { getReceiverSocketId, io } = require("../socket/socket");

class MessageController {
  static async sendMessage(req, res, next) {
    try {
      const { messages } = req.body;
      const { id: ReceiverId } = req.params;
      const SenderId = req.user._id;

      //   console.log(message, "<< message");
      //   console.log(ReceiverId, "<< ReceiverId");
      //   console.log(SenderId, "<< SenderId");

      let conversation = await Conversation.findOne({
        participants: { $all: [SenderId, ReceiverId] },
      });
      //   console.log(conversation);

      if (!conversation) {
        conversation = await Conversation.create({
          participants: [SenderId, ReceiverId],
        });
      }
      //   console.log(conversation);

      let newMessage = new Message({
        SenderId,
        ReceiverId,
        messages,
      });

      if (newMessage) {
        conversation.messages.push(newMessage._id);
      }

      await Promise.all([conversation.save(), newMessage.save()]);
      const receiverSocketId = getReceiverSocketId(ReceiverId);
      if (receiverSocketId) {
        // io.to(<socket_id>).emit() used to send events to specific client
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }

      res.status(201).json({ newMessage });
    } catch (err) {
      next(err);
    }
  }
  static async getMessage(req, res, next) {
    try {
      const { id: userToChatId } = req.params;
      const SenderId = req.user._id;

      const conversation = await Conversation.findOne({
        participants: { $all: [SenderId, userToChatId] },
      }).populate("messages"); // NOT REFERENCE BUT ACTUAL messages
      console.log(conversation);

      if (!conversation) return res.status(200).json([]);

      const messages = conversation.messages;

      res.status(200).json(messages);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = MessageController;
