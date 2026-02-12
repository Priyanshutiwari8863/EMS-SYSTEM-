exports.getAllDatesOfMonth = (month) => {
  const [year, m] = month.split("-");
  const days = new Date(year, m, 0).getDate();

  const dates = [];

  for (let d = 1; d <= days; d++) {
    const date = new Date(year, m - 1, d);
    dates.push(date);
  }

  return dates;
};

exports.isWeekend = (date) => {
  const day = date.getDay();
  return day === 0 || day === 6;
};
