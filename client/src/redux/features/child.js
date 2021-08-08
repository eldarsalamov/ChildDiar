const initialState = {
  items: [],
  loading: true,
};

export default function childReducer(state = initialState, action) {
  switch (action.type) {
    case "child/load/pending":
      return {
        ...state,
        loading: true,
      };

    case "child/load/fulfilled":
      return {
        ...state,
        loading: false,
        items: action.payload,
      };

    case "child/post/pending":
      return {
        ...state,
        loading: true,
      };
    case "child/post/fulfilled":
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload],
      };

    case "child/edit/pending":
      return {
        ...state,
        editing: true,
      };
    case "child/edit/fulfilled":
      return {
        ...state,
        editing: false,
        items: state.items.map((report) => {
          if (report.id === action.payload.id) {
            return {
              ...report,
              ...action.payload.data,
            };
          }
          return report;
        }),
      };
    case "child/delete/pending":
      return {
        ...state,
        editing: true,
      };
    case "child/delete/fulfilled":
      return {
        ...state,
        editing: false,
        items: state.items.map((report) => {
          if (report.id === action.payload.id) {
            return {
              ...report,
              ...action.payload.data,
            };
          }
          return report;
        }),
      };
    default:
      return state;
  }
}

export const loadChild = () => {
  return async (dispatch) => {
    dispatch({type:"child/load/pending"})

    const response = await fetch(
      `http://localhost:4000/child`
    );
    const json = await response.json();

    dispatch({
      type:"child/load/fulfilled",
      payload: json,
    });
  }
};

/*
export const postDoctor = (data) => {
  return async (dispatch) => {
    dispatch({ type: "doctor/create/pending" });
    const response = await fetch("http://localhost:3005/doctor", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        imageURL: data.imageURL,
        position: data.position
      }),
    });
    const json = await response.json();
    dispatch({
      type: "doctor/create/fulfilled",
      payload: json,
    });
    window.location.reload();
  };
};
export const deleteDoctor = (id) => {
  return async (dispatch) => {
    dispatch({ type: "doctor/delete/pending" });

    await fetch(`http://localhost:3005/doctor/${id}`, {
      method: "DELETE",
    });
    dispatch({ type: "doctor/delete/fulfilled", payload: id });
  };
};*/
