import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        key: '1',
        whence: "Moscow",
        where:"Londow"
    }
  ]

const tableDataSlice = createSlice({
    initialState,
    name: 'dataLeads',
    reducers: {
        getDatatable: ( _, action) => action.payload,
        setDatatable: ( _, action) => action.payload,
    },
});

export const { getDatatable, setDatatable } = tableDataSlice.actions;
export default tableDataSlice.reducer;