const { sendEmail } = require("../helpers/sendEmail");

const testEmail = async (req, res) => {
  try {
    await sendEmail({
      to: "bhusal.001aditya@gmail.com",
      from: "devbuilderhelp@gmail.com",
      subject: "Hello from the DevBuilder team!",
      text: `Welcome to the DevBuilder family. We are happy that you found our product useful. If you have any problem in using the application, please let us know!
      
      Regards
      DevBuilder Team
      `,
    });
    res.sendStatus(200).send({ message: "Email sent successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  testEmail,
};
