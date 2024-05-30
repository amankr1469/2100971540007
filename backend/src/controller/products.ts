import asyncHandler from "../../utils/catchAsyncAwait";


exports.getAllProducts = asyncHandler(async (req, res, next) => {
    const resultPerPage = 8;
    const productsCount = await Product.countDocuments();
  
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter();
      
    let products = await apiFeature.query;
  
    let filteredProductsCount = products.length;
  
    apiFeature.pagination(resultPerPage);
  
       res.status(200).json({
          success: true,
          products,
          productsCount,
          resultPerPage,
          filteredProductsCount
       });
  });