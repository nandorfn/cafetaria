import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface CartState {
  id: string;
  name: string;
  orderId: string;
  productId: string;
  quantity: number;
}

const initialState: CartState = {
  id: '',
  name: '',
  orderId: '',
  productId: '',
  quantity: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {}
})

export default cartSlice.reducer;