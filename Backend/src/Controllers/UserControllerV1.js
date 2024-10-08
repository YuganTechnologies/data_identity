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
        return res.status(201).json({
          success: true,
          message: "User created successfully.",
          user: newUser.toJSON(),
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
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
          role: user.roles,
          // uid: user.uid,

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
      res.status(500).json({
        success: false,
        message: "Error occurred while checking the username",
        error: err,
      });
    }
  },

  addstudent: async (req, res) => {
    try {
      const userDetails = req.headers["userdetails"];

      if (!req.body || !req.body.fullname) {
        return res
          .status(400)
          .json({ success: false, message: "Details are Required" });
      }

      const newStudent = await StudentModel.create({
        sevenFiveSCH: req.body["75sch"] || null,
        firstName: req.body.firstName || null,
        surname: req.body.surname || null,
        fullname: req.body.fullname || null,
        gender: req.body.gender || null,
        dateOfBirth: req.body.dateOfBirth || null,
        userId: req.body.userId || null,
        email: req.body.email || null,
        mobileNumber: req.body.mobileNumber || null,
        address: req.body.address || null,
        area: req.body.area || null,
        state: req.body.state || null,
        district: req.body.district || null,
        talukaCity: req.body.talukaCity || null,
        townVillage: req.body.townVillage || null,
        pincode: req.body.pincode || null,
        religion: req.body.religion || null,
        dept: req.body.dept || null,
        batch: req.body.batch || null,
        college: req.body.college || null,
        studentId: req.body.studentId || null,
        fg: req.body.fg || null,
        postMatric: req.body.postMatric || null,
        fatherId: req.body.fatherId || null,
        fatherFirstName: req.body.fatherFirstName || null,
        fatherDateOfBirth: req.body.fatherDateOfBirth || null,
        fatherEmail: req.body.fatherEmail || null,
        fatherPrimaryMobileNo: req.body.fatherPrimaryMobileNo || null,
        fatherSecondaryMobileNo: req.body.fatherSecondaryMobileNo || null,
        fatherAddressLine1: req.body.fatherAddressLine1 || null,
        fatherArea: req.body.fatherArea || null,
        fatherTownVillage: req.body.fatherTownVillage || null,
        fatherPincode: req.body.fatherPincode || null,
        fatherProfession: req.body.fatherProfession || null,
        fatherIncome: req.body.fatherIncome || null,
        motherId: req.body.motherId || null,
        motherFirstName: req.body.motherFirstName || null,
        motherDateOfBirth: req.body.motherDateOfBirth || null,
        motherEmail: req.body.motherEmail || null,
        motherPrimaryMobileNo: req.body.motherPrimaryMobileNo || null,
        motherSecondaryMobileNo: req.body.motherSecondaryMobileNo || null,
        motherAddressLine1: req.body.motherAddressLine1 || null,
        motherArea: req.body.motherArea || null,
        motherTownVillage: req.body.motherTownVillage || null,
        motherPincode: req.body.motherPincode || null,
        motherProfession: req.body.motherProfession || null,
        motherIncome: req.body.motherIncome || null,
        guardianId: req.body.guardianId || null,
        guardianFirstName: req.body.guardianFirstName || null,
        guardianGender: req.body.guardianGender || null,
        guardianDateOfBirth: req.body.guardianDateOfBirth || null,
        guardianEmail: req.body.guardianEmail || null,
        guardianPrimaryMobileNo: req.body.guardianPrimaryMobileNo || null,
        guardianSecondaryMobileNo: req.body.guardianSecondaryMobileNo || null,
        guardianAddressLine1: req.body.guardianAddressLine1 || null,
        guardianArea: req.body.guardianArea || null,
        guardianTownVillage: req.body.guardianTownVillage || null,
        guardianPincode: req.body.guardianPincode || null,
        guardianRelationWithStudent:
          req.body.guardianRelationWithStudent || null,
        guardianProfession: req.body.guardianProfession || null,
        guardianIncome: req.body.guardianIncome || null,
        bloodGroup: req.body.bloodGroup || null,
        schoolType: req.body.schoolType || null,
        schoolName: req.body.schoolName || null,
        medium: req.body.medium || null,
        languagesKnown: req.body.languagesKnown || null,
        foreignLanguagesKnown: req.body.foreignLanguagesKnown || null,
        aadharNo: req.body.aadharNo || null,
        emisNo: req.body.emisNo || null,
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
        community: req.body.community || null,
        panCard: req.body.panCard || null,
        passportNumber: req.body.passportNumber || null,
        hostelStudent: req.body.hostelStudent || null,
        whatsappNumber: req.body.whatsappNumber || null,
        visitorName: req.body.visitorName || null,
        visitorRelation: req.body.visitorRelation || null,
        visitorAadhar: req.body.visitorAadhar || null,
        visitorPAN: req.body.visitorPAN || null,
        visitorPhone: req.body.visitorPhone || null,
        visitorDOB: req.body.visitorDOB || null,
        visitorAddress: req.body.visitorAddress || null,
        foodPreference: req.body.foodPreference || null,
        bankDetails: req.body.bankDetails || null,
        drivinglicense: req.body.drivinglicense || null,
        registernumber: req.body.registernumber || null,
        internship: req.body.internship || null,
        placement: req.body.placement || null,
        paidtraining: req.body.paidtraining || null,
        gvtjobtraining: req.body.gvtjobtraining || null,
        interestedtraining: req.body.interestedtraining || null,
        hoursoftraining: req.body.hoursoftraining || null,
        expectedsalary: req.body.expectedsalary || null,
        preferedlocation: req.body.preferedlocation || null,
        currentintern: req.body.currentintern || null,
        currenttraining: req.body.currenttraining || null,
        latestcgpa: req.body.latestcgpa || null,
        noofstandingarrears: req.body.noofstandingarrears || null,
        parttimejob: req.body.parttimejob || null,
        primaryskills: req.body.primaryskills || null,
        secondaryskills: req.body.secondaryskills || null,
        primaryskills_others: req.body.primaryskills_others || null,
        secondaryskills_others: req.body.secondaryskills_others || null,
        noplacemnetreason: req.body.noplacemnetreason || null,
        created_by: userDetails || null,
        twelethpassoutyear: req.body.twelethpassoutyear || null,
        tenthpassoutyear: req.body.tenthpassoutyear || null,
      });

      if (newStudent) {
        return res
          .status(200)
          .json({ success: true, message: "Student created successfully." });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
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
        return res
          .status(400)
          .json({ success: false, msg: "Student ID not found" });
      }

      const alreadysubmiteduser = await StudentModel.findOne({
        where: { studentId: req.body.studentid },
      });

      if (alreadysubmiteduser) {
        return res
          .status(400)
          .json({ success: false, msg: "Student Details are already submitted! Please contact admin for changes" });
      }
      res.status(200).json({
        success: true,
        studentId: user.studentId,
        firstName: user.firstName,
        surname: user.surname,
        gender: user.gender,
        dept: user.dept,
        batch: user.batch,
        college: user.college,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Error occurred while checking the Student ID",
        error: err,
      });
    }
  },
  getallstudent: async (req, res) => {
    try {
      const user = await StudentModel.findAll();

      if (!user) {
        return res
          .status(400)
          .json({ success: false, msg: "Student ID not found" });
      }

  
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Error occurred while checking the Student ID",
        error: err,
      });
    }
  },

  addmissingid: async (req, res) => {
    try {
      const userDetails = req.headers["userdetails"];
      const userrole = req.headers["userrole"];
      console.log('userrole', userrole)
      if (userrole !== '"ADMIN"') {
        return res
          .status(400)
          .json({ success: false, message: "Only Admin can able to add ID" });
      }
      if (!req.body || !req.body.firstName || !req.body.studentId) {
        return res
          .status(400)
          .json({ success: false, message: "Details are Required" });
      }

      const addmissStudent = await UploadstudentsModel.create({

        firstName: req.body.firstName || null,
        surname: req.body.surname || null,

        gender: req.body.gender || null,
        dateOfBirth: req.body.dateOfBirth || null,


        dept: req.body.dept || null,
        batch: req.body.batch || null,
        college: req.body.college || null,
        studentId: req.body.studentId || null,
        created_by: userDetails || null
      });

      if (addmissStudent) {
        return res
          .status(200)
          .json({ success: true, message: "Student Added successfully." });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Error occurred while creating the student.",
        error: err,
      });
    }
  },

};

// Controller function for adding a new report with file upload

module.exports = exports;
