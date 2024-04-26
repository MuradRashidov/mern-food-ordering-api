import { Router } from "express";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";

const router = Router();
router.get("/search/:city",
param("city").isString().trim().notEmpty().withMessage("City must be valid string")
,RestaurantController.searchRestaurants);
export default router;