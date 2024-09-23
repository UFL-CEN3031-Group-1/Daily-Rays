import db from '../firebase.mjs';

const getAllUsers = async (req, res) => {
  try {
    const snapshot = await db.collection('users').get();
    const users = snapshot.docs.map(doc => doc.data());
    res.status(200).json({
      data: users,
      message: "Users fetched successfully"
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: error.message
      }
    });
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const snapshot = await db.collection('users').where('username', '==', username).get();
    if (snapshot.empty) {
      return res.status(404).json({
        error: {
          code: 'USER_NOT_FOUND'
        },
        message: 'User not found'
      });
    }
    const user = snapshot.docs[0];
    return res.status(200).json({
      data: user.data(),
      message: 'User fetched successfully'
    });
  } catch (error) {
    return res.status(500).json({
      error: {
        code: 'INTERNAL_SERVER_ERROR'
      },
      message: error.message
    });
  }
};

export { getAllUsers, getUserByUsername };
