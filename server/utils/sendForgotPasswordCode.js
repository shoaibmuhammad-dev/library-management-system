const verificationCodeTemplate = (otp) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>

      <body style="
        margin: 0;
        padding: 0;
        background-color: #f4f6f8;
        font-family: Arial, Helvetica, sans-serif;
        color: #333333;
      ">

        <div style="
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        ">

          <!-- Header -->
          <div style="
            padding: 24px 30px;
            background-color: #111827;
            color: #ffffff;
          ">
            <h1 style="
              margin: 0;
              font-size: 22px;
              font-weight: 600;
            ">
              Library Management System
            </h1>
          </div>

          <!-- Content -->
          <div style="padding: 35px 30px;">

            <h2 style="
              margin-top: 0;
              margin-bottom: 15px;
              font-size: 22px;
              color: #111827;
            ">
              Password Reset Request
            </h2>

            <p style="
              font-size: 15px;
              line-height: 1.7;
              margin-bottom: 20px;
              color: #4b5563;
            ">
              We received a request to reset the password associated with
              your Library Management System account.
            </p>

            <p style="
              font-size: 15px;
              line-height: 1.7;
              color: #4b5563;
            ">
              Use the verification code below to continue with your password reset:
            </p>

            <!-- OTP -->
            <div style="
              margin: 30px 0;
              padding: 22px;
              background-color: #f9fafb;
              border: 1px solid #e5e7eb;
              border-radius: 8px;
              text-align: center;
            ">
              <p style="
                margin: 0 0 10px;
                font-size: 13px;
                color: #6b7280;
              ">
                Your verification code
              </p>

              <div style="
                font-size: 32px;
                font-weight: 700;
                letter-spacing: 8px;
                color: #111827;
              ">
                ${otp}
              </div>
            </div>

            <!-- Expiration notice -->
            <div style="
              padding: 15px 18px;
              background-color: #fff7ed;
              border: 1px solid #fed7aa;
              border-radius: 8px;
              margin-bottom: 25px;
            ">
              <p style="
                margin: 0;
                font-size: 14px;
                line-height: 1.6;
                color: #9a3412;
              ">
                <strong>Important:</strong> This verification code will expire
                in 10 minutes.
              </p>
            </div>

            <p style="
              font-size: 14px;
              line-height: 1.7;
              color: #6b7280;
            ">
              If you did not request a password reset, you can safely ignore
              this email. Your account password will remain unchanged.
            </p>

            <p style="
              font-size: 14px;
              line-height: 1.7;
              color: #6b7280;
            ">
              For your security, never share this verification code with
              anyone, including someone claiming to be a member of the
              library administration.
            </p>

            <p style="
              margin-top: 30px;
              font-size: 14px;
              color: #374151;
            ">
              Regards,<br />
              <strong>Library Administration</strong>
            </p>

          </div>

          <!-- Footer -->
          <div style="
            padding: 18px 30px;
            background-color: #f9fafb;
            border-top: 1px solid #e5e7eb;
            text-align: center;
          ">
            <p style="
              margin: 0;
              font-size: 12px;
              color: #9ca3af;
            ">
              This is an automated email. Please do not reply directly
              to this message.
            </p>
          </div>

        </div>

      </body>
    </html>
  `;
};

module.exports = verificationCodeTemplate;
