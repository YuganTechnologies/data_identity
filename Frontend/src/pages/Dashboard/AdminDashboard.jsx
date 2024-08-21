// src/components/MultiStepForm.jsx
import React, { useState, useEffect } from 'react';
import { Container, Button, Stepper, TextInput, Select, Textarea, Group, Checkbox, Radio, RadioGroup, Switch, Autocomplete, Grid, Card } from '@mantine/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { fieldDefinitions, stepNames, initialFatherValues, initialMotherValues, initialGuardianValues } from './fieldDefinitions';

import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'
import './style.css'; // Ensure this import matches the path to your CSS file
import AuthRequest from '../../APIRequest/AuthRequest';

// Function to generate Yup validation schema based on fields
const generateValidationSchema = (fields) => {
  const shape = {};
  fields.forEach((field) => {
    if (field.type === 'radio' || field.type === 'checkbox' || field.type === 'switch') {
      if (!field.optional) {
        shape[field.name] = yup.string().required(`${field.label} is required`);
      }
    } else if (field.type === 'phone') {
      shape[field.name] = yup.string()
        .required(`${field.label} is required`)
        .test(
          'is-valid-phone',
          'Invalid phone number',
          (value) => value && isValidPhoneNumber(value)
        );
    }
    else if (field.type === 'number') {
      if (!field.optional) {
        shape[field.name] = yup.number()
          .required(`${field.label} is required`)
          .typeError(`${field.label} must be a number`);
      } else {
        shape[field.name] = yup.number().typeError(`${field.label} must be a number`);
      }
    } else if (field.type === 'email') {
      shape[field.name] = yup.string()
        .email('Invalid email address')
        .required(`${field.label} is required`);
    } else if (field.type === 'text' && field.name === 'phoneNumber') {
      shape[field.name] = yup.string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
        .required(`${field.label} is required`);
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

  // Function to dynamically create the validation schema based on the step and selections
  const createValidationSchema = () => {
    let fieldsToValidate = [...fieldDefinitions[active]];
    if (active === 1) {
      if (includeFather) fieldsToValidate = [...fieldsToValidate, ...initialFatherValues];
      if (includeMother) fieldsToValidate = [...fieldsToValidate, ...initialMotherValues];
      if (includeGuardian) fieldsToValidate = [...fieldsToValidate, ...initialGuardianValues];
    }
    return generateValidationSchema(fieldsToValidate);
  };

  const formik = useFormik({
    initialValues: {
      ...fieldDefinitions.flat().reduce((acc, field) => ({
        ...acc,
        [field.name]: field.type === 'checkbox' || field.type === 'switch' ? false : ''
      }), {}),
    },
    validationSchema: createValidationSchema(),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {

      const resposne = AuthRequest.AddStudent(values)

      console.log('resosnse.status', resposne)
      if (resposne.status === 200) {
        // window.location.reload();
      }

    },
  });

  const handleNextStep = () => {
    const currentFields = [...fieldDefinitions[active]];

    if (active === 1) {
      if (includeFather) currentFields.push(...initialFatherValues);
      if (includeMother) currentFields.push(...initialMotherValues);
      if (includeGuardian) currentFields.push(...initialGuardianValues);
    }

    formik.validateForm().then((errors) => {
      // Set all current fields as touched
      formik.setTouched(
        currentFields.reduce((acc, field) => ({
          ...acc,
          [field.name]: true,
        }), {})
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
      if (includeFather) fieldsToRender = [...fieldsToRender, ...initialFatherValues];
      if (includeMother) fieldsToRender = [...fieldsToRender, ...initialMotherValues];
      if (includeGuardian) fieldsToRender = [...fieldsToRender, ...initialGuardianValues];
    }

    return fieldsToRender.map((field) => (
      <Grid.Col span={6} key={field.name} style={{ padding: '20px' }}>
        {field.type === 'text' || field.type === 'email' || field.type === 'date' ? (
          <TextInput
            label={field.label}
            placeholder={field.placeholder}
            type={field.type}
            {...formik.getFieldProps(field.name)}
            error={formik.touched[field.name] && formik.errors[field.name]}
          />
        ) : field.type === 'textarea' ? (
          <Textarea
            label={field.label}
            placeholder={field.placeholder}
            {...formik.getFieldProps(field.name)}
            error={formik.touched[field.name] && formik.errors[field.name]}
          />
        ) : field.type === 'number' ? (
          <TextInput
            label={field.label}
            placeholder={field.placeholder}
            type="number"
            {...formik.getFieldProps(field.name)}
            error={formik.touched[field.name] && formik.errors[field.name]}
          />

        ) : field.type === 'phone' ? (
          <div className='phone-input-div'>
            <label>{field.label}</label>
            <PhoneInput
              defaultCountry='IN'
              className="phone-input"
              placeholder={field.placeholder}
              value={formik.values[field.name]}
              onChange={(value) => formik.setFieldValue(field.name, value)}
            />
            {formik.touched[field.name] && formik.errors[field.name] && (
              <div style={{ color: 'red', marginTop: '5px' }}>{formik.errors[field.name]}</div>
            )}
          </div>


        ) : field.type === 'select' ? (
          <Select
            label={field.label}
            placeholder={field.placeholder}
            data={field.options}
            {...formik.getFieldProps(field.name)}
            onChange={(value) => formik.setFieldValue(field.name, value)}
            error={formik.touched[field.name] && formik.errors[field.name]}
          />
        ) : field.type === 'autocomplete' ? (
          <Autocomplete
            label={field.label}
            placeholder={field.placeholder}
            data={field.options}
            {...formik.getFieldProps(field.name)}
            onChange={(value) => formik.setFieldValue(field.name, value)}
            error={formik.touched[field.name] && formik.errors[field.name]}
          />
        ) : field.type === 'switch' ? (
          <Switch
            label={field.label}
            checked={formik.values[field.name]}
            onChange={(e) => formik.setFieldValue(field.name, e.currentTarget.checked)}
            error={formik.touched[field.name] && formik.errors[field.name]}
          />
        ) : field.type === 'checkbox' ? (
          <Checkbox
            label={field.label}
            {...formik.getFieldProps(field.name)}
            checked={formik.values[field.name]}
            onChange={(e) => formik.setFieldValue(field.name, e.currentTarget.checked)}
            error={formik.touched[field.name] && formik.errors[field.name]}
          />
        ) : field.type === 'radio' ? (
          <RadioGroup
            label={field.label}
            {...formik.getFieldProps(field.name)}
            error={formik.touched[field.name] && formik.errors[field.name]}
          >
            {field.options.map((option) => (
              <Radio key={option} value={option} label={option} />
            ))}
          </RadioGroup>
        ) : null}
      </Grid.Col>
    ));
  };

  return (
    <Container size="xl" style={{ width: '100%', marginTop: '50px', padding: '10px' }}>
      <Stepper active={active} breakpoint="sm">
        {stepNames.map((name, index) => (
          <Stepper.Step key={index} label={name} />
        ))}
      </Stepper>

      {active === 1 && (
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: '100%', marginTop: '30px', marginBottom: '30px', background: '#e7d471' }}>
          <Group >
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
        <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: '100%', marginTop: '30px', padding: '10px' }}>
          <Grid>
            {renderFields()}
          </Grid>
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
              {active === 1 && !(

                includeFather ||
                includeMother ||
                includeGuardian

              ) ? <Button
                type="button"
                disabled
              // onClick={handleNextStep}
              >
                Next
              </Button> :
                (
                  <Button
                    type="button"
                    onClick={handleNextStep}
                  >
                    Next
                  </Button>
                )}
            </>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </Group>
      </form>
    </Container>
  );
};

export default MultiStepForm;
