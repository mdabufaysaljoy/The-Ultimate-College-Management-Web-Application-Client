import {
  createUserWithEmailAndPassword,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../../../firebase.config";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../useAxiosPublic/useAxiosPublic";
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const axiosPublic = useAxiosPublic();
  //? email signup function
  const handleEmailSignup = (fullName, email, photoURL, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        if (result.user) {
          updateProfile(result.user, {
            displayName: fullName,
            photoURL,
          });
        }
      })
      .catch((err) => {
        // console.log("email signup error", err.message);
        Swal.fire({
          icon: "error",
          title: err.message,
          timer: 1500,
        });
      });
  };
  //? email login function
  const handleEmailLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // console.log(result.user);
      })
      .catch((err) => {
        // console.log("email login error", err.message);
        Swal.fire({
          icon: "error",
          title: err.message,
          timer: 2000,
        });
      });
  };
  //? google login function
  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        result.user;

        const saveToDatabase = await axiosPublic.post("/users", {
          email: result.user?.email,
          name: result.user?.displayName,
        });
        if (saveToDatabase.data.success) {
          // console.log(saveToDatabase.data);
          Swal.fire({
            icon: "success",
            timer: 1500,
            title: saveToDatabase.data.message,
          });
        }
      })
      .catch((err) => {
        // console.log("google login error", err.message);
      });
  };
  //? github login function
  const handleGithubLogin = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        console.log(result.user);
        Swal.fire({
          title: "Github login success",
          icon: "success",
          timer: 1500,
        });
      })
      .catch((err) => {
        console.log("github login error", err.message);
        Swal.fire({
          title: err.message,
          icon: "error",
          timer: 2000,
        });
      });
  };
  //? firebase profile Update
  const handleFirebaseProfileUpdate = (displayName, photoURL) => {
    if (photoURL) {
      updateProfile(user, {
        displayName,
        photoURL,
      });
    }
    updateProfile(user, {
      displayName,
    });
  };
  //? logout function
  const logout = async () => {
    return await signOut(auth);
  };
  //? send email verification function
  const handleEmailVerification = () => {
    sendEmailVerification(user)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Verification Email Sent Successfully",
          text: "Please check your email inbox",
          timer: 3000,
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Verification email has already sent",
          timer: 2000,
        });
      });
  };
  //? observer function
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        setLoading(true);
        if (currentUser) {
          const userInfo = { email: currentUser.email };
          try {
            const res = await axiosPublic.post("/jwt", userInfo);
            if (res.data?.token) {
              localStorage.setItem("access-token", res.data.token);
            }
          } catch (err) {
            console.error("JWT fetch error:", err?.message);
          }
          setUser(currentUser);
        } else {
          setUser(null);
          localStorage.removeItem("access-token");
        }
      } catch (error) {
        console.error("Auth change error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [axiosPublic]);
  return {
    user,
    loading,
    handleGoogleLogin,
    handleGithubLogin,
    handleEmailSignup,
    handleEmailLogin,
    handleEmailVerification,
    handleFirebaseProfileUpdate,
    logout,
  };
};

export default useAuth;
