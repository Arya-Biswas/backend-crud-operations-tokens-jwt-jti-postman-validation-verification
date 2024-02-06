const cron = require('node-cron');

cron.schedule('* * * * *', () => {
    console.log('This runs every minute');
});
 

cron.schedule('*/10 * * * * *', () => {
    console.log('This runs every 10 seconds');
});
