exports.calculateSalary = ({
  monthlySalary,
  present,
  holidays,
  totalDays,
}) => {
  const workingDays = totalDays - holidays;

  const absent = Math.max(workingDays - present, 0);

  const perDaySalary = monthlySalary / workingDays;

  const deduction = absent * perDaySalary;

  const netSalary = monthlySalary - deduction;

  return {
    workingDays,
    absent,
    perDaySalary: Math.round(perDaySalary),
    deduction: Math.round(deduction),
    netSalary: Math.round(netSalary),
  };
};
