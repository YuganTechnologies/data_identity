import { DataTypes, Sequelize } from "sequelize";
import { sequelizeInstance } from "../../Utils/DbConnector/sequelize";
import { STUDENT_TABLE } from "../../Config/table";

const StudentSchema = {
  // Step 1 Fields
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  surname: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  fullname: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  gender: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  userId: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  mobileNumber: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  area: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  district: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  talukaCity: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  townVillage: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  pincode: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  religion: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  dept: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  batch: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  college: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  studentId: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  sevenFiveSCH: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  fg: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  postMatric: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },

  // Step 2 Fields
  fatherId: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  fatherFirstName: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  fatherDateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  fatherEmail: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  fatherPrimaryMobileNo: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  fatherSecondaryMobileNo: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  fatherAddressLine1: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  fatherArea: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  fatherTownVillage: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  fatherPincode: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  fatherProfession: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  fatherIncome: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },

  // Step 3 Fields
  motherId: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  motherFirstName: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  motherDateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  motherEmail: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  motherPrimaryMobileNo: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  motherSecondaryMobileNo: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  motherAddressLine1: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  motherArea: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  motherTownVillage: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  motherPincode: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  motherProfession: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  motherIncome: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },

  // Step 4 Fields
  guardianId: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  guardianFirstName: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  guardianGender: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  guardianDateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  guardianEmail: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  guardianPrimaryMobileNo: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  guardianSecondaryMobileNo: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  guardianAddressLine1: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  guardianArea: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  guardianTownVillage: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  guardianPincode: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  guardianRelationWithStudent: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  guardianProfession: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  guardianIncome: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },

  // Step 5 Fields
  bloodGroup: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  schoolType: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  schoolName: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  medium: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  languagesKnown: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  foreignLanguagesKnown: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  aadharNo: {
    type: DataTypes.STRING(12),
    allowNull: true,
  },
  emisNo: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },

  tenthMark: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  twelfthMarkPercent: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  twelfthMathsMarkOutOf100: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  twelfthPhysicsMarkOutOf100: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  twelfthChemistryMarkOutOf100: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  twelfthBilologyMarkOutOf100: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  twelfthBotanyMarkOutOf100: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  twelfthZoologyMarkOutOf100: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  twelfthCompScienceMarkOutOf100: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  community: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },

  panCard: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  passportNumber: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  hostelStudent: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  whatsappNumber: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  visitorName: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  visitorRelation: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  visitorAadhar: {
    type: DataTypes.STRING(12),
    allowNull: true,
  },
  visitorPAN: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
  visitorPhone: {
    type: DataTypes.STRING(15),
    allowNull: true,
  },
  visitorDOB: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  visitorAddress: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  foodPreference: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  bankDetails: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  ////Placemnet

  drivinglicense: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  registernumber: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  internship: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  placement: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  paidtraining: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  gvtjobtraining: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  interestedtraining: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  hoursoftraining: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  expectedsalary: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },

  preferedlocation: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  currentintern: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  currenttraining: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  latestcgpa: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  noofstandingarrears: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  parttimejob: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  primaryskills: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  secondaryskills: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  primaryskills_others: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  secondaryskills_others: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  noplacemnetreason: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  ///

  created_by: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
};

export default sequelizeInstance.define(STUDENT_TABLE, StudentSchema, {
  timestamps: true,
  createdAt: "created_on",
  updatedAt: "updated_on",
});
