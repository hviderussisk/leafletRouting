import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {latLng: 'брест', value: 'брест'}
  ]

const selectDataSlice = createSlice({
    initialState,
    name: 'dataSelects',
    reducers: {
        getSelectTable: ( _, action) => action.payload,
        setSelectTable: ( _, action) => action.payload
    },
});

export const { getSelectTable, setSelectTable } = selectDataSlice.actions;
export default selectDataSlice.reducer;