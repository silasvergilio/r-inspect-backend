var express = require('express');
var router = express.Router();
var userModel = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const tokensModel = require('../model/tokens'); // Ensure this is the correct path to your tokens model
const authorize = require('../middlewares/roleBasedAccessControl');

router.get('/', authorize(['inspector_coordinator']),async (req, res) => {
  // #swagger.tags = ['user']
  // #swagger.description = 'Endpoint to retrieve a list of all users.'
  // #swagger.responses[200] = {
  //     description: 'Successful operation: Returns a list of users.',
  //     schema: { $ref: "#/definitions/UsersArray" }
  // }
  // #swagger.responses[500] = { description: 'Server error: An error occurred while fetching users.' }
  try {
    const users = await userModel.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching users.");
  }
})

router.get('/me', authorize(['inspector', 'inspector_coordinator']), async (req, res) => {
  // #swagger.tags = ['user']
  // #swagger.description = 'Endpoint to retrieve the user associated with the provided auth token.'
  // #swagger.responses[200] = {
  //     description: 'Successful operation: Returns the user object.',
  //     schema: { $ref: "#/definitions/UserObject" } // Assuming UserObject is the correct definition for a single user
  // }
  // #swagger.responses[500] = { description: 'Server error: An error occurred while fetching the user.' }

  try {
    const user = await userModel.findById(req.user.userId); // Adjust to match how your user ID is stored
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the user.");
  }
});


// Assuming JWT_SECRET and REFRESH_TOKEN_SECRET are defined in your environment
const { JWT_SECRET, REFRESH_TOKEN_SECRET } = process.env;

router.post('/login', async (req, res) => {
  // Login Route
  // #swagger.tags = ['user']
  // #swagger.description = 'Endpoint for user login.'
  // #swagger.parameters['user'] = {
  //     in: 'body',
  //     description: 'User login data',
  //     required: true,
  //     schema: { $ref: "#/definitions/UserLogin" }
  // }
  // #swagger.responses[200] = {
  //     description: 'Login successful, returns access and refresh tokens.',
  //     schema: { $ref: "#/definitions/UserTokens" }
  // }
  // #swagger.responses[401] = { description: 'Invalid username or password.' }
  // #swagger.responses[500] = { description: 'Server error occurred.' }

  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username }).exec();

    if(!user) {
      return res.status(401).send({ message: 'Invalid username or password' });
    }
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ message: 'Invalid username or password' });
    }

    // Generate tokens
    const accessToken = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    const refreshToken = jwt.sign({ userId: user._id }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    // Save refreshToken in DB
    await tokensModel.create({
      userId: user._id,
      createdByUserId: user._id, // Assuming the creator is the user itself
      token: refreshToken,
      type: 'refresh',
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    // Optionally, save the accessToken for tracking/logging purposes
    await tokensModel.create({
      userId: user._id,
      createdByUserId: user._id,
      token: accessToken,
      type: 'access',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
    });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
});

router.post('/refresh-token', authorize(['inspector', 'inspector_coordinator']), async (req, res) => {
  // Refresh Token Route
  // #swagger.tags = ['user']
  // #swagger.description = 'Endpoint to refresh access token.'
  // #swagger.parameters['refreshToken'] = {
  //     in: 'body',
  //     description: 'Refresh token',
  //     required: true,
  //     schema: { $ref: "#/definitions/RefreshTokenRequest" }
  // }
  // #swagger.responses[200] = {
  //     description: 'Access token refreshed successfully.',
  //     schema: { $ref: "#/definitions/NewAccessToken" }
  // }
  // #swagger.responses[401] = { description: 'Invalid refresh token.' }
  // #swagger.responses[403] = { description: 'Refresh token expired or invalid.' }
  // #swagger.responses[500] = { description: 'Server error occurred.' }

  const { refreshToken } = req.body;
  const tokenRecord = await tokensModel.findOne({ token: refreshToken, type: 'refresh' }).exec();

  if (!tokenRecord) {
    return res.status(401).send({ message: 'Invalid refresh token' });
  }

  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err || !decoded.userId || decoded.userId.toString() !== tokenRecord.userId.toString()) {
      await tokensModel.findByIdAndDelete(tokenRecord._id);
      return res.status(403).send({ message: 'Refresh token expired or invalid' });
    }

    // Generate a new access token
    const newAccessToken = jwt.sign({ userId: decoded.userId }, JWT_SECRET, { expiresIn: '1d' });

    await tokensModel.create({
      userId: decoded.userId,
      createdByUserId: decoded.userId,
      token: newAccessToken,
      type: 'access',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
    });

    res.json({ accessToken: newAccessToken });
  });
});

router.post('/logout', authorize(['inspector', 'inspector_coordinator']), async (req, res) => {
  // Logout Route
  // #swagger.tags = ['user']
  // #swagger.description = 'Endpoint to log out a user.'
  // #swagger.parameters['refreshToken'] = {
  //     in: 'body',
  //     description: 'Refresh token of the user logging out',
  //     required: true,
  //     schema: { $ref: "#/definitions/RefreshTokenRequest" }
  // }
  // #swagger.responses[200] = { description: 'Logged out successfully.' }

  const { refreshToken } = req.body;
  await tokensModel.findOneAndDelete({ token: refreshToken, type: 'refresh' });
  res.send({ message: 'Logged out successfully' });
});

router.get("/users", async (req, res) => {
  // #swagger.tags = ['user']
  // #swagger.description = 'Endpoint to retrieve a list of all users.'
  // #swagger.responses[200] = {
  //     description: 'Successful operation: Returns a list of users.',
  //     schema: { $ref: "#/definitions/UsersArray" }
  // }
  // #swagger.responses[500] = { description: 'Server error: An error occurred while fetching users.' }
  try {
    const users = await userModel.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching users.");
  }
});

router.delete("/user/:name", authorize(['inspector', 'inspector_coordinator']), async (req, res) => {
  // #swagger.tags = ['user']
  // #swagger.description = 'Endpoint to retrieve a list of all users.'
  // #swagger.responses[200] = {
  //     description: 'Successful operation: Returns a list of users.',
  //     schema: { $ref: "#/definitions/UsersArray" }
  // }
  // #swagger.responses[500] = { description: 'Server error: An error occurred while fetching users.' }
  try {
    await userModel.deleteOne({ name: req.params.name });
    res.status(200).send("User deleted successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching users.");
  }
});


module.exports = router;
