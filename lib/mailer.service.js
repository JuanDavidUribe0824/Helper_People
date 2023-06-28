import nodemailer from "nodemailer";

const smtpOptions = {
  service: "hotmail",
  auth: {
    user: "helper_people@outlook.com",
    pass: "helperpeople123",
  },
};

export const sendEmail = async (to, name) => {
  const transporter = nodemailer.createTransport({
    ...smtpOptions,
  });

  return await transporter.sendMail({
    from: smtpOptions.auth.user,
    to,
    subject: "Tu publicación ha sido eliminada",
    html: `
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          color: #333333;
          padding: 20px;
        }
  
        .container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          padding: 30px;
        }
  
        h1 {
          color: #FF0000;
          font-size: 24px;
          margin-bottom: 20px;
        }
  
        p {
          margin-bottom: 10px;
        }
  
        .signature {
          margin-top: 30px;
          font-style: italic;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Tu Publicación Ha Sido Eliminada</h1>
        <p>Estimado ${name}</p>
        <p>Lamentamos informarte que tu publicación reciente ha sido eliminada.</p>
        <p>Entendemos que esto puede ser una decepción, pero tenemos directrices estrictas para mantener la calidad e integridad de nuestra plataforma.</p>
        <p>Si tienes alguna pregunta o deseas obtener más información sobre la eliminación, no dudes en contactar a nuestro equipo de soporte en ${smtpOptions.auth.user}.</p>
        <p>Agradecemos tu comprensión y cooperación en este asunto.</p>
        <p class="signature">Gracias,<br>El Equipo de Helper People</p>
      </div>
    </body>
    </html>
    `,
  });
};
