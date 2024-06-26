import { Router } from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import OrderController from "../controllers/OrderController"
const router = Router();
router.get("/",jwtCheck,jwtParse,OrderController.getMyOrders)
router.post("/checkout/create-checkout-sessions",jwtCheck,jwtParse,OrderController.createCheckoutSession);
router.post("/checkout/webhook",OrderController.stripeWebhookHandler);

export default router