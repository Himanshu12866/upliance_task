import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
  Paper,
  Stack,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { FormField, FieldType, FormConfig } from "../types/formTypes";
import { saveForm } from "../utility/localStorage";

const fieldTypes: FieldType[] = [
  "text",
  "number",
  "select",
  "checkbox",
  "date",
];

const FormBuilder: React.FC = () => {
  const [fields, setFields] = useState<FormField[]>([]);
  const [formName, setFormName] = useState<string>("");
  const [newField, setNewField] = useState<Partial<FormField>>({
    type: "text",
    required: false,
  });

  const handleAddField = () => {
    if (!newField.label || !newField.type) return;

    const field: FormField = {
      id: uuidv4(),
      label: newField.label,
      type: newField.type,
      required: newField.required ?? false,
      options: newField.type === "select" ? newField.options ?? [] : undefined,
    };

    setFields([...fields, field]);
    setNewField({ type: "text", required: false }); // Reset
  };

  const handleSaveForm = () => {
    if (!formName) {
      alert("Please enter a form name!");
      return;
    }
    if (fields.length === 0) {
      alert("Please add at least one field!");
      return;
    }

    const formConfig: FormConfig = {
      id: uuidv4(),
      name: formName,
      fields,
    };

    saveForm(formConfig);
    alert("✅ Form saved to localStorage");

    // Reset
    setFormName("");
    setFields([]);
  };
  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Create New Form
      </Typography>
      <TextField
        label="Form Name"
        fullWidth
        value={formName}
        onChange={(e) => setFormName(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Box display="flex" gap={2} flexWrap="wrap" mb={2}>
        <TextField
          label="Label"
          value={newField.label || ""}
          onChange={(e) => setNewField({ ...newField, label: e.target.value })}
        />
        <TextField
          select
          label="Type"
          value={newField.type || "text"}
          onChange={(e) =>
            setNewField({ ...newField, type: e.target.value as FieldType })
          }
        >
          {fieldTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </TextField>
        {newField.type === "select" && (
          <TextField
            label="Options (comma separated)"
            value={newField.options?.join(",") || ""}
            onChange={(e) =>
              setNewField({ ...newField, options: e.target.value.split(",") })
            }
          />
        )}
        <FormControlLabel
          control={
            <Checkbox
              checked={newField.required || false}
              onChange={(e) =>
                setNewField({ ...newField, required: e.target.checked })
              }
            />
          }
          label="Required"
        />
        <Button variant="outlined" onClick={handleAddField}>
          + Add Field
        </Button>
      </Box>

      <Stack spacing={2} mb={2}>
        {fields.map((field, i) => (
          <Paper key={field.id} sx={{ p: 2 }}>
            <Typography>
              {i + 1}. {field.label} ({field.type}) {field.required ? "*" : ""}
            </Typography>
          </Paper>
        ))}
      </Stack>

      <Button variant="contained" color="primary" onClick={handleSaveForm}>
        💾 Save Form
      </Button>
    </Paper>
  );
};

export default FormBuilder;
