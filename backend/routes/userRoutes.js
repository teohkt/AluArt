import express from 'express'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'

import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} from '../controllers/userControllers.js'

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.route('/login').post(authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default router
