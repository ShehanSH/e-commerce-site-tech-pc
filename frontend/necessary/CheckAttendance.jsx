import React from 'react'
import './CheckAttendance.css'
import Namebar from '../Components/Namebar'
import Navbar from '../Components/Navbar'

export default function CheckAttendance() {
  return (
    <div className='backgroundstreg'>

    <div className='addnamebar'>
        <Namebar/>
    </div>

    <div className='addnavbar'>
        <Navbar/>
    </div>

    <div class="checkAttendanceBack">

        <table>

        <tr>

        <td>
        <div class="form-section">
        <h2>Check Attendance</h2>

        <label for="student-id">Student ID:</label>
        <input type="text" id="student-id" name="student-id"/>



        <label for="grade">Grade:</label>
            <select id="grade" name="grade">
                <option value="6">Grade 6</option>
                <option value="7">Grade 7</option>
                <option value="8">Grade 8</option>
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
            </select>



        <label for="class">Class:</label>
        <select id="class" name="class">
            <option value="A">Class A</option>
            <option value="B">Class B</option>
            <option value="C">Class C</option>
        </select>

        <div class="button-container">
            <button type="submit">Check Attendance</button>
            <button type="reset">Reset</button>
        </div>

        </div> 

        </td>

        <td>
        <div className='displayAttendance'>
        <h2>Attendance Details</h2>

        <div className='table-container'>
            <table>
                <tr>
                    <td>shakthi</td>
                    <td>salsjlas</td>
                    <td>sdkjoigjn</td>
                    <td>kfgjksdjk</td>
                </tr>
            </table>
        </div> 
        {/* to generate a table */}




        </div>
        </td>

        </tr>
        </table>
        </div>

      

    </div>
  )
}
