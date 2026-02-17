const baseUrl = 'https://ucsd.libcal.com/api/1.1';
let access_token = null
let expirTime = null
module.exports.authenticate = async (req, res)=>{
    console.log(access_token);
    if(access_token && Date.now() < expirTime) return res.status(201).json({message:"Authentication is Successful"});
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
        const authResJSON = await authRes.json();
        access_token = authResJSON.access_token;
        expirTime= Date.now() + (Number(authResJSON.expires_in) * 1000);
        res.status(201).json({message:"Authentication is Successful"})
    }catch(error){
        res.status(400).json({errorMsg:"Could not make authenticate request"})
    }
}
module.exports.getSpace = async (req, res) =>{
        const {spaceItemId} = req.body;
        const endpoint = `space/item/${spaceItemId}`
        try{
            console.log(`${baseUrl}/${endpoint}`)
            const foundSpace = await fetch(`${baseUrl}/${endpoint}`,
            {headers: {'Authorization':`Bearer ${access_token}`, 'Accept': 'application/json'}})
            if (!foundSpace.ok) {
            const errorText = await foundSpace.text(); // See what API returns
            console.error('LibCal API error:', foundSpace.status, errorText);
            return res.status(foundSpace.status).json({
                message: "Issue with LibCal request",
                details: errorText
            });
        }
            const data = await foundSpace.json();
            res.status(201).json(data);
        }catch(error){
            res.status(400).json({errorMsg:"Could not make space request"})
        }
    }