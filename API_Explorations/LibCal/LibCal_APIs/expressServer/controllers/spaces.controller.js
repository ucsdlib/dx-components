const AuthController = require('./auth.controller');
const { baseUrl } = AuthController;

module.exports.authenticate = AuthController.authenticate;

module.exports.getSpace = async (req, res) =>{
        const {spaceItemId} = req.body;
        const endpoint = `space/item/${spaceItemId}`
        try{
            const access_token = await AuthController.ensureAuthenticated();
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
