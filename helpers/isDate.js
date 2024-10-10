const moment = require('moment');

const isDate = (value) => {
    if (!value) {
        return false;
    }
    const date = moment(value, 'YYYY-MM-DD HH:mm:ss', true);     
    return date.isValid();
}

const datesAllowed = (start, end) => {
    // start debe ser menor a end
    return start < end;
}

module.exports = {
    isDate,
    datesAllowed
}
