import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AddExpensePage from './pages/AddExpensePage';
import MyExpensesPage from './pages/MyExpensesPage';
import ProtectedRoute from './Routes/ProtectedRoute';
import PublicRoute from './Routes/PublicRoute';

function App() {

  return ( 
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/add-expense" element={
            <ProtectedRoute>
              <AddExpensePage />
            </ProtectedRoute>
          } />
          <Route path="/my-expenses" element={
            <ProtectedRoute>
              <MyExpensesPage />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;