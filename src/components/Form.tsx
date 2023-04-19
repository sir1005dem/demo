"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Stack,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  TextField
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';

const API_GATEWAY_URL = 'https://4brve5hkh9.execute-api.us-east-1.amazonaws.com/stage6/resource';

function getDataFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", err => reject(err));
    reader.readAsDataURL(file);
  });
}


const Form = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      let fileData;
      if (data.file.length > 0) {
        fileData = await getDataFromFile(data.file[0]);
      }
      const response = await fetch(API_GATEWAY_URL, {
        method: 'POST',
        body: JSON.stringify({ ...data, file: fileData }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = await response.json();
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      py={2}
      px={3}
      gap={2}
    >
      <TextField
        label="Title"
        name="title"
        {...register('title')}
        fullWidth
      />

      <TextField
        label="Description"
        name="description"
        {...register('description')}
        fullWidth
        multiline
        rows={4}
      />

      <DatePicker
        label="Date"
        name="date"
        {...register('date')}
        fullWidth
      />

      <TextField
        label="File"
        name="file"
        type="file"
        {...register('file')}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />

      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </Stack>
  );
};

export default Form;
