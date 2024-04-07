export function isLeapYear(date) {
    if (!(date instanceof Date)) {
      throw new Error("Invalid date provided.");
    }
  
    const year = date.getFullYear();
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0) ? "Yes" : "No";
  }

export function LeapYearChecker(date) {
    const leapYearStatus = isLeapYear(date);

    return leapYearStatus;
}

export function LeapYearCheckerBool(date) {
    if (!(date instanceof Date)) {
      throw new Error("Invalid date provided.");
    }
  
    const year = date.getFullYear();
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }