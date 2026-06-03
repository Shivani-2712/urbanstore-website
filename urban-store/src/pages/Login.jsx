import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {
    const navigate = useNavigate()

    const [email, setEmail] =
        useState("")

    const [password, setPassword] =
        useState("")

    const loginUser = async (e) => {
        e.preventDefault()

        try {
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

            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <form
                onSubmit={loginUser}
                className="bg-white p-10 shadow rounded-xl w-full max-w-md"
            >
                <h1 className="text-3xl font-bold mb-6">
                    Login
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }
                    className="w-full border p-3 mb-4 rounded"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                    className="w-full border p-3 mb-4 rounded"
                />

                <button className="bg-black text-white w-full py-3 rounded">
                    Login
                </button>
            </form>
        </div>
    )
}

export default Login