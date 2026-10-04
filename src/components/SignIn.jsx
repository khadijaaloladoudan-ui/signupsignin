
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // تحديث القيم ومسح الأخطاء أثناء الكتابة
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (fieldErrors[e.target.name]) {
      setFieldErrors({
        ...fieldErrors,
        [e.target.name]: ''
      });
    }
  };

  // دالة التحقق من صحة المدخلات (Validation)
  const validateForm = () => {
    let errors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'البريد الإلكتروني مطلوب';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'صيغة البريد الإلكتروني غير صحيحة';
    }

    if (!formData.password) {
      errors.password = 'كلمة المرور مطلوبة';
    } else if (formData.password.length < 6) {
      errors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // إرسال البيانات للـ API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);
    setSuccess(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://lightyellow-ram-271495.hostingersite.com/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'حدث خطأ أثناء تسجيل الدخول');
      }

      setSuccess('تم تسجيل الدخول بنجاح!');
      
      // يمكنك تخزين الـ Token هنا إذا كان موجوداً في استجابة الخادم:
      // localStorage.setItem('token', data.token);

      setFormData({ email: '', password: '' });
      setFieldErrors({});

    } catch (err) {
      setApiError(err.message || 'فشل الاتصال بالخادم، تأكد من الاتصال بالإنترنت');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-950 via-purple-950 to-slate-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden" dir="rtl">
      {/* عناصر خلفية مضيئة متطورة */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full space-y-8 bg-slate-900/80 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl shadow-2xl shadow-pink-500/10 border border-slate-800 relative z-10">
        <div>
          <div className="mx-auto w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center shadow-lg shadow-pink-500/40 mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </div>
          <h2 className="text-center text-3xl font-black tracking-tight text-white">
            تسجيل الدخول
          </h2>
          <p className="mt-2 text-center text-sm text-slate-400">
            أدخل بيانات حسابك للمتابعة
          </p>
        </div>

        {apiError && (
          <div className="bg-rose-500/10 border border-rose-500/30 p-4 text-rose-400 text-sm rounded-2xl shadow-sm backdrop-blur-md">
            {apiError}
          </div>
        )}

        {success && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 text-emerald-400 text-sm rounded-2xl shadow-sm backdrop-blur-md">
            {success}
          </div>
        )}

        <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
          {/* حقل البريد الإلكتروني */}
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-300 mb-2">
              البريد الإلكتروني
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className={`appearance-none rounded-2xl relative block w-full px-4 py-3.5 bg-slate-950/50 border ${
                fieldErrors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-pink-500 focus:ring-pink-500'
              } placeholder-slate-600 text-white focus:outline-none focus:ring-2 sm:text-sm transition-all duration-300 shadow-inner`}
              placeholder="example@domain.com"
            />
            {fieldErrors.email && (
              <p className="mt-2 text-xs font-medium text-rose-400">{fieldErrors.email}</p>
            )}
          </div>

          {/* حقل كلمة المرور */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-slate-300 mb-2">
              كلمة المرور
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className={`appearance-none rounded-2xl relative block w-full px-4 py-3.5 bg-slate-950/50 border ${
                fieldErrors.password ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-800 focus:border-pink-500 focus:ring-pink-500'
              } placeholder-slate-600 text-white focus:outline-none focus:ring-2 sm:text-sm transition-all duration-300 shadow-inner`}
              placeholder="••••••••"
            />
            {fieldErrors.password && (
              <p className="mt-2 text-xs font-medium text-rose-400">{fieldErrors.password}</p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-slate-400">
            ليس لديك حساب؟{' '}
            <Link to="/signup" className="font-bold text-pink-400 hover:text-pink-300 transition-colors">
              إنشاء حساب جديد
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;