import React, { useState, useEffect } from "react";

function useFormValidation(initialState, validate, authenticate) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        authenticate();
        setSubmitting(false);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors]);

  const handleChange = event => {
    event.persist();
    setValues(prevValues => ({
      ...prevValues,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    const validataionErrors = validate(values);
    setErrors(validataionErrors);
    setSubmitting(true);
  };

  const handleBlur = () => {
    const validataionErrors = validate(values);
    setErrors(validataionErrors);
  };

  return {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    isSubmitting
  };
}

export default useFormValidation;
