
import express from "express";
import formidable from "express-formidable";
import {
  createProductController,
  getProductController,          
  getSingleProductController,   
  productPhotoController,
  deleteProductController,
  updateProductController,
  productFiltersController,
  productCountController,
  productListController,
  searchProductController,
  relatedProductController,
  productCategoryController,
  createOrderController,
  getAllProductsController,     
} from "../controllers/productController.js";

import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

// Update product
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//Get all products
router.get("/get-products", getAllProductsController);

//Get product by ID
router.get("/get-product/:pid", getProductController);

//Get product by slug
router.get("/get-product-by-slug/:slug", getSingleProductController);

// Product photo
router.get("/product-photo/:pid", productPhotoController);

// Delete product
router.delete("/delete-product/:pid", requireSignIn, isAdmin, deleteProductController);

// Filters
router.post("/product-filters", productFiltersController);

// Count
router.get("/product-count", productCountController);

// Pagination
router.get("/product-list/:page", productListController);

// Search
router.get("/search/:keyword", searchProductController);

// Category wise products
router.get("/product-category/:slug", productCategoryController);

// Related products
router.get("/related-product/:pid/:cid", relatedProductController);


router.post("/create-order", requireSignIn, createOrderController);

export default router;
