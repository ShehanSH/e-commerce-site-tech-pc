import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function CheckPayments() {
  const [payments, setPayments] = useState([]);
  const [filters, setFilters] = useState({
    studentId: '',
    studentName: '',
    grade: '',
    month: '',
    paidClass: '',
    classFees: '',
  });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = () => {
    axios
      .get('http://localhost:3001/payments')
      .then((response) => {
        setPayments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching payments:', error);
      });
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({ ...filters, [name]: value });
  };

  const filteredPayments = payments.filter((payment) => {
    return (
      payment.studentId.includes(filters.studentId) &&
      payment.studentName.includes(filters.studentName) &&
      payment.grade.includes(filters.grade) &&
      payment.month.includes(filters.month) &&
      payment.paidClass.includes(filters.paidClass) &&
      (filters.classFees === '' || parseFloat(payment.classFees) === parseFloat(filters.classFees))
    );
  });

  return (
    <div>
      <h2>Class Payments Details</h2>

      <table>
        <thead>
          <tr>
            <th>Student ID
              <div>
                <input
                  type="text"
                  name="studentId"
                  value={filters.studentId}
                  onChange={handleFilterChange}
                  placeholder='Enter Student ID'
                />
              </div>
            </th>

            <th>Student Name

              <div>
                <input
                  type="text"
                  name="studentName"
                  value={filters.studentName}
                  onChange={handleFilterChange}
                  placeholder='Enter Student Name'
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
                  placeholder='Enter the Grade'
                />
              </div>
            </th>


            <th>Month
              <div>
                <input
                  type="text"
                  name="month"
                  value={filters.month}
                  onChange={handleFilterChange}
                  placeholder='Enter the Month'
                />
              </div>
            </th>

            <th>Date</th> {/* Add a new column for the date */}

            <th>Paid Class 
            <div>
              <input
                type="text"
                name="paidClass"
                value={filters.paidClass}
                onChange={handleFilterChange}
                placeholder='Search by Class'
              />
            </div>
            </th>


            <th>Class Fees
              <div>
                <input
                  type="text"
                  name="classFees"
                  value={filters.classFees}
                  onChange={handleFilterChange}
                  placeholder='Search by fee'
                />
              </div>
            </th>

            

          </tr>
        </thead>
        <tbody>
          {filteredPayments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.studentId}</td>
              <td>{payment.studentName}</td>
              <td>{payment.grade}</td>
              <td>{payment.month}</td>
              <td>{new Date(payment.date).toLocaleDateString()}</td> {/* Display the date in a human-readable format */}
              <td>{payment.paidClass}</td>
              <td>{payment.classFees}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}