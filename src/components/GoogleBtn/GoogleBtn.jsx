import { FcGoogle } from "react-icons/fc";
import css from "./GoogleBtn.module.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../services/firebaseConfig.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logInWithGoogle } from "../../redux/auth/operations.js";
import toast from "react-hot-toast";

export default function GoogleBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const userInfo = result.user;
      const { email, displayName } = userInfo;

      if (token) {
        await dispatch(logInWithGoogle({ token, email, displayName })).unwrap();
        toast.success("Авторизація успішна!");
        navigate("/video-control");
      }
    } catch (error) {
      toast.error("Щось пішло не так! Будь ласка, спробуйте ще раз!");
    }
  };
  return (
    <button className={css.google_btn} onClick={handleGoogleLogin}>
      <FcGoogle className={css.icon_google} />
      Sign in with Google
    </button>
  );
}
