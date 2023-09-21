const ProductModel = require("../models/product.model");

class ProductController {
    static aggregation = {
        title: 1,
        image: 1,
        price: 1,
        description: 1,
        categories: 1,
        slug: 1,
        createdAt: 1,
        updatedAt: 1,
    };
    static async addProduct(req, res) {
        try {
            const requestProduct = { ...req.body };
            const newProduct = new ProductModel(requestProduct);
            const product = await newProduct.save();
            return res.status(201).json(product);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async getAllProduct(req, res) {
        try {
            const productList = await ProductModel.find(
                {},
                ProductController.aggregation,
            );
            return res.status(200).json(productList);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async getProductBySlug(req, res) {
        try {
            const { slug } = req.params;
            const product = await ProductModel.aggregate([
                { $match: { slug: slug } },
                {
                    $lookup: {
                        from: "reviews",
                        localField: "_id",
                        foreignField: "product",
                        as: "reviews",
                    },
                },
                {
                    $project: {
                        ...ProductController.aggregation,
                        rating_point: { $avg: "$reviews.rating" },
                        rating_count: { $size: "$reviews" },
                    },
                },
            ]);
            return res.status(200).json(product[0]);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async getProductById(req, res) {
        try {
            const { productId } = req.params;
            const product = await ProductModel.findById(
                productId,
                ProductController.aggregation,
            );
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async searchProduct(req, res) {
        try {
            const { s: search } = req.query;
            if (!search) return res.status(200).json([]);
            const productList = await ProductModel.find(
                {
                    title: {
                        $regex: search,
                        $options: "i",
                    },
                },
                ProductController.aggregation,
            );
            return res.status(200).json(productList);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async filterProduct(req, res) {
        try {
            const categories = req.query.c?.split(",");
            if (!categories) return res.status(200).json([]);
            const productList = await ProductModel.find(
                {
                    categories: { $in: categories },
                },
                ProductController.aggregation,
            );
            return res.status(200).json(productList);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async rateProduct(req, res) {
        try {
            const { productId } = req.params;
            const { point } = req.body;
            if (point < 1 || point > 5)
                return res.status(400).json("Invalid point");
            const product = await ProductModel.findOneAndUpdate(
                {
                    _id: productId,
                },
                { $inc: { "rating.point": point, "rating.count": 1 } },
                { new: true, projection: ProductController.aggregation },
            );
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async getLatestProducts(req, res) {
        try {
            const { limit } = req.params;
            const latestProductList = await ProductModel.find(
                {},
                ProductController.aggregation,
            )
                .sort({ createdAt: -1 })
                .limit(limit);
            return res.status(200).json(latestProductList);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}
module.exports = ProductController;
