import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import FaqMain from './faqBoard/faqMain';
import Write from './faqBoard/faqDetails/Write';
import Update from './faqBoard/faqDetails/Update';
import ShowOne from './faqBoard/faqDetails/ShowOne';
import ShowList from './faqBoard/faqDetails/ShowList';
import Delete from './faqBoard/faqDetails/Delete';

function App() {
  return (
      <Router>
        <Routes>
          <Route exact path="/faqBoard/faqMain" element={<FaqMain/>} />
            <Route path="/" element={<Navigate to="/faqBoard/faqMain" replace /> } />

          <Route path="/faqBoard/faqDetails/ShowList/:pageNo" element={<ShowList/>} />

            <Route path="/faqBoard/faqDetails/Write" element={<Write/>} />
            <Route path="/faqBoard/faqDetails/Update/:id" element={<Update/>} />
            <Route path="/faqBoard/faqDetails/ShowOne/:id" element={<ShowOne/>} />
          <Route path="/faqBoard/faqDetails/Delete/:id" element={<Delete/>} />
        </Routes>
      </Router>
  );
}

export default App;
