import { Request, Response } from "express";
import ProductModel from "../models/Product";

export const fetchProducts = async (req: Request, res: Response) => {
  try {
    const { minRAM, maxRAM, minCPU, maxCPU } = req.query;

    const filter: any = {};

    if (minRAM || maxRAM) {
      filter.memoryAsNumber = {};

      if (minRAM) {
        filter.memoryAsNumber.$gte = parseInt(minRAM as string);
      }
      if (maxRAM) {
        filter.memoryAsNumber.$lte = parseInt(maxRAM as string);
      }
    }

    if (minCPU || maxCPU) {
      filter.vcpuAsNumber = {};

      if (minCPU) {
        filter.vcpuAsNumber.$gte = parseInt(minCPU as string);
      }
      if (maxCPU) {
        filter.vcpuAsNumber.$lte = parseInt(maxCPU as string);
      }
    }

    const filterAggregation = (filter: object) => {
      return ProductModel.aggregate([
        {
          $addFields: {
            vcpuAsNumber: { $toInt: "$vcpu" },
            memoryAsNumber: {
              $toDouble: {
                $replaceAll: {
                  input: "$memory",
                  find: " GiB",
                  replacement: "",
                },
              },
            },
          },
        },
        {
          $match: filter,
        },
        {
          $group: {
            _id: { vcpu: "$vcpu", memory: "$memory", vcpuAsNumber: "$vcpuAsNumber", memoryAsNumber: "$memoryAsNumber" },
            instances: {
              $push: {
                _id: "$_id",
                instance_type: "$instance_type",
                location: "$location",
                price_per_unit: "$price_per_unit",
                unit: "$unit",
              },
            },
          },
        },
        {
          $project: {
            vcpuAsNumber: "$_id.vcpuAsNumber",
            memoryAsNumber: "$_id.memoryAsNumber",
            vcpu: "$_id.vcpu",
            memory: "$_id.memory",
            instances: 1,
            _id: 0,
          },
        },
        {
            $sort: { memoryAsNumber: 1, vcpuAsNumber: 1}
        },
        {
            $unset: ["memoryAsNumber", "vcpuAsNumber"]
        }
      ]);
    };

    const result = await filterAggregation(filter);

    res.status(200).json({
      success: true,
      data: result || [],
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
