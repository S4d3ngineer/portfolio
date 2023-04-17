import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.FROM_EMAIL_PASSWORD,
      },
    });

    const safeParseRequestBody = z
      .object({
        subject: z.string(),
        body: z.string(),
      })
      .safeParse(req.body);

    if (!safeParseRequestBody.success) {
      console.dir(fromZodError(safeParseRequestBody.error), { depth: 3 });
      return res.status(400).json({ message: "Invalid request body" });
    }

    const requestBody = safeParseRequestBody.data;

    const mailData = {
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: requestBody.subject,
      text: requestBody.body,
    };

    try {
      const info = await transporter.sendMail(mailData);
      console.log(info);
      return res.status(200).json({ success: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err });
    }
  } else {
    return res.status(405).json({ message: "Invalid request method" });
  }
};

export default handler;
