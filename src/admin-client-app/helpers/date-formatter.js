const breakDownDateObj = (dateObj) =>
{
    let date = '' + dateObj.getDate();
    let month = '' + (dateObj.getMonth() + 1);
    let year = '' + dateObj.getFullYear();
    let hours = '' + dateObj.getHours();
    let minutes = '' + dateObj.getMinutes();

    if (month.length < 2) month = '0' + month;
    if (date.length < 2) date = '0' + date;
    if (hours.length < 2) hours = '0' + hours;
    if (minutes.length < 2) minutes = '0' + minutes;

    return {
        date,
        month,
        year,
        hours,
        minutes
    }
};

const monthNames = [
    'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'
];

export const formatForDisplay = (arg) =>
{
    if (arg === null) {
        return null;
    }
    const dateObj = (arg instanceof Date) ? arg : new Date(arg);
    const {date, month, year, hours, minutes} = breakDownDateObj(dateObj);
    return `${monthNames[month - 1]} ${date}, ${year} ${hours}:${minutes}`;
};

export const formatForInput = (arg) =>
{
    if (arg === null) {
        return null;
    }
    const dateObj = (arg instanceof Date) ? arg : new Date(arg);
    const {date, month, year, hours, minutes} = breakDownDateObj(dateObj);
    return [year, month, date].join('-') + "T" + hours + ":" + minutes;
};