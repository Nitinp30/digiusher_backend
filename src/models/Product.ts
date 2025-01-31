import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    id: { type: String, required: true },
    unit: { type: String, required: true },
    price_per_unit: { type: String, required: true },
    vcpu: { type: String, required: true },
    memory: { type: String, required: true },
    location: { type: String, required: true },
    instance_type: { type: String, required: true }
}, { timestamps: true });

const ProductModel = mongoose.model("Product", ProductSchema);
export default ProductModel;
