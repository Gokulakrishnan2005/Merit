import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/studentcreation');
    } catch (error) {
      console.log('could not sign in with google', error);
    }
  };
  return (
    <button
            className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-blue-600 hover:text-white"
            onClick={handleGoogleClick}
            type='button'
          >
            <FaGoogle src="google.svg" alt="Google sign-in" className="w-6 h-6 inline mr-2" />
            Sign in with Google
          </button>
  );
}