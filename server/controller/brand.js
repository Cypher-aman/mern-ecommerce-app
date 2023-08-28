import Brand from "../model/Brand.js";

export const fetchBrands = async (req, res) => {
  try {
    const brands = await Brand.find();

    res.status(200).json(brands);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
