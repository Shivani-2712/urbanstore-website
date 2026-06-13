import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa"

function Login() {
    const navigate = useNavigate()

    const [email, setEmail] =
        useState("")

    const [password, setPassword] =
        useState("")

    const [errorMessage, setErrorMessage] = useState("")

    const [successMessage, setSuccessMessage] = useState("")

    const [loading, setLoading] = useState(false)

    const [showPassword, setShowPassword] = useState(false)

    const loginUser = async (e) => {
        e.preventDefault()

        setLoading(true)

        try {

            setErrorMessage("")
            setSuccessMessage("")
            const res =
                await axios.post(
                    "http://localhost:5000/login",
                    {
                        email,
                        password,
                    }
                )

            localStorage.setItem(
                "userToken",
                res.data.token
            )

            localStorage.setItem(
                "userInfo",
                JSON.stringify(
                    res.data.user
                )
            )

            window.dispatchEvent(
                new Event("wishlistUpdated")
            )
            setLoading(false)
            setSuccessMessage("Login successful 🎉")

            setTimeout(() => {
                navigate("/")
            }, 1000)
        } catch (error) {
            setLoading(false)
            setErrorMessage("Invalid email or password")
        }
    }

    return (
        <div
            className="
    min-h-screen
    bg-[#F8F4EE]
    flex
    justify-center
    items-center
    px-6
    "
        >
            <form
                onSubmit={loginUser}
                className="
bg-white
border
border-[#E8DCCB]
p-10
w-full
max-w-[500px]
"
            >
                <div className="text-center mb-8">

                    <p className="uppercase tracking-[4px] text-gray-400 mb-3">
                        Welcome Back
                    </p>

                    <h1 className="text-5xl font-serif">
                        Sign In
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Access your account and continue shopping
                    </p>

                    <div className="w-24 h-px bg-[#D9CFC2] mx-auto mt-8 mb-8"></div>

                </div>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }
                    className="
w-full
border
border-[#D9CFC2]
p-4
mb-4
bg-white
outline-none
focus:border-black
transition
"
                />

                <div className="relative mb-4">

                    <input
                        type={
                            showPassword
                                ? "text"
                                : "password"
                        }
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        className="
        w-full
        border
        border-[#D9CFC2]
        p-4
        pr-12
        bg-white
        outline-none
        focus:border-black
        transition
        "
                    />

                    <button
                        type="button"
                        onClick={() =>
                            setShowPassword(
                                !showPassword
                            )
                        }
                        className="
    absolute
    right-4
    top-1/2
    -translate-y-1/2
    text-gray-500
    hover:text-black
    transition
    "
                    >
                        {showPassword ? (
                            <FaEyeSlash size={18} />
                        ) : (
                            <FaEye size={18} />
                        )}
                    </button>

                </div>
                <div className="flex justify-end mb-6 pr-1">

                    <button
                        type="button"
                        className="
        text-sm
        text-gray-500
        hover:text-black
        transition
        "
                    >
                        Forgot Password?
                    </button>

                </div>

                {
                    errorMessage && (
                        <p className="text-red-500 text-sm mb-4">
                            {errorMessage}
                        </p>
                    )
                }

                {
                    successMessage && (
                        <p className="text-green-600 text-sm mb-4">
                            {successMessage}
                        </p>
                    )
                }

                <button
                    disabled={loading}
                    className="
    bg-black
    text-white
    w-full
    py-4
    uppercase
    tracking-[4px]
    disabled:opacity-70
    "
                >
                    {loading ? "Signing In..." : "Sign In"}
                </button>
                <p className="text-center text-gray-500 mt-6">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="
    underline
    hover:text-gray-600
    transition
    "
                    >
                        Create Account
                    </Link>

                </p>
            </form>
        </div>
    )
}

export default Login