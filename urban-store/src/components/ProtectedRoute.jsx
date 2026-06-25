import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import axios from "axios"

function ProtectedRoute({ children }) {

    const [loading, setLoading] = useState(true)

    const [authenticated, setAuthenticated] =
        useState(false)

    useEffect(() => {

        const token =
            localStorage.getItem("adminToken")

        if (!token) {

            setAuthenticated(false)

            setLoading(false)

            return

        }

        axios
            .get(
                "http://localhost:5000/admin/verify",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            )
            .then(() => {

                setAuthenticated(true)

            })
            .catch(() => {

                localStorage.removeItem(
                    "adminToken"
                )

                setAuthenticated(false)

            })
            .finally(() => {

                setLoading(false)

            })

    }, [])

    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center bg-[#F4F7FE]">

                <div className="text-2xl font-serif">

                    Loading...

                </div>

            </div>

        )

    }

    if (!authenticated) {

        return (
            <Navigate
                to="/admin-login"
                replace
            />
        )

    }

    return children

}

export default ProtectedRoute