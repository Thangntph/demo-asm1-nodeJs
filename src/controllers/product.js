import product from "../models/product";
import Product from "../models/product";
import joi from 'joi';

const productSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
});

export const create = async (req, res) => {
    try {
        const {error} = productSchema.validate(req.body);
        if(error){
            res.json({
                message: error.details[0].message,
            });
        }
        const product = await Product.create(req.body);
        return res.status(201).json({
            message: "Tạo thành công",
            product,
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
    
};

export const getAll = async (req, res) => {
    try {
        const product = await Product.find();
        return res.status(201).json(product)

    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
    
};

export const get = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        return res.status(201).json(product)
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }  
};

export const update = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true});
        return res.json({
            message:"Cập nhật thành công",
            product,
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
    
};

export const remove = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        return res.json({
            message:"Xóa thành công",
            product,
        })
    } catch (error) {
        return res.status(400).json({
            message: error,
        });
    }
};