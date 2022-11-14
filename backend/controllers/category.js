const CatModel = require('../models/categoryModel')
const Joi = require("joi");
var path = require('path');

exports.listAllCategories = async (req, res) => {
    const categories = await CatModel.findAll();
    if (categories) {
        const resultPosts = []
        for (const cats of categories) {
            resultPosts.push({
                'id': cats?.id,
                'cat_name': cats?.cat_name,
                'cat_image': '/images/cat_images/' + cats?.cat_image,
                'status': cats?.status,
                'created_at': cats?.created_at,
                'updated_at': cats?.updated_at,
            })
        }
        res.json({
            data: resultPosts,
            message: "Data successfully",
        })
    }
}

exports.listDropDownAllCategories = async (req, res) => {
    const categories = await CatModel.findAll({
        attributes: [['id', 'value'], ['cat_name', 'label']],
    });
    if (categories) {
        res.json({
            data: categories,
            message: "Data successfully",
        })
    }
}

exports.createCategory = async (req, res) => {
    const category = new CatModel(req.body)
    const schemas = Joi.object().keys({
        cat_name: Joi.string().trim().min(3).max(30).required().label("This field is required"),
        status: Joi.string().trim().required(),
    })
    const valid = schemas.validate(req.body)
    if (!(valid.error)) {
        category.save().then(serRes => {
            res.send(serRes);
        }).catch(err => {
            res.status(400).json({
                error: err?.errors[0]?.message
            })
        });
    } else {
        //console.error(valid.error.details[0].context);
        res.status(400).json({
            // error: valid.error.details
            error: valid.error.details[0].context
        })
    }
}

exports.getCategoryById = async (req, res) => {
    const category = await CatModel.findByPk(req.params.categoryId);
    if (!category) {
        return res.status(400).json({
            error: "No such category found !"
        });
    }
    res.json({
        data: category
    })
}

exports.updateCategoryById = async (req, res) => {
    const catData = req.body;
    const category = await CatModel.update(catData, { where: { id: req.params.categoryId } })
    if (category) {
        return res.status(200).json({
            message: "Updated Successfully !"
        });
    } else {
        return res.status(400).json({
            message: "Failed to Update !"
        });
    }
}

exports.deleteCategoryById = async (req, res) => {
    if (req.params.categoryId) {
        const category = await CatModel.destroy({ where: { id: req.params.categoryId } })
        if (category) {
            return res.status(200).json({
                message: "Successfully Deleted Category !"
            });
        } else {
            return res.status(400).json({
                message: "Failed to Delete !"
            });
        }
    } else {
        return res.status(400).json({
            message: "Delete Id is missing !"
        });
    }
}