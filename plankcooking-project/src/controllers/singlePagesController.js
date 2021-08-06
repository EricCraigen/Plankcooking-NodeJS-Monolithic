function singlePagesController() {
  function getAbout(req, res) {
    console.log(req.app.settings.uniqueID);
    res.render("single-pages/about");
  }

  function getReviews(req, res) {
    console.log(req.app.settings.uniqueID);
    res.render("single-pages/reviews");
  }

  function getTestimonials(req, res) {
    console.log(req.app.settings.uniqueID);
    res.render("single-pages/testimonials");
  }

  function getContact(req, res) {
    console.log(req.app.settings.uniqueID);
    res.render("single-pages/contact");
  }

  function getRecipes(req, res) {
    console.log(req.app.settings.uniqueID);
    res.render("single-pages/recipes");
  }

  function getPolicies(req, res) {
    console.log(req.app.settings.uniqueID);
    res.render("single-pages/policies");
  }

  function getReturnPolicy(req, res) {
    console.log(req.app.settings.uniqueID);
    res.render("single-pages/returnPolicy");
  }
  function getPrivacyPolicy(req, res) {
    console.log(req.app.settings.uniqueID);
    res.render("single-pages/privacyPolicy");
  }

  return {
    getAbout,
    getReviews,
    getContact,
    getRecipes,
    getTestimonials,
    getPolicies,
    getReturnPolicy,
    getPrivacyPolicy
  };
}

module.exports = singlePagesController;
