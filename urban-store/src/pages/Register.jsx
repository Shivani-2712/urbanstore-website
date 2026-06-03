import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Register() {
    const navigate = useNavigate()

    const [formData, setFormData] =
        useState({
            name: "",
            email: "",
            password: "",
        })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:
                e.target.value,
        })
    }

    const registerUser = async (e) => {
        e.preventDefault()

        try {
            await axios.post(
                "http://localhost:5000/register",
                formData
            )

            alert(
                "Registration Successful 🎉"
            )

            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <form
                onSubmit={registerUser}
                className="bg-white p-10 shadow rounded-xl w-full max-w-md"
            >
                <h1 className="text-3xl font-bold mb-6">
                    Register
                </h1>

                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    className="w-full border p-3 mb-4 rounded"
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full border p-3 mb-4 rounded"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full border p-3 mb-4 rounded"
                />

                <button className="bg-black text-white w-full py-3 rounded">
                    Register
                </button>
            </form>
        </div>
    )
}

export default Register