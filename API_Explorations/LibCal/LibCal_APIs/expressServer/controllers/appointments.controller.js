const fs = require('fs');
const path = require('path');
const AuthController = require('./auth.controller');
const { baseUrl } = AuthController;

const CSV_COLUMNS = ['libcal_user_id', 'first_name', 'last_name', 'email', 'url'];

function toCsv(rows) {
    const escape = (value) => {
        const str = value == null ? '' : String(value);
        return /[",\n]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
    };
    const lines = [CSV_COLUMNS.join(',')];
    for (const row of rows) {
        lines.push(CSV_COLUMNS.map((col) => escape(row[col])).join(','));
    }
    return lines.join('\n');
}

const SERIALIZERS = {
    json: (rows) => JSON.stringify(rows, null, 2),
    csv: toCsv,
};

module.exports.getAppointmentsById = async (req, res) => {
    const { userIds, format = 'json' } = req.body;
    if (!Array.isArray(userIds) || userIds.length === 0) {
        return res.status(400).json({ errorMsg: "userIds must be a non-empty array" });
    }
    const serialize = SERIALIZERS[format];
    if (!serialize) {
        return res.status(400).json({ errorMsg: `format must be one of: ${Object.keys(SERIALIZERS).join(', ')}` });
    }
    try {
        const access_token = await AuthController.ensureAuthenticated();
        const results = [];
        for (const id of userIds) {
            const appointmentRes = await fetch(`${baseUrl}/appointments?user_id=${id}`,
                { headers: { 'Authorization': `Bearer ${access_token}`, 'Accept': 'application/json' } });
            if (!appointmentRes.ok) {
                const errorText = await appointmentRes.text();
                console.error(`LibCal API error for id ${id}:`, appointmentRes.status, errorText);
                continue;
            }
            const data = await appointmentRes.json();
            const entries = Array.isArray(data) ? data : [data];
            for (const entry of entries) {

                if (!entry || !entry.user_id) {
                    console.error(`Unexpected response for id ${id}:`, entry);
                    continue;
                }
                if(Array.isArray(entry.appointments) && entry.appointments.length > 0){
                    results.push({
                        libcal_user_id: entry.user_id,
                        first_name: entry.first_name,
                        last_name: entry.last_name,
                        email: entry.email,
                        url: entry.url
                    });
                    // }
                }
            }}
            const outputPath = path.join(__dirname, '..', `appointments.${format}`);
            fs.writeFileSync(outputPath, serialize(results));
            res.status(201).json({ message: "Appointments aggregated", count: results.length, file: outputPath });
        } catch (error) {
            console.error(error);
            res.status(400).json({ errorMsg: "Could not aggregate appointments" });
        }
    };
    // if (!entry.url) {
    //     console.error(`No url found for:`, entry.first_name);
    //     continue;
    // }
    // const isReachable = await checkUrlReachable(entry.url)
    // if(isReachable){
    async function checkUrlReachable(url) {
        let response = await fetch(url, { method: 'HEAD' });
        if (!response.ok) {
            // HEAD might be blocked/unsupported even though GET works — retry before giving up
            response = await fetch(url, { method: 'GET' });
        }
        return response.ok;
    }
    