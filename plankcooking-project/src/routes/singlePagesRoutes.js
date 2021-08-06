const express = require("express");

const singlePagesController = require("../controllers/singlePagesController");

const singlePagesRouter = express.Router();

function router() {
  const {
    getAbout,
    getReviews,
    getTestimonials,
    getContact,
    getRecipes,
    getPolicies,
    getReturnPolicy,
    getPrivacyPolicy,
  } = singlePagesController();

  singlePagesRouter.route("/").get();
  singlePagesRouter.route("/About").get(getAbout);
  singlePagesRouter.route("/Reviews").get(getReviews);
  singlePagesRouter.route("/Reviews/Testimonials").get(getTestimonials);
  singlePagesRouter.route("/Contact").get(getContact);
  singlePagesRouter.route("/Recipes").get(getRecipes);
  singlePagesRouter.route("/Policies").get(getPolicies);
  singlePagesRouter.route("/Policies/ReturnPolicy").get(getReturnPolicy);
  singlePagesRouter.route("/Policies/PrivacyPolicy").get(getPrivacyPolicy);

  return singlePagesRouter;
}

module.exports = router;
