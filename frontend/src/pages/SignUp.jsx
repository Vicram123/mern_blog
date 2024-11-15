import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";

export default function SignUp() {
  // State to hold the values of multiple inputs
  const [inputValue, setInputValue] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Function to handle changes in input fields
  const handleChange = (event) => {
    setInputValue({
      ...inputValue,
      [event.target.id]: event.target.value.trim(),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Validate input fields
    if (!inputValue.username || !inputValue.email || !inputValue.password) {
      return setErrorMessage("Please fill all required fields");
    }

    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Set the correct headers
        body: JSON.stringify(inputValue), // Convert input values to JSON
      });

      // Check if the response is OK (status in the range 200-299)
      if (!res.ok) {
        const errorData = await res.json(); // Parse the JSON response for error details
        throw new Error(
          errorData.message || `Error: ${res.status} ${res.statusText}`
        );
      }

      setInputValue({ username: "", email: "", password: "" });

      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
      setErrorMessage("");
    } catch (error) {
      console.error("Signup error:", error); // Log any errors
      setErrorMessage(error.message); // Display the error message to the user
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
            Join our community of passionate readers! Sign up for our newsletter
            to receive the latest blog updates, exclusive content, and special
            offers straight to your inbox. Don't miss out—subscribe today!
          </p>
        </div>
        {/* right */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
            <div>
              <Label value="Enter username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
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
                placeholder="password"
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
                "Sign Up "
              )}
            </Button>
          </form>
          <div className=" flex gap-2 text-sm mt-5">
            <span>Have an account? </span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
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
