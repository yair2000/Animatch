import asyncErrors from "../../../middlewares/asyncErrors.js";
import Order from "../../../models/Order.js";

async function getSalesData(startDate, endDate){
  const salesData = await Order.aggregate([
    {
      // Stage 1 - Filter results
      $match: {
        orderDate: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        }
      }
    },
    {
      // Stage 2 - Group Data
      $group: {
        _id: {
          date: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } },
        },
        totalSales: { $sum: "$totalPrice" },
        numOrders: { $sum: 1 }
      }
    }
  ]);

  const salesMap = new Map();
  let totalSales = 0;
  let totalNumOrders = 0;
  
  salesData.forEach((entry) =>{
    const date = entry?._id.date;
    const sales = entry?.totalSales;
    const numOrders = entry?.numOrders;
  
    salesMap.set(date, { sales, numOrders });
    totalSales += sales;
    totalNumOrders += numOrders;
  });
  
  const datesBetween = getDatesBetween(startDate, endDate);
  
  const finalSalesData = datesBetween.map((date) =>({
    date,
    sales: (salesMap.get(date) || { sales: 0 }).sales,
    numOrders: (salesMap.get(date) || { numOrders: 0 }).numOrders,
  }));
  return { salesData: finalSalesData, totalSales, totalNumOrders };
}

function getDatesBetween(startDate, endDate){
  const dates = [];
  let currentDate = new Date(startDate);
  
  while(currentDate <= new Date(endDate)){
    const formattedDate = currentDate.toISOString().split("T")[0];
    dates.push(formattedDate);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

export const getSales = asyncErrors(async (req, res, next) =>{
  const startDate = new Date(req.query.startDate);
  const endDate = new Date(req.query.endDate);
  
  startDate.setUTCHours(0, 0, 0, 0);
  endDate.setUTCHours(23, 59, 59, 999);
  
  const { salesData, totalSales, totalNumOrders } = await getSalesData(startDate, endDate);
  
  res.status(200).json({
    totalSales,
    totalNumOrders,
    sales: salesData
  });
});