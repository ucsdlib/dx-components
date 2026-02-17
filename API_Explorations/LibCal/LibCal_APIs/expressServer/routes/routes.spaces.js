const SpacesController = require('../controllers/spaces.controller');

module.exports = app=>{
    app.get('/api/spaces/authenticate', SpacesController.authenticate);
    app.post('/api/spaces/getSpace', SpacesController.getSpace);
}