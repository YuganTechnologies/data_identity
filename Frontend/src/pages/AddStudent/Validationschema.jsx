import * as yup from 'yup';

// Step 1 Validation Schema
export const step1Schema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  surname: yup.string().required('Surname is required'),
  gender: yup.string().required('Gender is required'),
  dateOfBirth: yup.date().required('Date of Birth is required').nullable(),
  userId: yup.string().required('User ID is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  mobileNumber: yup.string().matches(/^\d{10}$/, 'Mobile Number must be 10 digits').required('Mobile Number is required'),
  address: yup.string().required('Address is required'),
  area: yup.string().required('Area is required'),
  state: yup.string().required('State is required'),
  district: yup.string().required('District is required'),
  talukaCity: yup.string().required('Taluka City is required'),
  townVillage: yup.string().required('Town Village is required'),
  pincode: yup.string().matches(/^\d{6}$/, 'Pincode must be 6 digits').required('Pincode is required'),
  religion: yup.string().required('Religion is required'),
  dept: yup.string().required('Department is required'),
  batch: yup.string().required('Batch is required'),
  studentId: yup.string().required('Student ID is required'),
});

// Step 2 Validation Schema
export const step2Schema = yup.object().shape({
  fatherId: yup.string().required('Father ID is required'),
  fatherFirstName: yup.string().required('Father\'s First Name is required'),
  fatherDateOfBirth: yup.date().required('Father\'s Date of Birth is required').nullable(),
  fatherEmail: yup.string().email('Invalid email').required('Father\'s Email is required'),
  fatherPrimaryMobileNo: yup.string().matches(/^\d{10}$/, 'Father\'s Primary Mobile No must be 10 digits').required('Father\'s Primary Mobile No is required'),
  fatherSecondaryMobileNo: yup.string().matches(/^\d{10}$/, 'Father\'s Secondary Mobile No must be 10 digits'),
  fatherAddressLine1: yup.string().required('Father\'s Address Line 1 is required'),
  fatherArea: yup.string().required('Father\'s Area is required'),
  fatherTownVillage: yup.string().required('Father\'s Town/Village is required'),
  fatherPincode: yup.string().matches(/^\d{6}$/, 'Father\'s Pincode must be 6 digits').required('Father\'s Pincode is required'),
  fatherProfession: yup.string().required('Father\'s Profession is required'),
  fatherIncome: yup.string().required('Father\'s Income is required'),
});

// Step 3 Validation Schema
export const step3Schema = yup.object().shape({
  motherId: yup.string().required('Mother ID is required'),
  motherFirstName: yup.string().required('Mother\'s First Name is required'),
  motherDateOfBirth: yup.date().required('Mother\'s Date of Birth is required').nullable(),
  motherEmail: yup.string().email('Invalid email').required('Mother\'s Email is required'),
  motherPrimaryMobileNo: yup.string().matches(/^\d{10}$/, 'Mother\'s Primary Mobile No must be 10 digits').required('Mother\'s Primary Mobile No is required'),
  motherSecondaryMobileNo: yup.string().matches(/^\d{10}$/, 'Mother\'s Secondary Mobile No must be 10 digits'),
  motherAddressLine1: yup.string().required('Mother\'s Address Line 1 is required'),
  motherArea: yup.string().required('Mother\'s Area is required'),
  motherTownVillage: yup.string().required('Mother\'s Town/Village is required'),
  motherPincode: yup.string().matches(/^\d{6}$/, 'Mother\'s Pincode must be 6 digits').required('Mother\'s Pincode is required'),
  motherProfession: yup.string().required('Mother\'s Profession is required'),
  motherIncome: yup.string().required('Mother\'s Income is required'),
});

// Step 4 Validation Schema
export const step4Schema = yup.object().shape({
  guardianId: yup.string().required('Guardian ID is required'),
  guardianFirstName: yup.string().required('Guardian\'s First Name is required'),
  guardianGender: yup.string().required('Guardian\'s Gender is required'),
  guardianDateOfBirth: yup.date().required('Guardian\'s Date of Birth is required').nullable(),
  guardianEmail: yup.string().email('Invalid email').required('Guardian\'s Email is required'),
  guardianPrimaryMobileNo: yup.string().matches(/^\d{10}$/, 'Guardian\'s Primary Mobile No must be 10 digits').required('Guardian\'s Primary Mobile No is required'),
  guardianSecondaryMobileNo: yup.string().matches(/^\d{10}$/, 'Guardian\'s Secondary Mobile No must be 10 digits'),
  guardianAddressLine1: yup.string().required('Guardian\'s Address Line 1 is required'),
  guardianArea: yup.string().required('Guardian\'s Area is required'),
  guardianTownVillage: yup.string().required('Guardian\'s Town/Village is required'),
  guardianPincode: yup.string().matches(/^\d{6}$/, 'Guardian\'s Pincode must be 6 digits').required('Guardian\'s Pincode is required'),
  guardianRelationWithStudent: yup.string().required('Guardian\'s Relation with Student is required'),
  guardianProfession: yup.string().required('Guardian\'s Profession is required'),
  guardianIncome: yup.string().required('Guardian\'s Income is required'),
});

// Step 5 Validation Schema
export const step5Schema = yup.object().shape({
  bloodGroup: yup.string().required('Blood Group is required'),
  schoolType: yup.string().required('School Type is required'),
  schoolName: yup.string().required('School Name is required'),
  medium: yup.string().required('Medium is required'),
  languagesKnown: yup.string().required('Languages Known is required'),
  foreignLanguagesKnown: yup.string().required('Foreign Languages Known is required'),
  aadharNo: yup.string().required('Aadhar No is required'),
  emisNo: yup.string().required('EMIS No is required'),
  tenthMark: yup.string().required('10th Mark is required'),
  twelfthMarkPercent: yup.string().required('12th Mark % is required'),
  twelfthMarkOutOf100: yup.string().required('12th Mark (out of 100) is required'),
  foodPreference: yup.string().required('Food Preference is required'),
  bankDetails: yup.string().required('Bank Details (Aadhar Linked) is required'),
  visitorName: yup.string().required('Visitor Name (Other than Father / Mother) is required'),
  visitorRelation: yup.string().required('Visitor Relation is required'),
  visitorAadhar: yup.string().required('Visitor Aadhar is required'),
  visitorPAN: yup.string().required('Visitor PAN is required'),
  visitorPhone: yup.string().matches(/^\d{10}$/, 'Visitor Phone must be 10 digits').required('Visitor Phone is required'),
  visitorDOB: yup.date().required('Visitor DOB is required').nullable(),
  visitorAddress: yup.string().required('Visitor Address is required'),
});
