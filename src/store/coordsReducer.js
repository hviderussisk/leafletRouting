import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    from: [],
    to: [],
}

const coordsReducer = createSlice({
    initialState,
    name: 'dataSelects',
    reducers: {
        setLatLng: ( _, action) => action.payload,
        clearLatLng: () => initialState
    },
});

export const { setLatLng, clearLatLng } = coordsReducer.actions;
export default coordsReducer.reducer;