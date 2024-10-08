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
          .required(`${field.label} is required`);
      }
    } else if (field.type === "otherinselect") {
      if (!field.optional) {
        shape[field.name] = yup.string().when(field.depends, {
          is: (value) => value?.includes("Others"),  // Check if the dependent field includes "Other"
          then: yup.string().required(`${field.label} is required`),  // Make the field required if "Other" is selected
          otherwise: yup.string(),  // No specific validation if "Other" is not selected
        });
      }
    } else {
      if (!field.optional) {
        shape[field.name] = yup.string().required(`${field.label} is required`);
      } else {
        shape[field.name] = yup.string();
      }
    }
  });
  return yup.object().shape(shape);
};

const MultiStepForm = () => {
  const [active, setActive] = useState(0);
  const steps = fieldDefinitions.length;
  const [includeFather, setIncludeFather] = useState(false);
  const [includeMother, setIncludeMother] = useState(false);
  const [includeGuardian, setIncludeGuardian] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [searchloading, setSearchloading] = useState(false);

  // Function to dynamically create the validation schema based on the step and selections
  const createValidationSchema = () => {
    let fieldsToValidate = [...fieldDefinitions[active]];
    if (active === 2) {
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
          const resposne = AuthRequest.AddStudent(values);

          if (resposne.status === 200) {
            setTimeout(() => {
              window.location.reload();
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
      studentid: formik.values["studentId"],
    };

    try {
      // Await the asynchronous API call
      const response = await AuthRequest.Getstudent(payload);

      if (response.status === 200) {
        // Handle successful response
        setSearchloading(false);
        formik.setFieldValue("firstName", response.data.firstName);
        formik.setFieldValue("surname", response.data.surname);
        formik.setFieldValue("gender", response.data.gender);
        formik.setFieldValue("dept", response.data.dept);
        formik.setFieldValue("batch", response.data.batch);
        formik.setFieldValue("college", response.data.college);

        setActive((prev) => (prev < steps - 1 ? prev + 1 : prev));
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

    if (active === 2) {
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
    if (active === 2) {
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

  return (
    <Container
      size="xl"
      style={{ width: "100%", marginTop: "50px", padding: "10px" }}
    >
      <Stepper active={active} breakpoint="sm" size="xs">
        {stepNames.map((name, index) => (
          <Stepper.Step key={index} label={name} />
        ))}
      </Stepper>

      {active === 2 && (
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
              {active === 2 &&
              !(includeFather || includeMother || includeGuardian) ? (
                <Button
                  type="button"
                  disabled
                  // onClick={handleNextStep}
                >
                  Next
                </Button>
              ) : active === 0 ? (
                <Button
                  type="button"
                  loading={searchloading}
                  onClick={handleSearch}
                >
                  Search
                </Button>
              ) : (
                <Button type="button" onClick={handleNextStep}>
                  Next
                </Button>
              )}
            </>
          ) : (
            <Button type="submit" loading={false}>
              Submit
            </Button>
          )}
        </Group>
      </form>
    </Container>
  );
};

export default MultiStepForm;
