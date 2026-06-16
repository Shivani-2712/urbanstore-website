import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function ForgotPassword() {

    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const [message, setMessage] = useState("")

    const navigate = useNavigate()

    const resetPassword = async (e) => {

        e.preventDefault()

        try {

            const res = await axios.put(
                "http://localhost:5000/forgot-password",
                {
                    email,
                    newPassword,
                }
            )

            setMessage(res.data.message)

            setTimeout(() => {
                navigate("/login")
            }, 2000)

        } catch (error) {

            setMessage(
                error.response?.data?.message ||
                "Something went wrong"
            )

        }
    }

    return (
        <div className="min-h-screen bg-[#F8F4EE] flex justify-center items-center px-6">

            <form
                onSubmit={resetPassword}
                className="bg-white border border-[#E8DCCB] p-10 w-full max-w-[500px]"
            >

                <h1 className="text-4xl font-serif text-center mb-8">
                    Reset Password
                </h1>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    className="w-full border border-[#D9CFC2] p-4 mb-4"
                />

                <input
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) =>
                        setNewPassword(e.target.value)
                    }
                    className="w-full border border-[#D9CFC2] p-4 mb-4"
                />

                {message && (
                    <p className="mb-4 text-center">
                        {message}
                    </p>
                )}

                <button
                    className="bg-black text-white w-full py-4"
                >
                    Reset Password
                </button>

            </form>

        </div>
    )
}

export default ForgotPassword