export default function PayrollTable({ payrolls }) {
  return (
    <table
      border="1"
      cellPadding="10"
      width="100%"
      style={{ marginTop: "15px" }}
    >
      <thead>
        <tr>
          <th>Month</th>
          <th>Employee</th>
          <th>Department</th>
          <th>Position</th>
          <th>Working Days</th>
          <th>Present</th>
          <th>Absent</th>
          <th>Final Salary</th>
        </tr>
      </thead>

      <tbody>
        {payrolls.map((p) => (
          <tr key={p._id}>
            <td>{p.month}</td>
            <td>{p.employee?.name}</td>
            <td>{p.employee?.department}</td>
            <td>{p.employee?.position}</td>
            <td>{p.workingDays}</td>
            <td>{p.presentDays}</td>
            <td>{p.absentDays}</td>
            <td>₹ {p.finalSalary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
