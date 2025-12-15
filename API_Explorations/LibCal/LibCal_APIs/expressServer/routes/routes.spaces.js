const SpacesController = require('../controllers/spaces.controller');

module.exports = app(app=>{
    app.post('/api/spaces/authenticate', SpacesController.authenticate)
})