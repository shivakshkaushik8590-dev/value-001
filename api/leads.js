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

    const bookingsFilePath = path.join(process.cwd(), 'data', 'bookings.json');
    const contactsFilePath = path.join(process.cwd(), 'data', 'contacts.json');

    // Helper to read JSON safely
    const readJSON = (filePath) => {
        try {
            if (fs.existsSync(filePath)) {
                const data = fs.readFileSync(filePath, 'utf8');
                return JSON.parse(data || '[]');
            }
        } catch (err) {
            console.error(`Error reading file ${filePath}:`, err);
        }
        return [];
    };

    // Helper to write JSON safely
    const writeJSON = (filePath, data) => {
        try {
            const dir = path.dirname(filePath);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
            return true;
        } catch (err) {
            console.error(`Error writing file ${filePath}:`, err);
            return false;
        }
    };

    if (req.method === 'GET') {
        try {
            const bookings = readJSON(bookingsFilePath);
            const contacts = readJSON(contactsFilePath);

            // Format bookings to CRM schema
            const formattedBookings = bookings.map(b => ({
                id: b.id,
                name: b.name,
                phone: b.phone,
                email: b.email,
                product: `Booking: ${b.project || 'Residential Villa'} (${b.slot || 'N/A'})`,
                message: b.message || `Consultation scheduled for ${b.date || 'N/A'} at ${b.slot || 'N/A'}.`,
                location: b.location || 'N/A',
                date: b.date || 'N/A',
                submissionTime: b.submissionTime || b.createdAt || new Date().toISOString(),
                status: b.status || 'New',
                type: 'booking',
                consultationDate: b.date || 'N/A',
                slot: b.slot || 'N/A'
            }));

            // Format contacts to CRM schema
            const formattedContacts = contacts.map(c => ({
                id: c.id,
                name: c.name,
                phone: c.phone,
                email: c.email,
                product: c.product || 'General Sourcing Inquiry',
                message: c.message || 'N/A',
                location: c.location || 'N/A',
                date: c.date ? c.date.split(' | ')[0] : new Date().toLocaleDateString('en-IN'),
                submissionTime: c.submissionTime || new Date().toISOString(),
                status: c.status || 'New',
                type: 'contact',
                consultationDate: c.consultationDate || 'N/A'
            }));

            // Combine and sort by submissionTime descending
            const allLeads = [...formattedBookings, ...formattedContacts].sort((a, b) => {
                return new Date(b.submissionTime) - new Date(a.submissionTime);
            });

            return res.status(200).json(allLeads);
        } catch (err) {
            return res.status(500).json({ error: 'Failed to fetch leads from local files', details: err.message });
        }
    }

    if (req.method === 'POST' || req.method === 'PUT') {
        try {
            const { id, status } = req.body;
            if (!id || !status) {
                return res.status(400).json({ error: 'Missing lead id or status in request body' });
            }

            let updated = false;

            // Try to find and update in bookings
            let bookings = readJSON(bookingsFilePath);
            const bookingIdx = bookings.findIndex(b => b.id === id);
            if (bookingIdx > -1) {
                bookings[bookingIdx].status = status;
                writeJSON(bookingsFilePath, bookings);
                updated = true;
            }

            // Try to find and update in contacts
            let contacts = readJSON(contactsFilePath);
            const contactIdx = contacts.findIndex(c => c.id === id);
            if (contactIdx > -1) {
                contacts[contactIdx].status = status;
                writeJSON(contactsFilePath, contacts);
                updated = true;
            }

            if (updated) {
                return res.status(200).json({ success: true, message: `Lead ${id} status updated to ${status}` });
            } else {
                return res.status(404).json({ error: `Lead with ID ${id} not found in database` });
            }
        } catch (err) {
            return res.status(500).json({ error: 'Failed to update lead status', details: err.message });
        }
    }

    if (req.method === 'DELETE') {
        try {
            const { id } = req.body;
            if (!id) {
                return res.status(400).json({ error: 'Missing lead id in request body' });
            }

            let deleted = false;

            // Try to delete from bookings
            let bookings = readJSON(bookingsFilePath);
            const initialBookingLength = bookings.length;
            bookings = bookings.filter(b => b.id !== id);
            if (bookings.length < initialBookingLength) {
                writeJSON(bookingsFilePath, bookings);
                deleted = true;
            }

            // Try to delete from contacts
            let contacts = readJSON(contactsFilePath);
            const initialContactLength = contacts.length;
            contacts = contacts.filter(c => c.id !== id);
            if (contacts.length < initialContactLength) {
                writeJSON(contactsFilePath, contacts);
                deleted = true;
            }

            if (deleted) {
                return res.status(200).json({ success: true, message: `Lead ${id} deleted successfully` });
            } else {
                return res.status(404).json({ error: `Lead with ID ${id} not found in database` });
            }
        } catch (err) {
            return res.status(500).json({ error: 'Failed to delete lead', details: err.message });
        }
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
};
