import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Dashboard from "./containers/Dashboard/Dashboard";
import ForgotPassword from "./containers/ForgotPassword/ForgotPassword";
import Login from "./containers/Login/Login";
import SignUp from "./containers/SignUp/SignUp";
import Terms from "./containers/Terms/Terms";
import useFirebaseAuth from "./hooks/useFirebaseAuth";

function App() {
  const { user } = useFirebaseAuth();
  console.log("🚀 ~ App ~ user:", user);
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Login />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/sign-up"} element={<SignUp />} />
        <Route path={"/forgot-pass"} element={<ForgotPassword />} />
        <Route path={"/terms"} element={<Terms />} />

        {/* <Redirect from={PROFILE} to={HOME} />
      <Redirect from={MYLIST} to={HOME} /> */}
        {/* <Route path={NOTFOUND} component={NotFound} /> */}
      </Routes>
    </Router>
  );
}

export default App;
