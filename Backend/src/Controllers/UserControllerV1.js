import { Op } from "sequelize";
import UsersModel from "../Model/Sequelize/Users";
import StudentModel from "../Model/Sequelize/Students";
import UploadstudentsModel from "../Model/Sequelize/Uploadstudents";
import { genPassword, validPassword, getCurrentUser } from "../Utils/auth";
import { issueJWT } from "../Utils/token";

const moment = require("moment");
const multer = require("multer");
const { Sequelize } = require("sequelize");
import { getEnv } from "../Utils/envConfig";
const otpGenerator = require("otp-generator");
const nodemailer = require("nodemailer");
const ejs = require("ejs");

const exports = {
  Register: async (req, res) => {
    try {
      const count = await UsersModel.count({
        where: {
          [Op.or]: [{ mobile: req.body.mobile }],
        },
      });

      if (count > 0) {
        return res
          .status(400)
          .json({ success: false, message: "Mobile  already exists." });
      }

      const saltHash = genPassword(req.body.password);
      const passwordSalt = saltHash.salt;
      const passwordHash = saltHash.hash;

      const newUser = await UsersModel.create({
        username: req.body.username,
        email: req.body.email || null,
        mobile: req.body.mobile,
        pwd_salt: passwordSalt,
        pwd_hash: passwordHash,
        is_active: req.body.isActive,
      });

      if (newUser) {
        return res
          .status(201)
          .json({
            success: true,
            message: "User created successfully.",
            user: newUser.toJSON(),
          });
      }
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({
          success: false,
          message: "Error occurred while creating the user.",
          error: err,
        });
    }
  },
  userLogin: async (req, res) => {
    try {
      const user = await UsersModel.findOne({
        where: { username: req.body.UserId },
      });

      if (!user) {
        return res.status(401).json({ success: false, msg: "User not found" });
      }

      const isValid = validPassword(
        req.body.Password,
        user.pwd_hash,
        user.pwd_salt
      );

      if (isValid) {
        const tokenObject = issueJWT(user);
        res.status(200).json({
          success: true,
          UserId: user.username,
          role: user.role,
          uid: user.uid,

          token: tokenObject.token,
          expiresIn: tokenObject.expires,
        });
      } else {
        res
          .status(401)
          .json({ success: false, msg: "You entered the wrong password" });
      }
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({
          success: false,
          message: "Error occurred while checking the username",
          error: err,
        });
    }
  },

  addstudent: async (req, res) => {
    try {
      const userDetails = req.headers["userdetails"];

      if (!req.body) {
        return res
          .status(400)
          .json({ success: false, message: "Body is Required" });
      }

      const newStudent = await StudentModel.create({
        firstName: req.body.firstName || null,
        surname: req.body.surname || null,
        fullname :  req.body.fullname || null,
        gender: req.body.gender || null,
        dateOfBirth: req.body.dateOfBirth || null,
        bloodGroup: req.body.bloodGroup || null,
        userId: req.body.userId || null,
        email: req.body.email || null,
        whatsappNumber: req.body.whatsappanumber || null,
        address: req.body.address || null,
        area: req.body.area || null,
        talukaCity: req.body.talukaCity || null,
        townVillage: req.body.townVillage || null,
        district: req.body.district || null,
        state: req.body.state || null,
        pincode: req.body.pincode || null,
        religion: req.body.religion || null,
        dept: req.body.dept || null,
        college :  req.body.college || null,
        sevenFiveSCH: req.body["75sch"] || null,
        studentId: req.body.studentId || null,
        fg: req.body.fg || null,
        batch: req.body.batch || null,
        postMatric: req.body.postmatric || null,
        schoolType: req.body.schoolType || null,
        schoolName: req.body.schoolName || null,
        medium: req.body.medium || null,
        tenthMark: req.body.tenthMark || null,
        twelfthMarkPercent: req.body.twelfthMarkPercent || null,
        twelfthMathsMarkOutOf100: req.body.twelfthMathsMarkOutOf100 || null,
        twelfthPhysicsMarkOutOf100: req.body.twelfthPhysicsMarkOutOf100 || null,
        twelfthChemistryMarkOutOf100:
          req.body.twelfthChemistryMarkOutOf100 || null,
        twelfthBilologyMarkOutOf100:
          req.body.twelfthBilologyMarkOutOf100 || null,
        twelfthBotanyMarkOutOf100: req.body.twelfthBotanyMarkOutOf100 || null,
        twelfthZoologyMarkOutOf100: req.body.twelfthZoologyMarkOutOf100 || null,
        twelfthCompScienceMarkOutOf100:
          req.body.twelfthCompScienceMarkOutOf100 || null,
        aadharNo: req.body.aadharNo || null,
        panCard: req.body.pancard || null,
        passportNumber: req.body.passportNo || null,
        emisNo: req.body.emisNo || null,
        bankDetails: req.body.bankDetails || null,
        languagesKnown: req.body.languagesKnown || null,
        foreignLanguagesKnown: req.body.foreignLanguagesKnown || null,
        foodPreference: req.body.foodPreference || null,
        hostelStudent: req.body.hostelstudent || null,
        visitorName: req.body.visitorName || null,
        visitorRelation: req.body.visitorRelation || null,
        visitorAadhar: req.body.visitorAadhar || null,
        visitorPAN: req.body.visitorPAN || null,
        visitorPhone: req.body.visitorPhone || null,
        visitorDOB: req.body.visitorDOB || null,
        visitorAddress: req.body.visitorAddress || null,
        mobileNumber: req.body.mobileNumber || null,
        community: req.body.community || null,
        fatherId: req.body.fatherId || null,
        fatherFirstName: req.body.fatherFirstName || null,
        fatherEmail: req.body.fatherEmail || null,
        fatherDateOfBirth: req.body.fatherDateOfBirth || null,
        fatherPrimaryMobileNo: req.body.fatherPrimaryMobileNo || null,
        fatherSecondaryMobileNo: req.body.fatherSecondaryMobileNo || null,
        fatherAddressLine1: req.body.fatherAddressLine1 || null,
        fatherTownVillage: req.body.fatherTownVillage || null,
        fatherPincode: req.body.fatherPincode || null,
        fatherArea: req.body.fatherArea || null,
        fatherIncome: req.body.fatherIncome || null,
        fatherProfession: req.body.fatherProfession || null,
        motherId: req.body.motherId || null,
        motherFirstName: req.body.motherFirstName || null,
        motherEmail: req.body.motherEmail || null,
        motherDateOfBirth: req.body.motherDateOfBirth || null,
        motherPrimaryMobileNo: req.body.motherPrimaryMobileNo || null,
        motherSecondaryMobileNo: req.body.motherSecondaryMobileNo || null,
        motherAddressLine1: req.body.motherAddressLine1 || null,
        motherTownVillage: req.body.motherTownVillage || null,
        motherPincode: req.body.motherPincode || null,
        motherArea: req.body.motherArea || null,
        motherIncome: req.body.motherIncome || null,
        motherProfession: req.body.motherProfession || null,
        guardianId: req.body.guardianId || null,
        guardianFirstName: req.body.guardianFirstName || null,
        guardianDateOfBirth: req.body.guardianDateOfBirth || null,
        guardianGender: req.body.guardianGender || null,
        guardianEmail: req.body.guardianEmail || null,
        guardianPrimaryMobileNo: req.body.guardianPrimaryMobileNo || null,
        guardianSecondaryMobileNo: req.body.guardianSecondaryMobileNo || null,
        guardianAddressLine1: req.body.guardianAddressLine1 || null,
        guardianTownVillage: req.body.guardianTownVillage || null,
        guardianPincode: req.body.guardianPincode || null,
        guardianArea: req.body.guardianArea || null,
        guardianRelationWithStudent:
          req.body.guardianRelationWithStudent || null,
        guardianProfession: req.body.guardianProfession || null,
        guardianIncome: req.body.guardianIncome || null,
        created_by: userDetails || null,
      });

      if (newStudent) {
        return res
          .status(200)
          .json({ success: true, message: "Student created successfully." });
      }
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({
          success: false,
          message: "Error occurred while creating the student.",
          error: err,
        });
    }
  },

  getstudent: async (req, res) => {
    try {
      const user = await UploadstudentsModel.findOne({
        where: { studentId: req.body.studentid },
      });

      if (!user) {
        return res.status(400).json({ success: false, msg: "Student not found" });
      }

      res.status(200).json({
        success: true,
        studentId: user.studentId,
        firstName: user.firstName,
        surname: user.surname,
        gender: user.gender,
        dept: user.dept,
        batch: user.batch,
        college:user.college,

       
      });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({
          success: false,
          message: "Error occurred while checking the Student ID",
          error: err,
        });
    }
  },
};

// Controller function for adding a new report with file upload

module.exports = exports;
