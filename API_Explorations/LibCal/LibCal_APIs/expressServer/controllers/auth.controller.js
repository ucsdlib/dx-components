const baseUrl = 'https://ucsd.libcal.com/api/1.1';
let access_token = null;
let expirTime = null;

module.exports.baseUrl = baseUrl;
module.exports.getAccessToken = () => access_token;
module.exports.isTokenValid = () => Boolean(access_token && Date.now() < expirTime);

module.exports.ensureAuthenticated = async () => {
    if (module.exports.isTokenValid()) return access_token;
    const authRes = await fetch(`${baseUrl}/oauth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            'client_id': process.env.CLIENT_ID,
            'client_secret': process.env.LIBCAL_KEY,
            'grant_type': 'client_credentials'
        })
    });
    if (!authRes.ok) throw new Error('Could not authenticate with LibCal');
    const authResJSON = await authRes.json();
    access_token = authResJSON.access_token;
    expirTime = Date.now() + (Number(authResJSON.expires_in) * 1000);
    return access_token;
};

module.exports.authenticate = async (req, res) => {
    try {
        if (module.exports.isTokenValid()) return res.status(201).json({ message: "Authentication is Successful" });
        await module.exports.ensureAuthenticated();
        res.status(201).json({ message: "Authentication is Successful" });
    } catch (error) {
        res.status(400).json({ errorMsg: "Could not make authenticate request" });
    }
};
