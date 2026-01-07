"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, Mail, Lock, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { loginUser, requestLoginOtp, verifyLoginOtp } from '@/lib/redux/authSlice';
import toast from 'react-hot-toast';

const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.618-3.226-11.283-7.581l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.02,35.616,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
);

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { user, status } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      router.replace(user.role === 'ADMIN' ? '/' : '/');
    }
  }, [user, router]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loginMethod === 'password') {
      if (!email || !password) {
        toast.error("Please fill in both email and password.");
        return;
      }
      const result = await dispatch(loginUser({ email, password }));
      if (loginUser.rejected.match(result)) {
        toast.error(result.payload as string || "Invalid credentials.");
      }
    } else {
      if (!otp) {
        toast.error("Please enter the OTP.");
        return;
      }
      const result = await dispatch(verifyLoginOtp({ email, otp }));
      if (verifyLoginOtp.rejected.match(result)) {
        toast.error(result.payload as string || "Invalid OTP.");
      }
    }
  };

  const handleRequestOtp = async () => {
    if (!email) {
      toast.error("Please enter your email first to receive an OTP.");
      return;
    }
    try {
        const result = await dispatch(requestLoginOtp(email)).unwrap();
        toast.success(result.message);
        setLoginMethod('otp');
    } catch(error) {
        toast.error(error as string || "Failed to send OTP.");
    }
  };

  const handleGoogleSignIn = () => {
    const googleAuthUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google?origin=${window.location.origin}`;
    window.location.href = googleAuthUrl;
  };

  return (
    <main className="min-h-screen w-full bg-[#F8FAFC] flex items-center justify-center p-4 font-sans relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-40 z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-100 blur-[120px]" />
        </div>
        <div className="w-full max-w-[1100px] flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 relative z-10 min-h-[650px]">
            <div className="hidden lg:flex w-5/12 bg-gradient-to-br from-[#176FC0] to-[#0F4C85] p-12 flex-col justify-between relative overflow-hidden text-white">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                <div className="absolute top-[-20%] right-[-20%] w-80 h-80 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-60 h-60 bg-indigo-400 rounded-full mix-blend-overlay filter blur-3xl opacity-30"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-12">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30 shadow-lg"><span className="text-white font-extrabold text-xl">O</span></div>
                        <span className="font-bold text-2xl tracking-tight text-white drop-shadow-sm">OwnSilent</span>
                    </div>
                    <h2 className="text-4xl font-bold mb-6 leading-[1.2]">Experience the <br/><span className="text-blue-200">Power of Silence</span></h2>
                    <p className="text-blue-100 text-base leading-relaxed opacity-90 font-medium max-w-sm">Access your premium automotive dashboard. Manage orders, track analytics, and optimize your workflow seamlessly.</p>
                </div>
                <div className="relative z-10 grid gap-6">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-colors cursor-default">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shadow-inner text-white"><ShieldCheck className="w-5 h-5" /></div>
                        <div><p className="font-bold text-sm">Enterprise Security</p><p className="text-blue-200 text-xs mt-0.5">End-to-end encrypted sessions</p></div>
                    </div>
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/15 transition-colors cursor-default">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shadow-inner text-white"><Sparkles className="w-5 h-5" /></div>
                        <div><p className="font-bold text-sm">Smart Analytics</p><p className="text-blue-200 text-xs mt-0.5">Real-time data insights</p></div>
                    </div>
                </div>
            </div>
            <div className="w-full lg:w-7/12 p-6 sm:p-12 lg:p-16 flex flex-col justify-center bg-white">
                <div className="max-w-[420px] mx-auto w-full">
                    <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
                        <div className="w-10 h-10 bg-[#176FC0] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20"><span className="text-white font-bold text-xl">O</span></div>
                        <span className="font-bold text-2xl text-slate-800">OwnSilent</span>
                    </div>
                    <div className="mb-10 text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome Back</h1>
                        <p className="text-slate-500 mt-2 text-sm font-medium">Please enter your details to sign in.</p>
                    </div>
                    <button type="button" onClick={handleGoogleSignIn} className="w-full flex justify-center items-center gap-3 py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/50 transition-colors shadow-sm">
                        <GoogleIcon />
                        <span className="text-sm font-semibold text-slate-700">Sign In with Google</span>
                    </button>
                    <div className="flex items-center my-6">
                        <hr className="w-full border-t border-slate-200" />
                        <span className="px-3 text-xs font-semibold text-slate-400">OR</span>
                        <hr className="w-full border-t border-slate-200" />
                    </div>
                    <form onSubmit={handleLoginSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                            <div className="relative group">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-[#176FC0] transition-colors duration-300"><Mail className="h-5 w-5" /></span>
                                <input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl text-slate-900 h-12 pl-12 pr-4 focus:bg-white focus:outline-none focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 placeholder:text-slate-400 text-sm font-medium" placeholder="name@example.com" required/>
                            </div>
                        </div>
                        {loginMethod === 'password' ? (
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-semibold text-slate-700 ml-1">Password</label>
                                <div className="relative group">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-[#176FC0] transition-colors duration-300"><Lock className="h-5 w-5" /></span>
                                    <input id="password" name="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl text-slate-900 h-12 pl-12 pr-12 focus:bg-white focus:outline-none focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 placeholder:text-slate-400 text-sm font-medium" placeholder="••••••••" required/>
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-0 h-full px-4 flex items-center text-slate-400 hover:text-[#176FC0] transition-colors cursor-pointer">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <label htmlFor="otp" className="block text-sm font-semibold text-slate-700 ml-1">One-Time Password (OTP)</label>
                                <div className="relative group">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400 group-focus-within:text-[#176FC0] transition-colors duration-300"><Lock className="h-5 w-5" /></span>
                                    <input id="otp" name="otp" type="text" inputMode="numeric" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} className="w-full bg-slate-50 border border-slate-200 rounded-xl text-slate-900 h-12 pl-12 pr-4 text-center tracking-[0.3em] font-mono focus:bg-white focus:outline-none focus:border-[#176FC0] focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 placeholder:text-slate-400 text-sm font-medium" placeholder="••••••" required/>
                                </div>
                            </div>
                        )}
                        <div className="flex items-center justify-between text-sm pt-2">
                            {loginMethod === 'password' ? (
                                <button type="button" onClick={handleRequestOtp} className="font-semibold text-[#176FC0] hover:text-blue-700 transition-colors">Login with OTP instead</button>
                            ) : (
                                <button type="button" onClick={() => setLoginMethod('password')} className="font-semibold text-[#176FC0] hover:text-blue-700 transition-colors">Use Password instead</button>
                            )}
                            <Link href="/forgot-password" className="font-semibold text-[#176FC0] hover:text-blue-700 transition-colors">Forgot Password?</Link>
                        </div>
                        <button type="submit" disabled={status === 'loading'} className="w-full flex justify-center items-center gap-2 py-3.5 px-4 rounded-xl shadow-lg shadow-blue-600/20 text-sm font-bold text-white bg-gradient-to-r from-[#176FC0] to-[#1461A8] hover:to-[#0F4C85] hover:shadow-blue-600/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#176FC0] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200 mt-4">
                            {status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin" /> : <>{loginMethod === 'password' ? 'Sign In' : 'Verify & Sign In'} <ArrowRight className="w-4 h-4 ml-1" /></>}
                        </button>
                    </form>
                    <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                        <p className="text-slate-500 text-sm font-medium">Don't have an account yet?{' '}<Link href="/signup" className="font-bold text-[#176FC0] hover:text-blue-700 hover:underline transition-all">Create an account</Link></p>
                    </div>
                </div>
            </div>
        </div>
    </main>
  );
} 