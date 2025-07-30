const { transactionModel } = require("../models/transaction");
const { buyerModel } = require("../models/buyer");
const { farmerModel } = require("../models/farmer");
const { calculatecharges } = require('../utils/calculatecharges')
const { z } = require("zod");


const transactionSchema = z.object({
  farmerId: z.string(),
  buyerId: z.string(),
  items: z.array(
    z.object({
      itemName: z.string(),
      totalWeight: z.number().positive(),
      pricePer20Kg: z.number().positive(),
      totalBags: z.number().int().positive()
    })
  )
});

async function createTransaction(req, res) {
  const parsed = transactionSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error });
  }

  const { farmerId, buyerId, items } = parsed.data;

  try {
    const farmer = await farmerModel.findById(farmerId);
    const buyer = await buyerModel.findById(buyerId);

    if (!farmer || !buyer) {
      return res.status(404).json({ msg: "Farmer or Buyer not found" });
    }

    const charges = calculatecharges(items);

    const transaction = await transactionModel.create({
      farmerId,
      buyerId,
      items,
      ...charges
    });

    res.status(201).json({ msg: "Transaction recorded", transaction });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
}

module.exports = { createTransaction };