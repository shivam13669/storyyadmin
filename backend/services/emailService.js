import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  pool: true,
  maxConnections: 1,
  maxMessages: 100,
  rateDelta: 1000,
  rateLimit: 10,
  connectionTimeout: 15000,
  socketTimeout: 15000,
  greetingTimeout: 10000,
  tls: {
    minVersion: 'TLSv1.2'
  }
});

/**
 * Send OTP email
 */
export async function sendOTPEmail(email, otp) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your OTP Verification Code - Stories by Foot',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2 style="color:#007bff;">Stories by Foot</h2>
        <p>Your OTP code is:</p>
        <h1 style="letter-spacing:5px; color:#007bff;">${otp}</h1>
        <p>This code expires in 5 minutes.</p>
        <p style="font-size:12px; color:#666;">If you didn't request this, ignore this email.</p>
      </div>
    `,
    text: `Your OTP is: ${otp}`
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent to ${email}`);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Error sending OTP:', error);

    // Retry once
    try {
      console.log('🔄 Retrying...');
      const retryResult = await transporter.sendMail(mailOptions);
      return { success: true, messageId: retryResult.messageId };
    } catch (retryError) {
      console.error('❌ Retry failed:', retryError);
      throw new Error('Failed to send OTP');
    }
  }
}

/**
 * Verify email configuration
 */
export async function verifyEmailConfig() {
  try {
    await transporter.verify();
    console.log('✅ Email service ready');
    return true;
  } catch (error) {
    console.error('❌ Email config error:', error);
    return false;
  }
}
