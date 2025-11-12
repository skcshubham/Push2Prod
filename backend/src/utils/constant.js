const welcomeMessage = `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <h1 style="color: #4F46E5;">Welcome to Push2Prod 🚀</h1>
  <p>Hey there,</p>
  <p>
    We're thrilled to have you join <strong>Push2Prod</strong> — the first dating app built by and for software engineers. 
    Finally, a place where your <code>commit</code> messages can lead to real connections ❤️
  </p>

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

  <p style="margin-top: 20px;">
    Thanks for joining the community. May your builds be green and your matches genuine 💙
  </p>
  <p>– The Push2Prod Team</p>
</div>
`;

const pendingRequestsMessage = `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <h1 style="color: #4F46E5;">You Have New Follow Requests 🔔</h1>
  <p>Hey there.</p>

  <p>Don’t miss the chance to connect — check them out now!</p>
  <a href="https://push2prod.in/requests"
     style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: #fff; border-radius: 6px; text-decoration: none; font-weight: bold;">
    View Requests
  </a>

  <p style="margin-top: 20px;">Keep building connections as strong as your code! 💙</p>
  <p>– The Push2Prod Team</p>
</div>
`;

module.exports = {
  welcomeMessage,
  pendingRequestsMessage,
};
