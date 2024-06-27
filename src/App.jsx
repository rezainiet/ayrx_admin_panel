import React from 'react';
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
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import adminStore, { persistor } from './redux/adminStore';
import PrivateRoute from './components/Authentication/PrivateRoute';
import Posts from './routes/Forums/Posts';
import ManagePosts from './routes/Forums/ManagePosts/ManagePosts';
import Settings from './routes/Settings';
import PendingWithdrawals from './routes/Withdrawals/PendingWithdrawals';

const { Sider } = Layout;

const App = () => {
  const url = window.location.pathname;

  return (
    <Provider store={adminStore}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Layout style={{ minHeight: '100vh' }}>
            {!url.includes('login') && (
              <Sider breakpoint="lg" collapsedWidth="0">
                <Sidebar />
              </Sider>
            )}
            <Layout>
              {!url.includes('login') && <AppHeader />}
              <Layout.Content className="p-4">
                <Routes>
                  <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                  <Route path="/login" element={<AdminLogin />} />
                  <Route path="/users/list" element={<PrivateRoute><UserList /></PrivateRoute>} />
                  <Route path="/users/add" element={<PrivateRoute><AddUser /></PrivateRoute>} />
                  <Route path="/games/lists" element={<PrivateRoute><GameLists /></PrivateRoute>} />
                  <Route path="/forums/posts" element={<PrivateRoute><Posts /></PrivateRoute>} />
                  <Route path="/withdrawals/pending" element={<PrivateRoute>< PendingWithdrawals /></PrivateRoute>} />
                  <Route path="/forums/manage-posts" element={<PrivateRoute><ManagePosts /></PrivateRoute>} />
                  <Route path="/games/manage-games" element={<PrivateRoute><ManageGames /></PrivateRoute>} />
                  <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
                  <Route path="/settings/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                  <Route path="/settings/preferences" element={<PrivateRoute><Preferences /></PrivateRoute>} />
                </Routes>
              </Layout.Content>
            </Layout>
          </Layout>
        </Router>
      </PersistGate>
    </Provider>
  );
};

export default App;
