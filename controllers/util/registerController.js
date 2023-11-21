const userModel = require('../../models/users/userModel');
const bcrypt = require('bcrypt'); 

const registerUser = async (req, res) => {
  const propertiesToValidate = ["FIRSTNAME", "LASTNAME", "EMAIL", "PASSWORD" ];
  try {
    const validationMessage = validateRequestProperties(req.body,propertiesToValidate);
    if ( validationMessage === "PASS" ) {
      if ( validateEmail( req.body.EMAIL )) {
        const isEmailExist = await userModel.getUserByEmail(req.body.EMAIL);
        if ( !isEmailExist ) {
          const hashedPassword = await bcrypt.hash(req.body.PASSWORD, 10);
          const newUser = {
              FIRSTNAME: req.body.FIRSTNAME,
              LASTNAME: req.body.LASTNAME,
              EMAIL: req.body.EMAIL,
              PHONE_NUMBER: req.body.PHONE_NUMBER,
              ADDRESS: req.body.ADDRESS,
              PASSWORD: hashedPassword,
              IS_ADMIN: req.body.IS_ADMIN
          }
          const user = await userModel.createUser(newUser);
          res.status(201).json({ message: "Successfully registered" });
        } else {
          res.status(404).json({ message: "The email already is registered" });
        }
      }else{
        res.status(404).json({ message: "The email is invalid" });
      }
    } else {
      res.status(404).json({ message: validationMessage });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'An error occurred while registering the user.' });
  }
};
function validateRequestProperties(requestBody, properties) {
  for ( const property of properties ) {
    if ( !requestBody[property] || requestBody[property].trim() === "" ) {
      return `${property} is empty or undefined.`;
    } 
  }
  return "PASS";
}
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
module.exports = {
    registerUser,
};