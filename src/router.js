import React from 'react';
import { Router, Route } from 'dva/router';

import Login from './routes/Login';

import PasswordChange from './routes/PasswordChange';

import ChangeSuccess from './routes/ChangeSuccess';

import IndexPage from './routes/IndexPage';

import HomePage from "./routes/HomePage.js";//首页

import User from "./routes/User.js";//用户

import UserDetail from "./routes/UserDetail.js";//用户详情

import Award from "./routes/Award.js";//提奖管理

import DailyDetail from "./routes/DailyDetail.js";//提奖日详情

import SingleDetail from "./routes/SingleDetail.js";//提奖单笔详情

import Withdraw from "./routes/Withdraw.js";//会员提现

import WithdrawDetail from "./routes/WithdrawDetail.js";//提现详情

import Agent from "./routes/Agent.js";//代理商管理

import AgentAdd from "./routes/AgentAdd.js";//代理商新增

import AgentDetail from "./routes/AgentDetail.js";//代理商详情

import Admin from "./routes/Admin.js";//管理员管理

import AdminAdd from "./routes/AdminAdd.js";//管理员新增

import Role from "./routes/Role.js";//角色管理

import RoleAdd from "./routes/RoleAdd.js";//角色编辑

import Member from "./routes/Member.js";//会员设置

import WithdrawConfig from "./routes/WithdrawConfig.js";//提现设置

import Home from "./routes/tenant/Home";//提现设置

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Login}/>
      <Route path="passwordChange" component={PasswordChange}/>
      <Route path="changeSuccess" component={ChangeSuccess}/>
      <Route path="/" component={IndexPage}>
        <Route path="HomePage" component={HomePage} />
        <Route path="User" component={User} />
        <Route path="User/UserDetail" component={UserDetail} />
        <Route path="Award" component={Award} />
        <Route path="Award/DailyDetail" component={DailyDetail} />
        <Route path="Award/SingleDetail" component={SingleDetail} />
        <Route path="Withdraw" component={Withdraw} />
        <Route path="Withdraw/WithdrawDetail" component={WithdrawDetail} />
        <Route path="Agent" component={Agent} />
        <Route path="Agent/AgentAdd" component={AgentAdd} />
        <Route path="Agent/AgentDetail" component={AgentDetail} />
        <Route path="Config/Admin" component={Admin} />
        <Route path="Config/Admin/AdminAdd" component={AdminAdd} />
        <Route path="Config/Role" component={Role} />
        <Route path="Config/Role/RoleAdd" component={RoleAdd} />
        <Route path="Config/Member" component={Member} />
        <Route path="Config/WithdrawConfig" component={WithdrawConfig} />

        <Route path="tenant/home" component={Home} />
        <Route path="tenant/User" component={User} />
        <Route path="tenant/User/UserDetail" component={UserDetail} />
        <Route path="tenant/Award" component={Award} />
        <Route path="tenant/Award/DailyDetail" component={DailyDetail} />
        <Route path="tenant/Award/SingleDetail" component={SingleDetail} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
