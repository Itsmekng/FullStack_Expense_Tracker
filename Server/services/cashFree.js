const { Cashfree, CFEnvironment } = require("cashfree-pg") ;

const cashfree = new Cashfree(CFEnvironment.SANDBOX, "", "");

async function createOrder(orderAmount,orderId,customerId,customerNumber,orderExpiry) {
    var request = {
        "order_amount": orderAmount, // what data in decimal form 1.00
        "order_currency": "INR",
        "order_id": orderId,
        "customer_details": {
            "customer_id": customerId,
            "customer_phone": customerNumber
        },
        "order_meta": {
            "return_url": "https://www.cashfree.com/devstudio/preview/pg/web/popupCheckout?order_id={order_id}",
            "payment_methods": "cc,dc,upi"
        },
        "order_expiry_time": orderExpiry
    };

    try{
        let response = await cashfree.PGCreateOrder(request);
        return response
    }catch(err){
        console.log(err)
    }
}

module.exports = createOrder;
