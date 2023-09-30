const CategoryModel = require("../models/category.model");

class CategoryController {
    static async getAllCategories(req, res) {
        try {
            const categories = await CategoryModel.find();
            return res.status(201).json(categories);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}
module.exports = CategoryController;
