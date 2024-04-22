import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
const handleValidationErrors = (req:Request,res:Response,next:NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        
        return res.status(400).json({errors:errors.array()})
    }
    next();
}
export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Name must be string"),
    body("addressLine1").isString().notEmpty().withMessage("AddressLine1 must be string"),
    body("city").isString().notEmpty().withMessage("City must be string"),
    body("country").isString().notEmpty().withMessage("Country must be string"),
    handleValidationErrors
]

export const validateMyRestaurantRequest = [
    body("restaurantName").isString().notEmpty().withMessage("Restaurant name must be string"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("deliveryPrice").notEmpty().isFloat({min:0}).withMessage("Delivery Price must be a posetive number"),
    body("estimatedDeliveryTime").isInt({min:0}).withMessage("Estimated Delivery Time must be a positive integer"),
    body("cuisines").isArray().withMessage("Quisines must be an array").not().isEmpty().withMessage("Quisines must't be empty"),
    body("menuItems").isArray().withMessage("Menu Items must't be empty"),
    body("menuItems.*.name").notEmpty().withMessage("Menu Item Name must't be empty"),
    body("menuItems.*.price").isFloat({min:1}).withMessage("Menu Item Price is required and must be positive number"),
    handleValidationErrors
]