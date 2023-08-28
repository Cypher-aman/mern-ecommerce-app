import Product from "../model/Product.js";

/* CREATE PRODUCT */
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const response = await product.save();
    res.status(201).json(response);
  } catch (err) {
    res.json({ message: err.message });
  }
};

/**
 * Fetch and sort products with filters
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Promise<void>} - A promise that resolves when the products are fetched and sorted
 */
export const fetchProducts = async (req, res) => {
  const { brand, category } = req.query;
  try {
    let query = Product.find();

    // Apply filter by category if specified in the request query
    if (category) {
      const categories = Array.isArray(category) ? category : [category];
      query = query.where("category").in(categories);
    }

    // Apply filter by brand if specified in the request query
    if (brand) {
      const brands = Array.isArray(brand) ? brand : [brand];
      query = query.where("brand").in(brands);
    }

    // Get the total number of items that match the query
    const totalItems = await Product.countDocuments(query);

    // Apply pagination if specified in the request query
    const { _page, _limit } = req.query;
    if (_page && _limit) {
      const pageNumber = _page;
      const itemLimit = _limit;
      query = query.skip(itemLimit * (pageNumber - 1)).limit(itemLimit);
    }

    // Apply sorting if specified in the request query
    const { _sort, _order } = req.query;
    if (_sort && _order) {
      query = query.sort({ [_sort]: _order });
    }

    // Execute the query and get the matching documents
    const docs = await query.exec();

    // Set the total count header and send the response
    res.set("X-Total-Count", totalItems);
    res.status(200).json(docs);
  } catch (err) {
    // Handle any errors and send an error response
    res.status(500).json({ message: err.message });
  }
};

/* FETCH PRODUCT BY ID */
export const fetchProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById({ _id: id });
    res.status(201).json(product);
  } catch (err) {
    res.json({ message: err.message });
  }
};

/* UPDATE PRODUCT */
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(product);
  } catch (err) {
    res.json({ message: err.message });
  }
};
