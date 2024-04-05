function createEmployeeRecord(employeeInfo) {
    let employeeRecord = {};
    employeeRecord.firstName = employeeInfo[0];
    employeeRecord.familyName = employeeInfo[1];
    employeeRecord.title = employeeInfo[2];
    employeeRecord.payPerHour = employeeInfo[3];
    employeeRecord.timeInEvents = [];
    employeeRecord.timeOutEvents = [];
    return employeeRecord;
  }
  function createEmployeeRecords(rows) {
    return rows.map(row => createEmployeeRecord(row));
  }
  
  function createEmployeeRecord(row) {
    return {
      firstName: row[0],
      familyName: row[1],
      title: row[2],
      payPerHour: row[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');
    employeeRecord.timeInEvents.push({type: "TimeIn", date: date, hour: parseInt(hour)});
    return employeeRecord;
  }
  function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(" ");
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      date,
      hour: parseInt(hour, 10),
    });
    return employeeRecord;
  }
  
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeIn = employeeRecord.timeInEvents.find((event) => event.date === date);
    const timeOut = employeeRecord.timeOutEvents.find((event) => event.date === date);
    const hoursWorked = (timeOut.hour - timeIn.hour) / 100;
    return hoursWorked;
  }
    
// Define the wagesEarnedOnDate function
function wagesEarnedOnDate(employeeRecord, date) {
    // Get the timeInEvent and timeOutEvent for the given date
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    // Calculate the hours worked and multiply by the employee's rate per hour
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    const wagesEarned = hoursWorked * employeeRecord.payPerHour;
  
    return wagesEarned;
  }
  
  // Define the allWagesFor function
  function allWagesFor(employeeRecord) {
    // Get the dates for which the employee has timeInEvent and timeOutEvent records
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
  
    // Calculate the total wages earned for each date and add them together
    const totalWages = datesWorked.reduce((total, date) => {
      return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
  
    return totalWages;
  }
  
  function calculatePayroll(employeeRecords) {
    let wages = employeeRecords.map(record => allWagesFor(record));
    return wages.reduce((total, wage) => total + wage, 0);
  }
