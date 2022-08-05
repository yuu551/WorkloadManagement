import { Routes as Switch, Route } from "react-router-dom";
import { RequireAuth } from "./RequireAuth";
import Login from "../pages/Login";
import WorkloadList from "../pages/WorkloadList";
import WorkloadRegist from "../pages/WorkloadRegist";
import CategoryList from "../pages/CategoryList";
import CategoryRegist from "../pages/CategoryRegist";
import WorkTypeList from "../pages/WorktypeList";
import WorktypeRegist from "../pages/WorktypeRegist";

export function Routes() {
  return (
    <Switch>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <WorkloadList />
          </RequireAuth>
        }
      />
      <Route
        path="/regist"
        element={
          <RequireAuth>
            <WorkloadRegist />
          </RequireAuth>
        }
      />
      <Route
        path="/category"
        element={
          <RequireAuth>
            <CategoryList />
          </RequireAuth>
        }
      />
      <Route
        path="/category-regist"
        element={
          <RequireAuth>
            <CategoryRegist />
          </RequireAuth>
        }
      />
      <Route
        path="/worktype"
        element={
          <RequireAuth>
            <WorkTypeList />
          </RequireAuth>
        }
      />
      <Route
        path="/worktype-regist"
        element={
          <RequireAuth>
            <WorktypeRegist />
          </RequireAuth>
        }
      />
    </Switch>
  );
}
