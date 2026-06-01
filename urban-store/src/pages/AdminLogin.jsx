import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function AdminLogin() {
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post(
                "http://localhost:5000/admin-login",
                {
                    email,
                    password,
                }
            )

            localStorage.setItem(
                "adminToken",
                res.data.token
            )

            navigate("/admin")
        } catch (error) {
            alert("Invalid Credentials")
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <form
                onSubmit={handleLogin}
                className="bg-white shadow-lg p-8 rounded-xl w-[400px]"
            >
                <h1 className="text-3xl font-bold mb-6">
                    Admin Login
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-3 mb-4 rounded"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-3 mb-4 rounded"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button
                    className="w-full bg-black text-white py-3 rounded"
                >
                    Login
                </button>
            </form>
        </div>
    )
}

export default AdminLogin