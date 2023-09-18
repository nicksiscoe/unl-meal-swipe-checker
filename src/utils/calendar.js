const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const differenceInDays = (d1, d2) => {
  if (!d1 || !d2) {
    return undefined;
  }

  var t2 = d2.getTime();
  var t1 = d1.getTime();

  return parseInt((t2 - t1) / (24 * 3600 * 1000));
}

const differenceInWeeks = (d1, d2) => {
  if (!d1 || !d2) {
    return undefined;
  }

  var t2 = d2.getTime();
  var t1 = d1.getTime();

  return parseInt((t2 - t1) / (24 * 3600 * 1000 * 7));
}

const parseYYYYMMDD = (input) => {
  if (!input) {
    return undefined;
  }

  let parts = input.split('-');

  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1] - 1, parts[2]); // Note: months are 0-based
}

module.exports = {
  daysOfWeek,
  months,
  differenceInDays,
  differenceInWeeks,
  parseYYYYMMDD
}