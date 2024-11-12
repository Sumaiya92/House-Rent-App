import User from '../schemas/userModel.js'; // Assuming the correct path

// Get all owners waiting for approval
export async function getOwnersWaitingApproval(req, res) {
  try {
    const owners = await User.find({ role: 'Owner', approved: false });
    res.status(200).json(owners);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching owners', error: error.message });
  }
}

// Approve an owner
// Admin Controller to approve Owner
export async function approveOwner(req, res) {
  const { ownerId } = req.params; // Get the Owner's ID from the URL
  try {
      const owner = await Owner.findById(ownerId);
      if (!owner) {
          return res.status(404).send("Owner not found");
      }
      if (owner.approvedByAdmin) {
          return res.status(400).send("Owner already approved");
      }

      // Approve the owner
      owner.approvedByAdmin = true;
      await owner.save();
      res.status(200).send("Owner approved successfully");
  } catch (error) {
      console.error(error);
      res.status(500).send("Error while approving the owner");
  }
}

// Reject an owner
export async function rejectOwner(req, res) {
  const { ownerId } = req.params;
  try {
    const owner = await User.findById(ownerId);
    if (!owner) {
      return res.status(404).json({ message: 'Owner not found' });
    }
    await owner.delete();
    res.status(200).json({ message: 'Owner rejected and deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting owner', error: error.message });
  }
}
export async function getAllUsers(req, res) {
  try {
      const owners = await User.find({ role: 'Owner' });
      console.log("Owners found:", owners); // Log the result
      if (owners.length === 0) {
        return res.status(404).json({ message: 'No owners found' });
      }
      res.status(200).json({
          message: 'Owners retrieved successfully',
          owners,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to retrieve owners' });
  }
};
