import { getUser } from '@/lib/data';
import styles from './postUser.module.css';
import Image from 'next/image';

// const getData = async (userId) => {
//   const res = await fetch(
//     `https://jsonplaceholder.typicode.com/users/${userId}`,
//     { cache: 'no-store' }
//   );

//   if (!res.ok) {
//     throw new Error('Something went wrong.');
//   }

//   return res.json();
// };

const PostUser = async ({ userId }) => {
  const user = await getUser(userId);
  return (
    <div className={styles.container}>
      <Image
        className={styles.avatar}
        src={user.img ? user.img : '/noavatar.png'}
        width={50}
        height={50}
        alt=""
      />
      <div className={styles.texts}>
        <span className={styles.title}>Author</span>
        <span className={styles.username}>{user.username}</span>
      </div>
    </div>
  );
};

export default PostUser;
