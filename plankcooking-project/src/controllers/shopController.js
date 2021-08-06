const sql = require("mssql");
const { validationResult } = require("express-validator");
const { request } = require("express");

function shopController() {
  let errors = [];

  function getShop(req, res) {
    console.log(req.app.settings.uniqueID);
    res.render("shop/shop");
  }

  function getSpiceRubs(req, res) {
    console.log(req.app.settings.uniqueID);
    const uniqueUserID = req.app.settings.uniqueID;
    (async () => {
      const cartSearchResults = [];
      const request = new sql.Request();

      const categoryInfo = await request.query(
        "SELECT * FROM [dbo].[Category] where [CategoryID] = 6"
      );

      const category = categoryInfo.recordset[0];

      request
        .input("itemQuantity", sql.Int, req.body.itemQuantity)
        .query("SELECT * FROM [dbo].[Product] where [CategoryID] = 6")
        .then((results) => {
          const products = [];

          results.recordset.forEach((product) => {
            products.push({
              productID: product.ProductID,
              categoryID: product.CategoryID,
              name: product.Name,
              description: product.Description,
              price: product.Price,
              priceDescription: product.PriceDescription,
              sortOrder: product.SortOrder,
              active: product.Status,
              ounces: product.Ounces,
              imgPath: product.ImagePath,
              handlingCost: product.HandlingCost,
              tax: product.TaxExempt,
              sku: product.SKU,
            });
          });

          res.render("shop/spiceRubs", {
            products,
            category: {
              description: category.Description,
              imgPath: category.ImagePath,
              websitePath: category.WebsitePath,
            },
            itemQuantity: req.body.itemQuantity,
            errors,
            uniqueUserID,
            cartSearchResults,
          });
        })
        .catch((error) => {
          console.log(`Display Error to user: ${error.toString()}`);
        });
    })();
  }

  async function getCookbooks(req, res) {
    const uniqueUserID = req.app.settings.uniqueID;
    (async () => {
      const cartSearchResults = [];
      const request = new sql.Request();

      const categoryInfo = await request.query(
        "SELECT * FROM [dbo].[Category] where [CategoryID] = 7"
      );

      const category = categoryInfo.recordset[0];

      request
        .input("itemQuantity", sql.Int, req.body.itemQuantity)
        .query("SELECT * FROM [dbo].[Product] where [CategoryID] = 7")
        .then((results) => {
          const products = [];

          results.recordset.forEach((product) => {
            products.push({
              productID: product.ProductID,
              categoryID: product.CategoryID,
              name: product.Name,
              description: product.Description,
              price: product.Price,
              priceDescription: product.PriceDescription,
              sortOrder: product.SortOrder,
              active: product.Status,
              ounces: product.Ounces,
              imgPath: product.ImagePath,
              handlingCost: product.HandlingCost,
              tax: product.TaxExempt,
              sku: product.SKU,
            });
          });

          res.render("shop/cookbooks", {
            products,
            category: {
              description: category.Description,
              imgPath: category.ImagePath,
              websitePath: category.WebsitePath,
            },
            itemQuantity: req.body.itemQuantity,
            errors,
            uniqueUserID,
            cartSearchResults,
          });
        })
        .catch((error) => {
          console.log(`Display Error to user: ${error.toString()}`);
        });
    })();
  }

  async function getBakingPlanks(req, res) {
    const uniqueUserID = req.app.settings.uniqueID;
    console.log(req.app.settings.uniqueID);
    const request = new sql.Request();
    const pageResults = [];
    const itemResults = [];
    const smallPlanksResults = [];
    const largePlanksResults = [];
    const alderPlanksResults = [];
    const cartSearchResults = [];

    try {
      const smallPlanksCategoryQuery = await request.query(
        "SELECT * FROM [dbo].[Category] where [CategoryID] = 8"
      );

      const largePlanksCategoryQuery = await request.query(
        "SELECT * FROM [dbo].[Category] where [CategoryID] = 12"
      );

      const alderPlanksCategoryQuery = await request.query(
        "SELECT * FROM [dbo].[Category] where [CategoryID] = 13"
      );

      const smallPlanksCategory = smallPlanksCategoryQuery.recordset[0];
      const largePlanksCategory = largePlanksCategoryQuery.recordset[0];
      const alderPlanksCategory = alderPlanksCategoryQuery.recordset[0];

      const smallPlanksProductsQuery = await request.query(
        "SELECT * FROM [dbo].[Product] where [CategoryID] = 8"
      );

      const largePlanksProductsQuery = await request.query(
        "SELECT * FROM [dbo].[Product] where [CategoryID] = 12"
      );

      const alderPlanksProductsQuery = await request.query(
        "SELECT * FROM [dbo].[Product] where [CategoryID] = 13"
      );

      smallPlanksResults.push(smallPlanksProductsQuery.recordset[0]);
      smallPlanksResults.push(smallPlanksProductsQuery.recordset[1]);
      largePlanksResults.push(largePlanksProductsQuery.recordset[0]);
      largePlanksResults.push(largePlanksProductsQuery.recordset[1]);
      alderPlanksResults.push(alderPlanksProductsQuery.recordset[0]);
      alderPlanksResults.push(alderPlanksProductsQuery.recordset[1]);

      itemResults.push(smallPlanksCategory);
      itemResults.push(largePlanksCategory);
      itemResults.push(alderPlanksCategory);

      pageResults.push(smallPlanksResults);
      pageResults.push(largePlanksResults);
      pageResults.push(alderPlanksResults);

      // console.log(smallPlanksCategory);
      // console.log(pageResults);
      console.log(itemResults);

      // pageResults.push(smallPlanksProducts);
      // console.log(pageResults[0]);

      res.render("shop/bakingPlanks", {
        pageResults,
        smallPlanksResults,
        largePlanksResults,
        alderPlanksResults,
        itemResults,
        smallCategory: {
          description: smallPlanksCategory.Description,
          imgPath: smallPlanksCategory.ImagePath,
          websitePath: smallPlanksCategory.WebsitePath,
        },
        largeCategory: {
          description: largePlanksCategory.Description,
          imgPath: largePlanksCategory.ImagePath,
          websitePath: largePlanksCategory.WebsitePath,
        },
        alderCategory: {
          description: alderPlanksCategory.Description,
          imgPath: alderPlanksCategory.ImagePath,
          websitePath: alderPlanksCategory.WebsitePath,
        },
        itemQuantity: req.body.itemQuantity,
        errors,
        uniqueUserID,
        cartSearchResults,
      });
    } catch {
      /**/
    }
  }

  function getBBQPlanks(req, res) {
    const uniqueUserID = req.app.settings.uniqueID;
    (async () => {
      const cartSearchResults = [];
      const request = new sql.Request();

      const categoryInfo = await request.query(
        "SELECT * FROM [dbo].[Category] where [CategoryID] = 10"
      );

      const category = categoryInfo.recordset[0];

      request
        .input("itemQuantity", sql.Int, req.body.itemQuantity)
        .query("SELECT * FROM [dbo].[Product] where [CategoryID] = 10")
        .then((results) => {
          const products = [];

          results.recordset.forEach((product) => {
            products.push({
              productID: product.ProductID,
              categoryID: product.CategoryID,
              name: product.Name,
              description: product.Description,
              price: product.Price,
              priceDescription: product.PriceDescription,
              sortOrder: product.SortOrder,
              active: product.Status,
              ounces: product.Ounces,
              imgPath: product.ImagePath,
              handlingCost: product.HandlingCost,
              tax: product.TaxExempt,
              sku: product.SKU,
            });
          });

          res.render("shop/bbqPlanks", {
            products,
            category: {
              description: category.Description,
              imgPath: category.ImagePath,
              websitePath: category.WebsitePath,
            },
            itemQuantity: req.body.itemQuantity,
            errors,
            uniqueUserID,
            cartSearchResults,
          });
        })
        .catch((error) => {
          console.log(`Display Error to user: ${error.toString()}`);
        });
    })();
  }

  function getNutDriver(req, res) {
    const uniqueUserID = req.app.settings.uniqueID;
    (async () => {
      const cartSearchResults = [];
      const request = new sql.Request();

      const categoryInfo = await request.query(
        "SELECT * FROM [dbo].[Category] where [CategoryID] = 11"
      );

      const category = categoryInfo.recordset[0];

      request
        .input("itemQuantity", sql.Int, req.body.itemQuantity)
        .query("SELECT * FROM [dbo].[Product] where [CategoryID] = 11")
        .then((results) => {
          const products = [];

          results.recordset.forEach((product) => {
            products.push({
              productID: product.ProductID,
              categoryID: product.CategoryID,
              name: product.Name,
              description: product.Description,
              price: product.Price,
              priceDescription: product.PriceDescription,
              sortOrder: product.SortOrder,
              active: product.Status,
              ounces: product.Ounces,
              imgPath: product.ImagePath,
              handlingCost: product.HandlingCost,
              tax: product.TaxExempt,
              sku: product.SKU,
            });
          });

          res.render("shop/nutDriver", {
            products,
            category: {
              description: category.Description,
              imgPath: category.ImagePath,
              websitePath: category.WebsitePath,
            },
            itemQuantity: req.body.itemQuantity,
            errors,
            uniqueUserID,
            cartSearchResults,
          });
        })
        .catch((error) => {
          console.log(`Display Error to user: ${error.toString()}`);
        });
    })();
  }

  function postAddToCart(req, res) {
    const uniqueUserID = req.app.settings.uniqueID;
    console.log(uniqueUserID);
    (async () => {
      const request = new sql.Request();
      const valErrors = validationResult(req);
      errors = valErrors.array();
      const products = [];
      const cartSearchResults = [];
      const orderItemResults = [];
      const pageResults = [];
      const itemResults = [];
      const smallPlanksResults = [];
      const largePlanksResults = [];
      const alderPlanksResults = [];

      const smallPlanksCategoryQuery = await request.query(
        "SELECT * FROM [dbo].[Category] where [CategoryID] = 8"
      );

      const largePlanksCategoryQuery = await request.query(
        "SELECT * FROM [dbo].[Category] where [CategoryID] = 12"
      );

      const alderPlanksCategoryQuery = await request.query(
        "SELECT * FROM [dbo].[Category] where [CategoryID] = 13"
      );

      const smallPlanksCategory = smallPlanksCategoryQuery.recordset[0];
      const largePlanksCategory = largePlanksCategoryQuery.recordset[0];
      const alderPlanksCategory = alderPlanksCategoryQuery.recordset[0];

      const smallPlanksProductsQuery = await request.query(
        "SELECT * FROM [dbo].[Product] where [CategoryID] = 8"
      );

      const largePlanksProductsQuery = await request.query(
        "SELECT * FROM [dbo].[Product] where [CategoryID] = 12"
      );

      const alderPlanksProductsQuery = await request.query(
        "SELECT * FROM [dbo].[Product] where [CategoryID] = 13"
      );

      smallPlanksResults.push(smallPlanksProductsQuery.recordset[0]);
      smallPlanksResults.push(smallPlanksProductsQuery.recordset[1]);
      largePlanksResults.push(largePlanksProductsQuery.recordset[0]);
      largePlanksResults.push(largePlanksProductsQuery.recordset[1]);
      alderPlanksResults.push(alderPlanksProductsQuery.recordset[0]);
      alderPlanksResults.push(alderPlanksProductsQuery.recordset[1]);

      itemResults.push(smallPlanksCategory);
      itemResults.push(largePlanksCategory);
      itemResults.push(alderPlanksCategory);

      pageResults.push(smallPlanksResults);
      pageResults.push(largePlanksResults);
      pageResults.push(alderPlanksResults);

      const categoryInfo = await request
        .input("productCategoryIDCategoryInfo", sql.Int, req.body.prodCategoryID)
        .query("SELECT * FROM [dbo].[Category] where [CategoryID] = @productCategoryIDCategoryInfo");

      const category = categoryInfo.recordset[0];

      const getCart = await request
        .input("cartUniqueIDOld", sql.NVarChar, req.app.settings.uniqueID)
        .query(
          "SELECT OrderCartID FROM [dbo].[OrderCart] where [UniqueIdentifier] = @cartUniqueIDOld"
        );

      const userCartIDIsUndefindedOrOld = getCart.recordset[0];
      cartSearchResults.push(userCartIDIsUndefindedOrOld);
      console.log(cartSearchResults);

      // const getURL = await request
      //   .input("categoryIDGetURL", sql.NVarChar, req.body.prodCategoryID)
      //   .query(
      //     "SELECT WebsitePath FROM dbo.Category WHERE CategoryID = @categoryIDGetURL"
      //   ).catch((error) => {
      //     console.log(`Display Error to user: ${error.toString()}`);
      //   });

      // const pageURL = getURL.recordset[0];
      // console.log(pageURL);

      if (userCartIDIsUndefindedOrOld === undefined) {
        console.log("OrderCartID is: 'undefined'");
        request
          .input("uniqueIDInsertGet", sql.NVarChar, req.app.settings.uniqueID)
          .query(
            "INSERT INTO [dbo].[OrderCart]([Status],[Notes],[PurchaseDate],[History],[Taxes],[OrderTotal],[ShippingFirstName],[ShippingLastName],[ShippingAddress1],[ShippingAddress2],[ShippingCity],[ShippingState],[ShippingPostalCode],[ShippingPhone],[ShippingEmail],[BillingAddress1],[BillingAddress2],[BillingCity],[BillingState],[BillingPostalCode],[UniqueIdentifier],[WebsiteID],[DateCreated],[BillingFirstName],[BillingLastName],[BillingPhone],[BillingEmail],[ShippingCountry],[BillingCountry],[AuthorizationCode],[TransactionID],[ShippingValidation],[ShippingCost],[ShippingType],[CreditCardType]) VALUES (1,NULL,NULL,NULL,NULL,NULL,NULL, NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,@uniqueIDInsertGet,1,GetDate(),'Eric','Craigen',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL)"
          )
          .catch((error) => {
            console.log(`Display Error to user: ${error.toString()}`);
          });
        const getCartNew = await request
          .input("cartUniqueIDNew", sql.NVarChar, req.app.settings.uniqueID)
          .query(
            "SELECT OrderCartID FROM [dbo].[OrderCart] where [UniqueIdentifier] = @cartUniqueIDNew"
          );
        const userCartIDNew = getCartNew.recordset[0].OrderCartID;
        cartSearchResults.push(userCartIDNew);
        console.log(cartSearchResults);

        console.log(
          `Cart has been created and OrderCartID is: ${cartSearchResults[1]}`
        );
      } else {
        const getCartOld = await request
          .input("cartUniqueIDNew", sql.NVarChar, req.app.settings.uniqueID)
          .query(
            "SELECT OrderCartID FROM [dbo].[OrderCart] where [UniqueIdentifier] = @cartUniqueIDNew"
          );
        const userCartIDOld = getCartOld.recordset[0].OrderCartID;
        cartSearchResults.push(userCartIDOld);
        console.log(cartSearchResults);
        console.log(
          `Cart is already Created and OrderCartID is: ${cartSearchResults[1]}`
        );
      }

      const getItemQty = await request
        .input("productCategoryIDGetQty", sql.Int, req.body.productID)
        .query("SELECT [ProductID] FROM [dbo].[OrderItem] where [ProductID] = @productCategoryIDGetQty");

      const isQty = getItemQty.recordset[0];
      cartSearchResults.push(isQty);
      console.log(cartSearchResults);

      if (isQty !== undefined) {
        const getOrderID = await request
          .input("orderCartIDGetItem", sql.Int, cartSearchResults[1])
          .input("productIDGetItem", sql.Int, req.body.productID)
          .query(
            "SELECT * FROM [dbo].[OrderItem] WHERE [OrderCartID] = @orderCartIDGetItem AND [ProductID] = @productIDGetItem"
          );

        const isItemInCart = getOrderID.recordset[0];
        orderItemResults.push(isItemInCart);
        console.log(orderItemResults[0]);
      }

      await request
        .input("productCategoryIDResult", sql.Int, req.body.prodCategoryID)
        .query("SELECT * FROM [dbo].[Product] WHERE [CategoryID] = @productCategoryIDResult")
        .then((results) => {
          results.recordset.forEach((product) => {
            products.push({
              productID: product.ProductID,
              categoryID: product.CategoryID,
              name: product.Name,
              description: product.Description,
              price: product.Price,
              priceDescription: product.PriceDescription,
              sortOrder: product.SortOrder,
              active: product.Status,
              ounces: product.Ounces,
              imgPath: product.ImagePath,
              handlingCost: product.HandlingCost,
              tax: product.TaxExempt,
              sku: product.SKU,
            });
          });
        });

      const pageURL = req.body.categoryUrl;

      if (errors.length !== 0) {
        res.render(`shop${pageURL}`, {
          products,
          category: {
            categoryID: category.CategoryID,
            description: category.Description,
            imgPath: category.ImagePath,
            websitePath: category.WebsitePath,
          },
          itemQuantity: req.body.itemQuantity,
          uniqueUserID,
          cartSearchResults,
          orderItemResults,
          errors,
          pageResults,
          smallPlanksResults,
          largePlanksResults,
          alderPlanksResults,
          itemResults,
          smallCategory: {
            description: smallPlanksCategory.Description,
            imgPath: smallPlanksCategory.ImagePath,
            websitePath: smallPlanksCategory.WebsitePath,
          },
          largeCategory: {
            description: largePlanksCategory.Description,
            imgPath: largePlanksCategory.ImagePath,
            websitePath: largePlanksCategory.WebsitePath,
          },
          alderCategory: {
            description: alderPlanksCategory.Description,
            imgPath: alderPlanksCategory.ImagePath,
            websitePath: alderPlanksCategory.WebsitePath,
          },
        });
      }
      if (errors.length === 0) {
        request
          .input("uniqueIDUpdate", sql.NVarChar, req.body.userID)
          .query(
            "UPDATE [dbo].[OrderCart] SET [Status] = 1, [Notes] = 'created', [PurchaseDate] = NULL, [History] = NULL, [Taxes] = NULL, [OrderTotal] = NULL, [ShippingFirstName] = NULL, [ShippingLastName] = NULL, [ShippingAddress1] = NULL, [ShippingAddress2] = NULL, [ShippingCity] = NULL, [ShippingState] = NULL, [ShippingPostalCode] = NULL, [ShippingPhone] = NULL, [ShippingEmail] = NULL, [BillingAddress1] = NULL, [BillingAddress2] = NULL, [BillingCity] = NULL, [BillingState] = NULL, [BillingPostalCode] = NULL, [UniqueIdentifier] = @uniqueIDUpdate, [WebsiteID] = 1, [DateCreated] = GetDate(), [BillingFirstName] = 'Eric', [BillingLastName] = 'Craigen', [BillingPhone] = NULL, [BillingEmail] = NULL, [ShippingCountry] = NULL, [BillingCountry] = NULL, [AuthorizationCode] = NULL, [TransactionID] = NULL, [ShippingValidation] = NULL, [ShippingCost] = NULL, [ShippingType] = NULL, [CreditCardType] = NULL WHERE [UniqueIdentifier] = @uniqueIDUpdate"
          )
          .catch((error) => {
            console.log(`Display Error to user: ${error.toString()}`);
          });
        console.log(`body.userCartID: ${req.body.usersCartID}`);
        if (cartSearchResults === undefined || orderItemResults[0] === undefined) {
          request
            .input("itemQuantity", sql.Int, req.body.itemQuantity)
            .input("productID", sql.Int, req.body.productID)
            .input("usersCartID", sql.Int, cartSearchResults[1])
            .query(
              "INSERT INTO [dbo].[OrderItem] ([ProductID],[OrderCartID],[Qty]) VALUES (@productID,@usersCartID,@itemQuantity)"
            )
            .catch((error) => {
              console.log(`Display Error to user: ${error.toString()}`);
            });
        } else {
          request
            .input("itemQuantity", sql.Int, req.body.itemQuantity)
            .input("productID", sql.Int, req.body.productID)
            .input("usersCartID", sql.Int, cartSearchResults[1])
            .query(
              "UPDATE [dbo].[OrderItem] SET [Qty] = @itemQuantity WHERE [ProductID] = @productID AND [OrderCartID] = @usersCartID"
            )
            .catch((error) => {
              console.log(`Display Error to user: ${error.toString()}`);
            });
        }
        res.render(`shop${pageURL}`, {
          products,
          category: {
            categoryID: category.CategoryID,
            description: category.Description,
            imgPath: category.ImagePath,
            websitePath: category.WebsitePath,
          },
          itemQuantity: req.body.itemQuantity,
          uniqueUserID,
          cartSearchResults,
          errors,
          pageResults,
          smallPlanksResults,
          largePlanksResults,
          alderPlanksResults,
          itemResults,
          smallCategory: {
            description: smallPlanksCategory.Description,
            imgPath: smallPlanksCategory.ImagePath,
            websitePath: smallPlanksCategory.WebsitePath,
          },
          largeCategory: {
            description: largePlanksCategory.Description,
            imgPath: largePlanksCategory.ImagePath,
            websitePath: largePlanksCategory.WebsitePath,
          },
          alderCategory: {
            description: alderPlanksCategory.Description,
            imgPath: alderPlanksCategory.ImagePath,
            websitePath: alderPlanksCategory.WebsitePath,
          },
        });
      }
    })();
  }

  return {
    getShop,
    getSpiceRubs,
    getCookbooks,
    getBakingPlanks,
    getBBQPlanks,
    getNutDriver,
    postAddToCart,
  };
}

module.exports = shopController;
