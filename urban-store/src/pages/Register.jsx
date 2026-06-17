import { useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa"

function Register() {
    const navigate = useNavigate()

    const [formData, setFormData] =
        useState({
            name: "",
            email: "",
            password: "",
        })

    const [showPassword, setShowPassword] =
        useState(false)

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        })
    }

    const registerUser = async (e) => {
        e.preventDefault()

        setLoading(true)
        setErrorMessage("")
        setSuccessMessage("")

        try {
            await axios.post(
                "http://localhost:5000/register",
                formData
            )

            setSuccessMessage(
                "Account created successfully 🎉"
            )

            setTimeout(() => {
                navigate("/login")
            }, 1500)
        } catch (error) {

            setErrorMessage(
                "Registration failed"
            )

        } finally {

            setLoading(false)

        }
    }

    return (
        <div className="min-h-screen bg-[#F8F4EE] flex justify-center items-center px-6">
            <form
                onSubmit={registerUser}
                className="bg-white border border-[#E8DCCB] p-10 w-full max-w-md">
                <div className="text-center mb-8">

                    <p className="uppercase tracking-[4px] text-gray-400 mb-3">
                        Join UrbanStore
                    </p>

                    <h1 className="text-5xl font-serif">
                        Create Account
                    </h1>

                    <p className="text-gray-500 mt-3">
                        Create your account and start shopping
                    </p>

                    <div className="w-24 h-px bg-[#D9CFC2] mx-auto mt-6"></div>

                </div>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    onChange={handleChange}
                    className="w-full border border-[#D9CFC2] p-4 mb-4 bg-white outline-none focus:border-black transition" />

                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    className="w-full border border-[#D9CFC2] p-4 mb-4 bg-white outline-none focus:border-black transition" />

                <div className="relative mb-4">

                    <input
                        type={
                            showPassword
                                ? "text"
                                : "password"
                        }
                        name="password"
                        placeholder="Create a password"
                        onChange={handleChange}
                        className="w-full border border-[#D9CFC2] p-4 pr-12 bg-white outline-none focus:border-black transition" />

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
                        type="button"
                        onClick={() =>
                            setShowPassword(
                                !showPassword
                            )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition">
                        {showPassword ? (
                            <FaEyeSlash size={18} />
                        ) : (
                            <FaEye size={18} />
                        )}
                    </button>

                </div>
                <button
                    disabled={loading}
                    className="w-full bg-black text-white py-4 uppercase tracking-[4px] hover:opacity-90 transition"
                >
                    {loading
                        ? "CREATING ACCOUNT..."
                        : "CREATE ACCOUNT"}
                </button>

                <div className="text-center mt-8">

                    <p className="text-gray-500">

                        Already have an account?

                        <Link
                            to="/login"
                            className="ml-2 underline hover:text-gray-700">
                            Sign In
                        </Link>

                    </p>

                </div>
            </form>
        </div>
    )
}

export default Register