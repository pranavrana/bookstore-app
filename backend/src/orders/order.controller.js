const Order = require("./order.model");

const createAOrder = async (req, res) => {
  try {
    const newOrder = await Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    console.error("Error creating order", error);
    res.status(500).send({ message: "Failed to create a order" });
  }
};

const getOrdersByEmail = async (req, res) => {
  try {
    const {email} = req.params;
    const orders = await Order.find({ email }).sort({createdAt: -1 }).exec();
    
    if(!orders){
      res.status(404).json({message: 'Orders not found'});
    }
    res.status(200).send(orders);
  } catch (error) {
    console.error("Error creating order", error);
    res.status(500).send({ message: "Failed to create a order" });
  }
};

module.exports = {
  createAOrder,
  getOrdersByEmail
};
