"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, User, Mail, Phone, Lock, Loader2, KeyRound, LucideProps, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/lib/redux/store';
import { registerUser, verifyOtp } from '@/lib/redux/authSlice';
import toast from 'react-hot-toast';

const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.618-3.226-11.283-7.581l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.02,35.616,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
);

interface FormInputProps {
    id: string;
    name: string;
    type: string;
    label: string;
    icon?: React.ElementType<LucideProps>;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ id, name, type, label, icon: Icon, value, onChange, placeholder, required = true }) => (
    <div className="space-y-1.5">
        <label htmlFor={id} className="block text-xs font-semibold text-slate-600">{label}</label>
        <div className="relative group">
            {Icon && (
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Icon className="h-4 w-4 text-slate-400 group-focus-within:text-[#176FC0] transition-colors" />
                </span>
            )}
            <input 
                id={id} 
                name={name} 
                type={type} 
                value={value} 
                onChange={onChange} 
                className="w-full bg-white border border-slate-200 rounded-lg text-slate-900 h-11 pl-10 pr-3 focus:outline-none focus:border-[#176FC0] focus:ring-1 focus:ring-[#176FC0] transition-all duration-200 placeholder:text-slate-300 text-sm font-medium shadow-sm" 
                placeholder={placeholder} 
                required={required}
            />
        </div>
    </div>
);

interface OtpInputProps {
    value: string;
    onChange: (value: string) => void;
    length?: number;
}

const OtpInput: React.FC<OtpInputProps> = ({ value, onChange, length = 6 }) => {
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newValue = e.target.value;
        if (!/^\d*$/.test(newValue)) return;
        const newOtp = value.split('');
        newOtp[index] = newValue.slice(-1);
        onChange(newOtp.join(''));
        if (newValue && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !value[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };
    return (
        <div className="flex justify-center gap-2 sm:gap-3">
            {Array.from({ length }).map((_, index) => (
                <input
                    key={index}
                    ref={el => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={value[index] || ''}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-semibold bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-[#176FC0] focus:ring-1 focus:ring-[#176FC0] transition-all shadow-sm"
                />
            ))}
        </div>
    );
};

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState<'register' | 'verify'>('register');
  const [formData, setFormData] = useState({ fullName: '', email: '', mobile: '', password: '', confirmPassword: '' });
  const [otp, setOtp] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { status } = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    
    try {
        const result = await dispatch(registerUser({
            fullName: formData.fullName,
            email: formData.email,
            mobile: formData.mobile,
            password: formData.password
        })).unwrap();
        toast.success(result.message || "OTP sent successfully!");
        setStep('verify');
        setResendCooldown(30);
    } catch (error: any) {
        toast.error(error || "Registration failed. Please try again.");
    }
  };

  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      return toast.error("Please enter a 6-digit OTP.");
    }
    
    try {
        const result = await dispatch(verifyOtp({ email: formData.email, otp })).unwrap();
        toast.success(result.message || "Verification successful!");
        router.push('/account');
    } catch (error: any) {
        toast.error(error || "OTP verification failed.");
    }
  };
  
  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    try {
        await dispatch(registerUser({
            fullName: formData.fullName,
            email: formData.email,
            mobile: formData.mobile,
            password: formData.password
        })).unwrap();
        toast.success("A new OTP has been sent.");
        setResendCooldown(30);
    } catch (error: any) {
        toast.error("Failed to resend OTP.");
    }
  };

  const handleGoogleSignIn = () => {
    const googleAuthUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google?origin=${window.location.origin}`;
    window.location.href = googleAuthUrl;
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-start justify-center p-3 pt-6 lg:items-center lg:p-4 font-sans">
        <div className="w-full max-w-5xl flex flex-col lg:flex-row bg-white rounded-2xl overflow-hidden border border-slate-100 h-auto lg:min-h-[550px]">
            <div className="hidden lg:flex w-5/12 bg-[#176FC0] p-10 flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
                <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-900 rounded-full blur-3xl opacity-30"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-9 h-9 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20"><span className="text-white font-bold text-lg">O</span></div>
                        <span className="font-bold text-xl tracking-tight text-white">OwnSilent</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4 leading-tight">Luxury Car Tuning & Carbon Performance Parts – Engineered to Perfection
</h2>
                    <p className="text-blue-100 text-sm leading-relaxed opacity-90">Carbon Fiber | Carbon-Ceramic Brakes | Bespoke Interiors</p>
                </div>
                <div className="relative z-10 space-y-5">
                    <div className="flex items-center gap-3 text-white/90">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm shrink-0"><ShieldCheck className="w-4 h-4" /></div>
                        <div className="text-xs"><p className="font-semibold">Shop Performance Parts</p><p className="text-blue-200 opacity-75">Request Custom Build</p></div>
                    </div>
                    <div className="flex items-center gap-3 text-white/90">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm shrink-0"><Zap className="w-4 h-4" /></div>
                        <div className="text-xs"><p className="font-semibold">Fast Processing</p><p className="text-blue-200 opacity-75">Instant verification system</p></div>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-7/12 p-4 sm:p-8 lg:p-12 flex flex-col justify-center">
                {step === 'register' ? (
                    <div className="max-w-md mx-auto w-full">
                        <div className="lg:hidden flex items-center gap-2 mb-5 justify-center">
                            <div className="w-8 h-8 bg-[#176FC0] rounded-lg flex items-center justify-center shadow-md"><span className="text-white font-bold text-lg">O</span></div>
                            <span className="font-bold text-xl text-slate-900">OwnSilent</span>
                        </div>
                        <div className="mb-5 text-center lg:text-left">
                            <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
                            <p className="text-slate-500 text-sm mt-1">Already have an account?{' '}<Link href="/login" className="font-medium text-[#176FC0] hover:text-blue-700 hover:underline">Sign in</Link></p>
                        </div>
                        <button type="button" onClick={handleGoogleSignIn} className="w-full flex justify-center items-center gap-3 py-3 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/50 transition-colors shadow-sm">
                            <GoogleIcon />
                            <span className="text-sm font-semibold text-slate-700">Sign Up with Google</span>
                        </button>
                        <div className="flex items-center my-4">
                            <hr className="w-full border-t border-slate-200" />
                            <span className="px-3 text-xs font-semibold text-slate-400">OR</span>
                            <hr className="w-full border-t border-slate-200" />
                        </div>
                        <form onSubmit={handleRegisterSubmit} className="space-y-4">
                            <FormInput id="fullName" name="fullName" type="text" label="Full Name" icon={User} value={formData.fullName} onChange={handleChange} placeholder="John Doe" />
                            <FormInput id="email" name="email" type="email" label="Work Email" icon={Mail} value={formData.email} onChange={handleChange} placeholder="name@company.com" />
                            <FormInput id="mobile" name="mobile" type="tel" label="Phone Number" icon={Phone} value={formData.mobile} onChange={handleChange} placeholder="+1 (555) 000-0000" />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label htmlFor="password" className="block text-xs font-semibold text-slate-600">Password</label>
                                    <div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><Lock className="h-4 w-4 text-slate-400" /></span><input id="password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} className="w-full bg-white border border-slate-200 rounded-lg text-slate-900 h-11 pl-10 pr-10 focus:outline-none focus:border-[#176FC0] focus:ring-1 focus:ring-[#176FC0] transition-all text-sm font-medium" placeholder="••••••••" required/><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-0 h-full px-3 flex items-center text-slate-400 hover:text-[#176FC0] touch-manipulation">{showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div>
                                </div>
                                <div className="space-y-1.5">
                                    <label htmlFor="confirmPassword" className="block text-xs font-semibold text-slate-600">Confirm</label>
                                    <div className="relative"><span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"><Lock className="h-4 w-4 text-slate-400" /></span><input id="confirmPassword" name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} className="w-full bg-white border border-slate-200 rounded-lg text-slate-900 h-11 pl-10 pr-10 focus:outline-none focus:border-[#176FC0] focus:ring-1 focus:ring-[#176FC0] transition-all text-sm font-medium" placeholder="••••••••" required/><button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-0 top-0 h-full px-3 flex items-center text-slate-400 hover:text-[#176FC0] touch-manipulation">{showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button></div>
                                </div>
                            </div>
                            <div className="flex items-start sm:items-center pt-2">
                                <input id="terms" name="terms" type="checkbox" required className="mt-0.5 sm:mt-0 h-4 w-4 rounded border-slate-300 text-[#176FC0] focus:ring-[#176FC0] cursor-pointer" />
                                <label htmlFor="terms" className="ml-2 block text-xs text-slate-500 leading-snug">I agree to the <Link href="/terms" className="font-semibold text-slate-700 hover:text-[#176FC0]">Terms of Service</Link> and <Link href="/privacy" className="font-semibold text-slate-700 hover:text-[#176FC0]">Privacy Policy</Link>.</label>
                            </div>
                            <button type="submit" disabled={status === 'loading'} className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl shadow-md shadow-blue-900/5 text-sm font-bold text-white bg-[#176FC0] hover:bg-blue-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#176FC0] disabled:bg-blue-300 disabled:cursor-not-allowed transition-all duration-200">{status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Account'}</button>
                        </form>
                    </div>
                ) : (
                    <div className="max-w-xs mx-auto w-full text-center">
                        <div className="lg:hidden flex items-center gap-2 mb-6 justify-center">
                            <div className="w-8 h-8 bg-[#176FC0] rounded-lg flex items-center justify-center shadow-md"><span className="text-white font-bold text-lg">O</span></div>
                            <span className="font-bold text-xl text-slate-900">OwnSilent</span>
                        </div>
                        <div className="mb-6 flex justify-center"><div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center ring-4 ring-blue-50/50"><KeyRound className="h-7 w-7 text-[#176FC0]" /></div></div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Verify Email</h2>
                        <p className="text-slate-500 mb-6 text-sm px-4">Enter the code sent to <br/> <span className="font-semibold text-slate-900">{formData.email}</span></p>
                        <form onSubmit={handleVerifySubmit} className="space-y-6">
                            <OtpInput value={otp} onChange={setOtp} />
                            <button type="submit" disabled={status === 'loading'} className="w-full flex justify-center items-center py-3 px-4 rounded-xl shadow-md shadow-blue-900/5 text-sm font-bold text-white bg-[#176FC0] hover:bg-blue-700 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#176FC0] disabled:bg-blue-300 disabled:cursor-not-allowed transition-all duration-200">{status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify & Continue'}</button>
                        </form>
                        <div className="mt-6 text-xs text-slate-500">Didn't receive the code?{' '}<button onClick={handleResendOtp} disabled={resendCooldown > 0} className="font-bold text-[#176FC0] hover:text-blue-700 disabled:text-slate-400 disabled:cursor-not-allowed transition-colors p-2">{resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend'}</button></div>
                        <button onClick={() => setStep('register')} className="mt-4 text-xs font-medium text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center gap-1 mx-auto p-2"><ArrowRight className="w-3 h-3 rotate-180" /> Change Email</button>
                    </div>
                )}
            </div>
        </div>
    </main>
  );
}