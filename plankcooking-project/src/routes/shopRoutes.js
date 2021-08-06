const express = require("express");
const { check } = require("express-validator");

const shopController = require("../controllers/shopController");

const shopRouter = express.Router();

function router() {
  const {
    getShop,
    getSpiceRubs,
    getCookbooks,
    getBakingPlanks,
    getBBQPlanks,
    getNutDriver,
    postAddToCart
  } = shopController();

  shopRouter.route("/").get();
  shopRouter.route("/Products").get(getShop);
  shopRouter.route("/SpiceRubs").get(getSpiceRubs);
  shopRouter.route("/Cookbooks").get(getCookbooks);
  shopRouter.route("/BakingPlanks").get(getBakingPlanks);
  shopRouter.route("/BBQPlanks").get(getBBQPlanks);
  shopRouter.route("/NutDriver").get(getNutDriver);
  shopRouter.route("/NutDriver/").post([
    check("itemQuantity")
      .isInt({ min: 1 })
      .withMessage("Please enter a Qty")
  ],
  postAddToCart);
  shopRouter.route("/BBQPlanks/").post([
    check("itemQuantity")
      .isInt({ min: 1 })
      .withMessage("Please enter a Qty")
  ],
  postAddToCart);
  shopRouter.route("/Cookbooks/").post([
    check("itemQuantity")
      .isInt({ min: 1 })
      .withMessage("Please enter a Qty")
  ],
  postAddToCart);
  shopRouter.route("/SpiceRubs/").post([
    check("itemQuantity")
      .isInt({ min: 1 })
      .withMessage("Please enter a Qty")
  ],
  postAddToCart);
  shopRouter.route("/BakingPlanks/").post([
    check("itemQuantity")
      .isInt({ min: 1 })
      .withMessage("Please enter a Qty")
  ],
  postAddToCart);

  return shopRouter;
}

module.exports = router;
