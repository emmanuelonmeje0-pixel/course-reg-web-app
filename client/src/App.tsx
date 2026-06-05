
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';

import HomePage from './pages/HomePage';

import ProtectedRoute from './components/ui/ProtectedRoutes';

import StudentPage from './pages/StudentPage';

import ProfilePage from './pages/ProfilePage'
import Admin from './pages/AdminPage';



 


function App() {
  

  return (
    
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route
          path='/admin'
          element={
            <ProtectedRoute>
              <AdminDashboardPage/>
            </ProtectedRoute>
          }
       />

       <Route
          path='/student-dashboard'
          element={
            <ProtectedRoute>
              <StudentPage/>
            </ProtectedRoute>
          }
       /> */}

       
         <Route
          path='/dashboard/hod'
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
       /> 
        <Route
          path='/dashboard/student'
          element={
            <ProtectedRoute>
              <StudentPage />
            </ProtectedRoute>
          }
       />
        
      </Routes>
    </BrowserRouter>
    
  )
}



export default App
