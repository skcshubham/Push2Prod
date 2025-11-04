const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient.js");

const createSendEmailCommand = (toAddress, fromAddress, subject, body) => {
  return new SendEmailCommand({
    Destination: {
      CcAddresses: [],
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <h1 style="color: #4F46E5;">Welcome to Push2Prod 🚀</h1>
              <p>Hey there,</p>
              <p>We're thrilled to have you join <strong>Push2Prod</strong> — the first dating app built by and for software engineers. Finally, a place where your <code>commit</code> messages can lead to real connections ❤️</p>
              
              <h3 style="color: #4F46E5;">What happens next?</h3>
              <ul>
                <li>Set up your profile (don’t worry, no merge conflicts here)</li>
                <li>Start connecting with other amazing engineers</li>
                <li>Find someone who truly understands your stack overflow moments</li>
              </ul>
              
              <p>Ready to <strong>deploy love</strong>? Click below to get started 👇</p>
              <a href="https://push2prod.in" 
                 style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: #fff; border-radius: 6px; text-decoration: none; font-weight: bold;">
                Launch Push2Prod
              </a>
              
              <p style="margin-top: 20px;">Thanks for joining the community. May your builds be green and your matches genuine 💙</p>
              <p>– The Push2Prod Team</p>
            </div>
          `,
        },
        Text: {
          Charset: "UTF-8",
          Data: "TEXT_FORMAT_BODY",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [],
  });
};

const run = async (senderEmailId) => {
  const sendEmailCommand = createSendEmailCommand(
    senderEmailId,
    "shubham@push2prod.in",
    "Welcome to Push2Prod 🧑🏻‍💻"
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }
};

module.exports = { run };
