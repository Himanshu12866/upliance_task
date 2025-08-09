import React, { useState, useEffect } from 'react';
import { getSavedForms, deleteForm } from '../utility/localStorage';
import { FormConfig } from '../types/formTypes';
import {
  Paper,
  Typography,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import FormPreview from './FormPreview';

const SavedForms: React.FC = () => {
  const [savedForms, setSavedForms] = useState<FormConfig[]>([]);
  const [selectedForm, setSelectedForm] = useState<FormConfig | null>(null);

  useEffect(() => {
    setSavedForms(getSavedForms());
  }, []);

  const handleDelete = (id: string) => {
    deleteForm(id);
    setSavedForms(getSavedForms());
    if (selectedForm?.id === id) setSelectedForm(null);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      <Typography variant="h5" gutterBottom>📁 Saved Forms</Typography>

      <Stack spacing={2} divider={<Divider />}>
        {savedForms.length === 0 ? (
          <Typography color="text.secondary">No forms saved yet.</Typography>
        ) : (
          savedForms.map((form) => (
            <Stack key={form.id} direction="row" justifyContent="space-between" alignItems="center">
              <Typography>{form.name}</Typography>
              <Stack direction="row" spacing={1}>
                <Button size="small" variant="outlined" onClick={() => setSelectedForm(form)}>Preview</Button>
                <Button size="small" color="error" variant="outlined" onClick={() => handleDelete(form.id)}>Delete</Button>
              </Stack>
            </Stack>
          ))
        )}
      </Stack>

      {selectedForm && <FormPreview form={selectedForm} />}
    </Paper>
  );
};

export default SavedForms;
