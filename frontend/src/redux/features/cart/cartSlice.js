import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2'

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (!existingItem) {
        state.cartItems.push(action.payload);
        Swal.fire({
            position: "top-right",
            icon: "success",
            title: 'Product added to the Cart',
            showConfirmButton: false,
            timer: 1500
          })
      } else {
        Swal.fire({
            title: "Already added to the Cart",
            icon: "warning"
          });
      }
    },
    removeFromCart: (state, action) => {
        state.cartItems = state.cartItems.filter(item => item._id != action.payload._id)
    },
    clearCartItems: (state) => {
        state.cartItems = []
    }
  },
});

// export the actions
export const { addToCart, removeFromCart, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;
