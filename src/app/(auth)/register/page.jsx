import { register } from '@/lib/actions';
import styles from './register.module.css';

const RegisterPage = () => {
  return (
    <div clasName={styles.container}>
      <div className={styles.wrapper}>
        <form className={styles.form} action={register}>
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <input
            type="password"
            placeholder="Confirm Password"
            name="passwordRepeat"
          />
          <button>Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
