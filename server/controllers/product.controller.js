const ProductModel = require("../models/product.model");

class ProductController {
    static aggregation = [
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
                title: 1,
                image: 1,
                price: 1,
                description: 1,
                categories: 1,
                slug: 1,
                rating_point: { $avg: "$reviews.rating" },
                rating_count: { $size: "$reviews" },
            },
        },
    ];
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
            const productList = await ProductModel.aggregate(
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
            const aggregationPipeline = [
                { $match: { slug: slug } },
                ...ProductController.aggregation,
            ];
            const product = await ProductModel.aggregate(aggregationPipeline);
            return res.status(200).json(product[0]);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async getProductById(req, res) {
        try {
            const { productId } = req.params;
            const product = await ProductModel.findById(productId);
            return res.status(200).json(product);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
    static async searchProduct(req, res) {
        try {
            const { s: search } = req.query;
            if (!search) return res.status(200).json([]);
            const aggregationPipeline = [
                {
                    $match: {
                        title: {
                            $regex: search,
                            $options: "i",
                        },
                    },
                },
                ...ProductController.aggregation,
            ];
            const productList = await ProductModel.aggregate(
                aggregationPipeline,
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
            const aggregationPipeline = [
                {
                    $match: { categories: { $in: categories } },
                },
                ...ProductController.aggregation,
            ];
            const productList = await ProductModel.aggregate(
                aggregationPipeline,
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
            const aggregationPipeline = [
                ...ProductController.aggregation,
                { $sort: { createdAt: -1 } },
                { $limit: Number(limit) },
            ];
            const latestProductList = await ProductModel.aggregate(
                aggregationPipeline,
            );
            return res.status(200).json(latestProductList);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}
module.exports = ProductController;
