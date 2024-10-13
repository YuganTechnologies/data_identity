import React, { useEffect } from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import * as layoutConstants from "../redux/slices/SettingSlice";

// All layouts/containers
import DefaultLayout from "../layouts/Default";
import VerticalLayout from "../layouts/Vertical";
import DetachedLayout from "../layouts/Detached";
import HorizontalLayout from "../layouts/Horizontal";
import FullLayout from "../layouts/Full";

//External Lib Import

// Auth
const Login = React.lazy(() => import("../pages/Account/Login"));

//Page
const AdminDashboard = React.lazy(() =>
  import("../pages/Dashboard/AdminDashboard"),
);
const AddStudent = React.lazy(() =>
  import("../pages/AddStudent/Addstudent"),
);
const EditStudent = React.lazy(() =>
  import("../pages/edit_student/EditStudent"),
);
const Listall = React.lazy(() =>
  import("../pages/student_list/Listall"),
);
const Logout = React.lazy(() => import("../pages/Account/Logout"));


const LoadComponent = ({ component: Component }) => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return <Component />;
};

const AllRoutes = () => {
  const { LayoutType } = useSelector((state) => state.Setting);
  const { UserDetails, role } = useSelector((state) => state.User);
  const { AccessToken } = useSelector((state) => state.Auth);

  const getLayout = () => {
    let layoutCls = VerticalLayout;

    switch (LayoutType) {
      case layoutConstants.LAYOUT_HORIZONTAL:
        layoutCls = HorizontalLayout;
        break;
      case layoutConstants.LAYOUT_DETACHED:
        layoutCls = DetachedLayout;
        break;
      case layoutConstants.LAYOUT_FULL:
        layoutCls = FullLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  };

  let Layout = getLayout();

  if (AccessToken && UserDetails) {
    return (
      <Routes>
        <Route to="/" element={<Layout />}>

          {role === 'ADMIN' && (
            <>
              <Route
                path="/dashboard"
                element={<LoadComponent component={AdminDashboard} />}
              />
              <Route
                path="/add-student"
                element={<LoadComponent component={AddStudent} />}
              />
              <Route
                path="/edit-student"
                element={<LoadComponent component={EditStudent} />}
              />
              <Route
                path="/listall-student"
                element={<LoadComponent component={Listall} />}
              />
            </>
          )}

          {role === 'VIEWER' && (
            <>
              <Route
                path="/dashboard"
                element={<LoadComponent component={AdminDashboard} />}
              />

              <Route
                path="/listall-student"
                element={<LoadComponent component={Listall} />}
              />
            </>
          )}
          {role === 'ADMIN' || role === 'VIEWER' ? (
            <Route path="*" element={<Navigate to="/listall-student" />} />
          ) :
            (<Route path="*" element={<Navigate to="/dashboard" />} />)
          }


        </Route>
      </Routes>
    );
  }
  else {
    return (
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="" element={<Navigate to="/account/login" />} />
          <Route path="*" element={<Navigate to="/account/login" />} />
          <Route
            path="/account/login"
            element={<LoadComponent component={Login} />}
          />

          <Route
            path="/account/logout"
            element={<LoadComponent component={Logout} />}
          />


        </Route>
      </Routes>
    );
  }
};

export default AllRoutes;
