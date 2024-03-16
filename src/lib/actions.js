'use server';

import { revalidatePath } from 'next/cache';
import { Post, User } from './models';
import { connectToDb } from './utils';
import { signIn, signOut } from './auth';
import bcrypt from 'bcryptjs';

export const addPost = async (formData) => {
  const { title, desc, slug, userId } = Object.fromEntries(formData);

  try {
    connectToDb();
    const newPost = new Post({ title, desc, slug, userId });

    await newPost.save();
    console.log('Saved to database');
    revalidatePath('/blog');
  } catch (error) {
    console.log(error);
    return { error: 'Something went wrong.' };
  }
};

export const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);

  try {
    connectToDb();

    await Post.findByIdAndDelete(id);
    console.log('Deleted from database');
    revalidatePath('/blog');
  } catch (error) {
    console.log(error);
    return { error: 'Something went wrong.' };
  }
};

export const handleGithubLogin = async (e) => {
  'use server';
  await signIn('github');
};

export const handleGithubLogout = async (e) => {
  'use server';
  await signOut();
};

export const register = async (previousState, formData) => {
  const { username, email, password, img, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: 'Passwords do not match' };
  }

  try {
    connectToDb();

    const user = await User.findOne({ username });

    if (user) {
      return { error: 'Username already exists' };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img,
    });

    await newUser.save();
    console.log('Saved to the database');
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: 'Something went wrong' };
  }
};

export const login = async (previousState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn('credentials', { username, password });
  } catch (error) {
    console.log(error);
    return { error: 'Something went wrong' };
  }
};
