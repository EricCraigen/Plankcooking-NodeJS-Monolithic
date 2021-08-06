const sql = require("mssql");
const { validationResult } = require("express-validator");
const { request } = require("express");

function cartController() {
  let errors = [];
  const productIDs = [];
  const productInfo = [];

  async function getCart(req, res) {
    const request = new sql.Request();
    const uniqueUserID = req.app.settings.uniqueID;
    console.log(uniqueUserID);
    const userCartProducts = [];
    const productIDs = [];
    const productInfo = [];

    req.body.userID = uniqueUserID;
    const userOrderCart = [];

    const getUserOrderCart = await request
      .input("userUniqueID", sql.NVarChar, req.body.userID)
      .query(
        "SELECT * FROM [dbo].[OrderCart] where [UniqueIdentifier] = @userUniqueID"
      )
      .catch((error) => {
        console.log(`Display Error to user: ${error.toString()}`);
      });

    const getserOrderCartResult = getUserOrderCart.recordset[0];
    userOrderCart.push(getserOrderCartResult);

    if (userOrderCart[0] !== undefined) {
      const cartProductsQuery = await request
        .input("cartID", sql.Int, userOrderCart[0].OrderCartID)
        .query("SELECT * FROM [dbo].[OrderItem] where [OrderCartID] = @cartID")
        .catch((error) => {
          console.log(`Display Error to user: ${error.toString()}`);
        });

      cartProductsQuery.recordset.forEach((product) => {
        userCartProducts.push(product);
        productIDs.push(product.ProductID);
      });

      const productInfoQuery = await request
        .input("productID1", sql.Int, productIDs[0])
        .input("productID2", sql.Int, productIDs[1])
        .input("productID3", sql.Int, productIDs[2])
        .input("productID4", sql.Int, productIDs[3])
        .input("productID5", sql.Int, productIDs[4])
        .input("productID6", sql.Int, productIDs[5])
        .input("productID7", sql.Int, productIDs[6])
        .input("productID8", sql.Int, productIDs[7])
        .input("productID9", sql.Int, productIDs[8])
        .input("productID10", sql.Int, productIDs[9])
        .input("productID11", sql.Int, productIDs[10])
        .input("productID12", sql.Int, productIDs[11])
        .input("productID13", sql.Int, productIDs[12])
        .input("productID14", sql.Int, productIDs[13])
        .input("productID15", sql.Int, productIDs[14])
        .input("productID16", sql.Int, productIDs[15])
        .input("productID17", sql.Int, productIDs[16])
        .input("productID18", sql.Int, productIDs[17])
        .query(
          "SELECT * FROM [dbo].[Product] WHERE [ProductID] = @productID1 OR [ProductID] = @productID2 OR [ProductID] = @productID3 OR [ProductID] = @productID4 OR [ProductID] = @productID5 OR [ProductID] = @productID6 OR [ProductID] = @productID7 OR [ProductID] = @productID8 OR [ProductID] = @productID9 OR [ProductID] = @productID10 OR [ProductID] = @productID11 OR [ProductID] = @productID12 OR [ProductID] = @productID13 OR [ProductID] = @productID14 OR [ProductID] = @productID15 OR [ProductID] = @productID16 OR [ProductID] = @productID17 OR [ProductID] = @productID18"
        );

      productInfoQuery.recordset.forEach((item) => {
        productInfo.push(item);
      });

      console.log(userOrderCart);

      console.log(userCartProducts);

      console.log(productIDs);

      console.log(productInfo);

      res.render("cart/cart", {
        userOrderCart,
        userCartProducts,
        productInfo,
        errors,
        uniqueUserID,
      });
    } else {
      console.log(userOrderCart[0]);

      console.log(userCartProducts[0]);

      res.render("cart/cart", {
        userOrderCart,
        userCartProducts,
        productInfo,
        errors,
        uniqueUserID,
      });
    }
  }

  async function postCartProductsInfo(req) {
    const productInfoQuery = await request
      .input("productID", sql.Int, req.body.prodID)
      .query("SELECT * FROM [dbo].[Product] WHERE [ProductID] = @productID");
    productInfoQuery.recordset.forEach((item) => {
      productInfo.push(item);
    });
    console.log(productInfo);
    return productInfo;
  }

  async function postRemoveItemFromCart(req, res) {
    const request = new sql.Request();
    const uniqueUserID = req.app.settings.uniqueID;
    console.log(uniqueUserID);
    const userCartProducts = [];
    const productIDs = [];
    const productInfo = [];

    req.body.userID = uniqueUserID;
    const userOrderCart = [];
    // let userCartProducts = [];
    // const productInfo = [];

    const getUserOrderCart = await request
      .input("userUniqueID", sql.NVarChar, req.body.userID)
      .query(
        "SELECT * FROM [dbo].[OrderCart] where [UniqueIdentifier] = @userUniqueID"
      )
      .catch((error) => {
        console.log(`Display Error to user: ${error.toString()}`);
      });

    const getserOrderCartResult = getUserOrderCart.recordset[0];
    userOrderCart.push(getserOrderCartResult);

    if (userOrderCart[0] !== undefined) {
      const cartProductsQuery = await request
        .input("cartID", sql.Int, userOrderCart[0].OrderCartID)
        .query("SELECT * FROM [dbo].[OrderItem] where [OrderCartID] = @cartID")
        .catch((error) => {
          console.log(`Display Error to user: ${error.toString()}`);
        });

      cartProductsQuery.recordset.forEach((product) => {
        userCartProducts.push(product);
        productIDs.push(product.ProductID);
      });

      const productInfoQuery = await request
        .input("productID1", sql.Int, productIDs[0])
        .input("productID2", sql.Int, productIDs[1])
        .input("productID3", sql.Int, productIDs[2])
        .input("productID4", sql.Int, productIDs[3])
        .input("productID5", sql.Int, productIDs[4])
        .input("productID6", sql.Int, productIDs[5])
        .input("productID7", sql.Int, productIDs[6])
        .input("productID8", sql.Int, productIDs[7])
        .input("productID9", sql.Int, productIDs[8])
        .input("productID10", sql.Int, productIDs[9])
        .input("productID11", sql.Int, productIDs[10])
        .input("productID12", sql.Int, productIDs[11])
        .input("productID13", sql.Int, productIDs[12])
        .input("productID14", sql.Int, productIDs[13])
        .input("productID15", sql.Int, productIDs[14])
        .input("productID16", sql.Int, productIDs[15])
        .input("productID17", sql.Int, productIDs[16])
        .input("productID18", sql.Int, productIDs[17])
        .query(
          "SELECT * FROM [dbo].[Product] WHERE [ProductID] = @productID1 OR [ProductID] = @productID2 OR [ProductID] = @productID3 OR [ProductID] = @productID4 OR [ProductID] = @productID5 OR [ProductID] = @productID6 OR [ProductID] = @productID7 OR [ProductID] = @productID8 OR [ProductID] = @productID9 OR [ProductID] = @productID10 OR [ProductID] = @productID11 OR [ProductID] = @productID12 OR [ProductID] = @productID13 OR [ProductID] = @productID14 OR [ProductID] = @productID15 OR [ProductID] = @productID16 OR [ProductID] = @productID17 OR [ProductID] = @productID18"
        );

      productInfoQuery.recordset.forEach((item) => {
        productInfo.push(item);
      });

      await request
        .input("productID1Delete", sql.Int, productIDs[0])
        .input("productID2Delete", sql.Int, productIDs[1])
        .input("productID3Delete", sql.Int, productIDs[2])
        .input("productID4Delete", sql.Int, productIDs[3])
        .input("productID5Delete", sql.Int, productIDs[4])
        .input("productID6Delete", sql.Int, productIDs[5])
        .input("productID7Delete", sql.Int, productIDs[6])
        .input("productID8Delete", sql.Int, productIDs[7])
        .input("productID9Delete", sql.Int, productIDs[8])
        .input("productID10Delete", sql.Int, productIDs[9])
        .input("productID11Delete", sql.Int, productIDs[10])
        .input("productID12Delete", sql.Int, productIDs[11])
        .input("productID13Delete", sql.Int, productIDs[12])
        .input("productID14Delete", sql.Int, productIDs[13])
        .input("productID15Delete", sql.Int, productIDs[14])
        .input("productID16Delete", sql.Int, productIDs[15])
        .input("productID17Delete", sql.Int, productIDs[16])
        .input("productID18Delete", sql.Int, productIDs[17])
        .query(
          "DELETE FROM [dbo].[OrderItem] WHERE [ProductID] = @productID1Delete OR [ProductID] = @productID2Delete OR [ProductID] = @productID3Delete OR [ProductID] = @productID4Delete OR [ProductID] = @productID5Delete OR [ProductID] = @productID6Delete OR [ProductID] = @productID7Delete OR [ProductID] = @productID8Delete OR [ProductID] = @productID9Delete OR [ProductID] = @productID10Delete OR [ProductID] = @productID11Delete OR [ProductID] = @productID12Delete OR [ProductID] = @productID13Delete OR [ProductID] = @productID14Delete OR [ProductID] = @productID15Delete OR [ProductID] = @productID16Delete OR [ProductID] = @productID17Delete OR [ProductID] = @productID18Delete"
        );

      console.log(userOrderCart);

      console.log(userCartProducts);

      console.log(productIDs);

      console.log(productInfo);

      // // Perfomr Delete
      // const deleteItemQuery = await request
      // .input("productID", sql.Int, req.body.prodID)
      // .query("DELETE FROM [dbo].[OrderItem] WHERE [ProductID] = @productID");

      res.render("cart/cart", {
        userOrderCart,
        userCartProducts,
        productInfo,
        errors,
        uniqueUserID,
      });
    } else {
      console.log(userOrderCart[0]);

      console.log(userCartProducts[0]);

      res.render("cart/cart", {
        userOrderCart,
        userCartProducts,
        productInfo,
        errors,
        uniqueUserID,
      });
    }
  }

  async function getCartCheckout(req, res) {
    const request = new sql.Request();
    const uniqueUserID = req.app.settings.uniqueID;
    console.log(uniqueUserID);
    const userCartProducts = [];
    const productIDs = [];
    const productInfo = [];

    req.body.userID = uniqueUserID;
    const userOrderCart = [];

    const getUserOrderCart = await request
      .input("userUniqueID", sql.NVarChar, req.body.userID)
      .query(
        "SELECT * FROM [dbo].[OrderCart] where [UniqueIdentifier] = @userUniqueID"
      )
      .catch((error) => {
        console.log(`Display Error to user: ${error.toString()}`);
      });

    const getserOrderCartResult = getUserOrderCart.recordset[0];
    userOrderCart.push(getserOrderCartResult);

    if (userOrderCart[0] !== undefined) {
      const cartProductsQuery = await request
        .input("cartID", sql.Int, userOrderCart[0].OrderCartID)
        .query("SELECT * FROM [dbo].[OrderItem] where [OrderCartID] = @cartID")
        .catch((error) => {
          console.log(`Display Error to user: ${error.toString()}`);
        });

      cartProductsQuery.recordset.forEach((product) => {
        userCartProducts.push(product);
        productIDs.push(product.ProductID);
      });

      const productInfoQuery = await request
        .input("productID1", sql.Int, productIDs[0])
        .input("productID2", sql.Int, productIDs[1])
        .input("productID3", sql.Int, productIDs[2])
        .input("productID4", sql.Int, productIDs[3])
        .input("productID5", sql.Int, productIDs[4])
        .input("productID6", sql.Int, productIDs[5])
        .input("productID7", sql.Int, productIDs[6])
        .input("productID8", sql.Int, productIDs[7])
        .input("productID9", sql.Int, productIDs[8])
        .input("productID10", sql.Int, productIDs[9])
        .input("productID11", sql.Int, productIDs[10])
        .input("productID12", sql.Int, productIDs[11])
        .input("productID13", sql.Int, productIDs[12])
        .input("productID14", sql.Int, productIDs[13])
        .input("productID15", sql.Int, productIDs[14])
        .input("productID16", sql.Int, productIDs[15])
        .input("productID17", sql.Int, productIDs[16])
        .input("productID18", sql.Int, productIDs[17])
        .query(
          "SELECT * FROM [dbo].[Product] WHERE [ProductID] = @productID1 OR [ProductID] = @productID2 OR [ProductID] = @productID3 OR [ProductID] = @productID4 OR [ProductID] = @productID5 OR [ProductID] = @productID6 OR [ProductID] = @productID7 OR [ProductID] = @productID8 OR [ProductID] = @productID9 OR [ProductID] = @productID10 OR [ProductID] = @productID11 OR [ProductID] = @productID12 OR [ProductID] = @productID13 OR [ProductID] = @productID14 OR [ProductID] = @productID15 OR [ProductID] = @productID16 OR [ProductID] = @productID17 OR [ProductID] = @productID18"
        );

      productInfoQuery.recordset.forEach((item) => {
        productInfo.push(item);
      });

      console.log(userOrderCart);
      console.log(userCartProducts);
      console.log(productIDs);
      console.log(productInfo);

      res.render("cart/cartCheckout", {
        userOrderCart,
        userCartProducts,
        productInfo,
        errors,
        uniqueUserID,
      });
    } else {
      console.log(userOrderCart[0]);
      console.log(userCartProducts[0]);

      res.render("cart/cartCheckout", {
        userOrderCart,
        userCartProducts,
        productInfo,
        errors,
        uniqueUserID,
      });
    }
  }

  async function postUpdateOrderCart(req, res) {
    const request = new sql.Request();
    const valErrors = validationResult(req);
    errors = valErrors.array();
    const uniqueUserID = req.app.settings.uniqueID;
    console.log(uniqueUserID);
    const userCartProducts = [];
    const productIDs = [];
    const productInfo = [];
    req.body.userID = uniqueUserID;
    const userOrderCart = [];

    const getUserOrderCart = await request
      .input("userUniqueID", sql.NVarChar, req.body.userID)
      .query(
        "SELECT * FROM [dbo].[OrderCart] where [UniqueIdentifier] = @userUniqueID"
      )
      .catch((error) => {
        console.log(`Display Error to user: ${error.toString()}`);
      });

    const getserOrderCartResult = getUserOrderCart.recordset[0];
    userOrderCart.push(getserOrderCartResult);

    const cartProductsQuery = await request
      .input("cartID", sql.Int, userOrderCart[0].OrderCartID)
      .query("SELECT * FROM [dbo].[OrderItem] where [OrderCartID] = @cartID")
      .catch((error) => {
        console.log(`Display Error to user: ${error.toString()}`);
      });

    cartProductsQuery.recordset.forEach((product) => {
      userCartProducts.push(product);
      productIDs.push(product.ProductID);
    });

    const productInfoQuery = await request
      .input("productID1", sql.Int, productIDs[0])
      .input("productID2", sql.Int, productIDs[1])
      .input("productID3", sql.Int, productIDs[2])
      .input("productID4", sql.Int, productIDs[3])
      .input("productID5", sql.Int, productIDs[4])
      .input("productID6", sql.Int, productIDs[5])
      .input("productID7", sql.Int, productIDs[6])
      .input("productID8", sql.Int, productIDs[7])
      .input("productID9", sql.Int, productIDs[8])
      .input("productID10", sql.Int, productIDs[9])
      .input("productID11", sql.Int, productIDs[10])
      .input("productID12", sql.Int, productIDs[11])
      .input("productID13", sql.Int, productIDs[12])
      .input("productID14", sql.Int, productIDs[13])
      .input("productID15", sql.Int, productIDs[14])
      .input("productID16", sql.Int, productIDs[15])
      .input("productID17", sql.Int, productIDs[16])
      .input("productID18", sql.Int, productIDs[17])
      .query(
        "SELECT * FROM [dbo].[Product] WHERE [ProductID] = @productID1 OR [ProductID] = @productID2 OR [ProductID] = @productID3 OR [ProductID] = @productID4 OR [ProductID] = @productID5 OR [ProductID] = @productID6 OR [ProductID] = @productID7 OR [ProductID] = @productID8 OR [ProductID] = @productID9 OR [ProductID] = @productID10 OR [ProductID] = @productID11 OR [ProductID] = @productID12 OR [ProductID] = @productID13 OR [ProductID] = @productID14 OR [ProductID] = @productID15 OR [ProductID] = @productID16 OR [ProductID] = @productID17 OR [ProductID] = @productID18"
      )
      .catch((error) => {
        console.log(`Display Error to user: ${error.toString()}`);
      });

    productInfoQuery.recordset.forEach((item) => {
      productInfo.push(item);
    });

    if (errors.length === 0) {
      request
        .input("uniqueIDUpdate", sql.NVarChar, req.body.userID)
        .input("notes", sql.NVarChar, req.body.notes)
        .input("fNameBilling", sql.NVarChar, req.body.fNameBilling)
        .input("lnameBilling", sql.NVarChar, req.body.lnameBilling)
        .input("address1Billing", sql.NVarChar, req.body.address1Billing)
        .input("address2Billing", sql.NVarChar, req.body.address2Billing)
        .input("cityBilling", sql.NVarChar, req.body.cityBilling)
        .input("stateBilling", sql.NVarChar, req.body.stateBilling)
        .input("postalCodeBilling", sql.NVarChar, req.body.postalCodeBilling)
        .input("phoneBilling", sql.NVarChar, req.body.phoneBilling)
        .input("emailBilling", sql.NVarChar, req.body.emailBilling)
        .input("fnameShipping", sql.NVarChar, req.body.fnameShipping)
        .input("lnameShipping", sql.NVarChar, req.body.lnameShipping)
        .input("address1Shipping", sql.NVarChar, req.body.address1Shipping)
        .input("address2Shipping", sql.NVarChar, req.body.address2Shipping)
        .input("cityShipping", sql.NVarChar, req.body.cityShipping)
        .input("stateShipping", sql.NVarChar, req.body.stateShipping)
        .input("postalCodeShipping", sql.NVarChar, req.body.postalCodeShipping)
        .input("phoneShipping", sql.NVarChar, req.body.phoneShipping)
        .input("emailShipping", sql.NVarChar, req.body.emailShipping)
        .query(
          "UPDATE [dbo].[OrderCart] SET [Status] = 1, [Notes] = @notes, [PurchaseDate] = NULL, [History] = NULL, [Taxes] = NULL, [OrderTotal] = NULL, [ShippingFirstName] = @fnameShipping, [ShippingLastName] = @lnameShipping, [ShippingAddress1] = @address1Shipping, [ShippingAddress2] = @address2Shipping, [ShippingCity] = @cityShipping, [ShippingState] = @stateShipping, [ShippingPostalCode] = @postalCodeShipping, [ShippingPhone] = @phoneShipping, [ShippingEmail] = @emailShipping, [BillingAddress1] = @address1Billing, [BillingAddress2] = @address2Billing, [BillingCity] = @cityBilling, [BillingState] = @stateBilling, [BillingPostalCode] = @postalCodeBilling, [UniqueIdentifier] = @uniqueIDUpdate, [WebsiteID] = 1, [DateCreated] = GetDate(), [BillingFirstName] = @fNameBilling, [BillingLastName] = @lNameBilling, [BillingPhone] = @phoneBilling, [BillingEmail] = @billingEmail, [ShippingCountry] = NULL, [BillingCountry] = NULL, [AuthorizationCode] = NULL, [TransactionID] = NULL, [ShippingValidation] = NULL, [ShippingCost] = NULL, [ShippingType] = NULL, [CreditCardType] = NULL WHERE [UniqueIdentifier] = @uniqueIDUpdate"
        )
        .catch((error) => {
          console.log(`Display Error to user: ${error.toString()}`);
        });
      res.render("cart/cartPreview", {
        userOrderCart,
        userCartProducts,
        productInfo,
        errors,
        uniqueUserID,
      });
    } else {
      res.render("cart/cartCheckout", {
        userOrderCart,
        userCartProducts,
        productInfo,
        errors,
        uniqueUserID,
      });
    }
  }

  function getCartPreview(req, res) {
    res.render("cart/cartPreivew");
  }

  function getCartReceipt(req, res) {
    res.render("cart/cartReceipt");
  }

  function postAddToCart(req, res) {
    res.render("cart/cartReceipt");
  }

  return {
    getCart,
    postRemoveItemFromCart,
    postCartProductsInfo,
    getCartCheckout,
    postUpdateOrderCart,
    getCartPreview,
    getCartReceipt,
    postAddToCart,
  };
}

module.exports = cartController;
