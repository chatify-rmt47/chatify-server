const { bcryptData } = require('../helpers/bcrypt');
const generateTokenAndSetCookie = require('../helpers/generateToken');
const User = require('../model/user');

class UserController {
  static async signUp(req, res, next) {
    try {
      const { fullName, username, password, confirmPassword, gender } =
        req.body;
      if (password != confirmPassword) {
        throw {
          name: 'validateError',
          message: 'Passwords and confirm password does not match',
        };
      }

      if (!username || username == '') {
        throw {
          name: 'validateError',
          message: 'Username cannot be empty',
        };
      }

      if (!password || password == '') {
        throw {
          name: 'validateError',
          message: 'Password cannot be empty',
        };
      }

      const user = await User.findOne({ username });
      if (user) {
        throw {
          name: 'validateError',
          message: 'Username already exist',
        };
      }

      const hashedPassword = bcryptData(password);

      const boyPic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const girlPic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

      const newUser = new User({
        fullName,
        username,
        password: hashedPassword,
        gender,
        profilePic: gender === 'male' ? boyPic : girlPic,
      });

      if (newUser) {
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();
        res.status(201).json({
          _id: newUser.id,
          fullName: newUser.fullName,
          username: newUser.username,
          profilePic: newUser.profilePic,
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next)
}


module.exports = UserController;
