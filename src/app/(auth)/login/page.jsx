import { handleGithubLogin, login } from '@/lib/actions';

const LoginPage = async () => {
  return (
    <div>
      <form action={handleGithubLogin}>
        <button>Login with Github</button>
      </form>
      <form action={login}>
        <input type="text" placeholder="Username" name="username" />
        <input type="text" placeholder="Password" name="password" />
        <button>Login with Credentials</button>
      </form>
    </div>
  );
};

export default LoginPage;
