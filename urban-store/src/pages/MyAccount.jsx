import { useEffect, useState } from "react"
import axios from "axios"

function MyAccount() {
    const user = JSON.parse(
        localStorage.getItem("userInfo")
    )

    const [phone, setPhone] =
        useState("")

    const [address, setAddress] =
        useState("")

    useEffect(() => {
        axios
            .get(
                `http://localhost:5000/user/${user._id}`
            )
            .then((res) => {
                setPhone(
                    res.data.phone || ""
                )

                setAddress(
                    res.data.address || ""
                )
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const saveProfile =
        async () => {
            try {
                await axios.put(
                    `http://localhost:5000/update-profile/${user._id}`,
                    {
                        phone,
                        address,
                    }
                )

                alert(
                    "Profile Updated Successfully 🎉"
                )
            } catch (error) {
                console.log(error)
            }
        }

    return (
        <div className="min-h-screen px-10 py-16">
            <h1 className="text-5xl font-bold mb-10">
                My Account
            </h1>

            <div className="bg-white p-8 rounded-2xl shadow max-w-xl">
                <h2 className="text-2xl font-bold mb-6">
                    Profile Information
                </h2>

                <p className="mb-4">
                    <strong>Name:</strong>{" "}
                    {user?.name}
                </p>

                <p className="mb-6">
                    <strong>Email:</strong>{" "}
                    {user?.email}
                </p>

                <input
                    type="text"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) =>
                        setPhone(
                            e.target.value
                        )
                    }
                    className="w-full border p-3 mb-4 rounded"
                />

                <textarea
                    placeholder="Address"
                    value={address}
                    onChange={(e) =>
                        setAddress(
                            e.target.value
                        )
                    }
                    className="w-full border p-3 mb-4 rounded"
                />

                <button
                    onClick={
                        saveProfile
                    }
                    className="bg-black text-white px-6 py-3 rounded-lg"
                >
                    Save Profile
                </button>
            </div>
        </div>
    )
}

export default MyAccount