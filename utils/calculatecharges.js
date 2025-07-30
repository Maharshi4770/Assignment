function calculatecharges(items) {
    let totalItemPrice = 0;
    let totalbags = 0;

    for (let item of items) {
        const itemTotal = (item.totalWeight / 20) * item.pricePer20Kg;
        totalItemPrice += itemTotal;
        totalbags += item.totalBags;
    }

    const userCharge = totalItemPrice * 0.01;
    const labourCharge = totalbags * 3;
    const weightMachineCharge = totalbags * 3;
    const totalPayable = totalItemPrice + userCharge + labourCharge + weightMachineCharge;

    return {
        totalItemPrice,
        userCharge,
        labourCharge,
        weightMachineCharge,
        totalPayable
    }
}

module.exports = {
    calculatecharges
};