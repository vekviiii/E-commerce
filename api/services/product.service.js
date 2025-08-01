import Product from "../models/product.model.js";

export const createProduct = async (productData) => {
  if (!productData) {
    throw new Error("no product data provided");
  }

  const response = await Product.create(productData);
  return response;
};

export const getProducts = async () => {
  const products = await Product.find();
  return products;
};

export const getFilteredProducts = async (queryParams) => {
  const queryObj = { ...queryParams };
  const excludedFields = ["page", "limit", "sort", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);

  // Advanced filters (price[gte], rating[lte], etc.)
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt|in)\b/g, (match) => `$${match}`);
  const filters = JSON.parse(queryStr);

  let query = Product.find(filters);

  // Sorting
  if (queryParams.sort) {
    const sortBy = queryParams.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  // Field limiting
  if (queryParams.fields) {
    const fields = queryParams.fields.split(",").join(" ");
    query = query.select(fields);
  } else {
    query = query.select("-__v");
  }

  // Pagination
  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || 10;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  // Execute
  const [products, total] = await Promise.all([
    query.exec(),
    Product.countDocuments(filters),
  ]);

  return {
    total,
    page,
    limit,
    count: products.length,
    products,
  };
};

export const deleteProductById = async (id) => {
  const result = await Product.findByIdAndDelete(id);
  if (!result) throw new Error("Product not found");
  return result;
};

export const updateProduct = async (id, updateData) => {
  if (!id) {
    throw new Error("Product ID is required");
  }

  const result = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  });

  if (!result) {
    throw new Error("Product not found or no changes made");
  }
  return result;
};

export const getProductById = async (_id) => {
  if (!_id) {
    throw new Error("Product ID is required");
  }

  const product = await Product.findById(_id);
  return product;
};

// Search products by keyword, category, price range, and sorting
export const searchProducts = async (filters) => {
  const {
    keyword,
    category,
    priceMin,
    priceMax,
    sort = "createdAt_desc",
    page = 1,
    limit = 10,
  } = filters;

  const query = {};

  // Keyword Search: name or description
  if (keyword) {
    query.$or = [
      { name: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ];
  }

  if (category) query.category = category;
  if (priceMin || priceMax) {
    query.price = {};
    if (priceMin) query.price.$gte = Number(priceMin);
    if (priceMax) query.price.$lte = Number(priceMax);
  }

  // Sorting
  const sortOptions = {
    price_asc: { price: 1 },
    price_desc: { price: -1 },
    rating_desc: { rating: -1 },
    createdAt_desc: { createdAt: -1 },
  };

  const sortBy = sortOptions[sort] || sortOptions["createdAt_desc"];

  const products = await Product.find(query)
    .sort(sortBy)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  return products;
};