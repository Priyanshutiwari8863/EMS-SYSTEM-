exports.countLeaveDays = (from, to) => {
  const start = new Date(from);
  const end = new Date(to);

  let count = 0;

  while (start <= end) {
    count++;
    start.setDate(start.getDate() + 1);
  }

  return count;
};
