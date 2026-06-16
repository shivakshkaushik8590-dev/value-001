const nodemailer = require('nodemailer');
const twilio = require('twilio');
const fs = require('fs');
const path = require('path');

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
        const { name, phone, email, project, date, slot } = req.body;

        // Validation
        if (!name || !phone || !email || !date || !slot) {
            return res.status(400).json({ error: 'Missing required booking fields.' });
        }

        // Prepare booking payload
        const bookingId = 'book_' + Date.now();
        const newBooking = {
            id: bookingId,
            name,
            phone,
            email,
            project: project || 'Residential Villa',
            date,
            slot,
            status: 'New',
            createdAt: new Date().toISOString()
        };

        // 1. Storage: Try storing inside local bookings.json (normal on local environments)
        let fileSaved = false;
        try {
            const dataFilePath = path.join(process.cwd(), 'data', 'bookings.json');
            let bookingsList = [];
            
            if (fs.existsSync(dataFilePath)) {
                const fileData = fs.readFileSync(dataFilePath, 'utf8');
                bookingsList = JSON.parse(fileData || '[]');
            }
            
            bookingsList.unshift(newBooking);
            
            const dataDir = path.dirname(dataFilePath);
            if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir, { recursive: true });
            }
            
            fs.writeFileSync(dataFilePath, JSON.stringify(bookingsList, null, 2), 'utf8');
            fileSaved = true;
        } catch (fileErr) {
            console.warn('Local file storage writing skipped (expected in read-only serverless hosts):', fileErr.message);
        }

        // 2. Email Notification (Nodemailer SMTP)
        let emailSent = false;
        let emailError = null;
        const smtpHost = process.env.SMTP_HOST;
        const smtpPort = process.env.SMTP_PORT || 587;
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;
        const notificationEmail = process.env.NOTIFICATION_EMAIL || 'shivakshkaushik8590@gmail.com';

        if (smtpUser && smtpPass) {
            const transporter = nodemailer.createTransport({
                host: smtpHost,
                port: Number(smtpPort),
                secure: Number(smtpPort) === 465,
                auth: {
                    user: smtpUser,
                    pass: smtpPass
                }
            });

            const emailHtml = `
                <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #edf2f7; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); background-color: #ffffff;">
                    <div style="background: #080D1A; padding: 30px; text-align: center; border-bottom: 3px solid #D4AF37;">
                        <h2 style="color: #ffffff; margin: 0; font-family: 'Outfit', sans-serif; font-weight: 700; letter-spacing: 1.5px; font-size: 1.6rem;">VALURE STUDIO</h2>
                        <p style="color: #D4AF37; margin: 6px 0 0 0; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Luxury Design Consultation</p>
                    </div>
                    <div style="padding: 35px; color: #2d3748; line-height: 1.6;">
                        <h3 style="margin-top: 0; margin-bottom: 20px; color: #080D1A; font-family: 'Outfit', sans-serif; font-size: 1.25rem; font-weight: 600; border-bottom: 1px solid #f7fafc; padding-bottom: 10px;">New Consultation Request Details</h3>
                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                            <tr style="border-bottom: 1px solid #edf2f7;">
                                <td style="padding: 12px 0; font-weight: 600; color: #4a5568; width: 140px; font-size: 0.9rem;">Customer Name:</td>
                                <td style="padding: 12px 0; color: #1a202c; font-size: 0.9rem;">${name}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #edf2f7;">
                                <td style="padding: 12px 0; font-weight: 600; color: #4a5568; font-size: 0.9rem;">Phone Number:</td>
                                <td style="padding: 12px 0; color: #1a202c; font-size: 0.9rem;">${phone}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #edf2f7;">
                                <td style="padding: 12px 0; font-weight: 600; color: #4a5568; font-size: 0.9rem;">Email Address:</td>
                                <td style="padding: 12px 0; color: #1a202c; font-size: 0.9rem;">${email}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #edf2f7;">
                                <td style="padding: 12px 0; font-weight: 600; color: #4a5568; font-size: 0.9rem;">Project Type:</td>
                                <td style="padding: 12px 0; color: #1a202c; font-size: 0.9rem;">${project || 'Residential Villa'}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #edf2f7;">
                                <td style="padding: 12px 0; font-weight: 600; color: #4a5568; font-size: 0.9rem;">Booking Date:</td>
                                <td style="padding: 12px 0; color: #080D1A; font-weight: 700; font-size: 0.95rem;">${date}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #edf2f7;">
                                <td style="padding: 12px 0; font-weight: 600; color: #4a5568; font-size: 0.9rem;">Time Slot:</td>
                                <td style="padding: 12px 0; color: #D4AF37; font-weight: 700; font-size: 0.95rem;">${slot}</td>
                            </tr>
                        </table>
                        <div style="background: #faf8f5; border-left: 4px solid #D4AF37; padding: 16px; border-radius: 8px; margin-top: 30px;">
                            <p style="margin: 0; font-size: 0.85rem; color: #718096; font-style: italic;">
                                Note: This booking request was captured in real-time. Please follow up with the client to confirm details and arrange video call logistics or a showroom visit.
                            </p>
                        </div>
                    </div>
                    <div style="background: #f7fafc; padding: 20px 30px; text-align: center; border-top: 1px solid #edf2f7; font-size: 0.75rem; color: #a0aec0;">
                        Sent automatically by Valure Luxury Partner Portal Form Delivery Engine.
                    </div>
                </div>
            `;

            await transporter.sendMail({
                from: `"${name}" <${smtpUser}>`,
                to: notificationEmail,
                subject: `New Consultation Booking - ${name}`,
                html: emailHtml
            });
            emailSent = true;
        } else {
            console.info('SMTP user or password not set in process.env. Skipping automated email notification.');
            emailError = 'SMTP credentials not provided in env settings';
        }

        // 3. WhatsApp Notification (Twilio API)
        let whatsAppSent = false;
        let whatsAppError = null;
        const twilioSid = process.env.TWILIO_ACCOUNT_SID;
        const twilioToken = process.env.TWILIO_AUTH_TOKEN;
        const twilioFrom = process.env.TWILIO_WHATSAPP_FROM;
        const whatsAppTo = process.env.WHATSAPP_TO || '+917454853045';

        if (twilioSid && twilioToken && twilioFrom) {
            const client = twilio(twilioSid, twilioToken);
            
            const waBody = `New Consultation Booking\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nProject Type: ${project}\nDate: ${date}\nTime Slot: ${slot}`;

            const formattedTo = whatsAppTo.startsWith('whatsapp:') ? whatsAppTo : `whatsapp:${whatsAppTo.replace(/\s+/g, '')}`;
            const formattedFrom = twilioFrom.startsWith('whatsapp:') ? twilioFrom : `whatsapp:${twilioFrom.replace(/\s+/g, '')}`;

            await client.messages.create({
                body: waBody,
                from: formattedFrom,
                to: formattedTo
            });
            whatsAppSent = true;
        } else {
            console.info('Twilio configurations missing. Skipping automated WhatsApp notification.');
            whatsAppError = 'Twilio variables missing in environment configurations';
        }

        return res.status(200).json({
            success: true,
            message: 'Your booking has been received.',
            booking: newBooking,
            savedLocally: fileSaved,
            notifications: {
                email: emailSent ? 'Sent successfully' : `Skipped/Failed: ${emailError}`,
                whatsapp: whatsAppSent ? 'Sent successfully' : `Skipped/Failed: ${whatsAppError}`
            }
        });
    } catch (error) {
        console.error('Fatal API booking failure:', error);
        return res.status(500).json({
            error: 'Failed to process booking due to an internal server error.',
            details: error.message
        });
    }
};
