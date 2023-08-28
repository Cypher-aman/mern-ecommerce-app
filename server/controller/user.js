import User from "../model/User.js";

/* GET USER FULL DETAILS */
export const fetchUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "User not found" });

    const userDetails = {
      name: user.name,
      email: user.email,
      id: user._id,
      addresses: user.addresses,
      role: user.role,
    };

    res.status(200).json(userDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE USER */
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(user);
  } catch (err) {
    res.json({ message: err.message });
  }
};
