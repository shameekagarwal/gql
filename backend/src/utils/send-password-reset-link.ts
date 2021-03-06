import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_MAILID,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const template = (token: string) => {
  return `
  		<html>
		<head>
			<style>
				* { font-weight: bold; }
			</style>
		</head>
		<h1>GQL</h1>
		<h3>
		  Please <a href="${process.env.BASE_URL}/resetpassword/${token}">CLICK HERE</a> to reset your password
		</h3>
		<ul>
		   <li>The link expires after a day</li>
		   <li>Ignore if the request wasn't generated by you</li> 
		</ul>
	  </html>
	  	`;
};

export const sendPasswordResetLink = async (to: string, token: string) => {
  try {
    const mailOptions = {
      from: "no_reply@gql.com",
      subject: "Password Reset Gql",
      to: to,
      html: template(token),
    };
    await transporter.sendMail(mailOptions);
  } catch (e) {
    throw new Error("failed to send password reset link");
  }
};
