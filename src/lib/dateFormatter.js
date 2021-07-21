var moment = require('moment');

const DateFomatter = (type) => {

    let format = ["YYYY-MM-DD", "YYYY-DD-MM", "MM-DD-YYYY", "MM-YYYY-DD", "DD-YYYY-MM", "DD-MM-YYYY", "YYYY/MM/DD", "YYYY/DD/MM", "MM/DD/YYYY",
        "MM/YYYY/DD", "DD/YYYY/MM", "DD/MM/YYYY", "yyyy", "YYYY", "MM", "DD", "L", "l", 'LL', 'll', 'LLL', 'lll', 'LLLL', 'llll']

    const isValid = format.includes(type)

    if (isValid || !type) {
        let today = moment().format(type || 'lll');
        const res = { Date: today }
        return res
    }
    else {
        return null;
    }
}

module.exports = DateFomatter