const mongoose = require('mongoose')
let productSchema= new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    availableColors:{type:Array,required:true},
    sizes:{type:Array,required:true},
    category:{type:String,required:true},
    img:{type:String,required:true},
    price:{type:String,required:true},
    stars:{type:Number,default:0},
    brand:{type:String,required:true},
    reviewed:{type:Array,default:[]},
    comments:{type:Object, default:{}},
    // name: "Smartphone XYZ",
    // description: "Experience the latest technology with our Smartphone XYZ. Packed with advanced features and a sleek design, it's perfect for staying connected on the go.",
    // availableColors: ["Black", "White", "Blue"],
    // sizes: ["64GB", "128GB", "256GB"],
    // category: "Electronics",
    // img: "https://images.unsplash.com/photo-1580967928120-d14da16c945f",
    // price: 799.99,
    // stars: 4.5,
    // brand: "XYZ",
    // slug: "smartphone-xyz-afjdfjjfioewr174639"
})
const Product = mongoose.model('products', productSchema);
module.exports= Product