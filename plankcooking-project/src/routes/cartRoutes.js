const express = require("express");
const { check } = require("express-validator");

const cartController = require("../controllers/cartController");

const cartRouter = express.Router();

function router() {
  const {
    getCart,
    postRemoveItemFromCart,
    getCartCheckout,
    postUpdateOrderCart,
    getCartPreview,
    getCartReceipt,
  } = cartController();

  cartRouter.route("/").get();
  cartRouter.route("/Cart")
    .get(getCart);
  cartRouter.route("/Cart/").post(postRemoveItemFromCart);
  cartRouter.route("/Checkout").get(getCartCheckout);
  cartRouter.route("/Checkout/").post([
    check("fNameBilling")
      .notEmpty()
      .withMessage("Please enter a first name."),
    check("lnameBilling")
      .notEmpty()
      .withMessage("Please enter a last name."),
    check("address1Billing")
      .notEmpty()
      .withMessage("Please enter an address."),
    check("cityBilling")
      .notEmpty()
      .withMessage("Please enter a city."),
    check("stateBilling")
      .notEmpty()
      .withMessage("Please enter a state."),
    check("postalCodeBilling")
      .notEmpty()
      .withMessage("Please enter a postal code."),
    check("phoneBilling")
      .notEmpty()
      .isMobilePhone()
      .withMessage("Please enter a phone number."),
    check("emailBilling")
      .notEmpty()
      .isEmail()
      .withMessage("Please enter an valid email address."),
    check("fnameShipping")
      .notEmpty()
      .withMessage("Please enter a first name."),
    check("lnameShipping")
      .notEmpty()
      .withMessage("Please enter a last name."),
    check("address1Shipping")
      .notEmpty()
      .withMessage("Please enter an address."),
    check("cityShipping")
      .notEmpty()
      .withMessage("Please enter a city."),
    check("stateShipping")
      .notEmpty()
      .withMessage("Please enter a state."),
    check("postalCodeShipping")
      .notEmpty()
      .withMessage("Please enter a postal code."),
    check("phoneShipping")
      .notEmpty()
      .isMobilePhone()
      .withMessage("Please enter a phone number."),
    check("emailShipping")
      .notEmpty()
      .isEmail()
      .withMessage("Please enter a valid email address.")
  ],
  postUpdateOrderCart);
  cartRouter.route("/Preview").get(getCartPreview);
  cartRouter.route("/Receipt").get(getCartReceipt);

  return cartRouter;
}

module.exports = router;
