// controllers/adminController.js
import User from '../schemas/userModel.js'; // Ensure the path is correct based on your project

export async function approveOwner(req, res) {
  const { ownerId } = req.params;

  try {
    const owner = await User.findById(ownerId);

    if (!owner) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log("User role:", owner.role); // Debug: Log role to confirm

    // Check that the user's role is "owner"
    if (owner.role !== 'owner') {
      return res.status(400).json({ message: 'User role is not "owner", approval denied' });
    }

    // Set approved to true and save
    owner.approved = true;
    await owner.save();
    res.status(200).json({ message: 'Owner approved successfully', owner });
  } catch (error) {
    res.status(500).json({ message: 'Error approving owner', error: error.message });
  }
}
