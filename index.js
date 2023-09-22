function createEmployeeRecord(array){
    let employeeRecord = {};

    employeeRecord.firstName = array[0];
    employeeRecord.familyName = array[1];
    employeeRecord.title = array[2];
    employeeRecord.payPerHour = array[3];

    employeeRecord.timeInEvents = [];
    employeeRecord.timeOutEvents = [];

    return employeeRecord;
};

function createEmployeeRecords(arrayOfRecords){
    let employeeRecords = arrayOfRecords.map((array) => {
        return createEmployeeRecord(array);
    });

    return employeeRecords;
};

function createTimeInEvent(employeeRecord, dateStamp){
    let timeIn = {
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1], 10),
        date: dateStamp.split(" ")[0]
    };

    employeeRecord.timeInEvents.push(timeIn);

    return employeeRecord;
};

function createTimeOutEvent(employeeRecord, dateStampOut){
    let timeOut = {
        type: "TimeOut",
        hour: parseInt(dateStampOut.split(" ")[1], 10),
        date: dateStampOut.split(" ")[0]
    };

    employeeRecord.timeOutEvents.push(timeOut);

    return employeeRecord;
};

function hoursWorkedOnDate(employeeRecord, dateOfHours){
    let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === dateOfHours);
    let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === dateOfHours);

    let timeInHour = timeInEvent.hour;
    let timeOutHour = timeOutEvent.hour;

    let hoursWorked = (timeOutHour - timeInHour)/100;

    return hoursWorked;
};

function wagesEarnedOnDate(employeeRecord, dateOfWages){
    let hoursWorked = hoursWorkedOnDate(employeeRecord, dateOfWages);

    let wagesEarned = (hoursWorked * employeeRecord.payPerHour);

    return wagesEarned;
};

function allWagesFor(employeeRecord){
    return employeeRecord.timeInEvents.reduce((totalWages, timeInEvent) => {
        let date = timeInEvent.date;
        let wagesEarned = wagesEarnedOnDate(employeeRecord, date);
        return totalWages + wagesEarned;
    }, 0);
};

function calculatePayroll(employeeRecords){
    let totalPayroll = 0;

    employeeRecords.forEach((employeeRecord) => {
    totalPayroll += allWagesFor(employeeRecord);
    });

    return totalPayroll;
};