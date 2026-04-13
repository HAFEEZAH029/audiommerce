import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => { // PayloadAction<CartItem> indicates that the action's payload should be of type CartItem
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => { // PayloadAction<number> indicates that the action's payload should be a number (the id of the item to decrease)
      const item = state.items.find((i) => i.id === action.payload);

      if (!item) return;

      if (item.quantity === 1) {
        state.items = state.items.filter((i) => i.id !== action.payload);
      } else {
        item.quantity -= 1;
      }
    },

    removeAll: (state) => {
      state.items = [];
    },
  },
});


export const { addToCart, increaseQuantity, decreaseQuantity, removeAll } = cartSlice.actions;
export default cartSlice.reducer;