
import SignUp from './components/SignUp';
import SignIn from './components/Signin'; 
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Routes>
      {/* صفحة تسجيل الدخول (واجعلها هي الصفحة الرئيسية عند فتح الموقع) */}
      <Route path="/" element={<SignIn />} />
      <Route path="/login" element={<SignIn />} />
      
      {/* صفحة إنشاء الحساب */}
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default App;