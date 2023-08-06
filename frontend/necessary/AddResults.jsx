import React, { useEffect, useState } from 'react';
import './AddResults.css';
import Navbar from '../Components/Navbar';
import Namebar from '../Components/Namebar';
import { useFormik } from 'formik';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddResults() {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudentName, setSelectedStudentName] = useState('');
  const [selectedStudentGrade, setSelectedStudentGrade] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/newteachers')
      .then((response) => response.json())
      .then((data) => setTeachers(data))
      .catch((error) => console.error('Error fetching teachers data:', error));

    fetch('http://localhost:3001/newstudents')
      .then((response) => response.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error('Error fetching students data:', error));
  }, []);

  const initialValues = {
    studentName: '',
    grade: '',
    paidClass: '',
    examNo: '',
    marks: '',
  };

  const validate = (values) => {
    const errors = {};

    if (!values.studentName) {
      errors.studentName = 'Student Name is required';
    }

    if (!values.grade) {
      errors.grade = 'Grade is required';
    }

    if (!values.paidClass) {
      errors.paidClass = 'Class Attend is required';
    }

    if (!values.examNo) {
      errors.examNo = 'Exam No is required';
    }

    if (!values.marks) {
      errors.marks = 'Marks is required';
    } else if (isNaN(values.marks) || values.marks < 0 || values.marks > 100) {
      errors.marks = 'Marks must be a number between 0 and 100';
    }

    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const resultData = {
      studentName: values.studentName,
      grade: selectedStudentGrade,
      paidClass: values.paidClass,
      examNo: values.examNo,
      marks: values.marks,
    };

    axios
      .post('http://localhost:3001/results-email', resultData)
      .then((response) => {
        console.log(response.data);
        setSubmitting(false);
        toast.success('Exam results added successfully!', {
          position: 'top-right',
          autoClose: 100,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        console.error('Error submitting exam results:', error);
        setSubmitting(false);
        toast.error('Error submitting exam results. Please try again.', {
          position: 'top-right',
          autoClose: 100,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const formik = useFormik({
    initialValues,
    validate,
    onSubmit: handleSubmit,
  });

  const handleFormReset = () => {
    formik.resetForm();
  };

  const handleStudentChange = (event) => {
    const selectedStudentName = event.target.value;
    // Find the student with the selected name from the list of students
    const selectedStudent = students.find((student) => student.studentname === selectedStudentName);
    // Set the selected student's name and grade in the state
    setSelectedStudentName(selectedStudentName);
    setSelectedStudentGrade(selectedStudent ? selectedStudent.grade : '');
    // Set the selected student's name in formik state
    formik.setFieldValue('studentName', selectedStudentName);
  };

  useEffect(() => {
    // Update the grade input field when the selected student's grade changes
    formik.setFieldValue('grade', selectedStudentGrade);
  }, [selectedStudentGrade]);

  return (
    <div className='backgroundstreg'>
      <div className='addnamebar'>
        <Namebar />
      </div>

      <div className='addnavbar'>
        <Navbar />
      </div>

      <div className='paymentformdiv'>
        <form id='result-form' className='result-form' onSubmit={formik.handleSubmit} onReset={handleFormReset}>
          <h2>Add Exam Results</h2>

          <div className='form-row'>
            <label htmlFor='student-name'>Student Name:</label>
            <select
              id='student-name'
              name='studentName'
              value={selectedStudentName} // Set the value to the selected student's name
              onChange={handleStudentChange} // Call the handleStudentChange function on change
            >
              <option value='' disabled>
                Select the Student Name
              </option>
              {students.map((student) => (
                <option key={student._id} value={student.studentname}>
                  {student.studentname}
                </option>
              ))}
            </select>
            {formik.touched.studentName && formik.errors.studentName && (
              <div className='error-message'>{formik.errors.studentName}</div>
            )}
          </div>

          <div className='form-row'>
            <label htmlFor='grade'>Grade:</label>
            <input
              type='text'
              id='grade'
              name='grade'
              value={selectedStudentGrade} // Set the value to the selected student's grade
              readOnly // Make it read-only to prevent user input
            />
          </div>

          <div className='form-row'>
            <label htmlFor='paidclass'>Class Attend:</label>
            <select
              id='paidclass'
              name='paidClass'
              value={formik.values.paidClass}
              onChange={formik.handleChange}
            >
              <option value='' disabled>
                Select the class
              </option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={`${teacher.teachersubject} - ${teacher.teacherfirstname} ${teacher.teacherlastname}`}>
                  {`${teacher.teachersubject} - ${teacher.teacherfirstname} ${teacher.teacherlastname}`}
                </option>
              ))}
            </select>
            {formik.touched.paidClass && formik.errors.paidClass && (
              <div className='error-message'>{formik.errors.paidClass}</div>
            )}
          </div>

          <div className='form-row'>
            <label htmlFor='exam-no'>Exam No:</label>
            <input
              type='number'
              id='exam-no'
              name='examNo'
              value={formik.values.examNo}
              onChange={formik.handleChange}
            />
            {formik.touched.examNo && formik.errors.examNo && (
              <div className='error-message'>{formik.errors.examNo}</div>
            )}
          </div>

          <div className='form-row'>
            <label htmlFor='marks'>Marks:</label>
            <input
              type='number'
              id='marks'
              name='marks'
              value={formik.values.marks}
              onChange={formik.handleChange}
            />
            {formik.touched.marks && formik.errors.marks && (
              <div className='error-message'>{formik.errors.marks}</div>
            )}
          </div>

          <div className='button-container'>
            <button type='submit' disabled={formik.isSubmitting}>
              Add Marks
            </button>
            <button type='reset'>Reset</button>
          </div>
        </form>

        <ToastContainer
          position='top-right'
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
}
