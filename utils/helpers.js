module.exports = {
    format_date: (date) => {
        // Format date as MM/DD/YYYY
        console.log("DATE:", date)
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    }

};

