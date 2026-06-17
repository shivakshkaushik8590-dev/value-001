const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const { Resend } = require('resend');

// In-memory duplicate protection cache (SHA/signature keys -> timestamp)
const recentSubmissions = new Map();

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

    try {
        const { name, phone, email, product, message, honeypot } = req.body;

        // 1. Honeypot Spam Protection
        if (honeypot) {
            console.warn('Spam submission blocked via honeypot field:', honeypot);
            // Return silent success to the spam bot
            return res.status(200).json({
                success: true,
                message: 'Enquiry received successfully.'
            });
        }

        // 2. Server-Side Validation
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ error: 'Full Name is required.' });
        }
        if (!phone || typeof phone !== 'string' || phone.trim() === '') {
            return res.status(400).json({ error: 'Phone Number is required.' });
        }
        if (!email || typeof email !== 'string' || !email.includes('@')) {
            return res.status(400).json({ error: 'A valid Email Address is required.' });
        }
        if (!product || typeof product !== 'string' || product.trim() === '') {
            return res.status(400).json({ error: 'Product Interest is required.' });
        }
        if (!message || typeof message !== 'string' || message.trim() === '') {
            return res.status(400).json({ error: 'Message is required.' });
        }

        // 3. Duplicate Protection (1 minute cooldown)
        const now = Date.now();
        // Clean cache entries older than 1 minute
        for (const [key, timestamp] of recentSubmissions.entries()) {
            if (now - timestamp > 60000) {
                recentSubmissions.delete(key);
            }
        }

        const normalizedEmail = String(email).trim().toLowerCase();
        const normalizedPhone = String(phone).trim().replace(/\D/g, '');
        const normalizedMsg = String(message).trim().toLowerCase();
        const submissionKey = `${normalizedEmail}:${normalizedPhone}:${normalizedMsg.substring(0, 100)}`;

        if (recentSubmissions.has(submissionKey)) {
            return res.status(429).json({
                error: 'Duplicate submission detected. Please wait a minute before trying again.'
            });
        }
        recentSubmissions.set(submissionKey, now);

        // Prepare structured enquiry data
        const dateString = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        const enquiryId = 'enq_' + Date.now();
        const newEnquiry = {
            id: enquiryId,
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim(),
            product: product.trim(),
            message: message.trim(),
            date: dateString,
            status: 'New'
        };

        // 4. Local File Storage Logging
        let savedLocally = false;
        try {
            const dataFilePath = path.join(process.cwd(), 'data', 'contacts.json');
            let contactsList = [];

            if (fs.existsSync(dataFilePath)) {
                const fileData = fs.readFileSync(dataFilePath, 'utf8');
                contactsList = JSON.parse(fileData || '[]');
            }

            contactsList.unshift(newEnquiry);

            const dataDir = path.dirname(dataFilePath);
            if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir, { recursive: true });
            }

            fs.writeFileSync(dataFilePath, JSON.stringify(contactsList, null, 2), 'utf8');
            savedLocally = true;
        } catch (fileErr) {
            console.warn('Local contact file storage writing skipped:', fileErr.message);
        }

        // 5. Email Notification Delivery
        const notificationEmail = process.env.NOTIFICATION_EMAIL || 'shivakshkaushik8590@gmail.com';
        const resendApiKey = process.env.RESEND_API_KEY;

        const emailHtml = `
            <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #edf2f7; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); background-color: #ffffff;">
                <div style="background: #080D1A; padding: 30px; text-align: center; border-bottom: 3px solid #D4AF37;">
                    <h2 style="color: #ffffff; margin: 0; font-family: 'Outfit', sans-serif; font-weight: 700; letter-spacing: 1.5px; font-size: 1.6rem;">VALURE STUDIO</h2>
                    <p style="color: #D4AF37; margin: 6px 0 0 0; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Luxury Quote & Enquiry Portal</p>
                </div>
                <div style="padding: 35px; color: #2d3748; line-height: 1.6;">
                    <h3 style="margin-top: 0; margin-bottom: 20px; color: #080D1A; font-family: 'Outfit', sans-serif; font-size: 1.25rem; font-weight: 600; border-bottom: 1px solid #f7fafc; padding-bottom: 10px;">New Quote Request / Enquiry</h3>
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                        <tr style="border-bottom: 1px solid #edf2f7;">
                            <td style="padding: 12px 0; font-weight: 600; color: #4a5568; width: 140px; font-size: 0.9rem;">Customer Name:</td>
                            <td style="padding: 12px 0; color: #1a202c; font-size: 0.9rem;">${newEnquiry.name}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #edf2f7;">
                            <td style="padding: 12px 0; font-weight: 600; color: #4a5568; font-size: 0.9rem;">Phone Number:</td>
                            <td style="padding: 12px 0; color: #1a202c; font-size: 0.9rem;">${newEnquiry.phone}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #edf2f7;">
                            <td style="padding: 12px 0; font-weight: 600; color: #4a5568; font-size: 0.9rem;">Email Address:</td>
                            <td style="padding: 12px 0; color: #1a202c; font-size: 0.9rem;">${newEnquiry.email}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #edf2f7;">
                            <td style="padding: 12px 0; font-weight: 600; color: #4a5568; font-size: 0.9rem;">Product Interest:</td>
                            <td style="padding: 12px 0; color: #D4AF37; font-weight: 700; font-size: 0.95rem;">${newEnquiry.product}</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #edf2f7;">
                            <td style="padding: 12px 0; font-weight: 600; color: #4a5568; font-size: 0.9rem;">Date & Time (IST):</td>
                            <td style="padding: 12px 0; color: #080D1A; font-size: 0.9rem;">${newEnquiry.date}</td>
                        </tr>
                    </table>
                    
                    <div style="margin-top: 20px;">
                        <h4 style="margin-bottom: 8px; color: #080D1A; font-family: 'Outfit', sans-serif; font-size: 1.05rem; font-weight: 600;">Message / Specific Request:</h4>
                        <div style="background: #faf8f5; border-left: 4px solid #D4AF37; padding: 16px; border-radius: 8px; font-size: 0.9rem; color: #2d3748; white-space: pre-wrap;">${newEnquiry.message}</div>
                    </div>
                </div>
                <div style="background: #f7fafc; padding: 20px 30px; text-align: center; border-top: 1px solid #edf2f7; font-size: 0.75rem; color: #a0aec0;">
                    Sent automatically by Valure Luxury Partner Portal Form Delivery Engine.
                </div>
            </div>
        `;

        let emailSent = false;
        let deliveryMethod = 'none';

        if (resendApiKey) {
            try {
                // Deliver using Resend SDK
                const resend = new Resend(resendApiKey);
                const sendResult = await resend.emails.send({
                    from: 'Valure Studio <onboarding@resend.dev>',
                    to: notificationEmail,
                    subject: `New Lead: ${newEnquiry.name} - ${newEnquiry.product}`,
                    html: emailHtml
                });

                if (sendResult.data && sendResult.data.id) {
                    emailSent = true;
                    deliveryMethod = 'Resend SDK';
                } else if (sendResult.error) {
                    console.error('Resend SDK delivery failed:', sendResult.error);
                }
            } catch (err) {
                console.error('Resend SDK exception:', err.message);
            }
        }

        // Graceful SMTP fallback if Resend not active, but SMTP details are provided in .env
        if (!emailSent && process.env.SMTP_USER && process.env.SMTP_PASS) {
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
                from: `"${newEnquiry.name}" <${process.env.SMTP_USER}>`,
                to: notificationEmail,
                subject: `New Lead: ${newEnquiry.name} - ${newEnquiry.product} (SMTP Fallback)`,
                html: emailHtml
            });
            emailSent = true;
            deliveryMethod = 'SMTP Fallback';
        }

        if (!emailSent) {
            console.warn('WARNING: No active email configuration set in process.env. Printing lead details instead:');
            console.log(JSON.stringify(newEnquiry, null, 2));
            deliveryMethod = 'Console Log (No email config provided)';
        }

        return res.status(200).json({
            success: true,
            message: 'Your request has been sent successfully.',
            enquiry: newEnquiry,
            savedLocally,
            emailSent,
            deliveryMethod
        });
    } catch (error) {
        console.error('Fatal API contact failure:', error);
        return res.status(500).json({
            error: 'Failed to process contact submission due to an internal server error.',
            details: error.message
        });
    }
};
