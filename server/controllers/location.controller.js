const path = require("path");
const fs = require("fs");

class LocationController {
    static getProvince(req, res) {
        try {
            const { country } = req.query;
            const filePath = path.join(
                __dirname,
                `../static/location/${country.toLowerCase()}/province.json`,
            );
            const data = fs.readFileSync(filePath);
            // Support Ho Chi Minh City only
            const hcmCity = JSON.parse(data).filter((p) => p.code === "79");
            return res.status(200).json(hcmCity);
            // All cites in Vietnam are available
            // return res.status(200).json(JSON.parse(data));
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static getDistrict(req, res) {
        try {
            const { country, province } = req.query;
            const filePath = path.join(
                __dirname,
                `../static/location/${country.toLowerCase()}/district.json`,
            );
            const data = fs.readFileSync(filePath);
            const districtList = JSON.parse(data);
            const list = districtList.find(
                (district) => district.parent_code === province,
            );
            // Support Thu Duc District only
            const thuDuc = list.self.find((d) => d.code === "762");
            return res
                .status(200)
                .json({ parent_code: province, self: [thuDuc] });
            // All districts related to province are available
            // return res.status(200).json(list);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static getCommune(req, res) {
        try {
            const { country, district } = req.query;
            const filePath = path.join(
                __dirname,
                `../static/location/${country.toLowerCase()}/commune.json`,
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
