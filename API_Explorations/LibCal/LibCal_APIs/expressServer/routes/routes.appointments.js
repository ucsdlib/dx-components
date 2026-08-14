const AppointmentsController = require('../controllers/appointments.controller');

module.exports = app=>{
    app.post('/api/appointments/id', AppointmentsController.getAppointmentsById);
}
