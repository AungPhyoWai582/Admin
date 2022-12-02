import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Grid } from "@mui/material";
import Lottery from "../pages/lottery/Lottery";
import Report from "../pages/report/Report";
import Main from "../pages/main/Main";
import AppTopbar from "../components/AppTopbar";
import Bet from "../pages/bet/Bet";
import ChangePassword from "../pages/changepassword/ChangePassword";
import AccountInfo from "../pages/accountInfo/AccountInfo";
import Login from "../pages/login/Login";
import ReportCalls from "../pages/report/ReportCalls";
import CallDetail from "../pages/report/CallDetail";
import Lager from "../pages/lager/Lager";
import View from "../pages/view/View";
import LagerReport from "../pages/view/LagerReport";
import MemberCreate from "../pages/customer/MemberCreate";
import MemberList from "../pages/customer/MemberList";
import Customer from "../pages/customer/Customer";
import AgentReport from "../pages/view/AgentReport";
import Daily from "../pages/report/Daily";
import DailyMembers from "../pages/report/DailyMembers";
import CallList from "../pages/report/CallLists";
import ShortCup from "../pages/report/ShortCut";
import MemberDetail from "../pages/customer/MemberDetail";
import { grey } from "@mui/material/colors";
import BetPage from "../pages/bet/BetPage";
import LagerCut from "../pages/lager/LagerCut";
import { Stack } from "@mui/system";

const Dashboard = () => {
  const [authUser, setAuthUser] = useState({
    token: null,
    authorize: false,
    user_info: {},
  });

  useEffect(() => {
    const locs = localStorage.getItem("access-token");

    if (localStorage.getItem("access-token")) {
      let user = JSON.parse(localStorage.getItem("user-info"));
      console.log(user);
      if (user.role === "Admin") {
        setAuthUser({
          token: localStorage.getItem("access-token"),
          authorize: true,
          user_info: JSON.parse(localStorage.getItem("user-info")),
        });
      } else {
        setAuthUser({ token: null, authorize: false, user_info: {} });
      }
    }
  }, []);

  console.log(authUser);
  const routes = (
    <Routes>
      <Route path="/*" element={<Navigate to="/lottery" replace />} />
      {/* <Route path="/main" element={<Main />} /> */}
      <Route path="/lottery" element={<Lottery />} />
      <Route path="/view" element={<View />} />
      {/* <Route path="/view/lager/:lotteryId" element={<LagerReport />} /> */}
      <Route path="/report/master" element={<AgentReport />} />

      <Route path="/lottery/bet/:lotteryId" element={<BetPage />} />
      {/* <Route path="/lottery/calls/:lotteryId" element={<CallsList />} /> */}
      <Route path="/lottery/bet/:lotteryId/lager" element={<LagerCut />} />

      <Route path="/reports/total" element={<ShortCup />} />
      <Route path="/reports/daily" element={<Daily />} />
      <Route path="/reports/daily/members" element={<DailyMembers />} />
      <Route path="/reports/daily/members/calls" element={<CallList />} />
      <Route
        path="/reports/daily/members/calls/details"
        element={<CallDetail />}
      />

      <Route
        path="/reports/agent/:agentId/calls/:lotteryId"
        element={<ReportCalls />}
      />
      <Route
        path="/reports/agent/:agentId/calls/:lotteryId/:callId"
        element={<CallDetail />}
      />
      <Route path="/change_password" element={<ChangePassword />} />
      <Route
        path="/account_info"
        element={<AccountInfo authUser={authUser} />}
      />
      <Route path="/customer" element={<Customer />} />

      <Route path="/masters/master_list" element={<MemberList />} />
      <Route path="/masters/detail/:masterId" element={<MemberDetail />} />
      <Route path="/masters/master_create" element={<MemberCreate />} />
    </Routes>
  );
  return (
    <>
      {!authUser.authorize ? (
        <Routes>
          <Route
            path="/login"
            element={<Login authUser={authUser} setAuthUser={setAuthUser} />}
          />
          <Route path="/*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <Grid container overflow={"hidden"} spacing={1}>
          <Grid item xs={12}>
            <Stack>
              <AppTopbar
                // name={"nnz"}
                authUser={authUser}
                setAuthUser={setAuthUser}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            {routes}
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default Dashboard;
