const DateSuffix = (date) => {
  let dateStr = date.toString();

  const lastNum = dateStr.charAt(dateStr.length - 1);

  if (lastNum === '1' && dateStr !== '11') {
    dateStr = `${dateStr}st`;
  } else if (lastNum === '2' && dateStr !== '12') {
    dateStr = `${dateStr}nd`;
  } else if (lastNum === '3' && dateStr !== '13') {
    dateStr = `${dateStr}rd`;
  } else {
    dateStr = `${dateStr}th`;
  }
  return dateStr;
};

module.exports = (
  timestamp,
  { monthLength = 'short', dateSuffix = true } = {}
) => {
// Creating object for the month. If `short` use abbreviation otherwise say full month
  const months = {
    0: monthLength === 'short' ? 'Jan' : 'January',
    1: monthLength === 'short' ? 'Feb' : 'February',
    2: monthLength === 'short' ? 'Mar' : 'March',
    3: monthLength === 'short' ? 'Apr' : 'April',
    4: monthLength === 'short' ? 'May' : 'May',
    5: monthLength === 'short' ? 'Jun' : 'June',
    6: monthLength === 'short' ? 'Jul' : 'July',
    7: monthLength === 'short' ? 'Aug' : 'August',
    8: monthLength === 'short' ? 'Sep' : 'September',
    9: monthLength === 'short' ? 'Oct' : 'October',
    10: monthLength === 'short' ? 'Nov' : 'November',
    11: monthLength === 'short' ? 'Dec' : 'December',
  };

  const dateObj = new Date(timestamp);
  const formatMonth = months[dateObj.getMonth()];

  const dayOfMonth = dateSuffix
    ? DateSuffix(dateObj.getDate())
    : dateObj.getDate();

  const year = dateObj.getFullYear();
  let hour =
    dateObj.getHours() > 12
      ? Math.floor(dateObj.getHours() - 12)
      : dateObj.getHours();

// if hour is 0 or (12:00am), change time to 12
  if (hour === 0) {
    hour = 12;
  }

  const minutes = (dateObj.getMinutes() < 10 ? '0' : '') + dateObj.getMinutes();

// set `am` or `pm`
  const dayOrNight = dateObj.getHours() >= 12 ? 'PM' : 'AM';

  const formatTimeStamp = `${formatMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${dayOrNight}`;

  return formatTimeStamp;
};