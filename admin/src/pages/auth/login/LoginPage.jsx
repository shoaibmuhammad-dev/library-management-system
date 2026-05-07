import LoginForm from "../../../components/Auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="w-full min-h-screen grid grid-cols-2">
      <div className="w-full h-full hidden lg:block">
        <img
          src="/login-page-mockup.png"
          alt="login-page-mockup"
          className="w-full min-h-screen max-h-[115vh] object-cover"
        />
      </div>
      <div className="w-full h-full flex items-center justify-center px-5 col-span-2 lg:col-span-1">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
