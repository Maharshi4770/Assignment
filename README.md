# Assignment
In an APMC (Agricultural Produce Market Committee) yard
You need to build a backend system (using Node.js and MongoDB) that allows a Commission Agent to record a transaction involving a Farmer and a Buyer.
The transaction will include one or more items being sold, along with relevant charge calculations.

## ⚙️ Setup Instructions
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the backend server:
   ```bash
   node server.js
   ```

---

## 🔧 Design Decisions & Assumptions

- Used a **modular structure** for maintainable and scalable code.
- Implemented **JWT authentication** for buyer and farmer routes to secure user-specific operations.
- Used **Zod** for input validation across all request bodies to ensure data accuracy.
- Server calculates charges like **market fee (1%)**, **commission (2%)**, and **tax (5%)** automatically based on item details.
- All transaction-related data (farmer, buyer, items, charges) is stored in a single document for consistency.

## 📦 Sample Request and Output Format (Optional)

### 📤 Sample Request: `POST /transactions`

```json
{
  "farmerId": "688999d40714b192bcf4804f",  
  "buyerId": "68899a000714b192bcf48054",
  "items": [
    {
      "itemName": "Tomato",
      "totalWeight": 30,
      "pricePer20Kg": 200,
      "totalBags": 15
    }
  ]
}
📥 Sample Response
json
{
  "msg": "Transaction recorded",
  "transaction": {
    "farmerId": "688999d40714b192bcf4804f",
    "buyerId": "68899a000714b192bcf48054",
    "items": [
      {
        "itemName": "Tomato",
        "totalWeight": 30,
        "pricePer20Kg": 200,
        "totalBags": 15,
        "_id": "6889a008e17abe3dc9406fc3"
      }
    ],
    "totalItemPrice": 300,
    "userCharge": 3,
    "labourCharge": 45,
    "weightMachineCharge": 45,
    "totalPayable": 393,
    "_id": "6889a008e17abe3dc9406fc2",
    "__v": 0
  }
}
