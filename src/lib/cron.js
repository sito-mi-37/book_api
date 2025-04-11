import cron from "cron"
import https from "https"

const job = new cron.CronJob("*/14 * * * *", function (){
    https
        .get(process.env.API_URL, (res) => {
            if (res.statusCode === 200 ) console.log("GET request sent successfully")
            else console.log("GET request failed", res.statusCode)
        })
        .on("error", (e) => console.log("Error while sending request", e))
})

export default job


// MINUTE, HOUR, DAY OF THE MONTH, MONTH, DAY OF THE WEEK

// */15 * * * * (Every 15 mins)
// 0 2 * * *     (Runs: at 2:00 AM daily (great for backups or nightly tasks).)
// 0 0 1 * *     (Runs: at 12:00 AM on the 1st day of each month.)

