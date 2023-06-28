import { sendEmail } from "../../lib/mailer.service";

export default async function handler(req, res) {
  await sendEmail(req.query.to, req.query.name);
  return res.status(200).json({ message: "Email sent successfully" });
}
