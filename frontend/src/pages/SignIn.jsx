import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

export default function SignIn() {
  // State to hold the values of multiple inputs
  const [inputValue, setInputValue] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle changes in input fields
  const handleChange = (event) => {
    setInputValue({
      ...inputValue,
      [event.target.id]: event.target.value.trim(),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate input fields
    if (!inputValue.email || !inputValue.password) {
      return dispatch(signInFailure("Please fill all the fields"));
    }

    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputValue),
      });

      // Check if the response status is OK (200-299)
      if (!res.ok) {
        const errorText = await res.text(); // Attempt to read the error response as text
        throw new Error(`${errorText}`);
      }

      // Check if the response's Content-Type is JSON before trying to parse
      const contentType = res.headers.get("Content-Type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid response format. Expected JSON.");
      }

      // Try parsing the JSON response
      const data = await res.json();

      // Handle response based on success flag
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      } else {
        // Dispatch success action with user data
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      // Handle any errors (e.g., network issues, parsing errors)
      dispatch(signInFailure(error.message || "An unexpected error occurred"));
    }
  };

  return (
    <div className="min-h-screen mt-20 ">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/*left */}
        <div className="flex-1">
          <Link to="/" className="  font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              Niina's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5 ">
            Join our community of passionate readers! Sign in exclusive content,
            and special offers straight to your inbox. Don't miss out—subscribe
            today!
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
            <div>
              <Label value="Enter Email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="Enter Password" />
              <TextInput
                type="password"
                placeholder="*********"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" /> <span className="pl-3">Loading.. </span>
                </>
              ) : (
                "Sign In "
              )}
            </Button>
          </form>
          <div className=" flex gap-2 text-sm mt-5">
            <span>Don't have an account? </span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
