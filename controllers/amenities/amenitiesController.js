const amenityModel = require('../../models/amenities/amenitiesModel');

const postAmenity = async (req, res) => {
    const propertiesToValidate = ["NAME", "TYPE", "QUANTITY", "PRICE"];
    try {
        const validationMessage = validateRequestProperties(req.body,propertiesToValidate);
        if ( req.body.QUANTITY < 0 || req.body.PRICE < 0 ) {
            res.status(404).json({ message: `You can't input negative numbers` });
        } else {
            if ( validationMessage === "PASS" ) {
                const newAmenity = {
                    NAME: req.body.NAME,
                    TYPE: req.body.TYPE,
                    QUANTITY: req.body.QUANTITY,
                    PRICE: req.body.PRICE,
                    DESCRIPTION: req.body.DESCRIPTION
                }
                const amenity = await amenityModel.createAmenity(newAmenity);
                if (amenity.ID) {
                    res.status(201).json({ message: "Successfully created amenity" });
                } else {
                    res.status(500).json({ message: "Something went wrong!" });
                }
            } else {
                res.status(404).json({ message: validationMessage });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while creating the amenity.' });
    }
};
const getAllAmenities = async (req, res) => {
    try {
        const amenities = await amenityModel.getAllAmenities();
        res.status(200).json(amenities)
    }catch{
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching all amenities.' });
    }
}
const getAmenityById = async (req, res) => {
    try {
        const amenityId = req.params.id;
        const amenity = await amenityModel.getAmenityById(amenityId);
        if (!amenity) {
        return res.status(404).json({ error: 'Amenity not found' });
        }
        res.status(200).json(amenity);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching the amenity.' });
    }
};
const putAmenity = async (req, res) => {
    const amenityId = req.params.id;
    const updatedAmenity = {
        NAME: req.body.NAME,
        TYPE: req.body.TYPE,
        QUANTITY: req.body.QUANTITY,
        PRICE: req.body.PRICE,
        DESCRIPTION: req.body.DESCRIPTION
    };
    try {
        const amenity = await amenityModel.updateAmenity(amenityId, updatedAmenity);
        res.status(200).json(amenity);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while updating the amenity.' });
    }
};
const deleteAmenity = async (req, res) => {
    try {
        const amenityId = req.params.id; 
        const deleteAmenity = await amenityModel.deleteAmenity(amenityId);
        if (!deleteAmenity) {
            return res.status(404).json({ error: 'Amenity not found' });
        } else {
            res.status(200).json({ message: `ID ${amenityId} is succesfully deleted` });
        }        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while deleting the amenity.' });
    }
};
function validateRequestProperties(requestBody, properties) {
    for ( const property of properties ) {
        if ( !requestBody[property] || requestBody[property] === "" ) {
            return `${property} is empty or undefined.`;
        } 
    }
    return "PASS";
}
module.exports = {
    postAmenity,
    getAllAmenities,
    getAmenityById,
    putAmenity,
    deleteAmenity
}