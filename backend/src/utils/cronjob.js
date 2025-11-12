const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const sendEmail = require("../utils/sendEmail");
const { pendingRequestsMessage } = require("./constant");
const ConnectionRequest = require("../models/connectionRequest");

cron.schedule("0 8 * * *", async () => {
  // send email to all users who have got follow request in the last 24 hours
  try {
    const yesterday = subDays(new Date(), 1);

    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);

    const pendingRequests = await ConnectionRequest.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lte: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");

    const listOfEmails = [
      ...new Set(pendingRequests.map((request) => request.toUserId.emailId)),
    ];

    for (const email of listOfEmails) {
      // send emails
      sendEmail.run(email, pendingRequestsMessage);
    }
  } catch (error) {
    console.log(`Error Occured ${error}`);
  }
});
