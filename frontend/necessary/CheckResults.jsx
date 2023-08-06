import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CheckResults() {
  const [results, setResults] = useState([]);
  const [filters, setFilters] = useState({
    studentName: '',
    grade: '',
    paidClass: '',
    examNo: '',
    marks: '',
  });

  useEffect(() => {
    // Fetch all results from the API endpoint
    axios.get('http://localhost:3001/results')
      .then((response) => setResults(response.data))
      .catch((error) => console.error('Error fetching results:', error));
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredResults = results.filter((result) => {
    return (
      result.studentName.toLowerCase().includes(filters.studentName.toLowerCase()) &&
      result.grade.toLowerCase().includes(filters.grade.toLowerCase()) &&
      result.paidClass.toLowerCase().includes(filters.paidClass.toLowerCase()) &&
      result.examNo.toString().includes(filters.examNo) &&
      result.marks.toString().includes(filters.marks)
    );
  });

  // Function to render the table rows
  const renderRows = () => {
    return filteredResults.map((result) => (
      <tr key={result._id}>
        <td>{result.studentName}</td>
        <td>{result.grade}</td>
        <td>{result.paidClass}</td>
        <td>{result.examNo}</td>
        <td>{result.marks}</td>
      </tr>
    ));
  };

  return (
    <div>
      <h2>Exam Results</h2>
      
      <table>
        <thead>
          <tr>
            <th>Student Name
              <div>
                <input
                  type="text"
                  name="studentName"
                  value={filters.studentName}
                  onChange={handleFilterChange}
                  placeholder="Search by Student Name"
                />
              </div>
            </th>

            <th>Grade
              <div>
                <input
                  type="text"
                  name="grade"
                  value={filters.grade}
                  onChange={handleFilterChange}
                  placeholder="Search by Grade"
                />
              </div>
            </th>

            <th>Paid Class
              <div>
                <input
                  type="text"
                  name="paidClass"
                  value={filters.paidClass}
                  onChange={handleFilterChange}
                  placeholder="Search by Paid Class"
                />
              </div>
            </th>

            <th>Exam No
              <div>
                <input
                  type="text"
                  name="examNo"
                  value={filters.examNo}
                  onChange={handleFilterChange}
                  placeholder="Search by Exam No"
                />
              </div>
            </th>

            <th>Marks
              <div>
                <input
                  type="text"
                  name="marks"
                  value={filters.marks}
                  onChange={handleFilterChange}
                  placeholder="Search by Marks"
                />
              </div>
            </th>

          </tr>
        </thead>
        <tbody>
          {renderRows()}
        </tbody>
      </table>
    </div>
  );
}
