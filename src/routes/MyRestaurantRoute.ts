import { Router } from "express";
import MyRestaurantController from "../controllers/myRestaurantController";
import multer from "multer";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";
import myUserController from "../controllers/myUserController";
const router = Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage:storage,
    limits:{
        fileSize:5*1024*1025
    }
    
})
router.patch("/orders/:orderId/status",jwtCheck,jwtParse,MyRestaurantController.updateOrderStatus)
router.get("/orders",jwtCheck,jwtParse,MyRestaurantController.getMyRestaurantOrders)
router.get("/",jwtCheck,jwtParse,MyRestaurantController.getMyRestaurant)
router.post("/",upload.single("imageFile"),validateMyRestaurantRequest,jwtCheck,jwtParse,MyRestaurantController.createMyRestaurant);
router.put("/",upload.single("imageFile"),validateMyRestaurantRequest,jwtCheck,jwtParse,MyRestaurantController.updateMyRestaurant);
export default router;