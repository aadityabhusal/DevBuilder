const sendgrid = require("@sendgrid/mail");

const sendEmail = ({ to, type, data = {} }) => {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
  let from = "devbuilderhelp@gmail.com";
  let emailContent;

  switch (type) {
    case "emailVerification":
      emailContent = emailVerification(data);
      break;
    case "passwordReset":
      emailContent = passwordReset(data);
      break;
  }
  if (emailContent) {
    const message = { to, from, ...emailContent };
    return sendgrid.send(message);
  }
  return false;
};

const emailVerification = ({ emailVerificationKey }) => {
  return {
    subject: "Please verify your email address",
    text: `
    Hello There! Thank you for signing up to DevBuilder. To verify your email, please click on the link below:
    
    http://localhost:3000/verify-email?emailVerificationKey=${emailVerificationKey}

    Regards
    DevBuilder Team`,
  };
};

const passwordReset = ({ passwordResetKey }) => {
  return {
    subject: "Reset your password",
    text: `
    Hello There! To reset your DevBuilder account password, please click on the link below:
    
    http://localhost:3000/reset-password?passwordResetKey=${passwordResetKey}

    Regards
    DevBuilder Team`,
  };
};

module.exports = {
  sendEmail,
  passwordReset,
};
