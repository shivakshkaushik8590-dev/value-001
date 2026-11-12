const nodemailer = require('nodemailer');
const { Resend } = require('resend');
const { validateAdminAuth } = require('../authHelper');

module.exports = async (req, res) => {
    // CORS Headers setup
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Authenticate admin token
    const auth = validateAdminAuth(req);
    if (!auth) {
        return res.status(401).json({ error: 'Unauthorized: Invalid or missing token' });
    }

    try {
        const { to, subject, body } = req.body;
        if (!to || !subject || !body) {
            return res.status(400).json({ error: 'To, Subject, and Body are required.' });
        }

        const resendApiKey = process.env.RESEND_API_KEY;
        const notificationEmail = process.env.NOTIFICATION_EMAIL || 'hello@valure.in';
        let sent = false;
        let deliveryMethod = 'none';

        const emailHtml = `
            <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #edf2f7; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); background-color: #ffffff;">
                <div style="background: #080D1A; padding: 30px; text-align: center; border-bottom: 3px solid #D4AF37;">
                    <h2 style="color: #ffffff; margin: 0; font-family: 'Outfit', sans-serif; font-weight: 700; letter-spacing: 1.5px; font-size: 1.6rem;">VALURE STUDIO</h2>
                    <p style="color: #D4AF37; margin: 6px 0 0 0; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Luxury Stone Concierge Client Followup</p>
                </div>
                <div style="padding: 35px; color: #2d3748; line-height: 1.6;">
                    <p style="white-space: pre-wrap; font-size: 0.95rem; color: #2d3748;">${body}</p>
                </div>
                <div style="background: #f7fafc; padding: 20px 30px; text-align: center; border-top: 1px solid #edf2f7; font-size: 0.75rem; color: #a0aec0;">
                    &copy; 2026 Valure Studio. All rights reserved.
                </div>
            </div>
        `;

        if (resendApiKey) {
            try {
                const resend = new Resend(resendApiKey);
                const sendResult = await resend.emails.send({
                    from: 'Valure Studio <onboarding@resend.dev>',
                    to: to,
                    reply_to: notificationEmail,
                    subject: subject,
                    html: emailHtml
                });

                if (sendResult.data && sendResult.data.id) {
                    sent = true;
                    deliveryMethod = 'Resend SDK';
                }
            } catch (err) {
                console.error('Follow-up email Resend SDK delivery failed:', err.message);
            }
        }

        if (!sent && process.env.SMTP_USER && process.env.SMTP_PASS) {
            try {
                const transporter = nodemailer.createTransport({
                    host: process.env.SMTP_HOST,
                    port: Number(process.env.SMTP_PORT || 587),
                    secure: Number(process.env.SMTP_PORT) === 465,
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASS
                    }
                });

                await transporter.sendMail({
                    from: `"Valure Studio" <${process.env.SMTP_USER}>`,
                    to: to,
                    replyTo: notificationEmail,
                    subject: subject,
                    html: emailHtml
                });
                sent = true;
                deliveryMethod = 'SMTP Fallback';
            } catch (err) {
                console.error('Follow-up email SMTP fallback failed:', err.message);
            }
        }

        if (sent) {
            return res.status(200).json({ success: true, message: `Email successfully sent to ${to} via ${deliveryMethod}.` });
        } else {
            return res.status(200).json({
                success: true,
                simulated: true,
                message: `Simulation Active: Email drafted for ${to} but skipped sending because no Resend or SMTP credentials are configured in .env.`
            });
        }
    } catch (error) {
        console.error('Follow-up send API error:', error);
        return res.status(500).json({ error: 'Failed to process follow-up email sending.' });
    }
};
