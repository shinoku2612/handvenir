const path = require("path");
const fs = require("fs");

class LocationController {
    static getProvince(req, res) {
        try {
            const { country } = req.query;
            const filePath = path.join(
                __dirname,
                `../static/location/${country}/province.json`,
            );
            const data = fs.readFileSync(filePath);
            return res.status(200).json(JSON.parse(data));
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static getDistrict(req, res) {
        try {
            const { country, province } = req.query;
            const filePath = path.join(
                __dirname,
                `../static/location/${country}/district.json`,
            );
            const data = fs.readFileSync(filePath);
            const districtList = JSON.parse(data);
            const list = districtList.find(
                (district) => district.parent_code === province,
            );
            return res.status(200).json(list);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static getCommune(req, res) {
        try {
            const { country, district } = req.query;
            const filePath = path.join(
                __dirname,
                `../static/location/${country}/commune.json`,
            );
            const data = fs.readFileSync(filePath);
            const communeList = JSON.parse(data);
            const list = communeList.find(
                (commune) => commune.parent_code === district,
            );
            return res.status(200).json(list);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = LocationController;
