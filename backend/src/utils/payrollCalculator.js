module.exports.calculatePayroll = ({
  monthlySalary,
  workingDays,
  presentDays,
  halfDays = 0 // ⭐ NEW
}) => {
  const allowedLeave = 3;

  // ⭐ effective present days including half days
  const effectivePresentDays =
    presentDays + halfDays * 0.5;

  // total absent days
  const absentDays = Math.max(
    0,
    workingDays - effectivePresentDays
  );

  // per day salary
  const perDaySalary = monthlySalary / workingDays;

  // extra unpaid leaves
  const extraLeaves = Math.max(
    0,
    absentDays - allowedLeave
  );

  // deduction only on extra leaves
  const deduction = extraLeaves * perDaySalary;

  // final salary
  const finalSalary = Math.round(
    monthlySalary - deduction
  );

  return {
    perDaySalary: Math.round(perDaySalary),

    presentDays,
    halfDays,                 // ⭐ NEW
    effectivePresentDays,     // ⭐ NEW

    absentDays,
    paidLeaves: allowedLeave,
    extraLeaves,
    deduction: Math.round(deduction),
    finalSalary
  };
};
