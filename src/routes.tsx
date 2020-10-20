import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import SubjectList from './pages/SubjectList';
import SubjectForm from './pages/SubjectForm';
import StudentForm from './pages/StudentForm';
import RegistrationList from './pages/RegistrationList';
import StudentList from './pages/StudentList';
import RegistrationForm from "./pages/RegistrationForm";

function Routes() {
  return(
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/subject" component={SubjectList} />
      <Route path="/student" component={StudentList} />
      <Route path="/registration" component={RegistrationList} />

      <Route path="/registrationForm" exact component={RegistrationForm} />
      <Route path="/registrationForm/:id" component={RegistrationForm} />
      <Route path="/studentForm" exact component={StudentForm} />
      <Route path="/studentForm/:id" component={StudentForm} />

      <Route path="/subjectForm" exact component={SubjectForm} />
      <Route path="/subjectForm/:id" component={SubjectForm} />
    </BrowserRouter>
  )
}

export default Routes;