export const PASSWORD_RESET_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Reset</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6fb; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6fb; padding:30px 0;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px; background:#ffffff; border-radius:12px; box-shadow:0 10px 30px rgba(0,0,0,0.08); overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#4f46e5,#6366f1); padding:24px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:22px;">
                Password Reset Request
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px; color:#1f2937;">
              <p style="font-size:15px; margin:0 0 12px;">
                Hi 👋,
              </p>

              <p style="font-size:15px; margin:0 0 20px;">
                We received a request to reset your password.  
                Use the OTP below to continue:
              </p>

              <!-- OTP -->
              <div style="text-align:center; margin:30px 0;">
                <span style="
                  display:inline-block;
                  background:#f1f5f9;
                  color:#4f46e5;
                  font-size:32px;
                  letter-spacing:8px;
                  font-weight:bold;
                  padding:14px 24px;
                  border-radius:10px;
                ">
                  {{OTP}}
                </span>
              </div>

              <p style="font-size:14px; margin:0 0 14px;">
                ⏱ This OTP is valid for <strong>10 minutes</strong>.
              </p>

              <p style="font-size:14px; margin:0 0 20px; color:#6b7280;">
                If you did not request a password reset, please ignore this email.  
                Your account remains secure.
              </p>

              <p style="font-size:14px; margin:0;">
                Thanks,<br />
                <strong>Your App Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc; padding:18px; text-align:center; font-size:12px; color:#9ca3af;">
              © ${new Date().getFullYear()} Your App Name. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
`;
