import React, { useState } from 'react';
import { Container, Tab, Tabs } from '@mui/material';
import FormBuilder from './components/FormBuilder';
import SavedForms from './components/SavedForms';

const App: React.FC = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Tabs value={tabIndex} onChange={(_, newIndex) => setTabIndex(newIndex)} centered>
        <Tab label="🛠 Build Form" />
        <Tab label="📁 Saved Forms" />
      </Tabs>

      {tabIndex === 0 && <FormBuilder />}
      {tabIndex === 1 && <SavedForms />}
    </Container>
  );
};

export default App;
