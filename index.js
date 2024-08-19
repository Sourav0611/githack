const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git')();

(async () => {
    const random = await import('random');
    const FILE_PATH = './data.json';

    // Set the start date (joining date) and end date (August 2023)
    const startDate = moment('2022-01-01'); // Replace with actual joining date
    const endDate = moment('2023-07-30');

    // Calculate the total number of days between the start and end dates
    const totalDays = endDate.diff(startDate, 'days');

    const makeCommit = async (n) => {
        if (n === 0) return simpleGit.push();

        // Calculate a random number of days to add to the start date
        const randomDays = random.default.int(0, totalDays);

        // Generate the commit date
        const DATE = moment(startDate).add(randomDays, 'days').format();

        const data = { date: DATE };

        console.log(DATE);

        await jsonfile.writeFile(FILE_PATH, data);
        await simpleGit.add([FILE_PATH]).commit(DATE, { '--date': DATE });
        makeCommit(n - 1);
    };

    makeCommit(200); // Number of commits
})();
