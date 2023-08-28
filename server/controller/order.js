import Order from "../model/Order.js";

export const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    const doc = await order.populate("user");
    res.status(201).json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const fetchOrderByUser = async (req, res) => {
  const user = req.query.user;
  try {
    const orders = await Order.find({ user }).populate("user");
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    }).populate("user");
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* FETCH AND SORT ALL ORDERS */
export const fetchOrders = async (req, res) => {
  try {
    // Create the base query
    let query = Order.find();

    // Get the total number of items
    const totalItems = await Order.countDocuments(query);

    // Apply pagination if _page and _limit query parameters are provided
    if (req.query._page && req.query._limit) {
      const pageNumber = req.query._page;
      const itemLimit = req.query._limit;
      query = query.skip(itemLimit * (pageNumber - 1)).limit(itemLimit);
    }

    // Apply sorting if _sort and _order query parameters are provided
    if (req.query._sort && req.query._order) {
      query = query.sort({ [req.query._sort]: req.query._order });
    }

    // Populate the "user" field in the query result
    const docs = await query.populate("user");

    // Set the X-Total-Count header with the total number of items
    res.set("X-Total-Count", totalItems);

    // Send the query result as a JSON response
    res.status(200).json(docs);
  } catch (err) {
    // Send an error response if an error occurs
    res.status(500).json({ message: err.message });
  }
};
