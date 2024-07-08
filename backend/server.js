const express = require("express");
const dotenv = require("dotenv").config();
const connectToMongo = require("./middlewares/connectToMongo");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const User = require("./Schemas/UserSchema");
const Product = require("./Schemas/ProductSchema");
const Order = require("./Schemas/OrderSchema");
const app = express();
app.use(express.json());
app.use(cors());
app.post("/api/signup", connectToMongo, async (req, res) => {
  try {
    let db = await User.find({ email: req.body.email });
    console.log(db);
    if (db.length == 0) {
      let db = await User.create({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
      });
      res.json({ type: "success", msg: "User Register Successfully" });
    } else {
      res.json({ type: "alert", msg: "Username Already Exists" });
    }
  } catch (e) {
    // let obj= {
    //     code:e.errorResponse.code || "",
    //     msg:e.errorResponse.errmsg
    // }
    console.log(e);
    res.json({ type: "alert", msg: e.errorResponse.errmsg, error: e });
  }
});
app.post("/api/login", connectToMongo, async (req, res) => {
  let db = await User.find({ email: req.body.email });
  console.log({
    type: "success",
    msg: "Login Successfully",
    data: {
      token: await jwt.sign({ email: req.body.email }, "JWT_SHOPEASE"),
      username: req.body.fullName,
      email: req.body.email,
    },
  });
  db.length != 0
    ? db[0].password === req.body.password
      ? res.json({
          type: "success",
          msg: "Login Successfully",
          data: {
            token: await jwt.sign({ email: req.body.email }, "JWT_SHOPEASE"),
            username: db[0].fullName,
            email: req.body.email,
            activationStatus: db[0].activationStatus,
            isAdmin: db[0].isAdmin,
          },
        })
      : res.json({ msg: "Invalid Username and Password" })
    : res.json({ msg: "Invalid Username and Password" });
});

// app.post('/api/addorder',connectToMongo,async (req,res)=>{

// }
app.post("/api/addorder", connectToMongo, async (req, res) => {
  const {
    customerName,
    email,
    address,
    city,
    state,
    zipCode,
    paidAmount,
    products,
  } = req.body;
  try {
    const prefix = "ORD"; // Prefix for the order number
    const timestamp = Date.now(); // Current timestamp
    const randomString = Math.random().toString(36).substring(2, 10); // Random alphanumeric string

    // Concatenate the components to create the order number
    const orderNumber = `${prefix}-${timestamp}-${randomString}`;
    let db = await Order.create({
      orderNumber,
      customerName,
      email,
      address,
      city,
      state,
      zipCode,
      paidAmount,
      products,
    });
    res.json({ type: "success", msg: "Order Created" });
  } catch (e) {
    res.json({ type: "alert", msg: "Something Went Wrong", error: e });
  }
});
app.get("/api/orders", connectToMongo, async (req, res) => {
  let db = await Order.find();
  res.json({ orders: db });
});
app.post("/api/getorders", connectToMongo, async (req, res) => {
  let db = await Order.find({ email: req.body.email });
  res.json({ orders: db });
});
app.post("/api/changeorders", connectToMongo, async (req, res) => {
  try {
    let db = await Order.updateOne(
      { orderNumber: req.body.orderNumber },
      { status: req.body.status }
    );
    // console.log(req.body.orderNumber)
    // console.log(req.body.status)
    // let db= await Order.find({orderNumber:req.body.orderNumber})
    console.log(db)
    res.json({ type: "success", msg: "Status Changed" });
  } catch (e) {
    res.json({ error: "Status Couldn't be Changed", e });
  }
});
app.post("/api/addProduct", connectToMongo, async (req, res) => {
  try {
    let db = await Product.create({
      name: req.body.name,
      description: req.body.description,
      availableColors: req.body.availableColors,
      sizes: req.body.sizes,
      category: req.body.category,
      img: req.body.img,
      price: req.body.price,
      brand: req.body.brand,
      slug: req.body.slug,
    });
    res.json({ type: "success", msg: "Product Added" });
  } catch (e) {
    res.json({ type: "alert", msg: "Something Went Wrong", error: e });
  }
});
app.get("/api/products", connectToMongo, async (req, res) => {
  // let db= await User.find({email:req.body.email})
  // db.length!=0?db[0].password===req.body.password?res.send(await jwt.sign({email:req.body.email},"JWT_SHOPEASE")):res.send("Invalid Username and Password"):res.send("Invalid Username and Password")
  let products={products:[{
      name: "Smartphone XYZ",
      description: "Experience the latest technology with our Smartphone XYZ. Packed with advanced features and a sleek design, it's perfect for staying connected on the go.",
      availableColors: ["Black", "White", "Blue"],
      sizes: ["64GB", "128GB", "256GB"],
      category: "Electronics",
      img: "https://images.unsplash.com/photo-1580967928120-d14da16c945f",
      price: 799.99,
      stars: 4.5,
      brand: "XYZ",
      slug: "smartphone-xyz-afjdfjjfioewr174639"
    },
    {
      name: "Men's Casual Shirt",
      description: "Look stylish and feel comfortable in our Men's Casual Shirt. Made from high-quality fabric and available in various sizes and colors, it's perfect for any casual occasion.",
      availableColors: ["Blue", "White", "Gray"],
      sizes: ["M", "L", "XL"],
      category: "Men's Fashion",
      img: "https://images.unsplash.com/photo-1591188284886-b03225c1531d",
      price: 29.99,
      stars: 4.2,
      brand: "Fashionista",
      slug: "mens-casual-shirt-afjdfjjfioewr174639"
    },
    {
      name: "Organic Groceries Bundle",
      description: "Stay healthy and support sustainable farming with our Organic Groceries Bundle. Packed with fresh, locally sourced produce, it's the perfect choice for eco-conscious consumers.",
      availableColors: [],
      sizes: ["Standard"],
      category: "Grocery",
      img: "https://images.unsplash.com/photo-1551463251-5a44a8477e09",
      price: 49.99,
      stars: 4.8,
      brand: "Organic Farms",
      slug: "organic-groceries-bundle-afjdfjjfioewr174639"
    },
    {
      name: "Women's Designer Dress",
      description: "Elevate your wardrobe with our Women's Designer Dress. Crafted with precision and attention to detail, it's the epitome of style and sophistication.",
      availableColors: ["Red", "Black", "White"],
      sizes: ["S", "M", "L"],
      category: "Women's Fashion",
      img: "https://images.unsplash.com/photo-1589770297492-8a77e9b562d3",
      price: 129.99,
      stars: 4.7,
      brand: "Designer Trends",
      slug: "womens-designer-dress-afjdfjjfioewr174639"
    },
    {
      name: "Smart LED TV",
      description: "Transform your entertainment experience with our Smart LED TV. Featuring stunning visuals and immersive sound, it's perfect for movie nights and gaming sessions.",
      availableColors: ["Black"],
      sizes: ["32 inches", "42 inches", "55 inches"],
      category: "Electronics",
      img: "https://images.unsplash.com/photo-1590078484589-b0e75f17044c",
      price: 699.99,
      stars: 4.6,
      brand: "TechVision",
      slug: "smart-led-tv-afjdfjjfioewr174639"
    },
    {
      name: "Kitchen Appliance Set",
      description: "Upgrade your kitchen with our Appliance Set. Includes a blender, toaster, and coffee maker, all designed to simplify your cooking experience.",
      availableColors: ["Stainless Steel"],
      sizes: ["Standard"],
      category: "Home Appliances",
      img: "https://images.unsplash.com/photo-1613494871143-560aad8444d8",
      price: 149.99,
      stars: 4.4,
      brand: "KitchenMaster",
      slug: "kitchen-appliance-set-afjdfjjfioewr174639"
    },
    {
      name: "Bestseller Novel Bundle",
      description: "Dive into a world of adventure and imagination with our Bestseller Novel Bundle. Includes top-rated titles from various genres, perfect for avid readers.",
      availableColors: [],
      sizes: ["Standard"],
      category: "Books",
      img: "https://images.unsplash.com/photo-1606445276256-550610cc392b",
      price: 39.99,
      stars: 4.9,
      brand: "BookBazaar",
      slug: "bestseller-novel-bundle-afjdfjjfioewr174639"
    },
    {
      name: "Fitness Tracker",
      description: "Monitor your health and achieve your fitness goals with our Fitness Tracker. With advanced tracking features and a sleek design, it's your perfect workout companion.",
      availableColors: ["Black", "Blue", "Pink"],
      sizes: ["Standard"],
      category: "Electronics",
      img: "https://images.unsplash.com/photo-1590368148046-7cfcf4a15795",
      price: 59.99,
      stars: 4.3,
      brand: "FitPro",
      slug: "fitness-tracker-afjdfjjfioewr174639"
    },
    {
      name: "Fresh Fruit Basket",
      description: "Indulge in nature's goodness with our Fresh Fruit Basket. Handpicked and delivered straight to your doorstep, it's the perfect way to enjoy a healthy snack.",
      availableColors: [],
      sizes: ["Standard"],
      category: "Grocery",
      img: "https://images.unsplash.com/photo-1600881452611-f8799b19ad29",
      price: 19.99,
      stars: 4.8,
      brand: "FreshHarvest",
      slug: "fresh-fruit-basket-afjdfjjfioewr174639"
    },
    {
      name: "Designer Handbag",
      description: "Add a touch of luxury to your outfit with our Designer Handbag. Made from premium materials and crafted with precision, it's a must-have accessory for any fashion enthusiast.",
      availableColors: ["Black", "Brown", "Red"],
      sizes: ["Standard"],
      category: "Women's Fashion",
      img: "https://images.unsplash.com/photo-1611750294950-7ecbb939c7f7",
      price: 249.99,
      stars: 4.7,
      brand: "LuxuryStyle",
      slug: "designer-handbag-afjdfjjfioewr174639"
    }]}
  try {
    let a = await Product.find();
    console.log(a);
    res.json({ products: a });
  } catch (e) {
    console.log(e);
    res.json(e);
  }
});

app.get("/all", connectToMongo, (req, res) => {
  let products = {
    products: [
      {
        name: "Smartphone XYZ",
        description:
          "Experience the latest technology with our Smartphone XYZ. Packed with advanced features and a sleek design, it's perfect for staying connected on the go.",
        availableColors: ["Black", "White", "Blue"],
        sizes: ["64GB", "128GB", "256GB"],
        category: "Electronics",
        img: "https://images.unsplash.com/photo-1580967928120-d14da16c945f",
        price: 799.99,
        stars: 4.5,
        brand: "XYZ",
        slug: "smartphone-xyz-afjdfjjfioewr174639",
      },
      {
        name: "Men's Casual Shirt",
        description:
          "Look stylish and feel comfortable in our Men's Casual Shirt. Made from high-quality fabric and available in various sizes and colors, it's perfect for any casual occasion.",
        availableColors: ["Blue", "White", "Gray"],
        sizes: ["M", "L", "XL"],
        category: "Men's Fashion",
        img: "https://images.unsplash.com/photo-1591188284886-b03225c1531d",
        price: 29.99,
        stars: 4.2,
        brand: "Fashionista",
        slug: "mens-casual-shirt-afjdfjjfioewr174639",
      },
      {
        name: "Organic Groceries Bundle",
        description:
          "Stay healthy and support sustainable farming with our Organic Groceries Bundle. Packed with fresh, locally sourced produce, it's the perfect choice for eco-conscious consumers.",
        availableColors: [],
        sizes: ["Standard"],
        category: "Grocery",
        img: "https://images.unsplash.com/photo-1551463251-5a44a8477e09",
        price: 49.99,
        stars: 4.8,
        brand: "Organic Farms",
        slug: "organic-groceries-bundle-afjdfjjfioewr174639",
      },
      {
        name: "Women's Designer Dress",
        description:
          "Elevate your wardrobe with our Women's Designer Dress. Crafted with precision and attention to detail, it's the epitome of style and sophistication.",
        availableColors: ["Red", "Black", "White"],
        sizes: ["S", "M", "L"],
        category: "Women's Fashion",
        img: "https://images.unsplash.com/photo-1589770297492-8a77e9b562d3",
        price: 129.99,
        stars: 4.7,
        brand: "Designer Trends",
        slug: "womens-designer-dress-afjdfjjfioewr174639",
      },
      {
        name: "Smart LED TV",
        description:
          "Transform your entertainment experience with our Smart LED TV. Featuring stunning visuals and immersive sound, it's perfect for movie nights and gaming sessions.",
        availableColors: ["Black"],
        sizes: ["32 inches", "42 inches", "55 inches"],
        category: "Electronics",
        img: "https://images.unsplash.com/photo-1590078484589-b0e75f17044c",
        price: 699.99,
        stars: 4.6,
        brand: "TechVision",
        slug: "smart-led-tv-afjdfjjfioewr174639",
      },
      {
        name: "Kitchen Appliance Set",
        description:
          "Upgrade your kitchen with our Appliance Set. Includes a blender, toaster, and coffee maker, all designed to simplify your cooking experience.",
        availableColors: ["Stainless Steel"],
        sizes: ["Standard"],
        category: "Home Appliances",
        img: "https://images.unsplash.com/photo-1613494871143-560aad8444d8",
        price: 149.99,
        stars: 4.4,
        brand: "KitchenMaster",
        slug: "kitchen-appliance-set-afjdfjjfioewr174639",
      },
      {
        name: "Bestseller Novel Bundle",
        description:
          "Dive into a world of adventure and imagination with our Bestseller Novel Bundle. Includes top-rated titles from various genres, perfect for avid readers.",
        availableColors: [],
        sizes: ["Standard"],
        category: "Books",
        img: "https://images.unsplash.com/photo-1606445276256-550610cc392b",
        price: 39.99,
        stars: 4.9,
        brand: "BookBazaar",
        slug: "bestseller-novel-bundle-afjdfjjfioewr174639",
      },
      {
        name: "Fitness Tracker",
        description:
          "Monitor your health and achieve your fitness goals with our Fitness Tracker. With advanced tracking features and a sleek design, it's your perfect workout companion.",
        availableColors: ["Black", "Blue", "Pink"],
        sizes: ["Standard"],
        category: "Electronics",
        img: "https://images.unsplash.com/photo-1590368148046-7cfcf4a15795",
        price: 59.99,
        stars: 4.3,
        brand: "FitPro",
        slug: "fitness-tracker-afjdfjjfioewr174639",
      },
      {
        name: "Fresh Fruit Basket",
        description:
          "Indulge in nature's goodness with our Fresh Fruit Basket. Handpicked and delivered straight to your doorstep, it's the perfect way to enjoy a healthy snack.",
        availableColors: [],
        sizes: ["Standard"],
        category: "Grocery",
        img: "https://images.unsplash.com/photo-1600881452611-f8799b19ad29",
        price: 19.99,
        stars: 4.8,
        brand: "FreshHarvest",
        slug: "fresh-fruit-basket-afjdfjjfioewr174639",
      },
      {
        name: "Designer Handbag",
        description:
          "Add a touch of luxury to your outfit with our Designer Handbag. Made from premium materials and crafted with precision, it's a must-have accessory for any fashion enthusiast.",
        availableColors: ["Black", "Brown", "Red"],
        sizes: ["Standard"],
        category: "Women's Fashion",
        img: "https://images.unsplash.com/photo-1611750294950-7ecbb939c7f7",
        price: 249.99,
        stars: 4.7,
        brand: "LuxuryStyle",
        slug: "designer-handbag-afjdfjjfioewr174639",
      },
    ],
  };
  console.log("Done 1");
  Product.create(products.products)
    .then(() => {
      console.log("Done 2");
      res.send("Products inserted successfully.");
    })
    .catch((err) => {
      console.log("Done 3");
      res.send("Error inserting products:", err);
    });
});
app.get("/api/:product", connectToMongo, async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.product });
    res.json({ product });
  } catch (e) {
    console.log(e);
    res.json(e);
  }
});
app.get("api/new", connectToMongo, async (req, res) => {
  let userCount = await User.aggregate([
    {
      $count: "users",
    },
  ]);
  console.log(userCount);
  res.json(userCount);
});

app.get("/names", connectToMongo, async (req, res) => {
  let name = await User.find();
  console.log(name);
  res.json({ name });
});

app.post("/api/edit/product", connectToMongo, async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.body.productID });
    let { name, description, availableColors, sizes, category, img, price } =
      req.body;
    try {
      let value = await Product.updateOne(
        { _id: req.body.productID },
        {
          name: name || product.name,
          description: description || product.description,
          availableColors: availableColors || product.availableColors,
          sizes: sizes || product.sizes,
          category: category || product.category,
          img: img || product.img,
          price: price || product.price,
        }
      );
      if (value.modifiedCount != 0) {
        res.json({ type: "success", msg: "Product Updated" });
      } else {
        res.json({ type: "alert", msg: "Something Went Wrong" });
      }
    } catch (e) {
      res.json({ error: "Product Couldn't Update", e });
    }
  } catch {
    res.json({ error: "Invalid Product ID " });
  }
});

app.post("/api/changeactivation/user", connectToMongo, async (req, res) => {
  try {
    let value = await User.findOneAndUpdate(
      { email: req.body.userID },
      { activationStatus: req.body.activationStatus }
    );
    if (value.modifiedCount != 0) {
      res.json({ type: "success", msg: "User Changed" });
    } else {
      res.json({ type: "alert", msg: "Something Went Wrong" });
    }
  } catch (e) {
    res.json({ error: "User Couldn't Updated ", e });
  }
});

app.post("/api/delete/product", connectToMongo, async (req, res) => {
  try {
    let value = await Product.findOneAndDelete({ _id: req.body.productID });
    if (value.modifiedCount != 0) {
      res.json({ type: "success", msg: "Product Removed" });
    } else {
      res.json({ type: "alert", msg: "Something Went Wrong" });
    }
  } catch (e) {
    console.log(e);
    res.json({ type: "alert", msg: "User Couldn't Be Removed" });
  }
});
app.post("/api/delete/user", connectToMongo, async (req, res) => {
  try {
    let value = await User.findOneAndDelete({ email: req.body.userID });
    if (value.modifiedCount != 0) {
      res.json({ type: "success", msg: "User Removed" });
    } else {
      res.json({ type: "alert", msg: "Something Went Wrong" });
    }
  } catch (e) {
    console.log(e);
    res.json({ error: "User Couldn't Removed ", e });
  }
});

app.listen(process.env.PORT || 80, () => {
  console.log("App is Running at port " + process.env.PORT);
});
