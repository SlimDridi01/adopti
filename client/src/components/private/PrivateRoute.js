import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getCurrent } from "../../auth/Redux/actions/authActions";

export default function PrivateRoute({ children }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const loading = useSelector((state) => state.authReducer.loading);
  const auth = useSelector((state) => state.authReducer.auth);
  useEffect(() => {
    dispatch(getCurrent());
  }, [dispatch]);

  return loading ? null : auth && user ? children : <Navigate to="/" />;
}
export function AdminRoute({ children }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const loading = useSelector((state) => state.authReducer.loading);
  useEffect(() => {
    dispatch(getCurrent());
  }, [dispatch]);

  return loading ? null : user && user.role === "Admin" ? (
    children
  ) : (
    <Navigate to="/" />
  );
}
