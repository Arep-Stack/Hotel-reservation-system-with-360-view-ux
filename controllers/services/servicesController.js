const servicesModel = require('../../models/services/servicesModel');

const postService = async (req, res) => {
    const propertiesToValidate = ["NAME", "TYPE", "QUANTITY", "PRICE"];
    try {
        const validationMessage = validateRequestProperties(req.body,propertiesToValidate);
        if ( req.body.QUANTITY < 0 || req.body.PRICE < 0 ) {
            res.status(404).json({ message: `You can't input negative numbers` });
        } else {
            if ( validationMessage === "PASS" ) {
                const newService = {
                    NAME: req.body.NAME,
                    TYPE: req.body.TYPE,
                    QUANTITY: req.body.QUANTITY,
                    PRICE: req.body.PRICE,
                    IMAGE: req.body.IMAGE,
                    PERSONS: req.body.PERSONS,
                    AMENITIES: req.body.AMENITIES,
                    IS_DELETED: req.body.IS_DELETED
                }
                const service = await servicesModel.createServices(newService);
                if (service.ID) {
                    res.status(201).json({ message: "Successfully created service" });
                } else {
                    res.status(500).json({ message: "Something went wrong!" });
                }
            } else {
                res.status(404).json({ message: validationMessage });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while creating the service.' });
    }
};
const getAllService = async (req, res) => {
    try {
        const services = await servicesModel.getAllServices();
        res.status(200).json(services)
    }catch{
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching all services.' });
    }
}
const getServiceById = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await servicesModel.getServiceById(serviceId);
        if (!service) {
        return res.status(404).json({ error: 'Service not found' });
        }
        res.status(200).json(service);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching the service.' });
    }
};
const putService = async (req, res) => {
    const serviceId = req.params.id;
    const updatedService = {
        NAME: req.body.NAME,
        TYPE: req.body.TYPE,
        QUANTITY: req.body.QUANTITY,
        PRICE: req.body.PRICE,
        IMAGE: req.body.IMAGE,
        PERSONS: req.body.PERSONS,
        AMENITIES: req.body.AMENITIES,
        IS_DELETED: req.body.IS_DELETED
    };
    try {
        const service = await servicesModel.updateServices(serviceId, updatedService);
        res.status(200).json(service);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while updating the service.' });
    }
};
const deleteService = async (req, res) => {
    try {
        const serviceId = req.params.id; 
        const deleteService = await servicesModel.deleteServices(serviceId);
        if (!deleteService) {
            return res.status(404).json({ error: 'Service not found' });
        } else {
            res.status(200).json({ message: `ID ${serviceId} is succesfully deleted` });
        }        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while deleting the service.' });
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
    postService,
    getAllService,
    getServiceById,
    putService,
    deleteService
}