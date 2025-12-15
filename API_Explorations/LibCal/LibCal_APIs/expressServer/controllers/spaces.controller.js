const baseUrl = 'https://ucsd.libcal.com/api/1.1';
let access_token = null
let expirTime = null
module.exports.authenticate = async (req, res)=>{
    if(!access_token || Date.now() > expirTime ) return;
    try{
        const authRes = await fetch(`${baseUrl}/oauth/token`,{
            method:'POST',
            headers:{'Content-Type':'application/x-www-form-urlencoded'},
            body:new URLSearchParams({
                'client_id': process.env.CLIENT_ID,
                'client_secret':process.env.LIBCAL_KEY,
                'grant_type': 'client_credentials'
            })
        })
        if(!authRes.ok) return res.status(400).json({message:"network issue"});
        const authResJSON = authRes.json();
        access_token = authResJSON.access_token;
        expirTime= authResJSON.expires_in;
        res.status(201).json({message:"Authentication is Successful"})
    }catch(err){
        res.status(400).json({err:"Could not make authenticate request"})
    }
}