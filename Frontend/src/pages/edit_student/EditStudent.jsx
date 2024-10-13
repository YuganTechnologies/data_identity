// src/components/MultiStepForm.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Stepper,
  TextInput,
  Select,
  Textarea,
  Group,
  Checkbox,
  Radio,
  Switch,
  Autocomplete,
  Grid,
  Card,
  MultiSelect,
} from "@mantine/core";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { Breadcrumbs, Anchor } from "@mantine/core";
import {
  fieldDefinitions,
  stepNames,
  initialFatherValues,
  initialMotherValues,
  initialGuardianValues,
} from "./fieldDefinitions";
import Swal from "sweetalert2";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "./style.css"; // Ensure this import matches the path to your CSS file
import AuthRequest from "../../APIRequest/AuthRequest";

// Function to generate Yup validation schema based on fields
const generateValidationSchema = (fields) => {
  const shape = {};
  fields.forEach((field) => {
    if (
      field.type === "radio" ||
      field.type === "checkbox" ||
      field.type === "switch"
    ) {
      if (!field.optional) {
        shape[field.name] = yup.string().required(`${field.label} is required`);
      }
    } else if (field.type === "phone") {
      if (!field.optional) {
        shape[field.name] = yup
          .string()
          .required(`${field.label} is required`)
          .test(
            "is-valid-phone",
            "Invalid phone number",
            (value) => value && isValidPhoneNumber(value)
          );
      }
    } else if (field.type === "number") {
      if (!field.optional) {
        shape[field.name] = yup
          .number()
          .required(`${field.label} is required`)
          .typeError(`${field.label} must be a number`);
      } else {
        shape[field.name] = yup
          .number()
          .typeError(`${field.label} must be a number`);
      }
    } else if (field.type === "email") {
      if (!field.optional) {
        shape[field.name] = yup
          .string()
          .email("Invalid email address")
          .required(`${field.label} is required`);
      }
    } else if (field.type === "selectmulti") {
      if (!field.optional) {
        shape[field.name] = yup
          .array()
          .min(1, `${field.label} must have at least one selection`)
          .required(`${field.label} is required`);
      }
    } else if (field.type === "text" && field.name === "phoneNumber") {
      if (!field.optional) {
        shape[field.name] = yup
          .string()
          .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
          .required(`${field.label} is required`)
          .nullable();
      }
    } else if (field.type === "otherinselect") {
      if (!field.optional) {
        shape[field.name] = yup.string().when(field.depends, {
          is: (value) => value?.includes("Others"), // Check if the dependent field includes "Other"
          then: yup.string().required(`${field.label} is required`), // Make the field required if "Other" is selected
          otherwise: yup.string().nullable(), // No specific validation if "Other" is not selected
        });
      }
    } else {
      if (!field.optional) {
        shape[field.name] = yup
          .string()
          .required(`${field.label} is required`)
          .nullable();
      } else {
        shape[field.name] = yup.string().nullable();
      }
    }
  });
  return yup.object().shape(shape);
};

const EditingStudent = () => {
  const [active, setActive] = useState(0);
  const location = useLocation();
  const steps = fieldDefinitions.length;
  const studentId = location.state || {};

  const [includeFather, setIncludeFather] = useState(false);
  const [includeMother, setIncludeMother] = useState(false);
  const [includeGuardian, setIncludeGuardian] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [searchloading, setSearchloading] = useState(false);

  // Function to dynamically create the validation schema based on the step and selections
  const createValidationSchema = () => {
    let fieldsToValidate = [...fieldDefinitions[active]];
    if (active === 1) {
      if (includeFather)
        fieldsToValidate = [...fieldsToValidate, ...initialFatherValues];
      if (includeMother)
        fieldsToValidate = [...fieldsToValidate, ...initialMotherValues];
      if (includeGuardian)
        fieldsToValidate = [...fieldsToValidate, ...initialGuardianValues];
    }
    return generateValidationSchema(fieldsToValidate);
  };

  const formik = useFormik({
    initialValues: {
      ...fieldDefinitions.flat().reduce(
        (acc, field) => ({
          ...acc,
          [field.name]:
            field.type === "checkbox" || field.type === "switch"
              ? false
              : field.type === "selectmulti"
              ? []
              : "",
        }),
        {}
      ),
    },
    validationSchema: createValidationSchema(),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this! Please verify before submit",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Submit it!",
      }).then((result) => {
        if (result.isConfirmed) {
          setSubmitLoading(true);
          const resposne = AuthRequest.UpdateStudent(values);

          if (resposne.status === 200) {
            setTimeout(() => {
              navigate("/listall-student");
            }, 2000);
          }
        }
      });
    },
  });

  const handleCheckboxChange = (e, field) => {
    if (e.currentTarget.checked) {
      formik.setFieldValue(field.name, formik.values[field.sameas]);
    } else {
      formik.setFieldValue(field.name, "");
    }
  };

  // Function to validate the form
  const validateFormFields = async () => {
    const currentFields = [...fieldDefinitions[active]];

    // Validate the form fields and get errors
    const errors = await formik.validateForm();

    // Set all current fields as touched
    formik.setTouched(
      currentFields.reduce(
        (acc, field) => ({
          ...acc,
          [field.name]: true,
        }),
        {}
      )
    );

    // If there are no validation errors, clear touched and errors states
    if (Object.keys(errors).length === 0) {
      formik.setTouched({});
      formik.setErrors({});
      return true; // Indicate that the form is valid
    } else {
      return false; // Indicate that the form is not valid
    }
  };

  // Function to fetch student data
  const fetchStudentData = async () => {
    const payload = {
      studentid: studentId,
    };

    try {
      // Await the asynchronous API call
      const response = await AuthRequest.Geteditstudent(payload);

      if (response.success) {
        if (response.data.fatherFirstName) {
          setIncludeFather(true);
        }
        if (response.data.motherFirstName) {
          setIncludeMother(true);
        }
        if (response.data.guardianFirstName) {
          setIncludeGuardian(true);
        }

        // Handle successful response
      
        setSearchloading(false);
        formik.setFieldValue("studentId", response.data.studentId);
        formik.setFieldValue("firstName", response.data.firstName);
        formik.setFieldValue("surname", response.data.surname);
        formik.setFieldValue("fullname", response.data.fullname);
        formik.setFieldValue("gender", response.data.gender);
        formik.setFieldValue("dateOfBirth", response.data.dateOfBirth);
        formik.setFieldValue("bloodGroup", response.data.bloodGroup);
        formik.setFieldValue("email", response.data.email);
        formik.setFieldValue("mobileNumber", response.data.mobileNumber);
        formik.setFieldValue("whatsappNumber", response.data.whatsappNumber);
        formik.setFieldValue("address", response.data.address);
        formik.setFieldValue("area", response.data.area);
        formik.setFieldValue("talukaCity", response.data.talukaCity);
        formik.setFieldValue("townVillage", response.data.townVillage);
        formik.setFieldValue("district", response.data.district);
        formik.setFieldValue("state", response.data.state);
        formik.setFieldValue("pincode", response.data.pincode);
        formik.setFieldValue("religion", response.data.religion);
        formik.setFieldValue("community", response.data.community);
        formik.setFieldValue("dept", response.data.dept);
        formik.setFieldValue("batch", response.data.batch);
        formik.setFieldValue("college", response.data.college);
        formik.setFieldValue("75sch", response.data.sevenFiveSCH);
        formik.setFieldValue("fg", response.data.fg);
        formik.setFieldValue("postMatric", response.data.postMatric);
        formik.setFieldValue("schoolType", response.data.schoolType);
        formik.setFieldValue("schoolName", response.data.schoolName);
        formik.setFieldValue("medium", response.data.medium);
        formik.setFieldValue("tenthMark", response.data.tenthMark);
        formik.setFieldValue(
          "tenthpassoutyear",
          response.data.tenthpassoutyear
        );
        formik.setFieldValue(
          "twelfthMarkPercent",
          response.data.twelfthMarkPercent
        );
        formik.setFieldValue(
          "twelethpassoutyear",
          response.data.twelethpassoutyear
        );
        formik.setFieldValue(
          "twelfthMathsMarkOutOf100",
          response.data.twelfthMathsMarkOutOf100
        );
        formik.setFieldValue(
          "twelfthPhysicsMarkOutOf100",
          response.data.twelfthPhysicsMarkOutOf100
        );
        formik.setFieldValue(
          "twelfthChemistryMarkOutOf100",
          response.data.twelfthChemistryMarkOutOf100
        );
        formik.setFieldValue(
          "twelfthBilologyMarkOutOf100",
          response.data.twelfthBilologyMarkOutOf100
        );
        formik.setFieldValue(
          "twelfthBotanyMarkOutOf100",
          response.data.twelfthBotanyMarkOutOf100
        );
        formik.setFieldValue(
          "twelfthZoologyMarkOutOf100",
          response.data.twelfthZoologyMarkOutOf100
        );
        formik.setFieldValue(
          "twelfthCompScienceMarkOutOf100",
          response.data.twelfthCompScienceMarkOutOf100
        );
        formik.setFieldValue("aadharNo", response.data.aadharNo);
        formik.setFieldValue("panCard", response.data.panCard);
        formik.setFieldValue("passportNumber", response.data.passportNumber);
        formik.setFieldValue("drivinglicense", response.data.drivinglicense);
        formik.setFieldValue("emisNo", response.data.emisNo);
        formik.setFieldValue("bankDetails", response.data.bankDetails);
        formik.setFieldValue("languagesKnown", response.data.languagesKnown);
        formik.setFieldValue(
          "foreignLanguagesKnown",
          response.data.foreignLanguagesKnown
        );
        formik.setFieldValue("registernumber", response.data.registernumber);
        formik.setFieldValue("internship", response.data.internship);
        formik.setFieldValue("placement", response.data.placement);
        formik.setFieldValue(
          "noplacemnetreason",
          response.data.noplacemnetreason
        );
        formik.setFieldValue("paidtraining", response.data.paidtraining);
        formik.setFieldValue("gvtjobtraining", response.data.gvtjobtraining);
        formik.setFieldValue(
          "interestedtraining",
          response.data.interestedtraining
        );
        formik.setFieldValue("hoursoftraining", response.data.hoursoftraining);
        formik.setFieldValue("expectedsalary", response.data.expectedsalary);
        formik.setFieldValue(
          "preferedlocation",
          response.data.preferedlocation
        );
        formik.setFieldValue("currentintern", response.data.currentintern);
        formik.setFieldValue("currenttraining", response.data.currenttraining);
        formik.setFieldValue("latestcgpa", response.data.latestcgpa);
        formik.setFieldValue(
          "noofstandingarrears",
          response.data.noofstandingarrears
        );
        formik.setFieldValue("parttimejob", response.data.parttimejob);
        formik.setFieldValue("primaryskills", response.data.primaryskills);
        formik.setFieldValue(
          "primaryskills_others",
          response.data.primaryskills_others
        );
        formik.setFieldValue("secondaryskills", response.data.secondaryskills);
        formik.setFieldValue(
          "secondaryskills_others",
          response.data.secondaryskills_others
        );
        formik.setFieldValue("foodPreference", response.data.foodPreference);
        formik.setFieldValue("hostelStudent", response.data.hostelStudent);
        formik.setFieldValue("visitorName", response.data.visitorName);
        formik.setFieldValue("visitorRelation", response.data.visitorRelation);
        formik.setFieldValue("visitorAadhar", response.data.visitorAadhar);
        formik.setFieldValue("visitorPAN", response.data.visitorPAN);
        formik.setFieldValue("visitorPhone", response.data.visitorPhone);
        formik.setFieldValue("visitorDOB", response.data.visitorDOB);
        formik.setFieldValue("visitorAddress", response.data.visitorAddress);

        formik.setFieldValue("fatherFirstName", response.data.fatherFirstName);
        formik.setFieldValue(
          "fatherDateOfBirth",
          response.data.fatherDateOfBirth
        );
        formik.setFieldValue("fatherEmail", response.data.fatherEmail);
        formik.setFieldValue(
          "fatherPrimaryMobileNo",
          response.data.fatherPrimaryMobileNo
        );
        formik.setFieldValue(
          "fatherSecondaryMobileNo",
          response.data.fatherSecondaryMobileNo
        );
        formik.setFieldValue(
          "fatherAddressLine1",
          response.data.fatherAddressLine1
        );
        formik.setFieldValue("fatherArea", response.data.fatherArea);
        formik.setFieldValue(
          "fatherTownVillage",
          response.data.fatherTownVillage
        );
        formik.setFieldValue("fatherPincode", response.data.fatherPincode);
        formik.setFieldValue(
          "fatherProfession",
          response.data.fatherProfession
        );
        formik.setFieldValue("fatherIncome", response.data.fatherIncome);
        formik.setFieldValue("motherFirstName", response.data.motherFirstName);
        formik.setFieldValue(
          "motherDateOfBirth",
          response.data.motherDateOfBirth
        );
        formik.setFieldValue("motherEmail", response.data.motherEmail);
        formik.setFieldValue(
          "motherPrimaryMobileNo",
          response.data.motherPrimaryMobileNo
        );
        formik.setFieldValue(
          "motherSecondaryMobileNo",
          response.data.motherSecondaryMobileNo
        );
        formik.setFieldValue(
          "motherAddressLine1",
          response.data.motherAddressLine1
        );
        formik.setFieldValue("motherArea", response.data.motherArea);
        formik.setFieldValue(
          "motherTownVillage",
          response.data.motherTownVillage
        );
        formik.setFieldValue("motherPincode", response.data.motherPincode);
        formik.setFieldValue(
          "motherProfession",
          response.data.motherProfession
        );
        formik.setFieldValue("motherIncome", response.data.motherIncome);
        formik.setFieldValue(
          "guardianFirstName",
          response.data.guardianFirstName
        );
        formik.setFieldValue("guardianGender", response.data.guardianGender);
        formik.setFieldValue(
          "guardianDateOfBirth",
          response.data.guardianDateOfBirth
        );
        formik.setFieldValue("guardianEmail", response.data.guardianEmail);
        formik.setFieldValue(
          "guardianPrimaryMobileNo",
          response.data.guardianPrimaryMobileNo
        );
        formik.setFieldValue(
          "guardianSecondaryMobileNo",
          response.data.guardianSecondaryMobileNo
        );
        formik.setFieldValue(
          "guardianAddressLine1",
          response.data.guardianAddressLine1
        );
        formik.setFieldValue("guardianArea", response.data.guardianArea);
        formik.setFieldValue(
          "guardianTownVillage",
          response.data.guardianTownVillage
        );
        formik.setFieldValue("guardianPincode", response.data.guardianPincode);
        formik.setFieldValue(
          "guardianRelationWithStudent",
          response.data.guardianRelationWithStudent
        );
        formik.setFieldValue(
          "guardianProfession",
          response.data.guardianProfession
        );
        formik.setFieldValue("guardianIncome", response.data.guardianIncome);

        setActive((prev) => 0);
      } else {
        // Handle non-200 response or errors
        setSearchloading(false);
        console.error("Error fetching student data", response);
      }
    } catch (error) {
      setSearchloading(false);
      console.error("Error during API call", error);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, [studentId]);
  // Main function to handle the search
  const handleSearch = async () => {
    // First, validate the form fields
    setSearchloading(true);
    const isValid = await validateFormFields();

    // If the form is valid, proceed to fetch the student data
    if (isValid) {
      await fetchStudentData();
    } else {
      setSearchloading(false);
    }
  };

  const handleNextStep = () => {
    const currentFields = [...fieldDefinitions[active]];

    if (active === 1) {
      if (includeFather) currentFields.push(...initialFatherValues);
      if (includeMother) currentFields.push(...initialMotherValues);
      if (includeGuardian) currentFields.push(...initialGuardianValues);
    }

    formik.validateForm().then((errors) => {
      // Set all current fields as touched
      console.log(errors);
      formik.setTouched(
        currentFields.reduce(
          (acc, field) => ({
            ...acc,
            [field.name]: true,
          }),
          {}
        )
      );

      if (Object.keys(errors).length === 0) {
        setActive((prev) => (prev < steps - 1 ? prev + 1 : prev));
        formik.setTouched({});
        formik.setErrors({});
      }
    });
  };

  const handlePreviousStep = () => {
    setActive((prev) => (prev > 0 ? prev - 1 : prev));
  };

  useEffect(() => {
    formik.setErrors({});
    formik.setTouched({});
  }, [includeFather, includeMother, includeGuardian, active]);

  const renderFields = () => {
    let fieldsToRender = fieldDefinitions[active];
    if (active === 1) {
      if (includeFather)
        fieldsToRender = [...fieldsToRender, ...initialFatherValues];
      if (includeMother)
        fieldsToRender = [...fieldsToRender, ...initialMotherValues];
      if (includeGuardian)
        fieldsToRender = [...fieldsToRender, ...initialGuardianValues];
    }

    return fieldsToRender.map((field) => (
      <Grid.Col span={6} key={field.name} style={{ padding: "20px" }}>
        {field.type === "text" ||
        field.type === "email" ||
        field.type === "date" ? (
          <div>
            <TextInput
              label={field.label}
              defaultValue={formik.values[field.name]}
              placeholder={field.placeholder}
              type={field.type}
              {...formik.getFieldProps(field.name)}
              error={formik.touched[field.name] && formik.errors[field.name]}
            />

            {field.populate && field.sameas && (
              <Checkbox
                label={`Same as ${field.sameaslable}`}
                className="sameas-checkbox"
                checked={
                  formik.values[field.name] === formik.values[field.sameas]
                }
                onChange={(e) => handleCheckboxChange(e, field)}
              />
            )}
          </div>
        ) : field.type === "textarea" ? (
          <div>
            <Textarea
              label={field.label}
              defaultValue={formik.values[field.name]}
              placeholder={field.placeholder}
              {...formik.getFieldProps(field.name)}
              error={formik.touched[field.name] && formik.errors[field.name]}
            />

            {field.populate && field.sameas && (
              <Checkbox
                label={`Same as ${field.sameaslable}`}
                className="sameas-checkbox"
                checked={
                  formik.values[field.name] === formik.values[field.sameas]
                }
                onChange={(e) => handleCheckboxChange(e, field)}
              />
            )}
          </div>
        ) : field.type === "number" ? (
          <TextInput
            label={field.label}
            placeholder={field.placeholder}
            type="number"
            {...formik.getFieldProps(field.name)}
            error={formik.touched[field.name] && formik.errors[field.name]}
          />
        ) : field.type === "phone" ? (
          <div className="phone-input-div">
            <label>{field.label}</label>
            <PhoneInput
              defaultCountry="IN"
              className="phone-input"
              placeholder={field.placeholder}
              value={formik.values[field.name]}
              onChange={(value) => formik.setFieldValue(field.name, value)}
            />
            {formik.touched[field.name] && formik.errors[field.name] && (
              <div style={{ color: "red", marginTop: "5px" }}>
                {formik.errors[field.name]}
              </div>
            )}
            {field.populate && field.sameas && (
              <Checkbox
                label={`Same as ${field.sameaslable}`}
                className="sameas-checkbox"
                checked={
                  formik.values[field.name] === formik.values[field.sameas]
                }
                onChange={(e) => handleCheckboxChange(e, field)}
              />
            )}
          </div>
        ) : field.type === "select" ? (
          <div>
            {" "}
            <Select
              label={field.label}
              placeholder={field.placeholder}
              defaultValue={formik.values[field.name]}
              data={field.options}
              {...formik.getFieldProps(field.name)}
              onChange={(value) => formik.setFieldValue(field.name, value)}
              error={formik.touched[field.name] && formik.errors[field.name]}
            />
            {field.populate && field.sameas && (
              <Checkbox
                label={`Same as ${field.sameaslable}`}
                className="sameas-checkbox"
                checked={
                  formik.values[field.name] === formik.values[field.sameas]
                }
                onChange={(e) => handleCheckboxChange(e, field)}
              />
            )}
          </div>
        ) : field.type === "selectmulti" ? (
          <MultiSelect
            label={field.label}
            placeholder={field.placeholder}
            data={field.options}
            defaultValue={formik.values[field.name]}
            onChange={(value) => {
              formik.setFieldValue(field.name, value);
            }}
            error={formik.touched[field.name] && formik.errors[field.name]}
          />
        ) : field.type === "otherinselect" ? (
          formik.values[field.depends]?.includes("Others") && (
            <TextInput
              label={field.label}
              defaultValue={formik.values[field.name]}
              placeholder={field.placeholder}
              type={field.type}
              {...formik.getFieldProps(field.name)}
              error={formik.touched[field.name] && formik.errors[field.name]}
            />
          )
        ) : field.type === "autocomplete" ? (
          <div>
            <Autocomplete
              label={field.label}
              placeholder={field.placeholder}
              data={field.options}
              defaultValue={formik.values[field.name]}
              {...formik.getFieldProps(field.name)}
              onChange={(value) => formik.setFieldValue(field.name, value)}
              error={formik.touched[field.name] && formik.errors[field.name]}
            />

            {field.populate && field.sameas && (
              <Checkbox
                label={`Same as ${field.sameaslable}`}
                checked={
                  formik.values[field.name] === formik.values[field.sameas]
                }
                className="sameas-checkbox"
                onChange={(e) => handleCheckboxChange(e, field)}
              />
            )}
          </div>
        ) : field.type === "switch" ? (
          <Switch
            label={field.label}
            checked={formik.values[field.name]}
            onChange={(e) =>
              formik.setFieldValue(field.name, e.currentTarget.checked)
            }
            error={formik.touched[field.name] && formik.errors[field.name]}
          />
        ) : field.type === "checkbox" ? (
          <Checkbox
            label={field.label}
            {...formik.getFieldProps(field.name)}
            checked={formik.values[field.name]}
            onChange={(e) =>
              formik.setFieldValue(field.name, e.currentTarget.checked)
            }
            error={formik.touched[field.name] && formik.errors[field.name]}
          />
        ) : field.type === "radio" ? (
          <Radio.Group
            label={field.label}
            {...formik.getFieldProps(field.name)}
            error={formik.touched[field.name] && formik.errors[field.name]}
            onChange={(value) => formik.setFieldValue(field.name, value)}
          >
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              {" "}
              {/* Apply flex to container */}
              {field.options.map((option) => (
                <Radio key={option} value={option} label={option} />
              ))}
            </div>
          </Radio.Group>
        ) : null}
      </Grid.Col>
    ));
  };
  const items = [
    { title: "Student-List", href: "/listall-student" },
    { title: "Edit-Student", href: "#" },
  ].map((item, index) => (
    <Anchor href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));
  const navigate = useNavigate();
  return (
    <>
      <Breadcrumbs style={{ width: "100%", marginTop: "10px" }}>
        {items}
        {studentId}
      </Breadcrumbs>
      <Button
        style={{ marginTop: "10px" }}
        onClick={() => navigate("/listall-student")}
      >
        Back to Student List
      </Button>
      <Container
        size="xl"
        style={{ width: "100%", marginTop: "50px", padding: "10px" }}
      >
        <Stepper active={active} breakpoint="sm" size="xs">
          {stepNames.map((name, index) => (
            <Stepper.Step key={index} label={name} />
          ))}
        </Stepper>

        {active === 1 && (
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{
              width: "100%",
              marginTop: "30px",
              marginBottom: "30px",
              background: "#e7d471",
            }}
          >
            <Group>
              <Checkbox
                label="Include Father's Details"
                checked={includeFather}
                onChange={(e) => setIncludeFather(e.currentTarget.checked)}
              />
              <Checkbox
                label="Include Mother's Details"
                checked={includeMother}
                onChange={(e) => setIncludeMother(e.currentTarget.checked)}
              />
              <Checkbox
                label="Include Guardian's Details"
                checked={includeGuardian}
                onChange={(e) => setIncludeGuardian(e.currentTarget.checked)}
              />
            </Group>
          </Card>
        )}

        <form onSubmit={formik.handleSubmit}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{ width: "100%", marginTop: "30px", padding: "10px" }}
          >
            <Grid>{renderFields()}</Grid>
          </Card>
          <Group position="right" mt="md">
          <Button
                  type="button"
                  onClick={handlePreviousStep}
                  disabled={active === 0}
                >
                  Previous
                </Button>
            {active < steps - 1 ? (
              <>
                
                {active === 1 &&
                !(includeFather || includeMother || includeGuardian) ? (
                  <Button
                    type="button"
                    disabled
                    // onClick={handleNextStep}
                  >
                    Next
                  </Button>
                ) : (
                  <Button type="button" onClick={handleNextStep}>
                    Next
                  </Button>
                )}
              </>
            ) : (
              <Button type="submit" loading={false}>
                Update
              </Button>
            )}
          </Group>
        </form>
      </Container>
    </>
  );
};

export default EditingStudent;
