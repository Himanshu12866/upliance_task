import { FormConfig } from '../types/formTypes';

const STORAGE_KEY = 'dynamic_forms';

export const getSavedForms = (): FormConfig[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveForm = (form: FormConfig) => {
  const forms = getSavedForms();
  const updated = [...forms.filter(f => f.id !== form.id), form];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const deleteForm = (id: string) => {
  const forms = getSavedForms().filter(f => f.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(forms));
};
