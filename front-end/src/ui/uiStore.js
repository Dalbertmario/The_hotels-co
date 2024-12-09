import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  treebtnbook: false,
  treeBtn: false,
  formBtn: false,
  editCabin: {},
  editFromBtn: false,
  wDiscount: false,
  noDiscountbtn: false,
  allCabin: true,
  selectingSort: '',
  guestAll: true,
  checkedOut: false,
  checkIn: false,
  unconfirmed: false,
};

const Uireducer = createSlice({
  name: 'uistore',
  initialState,
  reducers: {
    toggelguestAll: (state) => {
      state.guestAll = true;
      state.checkIn = false;
      state.checkedOut = false;
      state.unconfirmed = false;
    },
    toggelguestCheckedOut: (state) => {
      state.checkedOut = !state.checkedOut;
      state.guestAll = false;
      state.checkIn = false;
      state.unconfirmed = false;
    },
    toggelbookingtree: (state) => {
      state.treebtnbook = !state.treebtnbook;
    },
    toggleguestCheckIn: (state) => {
      state.checkIn = !state.checkIn;
      state.guestAll = false;
      state.checkedOut = false;
      state.unconfirmed = false;
    },
    toggleguestUnconfirmed: (state) => {
      state.guestAll = false;
      state.checkIn = false;
      state.checkIn = false;
      state.unconfirmed = !state.unconfirmed;
    },
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
      state.noDiscountbtn = !state.noDiscountbtn;
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
  toggelguestAll,
  toggelguestCheckedOut,
  toggleguestCheckIn,
  toggleguestUnconfirmed,
  toggelbookingtree,
} = Uireducer.actions;
export default Uireducer.reducer;
