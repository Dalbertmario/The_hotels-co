import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  treeBtn: false,
  formBtn: false,
  editCabin: {},
  editFromBtn: false,
  wDiscount: false,
  noDiscountbtn: false,
  allCabin: true,
  selectingSort: '',
};

const Uireducer = createSlice({
  name: 'uistore',
  initialState,
  reducers: {
    toggelBtntree: (state) => {
      state.treeBtn = !state.treeBtn;
    },
    toggelFromBtn: (state) => {
      state.formBtn = !state.formBtn;
    },
    FormEditData: (state, action) => {
      state.editCabin = action.payload;
    },
    EditBtn: (state) => {
      state.editFromBtn = !state.editFromBtn;
    },
    WithDisount: (state, action) => {
      state.wDiscount = !state.wDiscount;
      state.noDiscountbtn = false;
      state.allCabin = false;
    },
    noDisocunt: (state, action) => {
      state.noDiscountbtn = !state.noDiscount;
      state.wDiscount = false;
      state.allCabin = false;
    },
    allcabindata: (state, action) => {
      state.allCabin = !state.allCabin;
      state.noDiscountbtn = false;
      state.wDiscount = false;
    },
    selecting: (state, action) => {
      state.selectingSort = action.payload;
    },
  },
});

export const {
  toggelBtntree,
  toggelFromBtn,
  FormEditData,
  EditBtn,
  WithDisount,
  noDisocunt,
  allcabindata,
  selecting,
} = Uireducer.actions;
export default Uireducer.reducer;
