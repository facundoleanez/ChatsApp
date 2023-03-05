import auth from '@react-native-firebase/auth';

//Create an account with email and password
export const createAuthUser = async (email: string, password: string) => {
  try {
    const res = await auth().createUserWithEmailAndPassword(email, password);
    return res.user.uid;
  } catch (error) {
    console.log(error);
    return null;
  }
};
