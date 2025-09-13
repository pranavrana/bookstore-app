import React from "react";
import { useGetOrdersByEmailQuery } from "../../redux/features/orders/ordersApi";
import { useAuth } from "../../AuthContext";

const OrderPage = () => {
  const { currentUser } = useAuth();
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrdersByEmailQuery(currentUser.email);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading orders data</div>;
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Your Orders</h2>
      {orders.lenght == 0 ? (
        <div>No Orders Yet</div>
      ) : (
        <div className="bg-white rounded shadow-lg p-4">
          {orders.map((order, index) => (
            <>
              <div key={order._id} className="border-b mb-4 pb-4"></div>
              <h2 className="font-bold">Order ID: {order._id}</h2>
              <p className="text-gray-600">Name: {order.name}m</p>
              <p className="text-gray-600">Email: {order.email}</p>
              <p className="text-gray-600">Phone: {order.phone}</p>
              <p className="text-gray-600">Total Price: ${order.totalPrice}</p>
              <h3 className="font-semibold mt-2">Address:</h3>
              <p>
                {" "}
                {order.address.city +
                  " ," +
                  order.address.state +
                  " ," +
                  order.address.country +
                  " ," +
                  order.address.zipcode}
              </p>
              {order.productIds ? (
                <>
                  <h3 className="font-semibold mt-2">Products Id:</h3>
                  <ul>
                    {order.productIds.map((productId, index) => (
                      <li key={productId}>{productId}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <></>
              )}
            </>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
