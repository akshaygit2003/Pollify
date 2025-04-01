import React, { useContext, useState } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import ProfilePhotoSelector from "../../components/input/ProfilePhotoSelector";
import AuthInput from "../../components/input/AuthInput";
import { validateEmail } from "../../utils/helper";
import { UserContext } from "../../context/UserContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import uploadImage from "../../utils/uploadImage";

const SignUpForm = () => {
  const [profilePic, setProfilePic] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  //handle sign up form submission
  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter the password");
      return;
    }

    // Validate password strength
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (!username) {
      setError("Please enter the username");
      return;
    }

    if (!fullName) {
      setError("Please enter the full name");
      return;
    }

    setError("");

    //Signup API
    try {
      if (profilePic) {
        const imageUploadRes = await uploadImage(profilePic);
        // console.log("Image upload response:", imageUploadRes); // Debugging
        profileImageUrl = imageUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        username,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div>
      <AuthLayout>
        {/* Sign Up form goes here */}
        <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-black">
            Create an Account
          </h3>
          <p className="text-md text-slate-700 mt-[5px] mb-6">
            Join us today by entering your details below.
          </p>
          <form onSubmit={handleSignUp}>
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AuthInput
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                label="Full Name"
                placeholder="Akshay Nema"
                type="text"
              />
              <AuthInput
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Email Address"
                placeholder="abcd@example.com"
                type="text"
              />

              <AuthInput
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                label="Username"
                placeholder="akn@45"
                type="text"
              />
              <AuthInput
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 Characters"
                type="password"
              />
            </div>

            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

            <button type="submit" className="btn-primary">
              Create Account
            </button>

            <p className="text-[15px] font-bold italic text-slate-800 mt-3">
              Already have an account ?{" "}
              <Link className="font-medium text-primary underline" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </AuthLayout>
    </div>
  );
};

export default SignUpForm;
