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

const API_GATEWAY_URL = 'https://4brve5hkh9.execute-api.us-east-1.amazonaws.com/stage6/resource';

// @ts-ignore
function getDataFromFile(file: File): Promise<string> {
  return new Promise<string> ((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("load", () => resolve(reader.result as string));
    reader.addEventListener("error", err => reject(err));
		// @ts-ignore
    reader.readAsDataURL(file);
  });
}

const Form = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: FormData) => {
    try {
      let fileData: string | undefined;
			// @ts-ignore
			const file = data.file[0] as File;

			if (file) {
				fileData = await getDataFromFile(file);
			}
			const response = await fetch(API_GATEWAY_URL, {
				method: 'POST',
				// @ts-ignore
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
			// @ts-ignore
      onSubmit={handleSubmit(onSubmit)}
      py={2}
      px={3}
      gap={2}
    >
      <TextField
        label="Title"
        {...register('title')}
        fullWidth
      />

      <TextField
        label="Description"
        {...register('description')}
        fullWidth
        multiline
        rows={4}
      />

			<TextField
        label="Date"
        type="date"
        {...register('date')}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />

      <TextField
        label="File"
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
