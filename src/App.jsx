import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import AppHeader from './components/AppHeader';
import UserList from './routes/Users/UserList';
import AddUser from './routes/AddUser';
import ManageGames from './routes/ManageGames/ManageGames';
import Profile from './routes/Profile';
import Preferences from './routes/Preferences';
import Dashboard from './routes/Dashboard/Dashboard';
import GameLists from './routes/Games/GameLists';
import AdminLogin from './components/Authentication/AdminLogin';
import { Provider, useSelector } from 'react-redux';
import adminStore from './redux/adminStore';
import PrivateRoute from './components/Authentication/PrivateRoute';
import Posts from './routes/Forums/Posts';
import ManagePosts from './routes/Forums/ManagePosts/ManagePosts';

const { Sider } = Layout;

const App = () => {


  const url = window.location.pathname;

  console.log(url)
  console.log(url.includes('login'))

  return (
    <Provider store={adminStore}>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          {!url.includes('login') && (
            <Sider breakpoint="lg" collapsedWidth="0">
              <Sidebar />
            </Sider>
          )}
          <Layout>
            {
              !url.includes('login') && (
                <AppHeader />
              )
            }
            <Layout.Content className="p-4">
              <Routes>
                <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/login" element={<AdminLogin />} />
                <Route path="/users/list" element={<PrivateRoute><UserList /></PrivateRoute>} />
                <Route path="/users/add" element={<PrivateRoute><AddUser /></PrivateRoute>} />
                <Route path="/games/lists" element={<PrivateRoute><GameLists /></PrivateRoute>} />
                <Route path="/forums/pots" element={<PrivateRoute><Posts /></PrivateRoute>} />
                <Route path="/forums/manage-posts" element={<PrivateRoute><ManagePosts /></PrivateRoute>} />
                <Route path="/games/manage-games" element={<PrivateRoute><ManageGames /></PrivateRoute>} />
                <Route path="/settings/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/settings/preferences" element={<PrivateRoute><Preferences /></PrivateRoute>} />
              </Routes>
            </Layout.Content>
          </Layout>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
