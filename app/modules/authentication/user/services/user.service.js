const db = require("../../../../models");
const config = require("../../../../config/auth.config");
const User = db.user;
const UserInfo = db.userinfo;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const TokenGenerator = require('uuid-token-generator');
const tokgen2 = new TokenGenerator(256, TokenGenerator.BASE62);


const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
    // const { firstName, lastName, phoneNumber, email, password, address, city, state, country, zipCode } = req.body;
  
    // Check if all required fields are provided
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).send({
        message: "All required fields are not provided."
      });
    }
  
    try {
      // Check if the email is already in use
      const existingUser = await User.findOne({ where: { email: email } });
      if (existingUser) {
        return res.status(400).send({
          message: "Email is already in use."
        });
      }
  
      // Create a new user
      const user = {
        userToken: tokgen2.generate(),
        firstName: firstName,
        lastName: lastName,
        // phoneNumber: phoneNumber,
        email: email,
        password: bcrypt.hashSync(password, 8),
      };
  
      // Save the user in the database
      const userData = await User.create(user);
  
      // Create user info
      const userInfo = {
        userId: userData.id,
        firstName: firstName,
        lastName: lastName,
        // phoneNumber: phoneNumber,
        email: email,
        // address: address,
        // city: city,
        // state: state,
        // country: country,
        // zipCode: zipCode,
      };
  
      const userInfoData = await UserInfo.create(userInfo);
  
      // Prepare the response data
      const result = {
        userToken: userData.userToken, // Changed from vendorToken
        name: `${userData.firstName} ${userData.lastName}`,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
        address: userInfoData.address,
        city: userInfoData.city,
        state: userInfoData.state,
        country: userInfoData.country,
        zipCode: userInfoData.zipCode
      };
  
      res.send(result);
    } catch (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user."
      });
    }
};
  
const login = async (req, res) => {
  try {
    // Find the user by email
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    // If user not found, return an error
    if (!user) {
      return res.status(404).send({ message: "Login unsuccessful: User not found." });
    }

    // Validate the password
    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Login unsuccessful: Invalid password!",
        accessToken: null
      });
    }

    // Generate tokens
    const userAccessToken = jwt.sign({ id: user.userToken }, config.secret, {
      expiresIn: 86400 // 24 hours
    });

    const userRefreshToken = jwt.sign({ id: user.userToken }, config.secret, {
      expiresIn: 86400 // 24 hours
    });

    // Combine first name and last name to get the full name
    const fullName = `${user.firstName} ${user.lastName}`;

    // Send the successful login response
    res.status(200).send({
      message: "Login successful!",
      userToken: user.userToken,
      useraccesstoken: userAccessToken,
      userrefreshToken: userRefreshToken,
      fullName: fullName,
      email: user.email
    });
  } catch (err) {
    // Handle any errors that occur during the process
    res.status(500).send({ message: "Login unsuccessful: " + err.message });
  }
};
  
const forgotPassword = async (req, res) => {
    try {
      // Find the user by email
      const user = await User.findOne({
        where: { email: req.body.email }
      });
  
      // Check if the user exists
      if (!user) {
        return res.status(404).send({ message: "Email does not exist." });
      }
  
      // Generate a new reset token
      const resetToken = tokgen2.generate();
  
      // Update the user with the new reset token
      await user.update({ resetToken: resetToken });
  
      // Optionally, send the reset token via email
      // await emailservice.sendResetPasswordEmail(user.email, resetToken);
  
      // Respond with a success message
      res.status(200).send({ message: "Reset link sent to the registered email." });
  
    } catch (err) {
      // Handle any errors that occur during the process
      res.status(500).send({ message: err.message || "Some error occurred while processing the request." });
    }
};

const resetPassword = async (req, res) => {
    try {
      // Find the user by reset token
      const user = await User.findOne({
        where: {
          resetToken: req.body.resetToken
        }
      });
  
      // Check if the user with the provided reset token exists
      if (!user) {
        return res.status(404).send({ message: "The reset link is not valid." });
      }
  
      // Update the user with the new encrypted password
      await user.update({ 
        password: bcrypt.hashSync(req.body.password, 8),
        resetToken: null // Optionally clear the reset token after use
      });
  
      // Optionally, notify the user via email about the password change
      // await emailservice.PasswordResetSuccess(user.email, 'Password Changed Successfully');
  
      // Respond with a success message
      return res.status(200).send({ message: "Password changed successfully." });
  
    } catch (err) {
      // Handle any errors that occur during the process
      res.status(500).send({ message: err.message || "Some error occurred while processing the request." });
    }
};
  
const passwordreset = async (req, res) => {
    try {
      // Find the user by reset token
      const user = await User.findOne({
        where: {
          resetToken: req.body.resetToken
        }
      });
  
      // Check if the user with the provided reset token exists
      if (!user) {
        return res.status(404).send({ message: "User is not valid." });
      }
  
      // Update the user with the new encrypted password
      await user.update({
        password: bcrypt.hashSync(req.body.password, 8),
        resetToken: null // Clear the reset token after the password is reset
      });
  
      // Optionally, notify the user via email about the successful password reset
      // await emailservice.PasswordResetSuccess(user.email, 'Password reset successful');
  
      // Respond with a success message
      return res.status(200).send({ message: "Password reset successful." });
  
    } catch (err) {
      // Handle any errors that occur during the process
      res.status(500).send({ message: err.message || "Some error occurred while processing the request." });
    }
};
  
const getUserDetails = async (req, res) => {
    try {
      // Extract the userToken from the request
      const { userToken } = req.body;
  
      // Find the user by userToken
      const user = await User.findOne({
        where: {
          userToken: userToken
        }
      });
  
      // Check if the user with the provided token exists
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }
  
      // Find the user's additional details in the UserInfo table
      const userInfo = await UserInfo.findOne({
        where: { userId: user.id }
      });
  
      if (!userInfo) {
        return res.status(404).send({ message: "User info not found." });
      }
  
      // Respond with the user's details and additional information
      return res.status(200).send({
        message: "User details retrieved successfully.",
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          email: user.email,
          address: userInfo.address,
          city: userInfo.city,
          state: userInfo.state,
          country: userInfo.country,
          zipCode: userInfo.zipCode
        }
      });
  
    } catch (err) {
      // Handle any errors that occur during the process
      res.status(500).send({ message: err.message || "Some error occurred while retrieving user details." });
    }
};  

const updateUserDetails = async (req, res) => {
    try {
      // Extract the userToken from the request
      const { userToken } = req.body;
  
      // Find the user by userToken
      const user = await User.findOne({
        where: {
          userToken: userToken
        }
      });
  
      // Check if the user with the provided token exists
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }
  
      // Update the user information
      const updatedUser = await user.update({
        firstName: req.body.firstName || user.firstName,
        lastName: req.body.lastName || user.lastName,
        phoneNumber: req.body.phoneNumber || user.phoneNumber,
        email: req.body.email || user.email,
      });
  
      // Find and update the user's additional details in the UserInfo table
      const userInfo = await UserInfo.findOne({
        where: { userId: user.id }
      });
  
      if (userInfo) {
        await userInfo.update({
          email: req.body.email || userInfo.email,
          address: req.body.address || userInfo.address,
          city: req.body.city || userInfo.city,
          state: req.body.state || userInfo.state,
          country: req.body.country || userInfo.country,
          zipCode: req.body.zipCode || userInfo.zipCode
        });
      } else {
        return res.status(404).send({ message: "User info not found." });
      }
  
      // Respond with the updated user information
      return res.status(200).send({
        message: "User details updated successfully.",
        user: {
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          phoneNumber: updatedUser.phoneNumber,
          email: updatedUser.email,
          address: userInfo.address,
          city: userInfo.city,
          state: userInfo.state,
          country: userInfo.country,
          zipCode: userInfo.zipCode
        }
      });
  
    } catch (err) {
      // Handle any errors that occur during the process
      res.status(500).send({ message: err.message || "Some error occurred while updating user details." });
    }
};


module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  passwordreset,
  getUserDetails,
  updateUserDetails,
}
