import Cart from "../model/Cart.js";

export const addToCart = async (req, res) => {
  try {
    const cart = new Cart(req.body);
    await cart.save();

    const doc = await cart.populate("product");
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const fetchCartByUser = async (req, res) => {
  const user = req.query.user;
  try {
    const carts = await Cart.find({ user }).populate("product");
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteCart = async (req, res) => {
  const { id } = req.params;
  try {
    await Cart.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "cart item successfully deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateCart = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Cart.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    }).populate("product");
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
