import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContext } from "./store/User_Context";
import { useContext, Suspense, lazy } from "react";
import Header from "./components/Header/header";
import NotFound from "./NotFound";

const Subscription = lazy(() => import("./app/dashboard/Subscription/Subscription"));
const UserProfilePage = lazy(() => import("./app/dashboard/profile/page"));
const LoginPage = lazy(() => import("./app/login/page"));
const DashboardPage = lazy(() => import("./app/dashboard/page"));
const ForgotPassword = lazy(() => import("./app/verify/ForgotPassword"));
const NewPassword = lazy(() => import("./app/verify/newPasswordForm"));
const MyForms = lazy(() => import("./app/dashboard/my_forms/page"));
const Form_Page = lazy(() => import("./app/dashboard/my_forms/[form]/page"))
const Create_Form_Page = lazy(() => import("./app/dashboard/my_forms/create_form/page"))
const Update_Form_Page = lazy(() => import("./app/dashboard/my_forms/update_form/page"))

const App = () => {
  const { auth } = useContext(UserContext);

  return (
    <BrowserRouter>
      <Header auth={auth} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {!auth &&
            <>
              <Route path="/forgot_password" element={<ForgotPassword />} />
              <Route path="/forgot_password/:token" element={<NewPassword />} />
            </>
          }
          {auth && (
            <>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/subscription" element={<Subscription />} />
              <Route path="/dashboard/profile" element={<UserProfilePage />} />
              <Route path="/dashboard/forms" element={<MyForms />} />
              <Route path="/dashboard/forms/form/:id" element={<Form_Page />} />
              <Route path="/dashboard/forms/create_form" element={<Create_Form_Page />} />
              <Route path="/dashboard/forms/update_form" element={<Update_Form_Page />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
