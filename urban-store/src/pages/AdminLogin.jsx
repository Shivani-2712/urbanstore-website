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
    <div className="min-h-screen bg-[#F8F4EE] flex items-center justify-center px-6">

        <form
            onSubmit={handleLogin}
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
                    UrbanStore Admin
                </p>

                <h1 className="text-5xl font-serif">
                    Sign In
                </h1>

                <p className="text-gray-500 mt-3">
                    Access the admin dashboard
                </p>

                <div className="w-24 h-px bg-[#D9CFC2] mx-auto mt-8"></div>

            </div>

            <input
                type="email"
                placeholder="Enter admin email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
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

            <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
                className="
                w-full
                border
                border-[#D9CFC2]
                p-4
                mb-6
                bg-white
                outline-none
                focus:border-black
                transition
                "
            />

            <button
                className="
                bg-black
                text-white
                w-full
                py-4
                uppercase
                tracking-[4px]
                hover:opacity-90
                transition
                "
            >
                Login
            </button>

        </form>

    </div>
)
}

export default AdminLogin