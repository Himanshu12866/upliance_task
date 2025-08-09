export type FieldType = 'text' | 'number' | 'select' | 'checkbox' | 'date';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  required: boolean;
  options?: string[]; // only for select
  validation?: {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  };
}

export interface FormConfig {
  id: string;
  name: string;
  fields: FormField[];
}
