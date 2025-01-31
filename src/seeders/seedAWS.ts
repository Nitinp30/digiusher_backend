import ProductModel from "../models/Product";
import axios from "axios";

export const seedAWSData = async () => {
    try {
      const url =
        "https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonRDS/20250113201859/eu-west-1/index.json";
      const { data } = await axios.get(url);
  
      const onDemand = data.terms.OnDemand;
      let products = [];
  
      for (let productId in data.products) {
        const product = data.products[productId];
  
        if (product.productFamily !== "Database Instance") continue;
  
        const attributes = product.attributes;
        const onDemandPricingData = onDemand[productId];
  
        for (let subtype in onDemandPricingData) {
          for (let dimension in onDemandPricingData[subtype].priceDimensions) {
            let priceData =
              onDemandPricingData[subtype].priceDimensions[dimension];
  
            products.push({
              id: priceData.rateCode,
              unit: priceData.unit,
              price_per_unit: priceData.pricePerUnit.USD,
              vcpu: attributes.vcpu,
              memory: attributes.memory,
              location: attributes.location,
              instance_type: attributes.instanceType,
            });
          }
        }
      }
      await ProductModel.deleteMany({});

      await ProductModel.insertMany(products);
      console.log(`Inserted ${products.length} records into MongoDB`);
    } catch (error: any) {
        console.error("Error seeding AWS data:", error.message);
    }
  };
  