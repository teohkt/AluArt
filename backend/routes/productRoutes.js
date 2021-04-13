import express from 'express'
import {
  getProducts,
  getProductById,
  deleteProductById,
  createProductById,
  updateProductById,
  createProductReview,
} from '../controllers/productControllers.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getProducts).post(protect, admin, createProductById)
router.route('/:id/reviews').post(protect, createProductReview)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProductById)
  .put(protect, admin, updateProductById)

export default router
