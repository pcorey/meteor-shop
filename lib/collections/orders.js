Orders = new Mongo.Collection("orders");

Orders.bySku = function(sku) {
  return Orders.findOne({ sku: sku });
};

Orders.saveCheckout = function(checkout) {
  Orders.insert(checkout);
  return {
    success: true,
    message: "Thank you for your purchase!",
    receipt_id: checkout.reference_key
  };
};

Orders.getReceipt = function(reference_key) {
  return Orders.findOne({ reference_key: reference_key });
};

Orders.removeCheckout = function(reference_key) {
  Orders.remove({ reference_key: reference_key });
};

Orders.allow({
  update: function(userid, product) {
    return isAdmin();
  },
  insert: function(userid, product) {
    return isAdmin();
  },
  remove: function(userid, product) {
    return isAdmin();
  }
});
