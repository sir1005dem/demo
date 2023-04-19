"use client";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Form from "../components/Form";

export default function Home() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Form />
    </LocalizationProvider>
  );
}
