import React from 'react'
import Namebar from '../Components/Namebar'
import Navbar from '../Components/Navbar'
import './AdminPanel.css'
import Status from '../Components/Status'
import { Link } from 'react-router-dom'


export default function AdminPanel() {
  return (
  <div className='container'>

      <div className='addnamebar'>
        <Namebar/>
      </div>

      <div className='addnavbar'>
        <Navbar/>
      </div>

      
      <div className='addstatusbar'>
        <Status/>
      </div>

      <div className='row'>

              <div className='addborder1'>
                  <div className="studentsection">
                    <h1 className="section-title">Student Section</h1>

                    <div className="stcredentials">
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <Link to ="/StudentRegistration">
                              <button type="button" className="registerstudent-button">
                                Student Registration
                              </button>
                              </Link>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <Link to ="/ViewStudents">
                              <button type="button" className="viewstudent-button">
                                View Students
                              </button>
                              </Link>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <Link to = "/UpdateStudentPage">
                              <button type="button" className="remandupstudent-button">
                                Update Student
                              </button>
                              </Link>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <Link to = "/DeleteStudent">
                              <button type="button" className="remandupstudent-button">
                                Remove Student
                              </button>
                              </Link>
                            </td>
                          </tr>

                        </tbody>
                      </table>
                    </div>
                  </div>
        </div>


        <div className='addborder2'>
                  <div className="studentsection">
                    <h1 className="section-title">Teacher Section</h1>

                    <div className="stcredentials">
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <Link to ="/TeacherRegistration">
                              <button type="button" className="registerteacher-button">
                                Teacher Registration
                              </button>
                              </Link>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <Link to = "/VIewTeachers">
                              <button type="button" className="viewteacher-button">
                                View Teachers
                              </button>
                              </Link>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <Link to = "/UpdateTeacher">
                              <button type="button" className="remandupteacher-button">
                                Update Teacher
                              </button>
                              </Link>
                            </td>
                          </tr>

                          <tr>
                            <td>
                              <Link to = "/DeleteTeacher">
                              <button type="button" className="remandupteacher-button">
                                Remove Teacher
                              </button>
                              </Link>
                            </td>
                          </tr>

                        </tbody>
                      </table>
                    </div>
                  </div>
        </div>
    </div>   
  </div>  

    

  )
}
