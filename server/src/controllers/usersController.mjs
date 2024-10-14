import db from '../firebase.mjs';

const getAllUsers = async (req, res) => {
  try {
    console.log("Fetching all users...");
    const snapshot = await db.collection('users').get();
    console.log("Snapshot received, documents: ", snapshot.docs.length);  // Log number of documents received
    
    if (snapshot.empty) {
      console.log("No users found in the database.");
      return res.status(404).json({
        error: {
          code: 'NO_USERS_FOUND',
        },
        message: 'No users found',
      });
    }

    // Log each document
    snapshot.docs.forEach(doc => {
      console.log("User Document ID:", doc.id, "Data:", doc.data());
    });

    const users = snapshot.docs.map(doc => doc.data());
    
    res.status(200).json({
      data: users,
      message: "Users fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching users:", error.message);  // Log error details
    res.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message,
      },
    });
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    console.log(`Fetching user by username: ${username}`);
    
    const snapshot = await db.collection('users').where('username', '==', username).get();
    console.log("Snapshot received:", snapshot.size, "matching documents");  // Log number of matching documents

    if (snapshot.empty) {
      console.log("No user found with the provided username:", username);
      return res.status(404).json({
        error: {
          code: 'USER_NOT_FOUND',
        },
        message: 'User not found',
      });
    }

    const user = snapshot.docs[0];
    console.log("User found:", user.data());  // Log the user data

    return res.status(200).json({
      data: user.data(),
      message: 'User fetched successfully',
    });
  } catch (error) {
    console.error("Error fetching user by username:", error.message);  // Log error details
    return res.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
      },
      message: error.message,
    });
  }
};

export { getAllUsers, getUserByUsername };
