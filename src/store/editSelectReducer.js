import { createSlice } from "@reduxjs/toolkit";

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