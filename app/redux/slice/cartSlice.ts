import { ProductCart, ProductCartState } from '@/app/utils/types';
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchUserCart = createAsyncThunk(
  'carts/fetchUserCart',
  async () => {
    const response = await axios.get('/api/carts');
    return response.data
  }
)

export const updateCartQuantity = createAsyncThunk(
  'carts/updateCartQuantity',
  async (payload: { productId: string, quantity: number }) => {
    const response = await axios.patch(`/api/carts/${payload.productId}`, { quantity: payload.quantity });
    return response.data;
  }
);

interface CartState {
  carts: ProductCartState[];
}

const initialState: CartState = {
  carts: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart: (state, action: PayloadAction<ProductCart>) => {
      const { payload } = action;
      const existingCart = state.carts.find((item) => item.productId === payload.productId);
      if (existingCart) {
        existingCart.quantity += 1;
      } else {
        state.carts.push({
          quantity: 1,
          ...payload,
        });
      }
    },
    increment: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      const existingItem = state.carts.find((item) => item.productId === payload);
    
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decrement: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      const existingItem = state.carts.find((item) => item.productId === payload);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      }
    },
    deleteCart: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.carts = state.carts.filter((item) => item.productId !== payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.carts = action.payload
      });
  }
})
export const { addCart, increment, decrement, deleteCart } = cartSlice.actions;
export default cartSlice.reducer;