const captainModel = require('../modal/captain.model');

module.exports.createCaptain = async ({ email, password, firstname, lastname, color, plate, capacity, vehicleType }) => {
    // minimal validation for required fields
    if (!email || !password || !firstname || !lastname || !color || !plate || !capacity || !vehicleType) {
        throw new Error('All fields are required');
    }

    const captain = await captainModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password,
        vehicle: {
            color,
            plate,
            capacity,
            vehicleType
        }
    });

    return captain;
};