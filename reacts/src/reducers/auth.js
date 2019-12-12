import React, { useReducer } from "react";

function reducer(state, action) {
    switch (action.type) {
        // case
        default:
            return state;
    }
}

const authReducer = () => {
    const [state, dispatch] = useReducer(reducer, initialState, init);
};
