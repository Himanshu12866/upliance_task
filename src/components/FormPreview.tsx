import React from 'react';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Typography,
  Box,
  Paper,
  Stack,
} from '@mui/material';
import { FormConfig } from '../types/formTypes';

interface FormPreviewProps {
  form: FormConfig;
}

const FormPreview: React.FC<FormPreviewProps> = ({ form }) => {
  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      <Typography variant="h5" gutterBottom>{form.name} (Preview Mode)</Typography>
      <Stack spacing={3}>
        {form.fields.map((field) => (
          <Box key={field.id}>
            {field.type === 'text' && (
              <TextField
                label={field.label}
                required={field.required}
                fullWidth
              />
            )}
            {field.type === 'number' && (
              <TextField
                label={field.label}
                required={field.required}
                fullWidth
                type="number"
              />
            )}
            {field.type === 'date' && (
              <TextField
                label={field.label}
                required={field.required}
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            )}
            {field.type === 'checkbox' && (
              <FormControlLabel
                control={<Checkbox />}
                label={field.label}
              />
            )}
            {field.type === 'select' && (
              <TextField
                select
                label={field.label}
                required={field.required}
                fullWidth
              >
                {field.options?.map((opt, idx) => (
                  <MenuItem key={idx} value={opt}>{opt}</MenuItem>
                ))}
              </TextField>
            )}
          </Box>
        ))}
      </Stack>
    </Paper>
  );
};

export default FormPreview;
