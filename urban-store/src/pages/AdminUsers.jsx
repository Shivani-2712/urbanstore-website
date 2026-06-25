import { useEffect, useState } from "react"
import axios from "axios"
import AdminSidebar from "../components/AdminSidebar"

function AdminUsers() {

    const [users, setUsers] = useState([])
    const [search, setSearch] = useState("")
    const [selectedUser, setSelectedUser] = useState(null)

    useEffect(() => {

        axios
            .get("http://localhost:5000/admin/users")
            .then((res) => {

                setUsers(res.data)

            })
            .catch((err) => {

                console.log(err)

            })

    }, [])

    const filteredUsers = users.filter((user) =>

        user.name
            .toLowerCase()
            .includes(search.toLowerCase()) ||

        user.email
            .toLowerCase()
            .includes(search.toLowerCase())

    )

    const toggleBlock = async (id) => {

        try {

            await axios.put(
                `http://localhost:5000/admin/users/${id}/block`
            )

            setUsers(

                users.map((user) =>

                    user._id === id
                        ? {
                            ...user,
                            isBlocked: !user.isBlocked,
                        }
                        : user

                )

            )

        } catch (error) {

            console.log(error)

        }

    }

    const openUser = (user) => {
        setSelectedUser(user)
    }

    return (

        <div className="min-h-screen flex bg-[#F4F7FE]">

            <AdminSidebar />

            <div className="flex-1 ml-80 p-10">

                <div className="mb-10">

                    <h1 className="text-3xl font-serif">
                        Customer Management
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Total Customers : {users.length}
                    </p>

                </div>

                <input
                    type="text"
                    placeholder="Search customers..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="w-full max-w-md p-4 rounded-xl border border-[#D9CFC2] bg-white mb-8 outline-none"
                />

                <div className="bg-white rounded-3xl shadow-sm overflow-hidden">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b border-[#E8DCCB] bg-[#EFE7DB] uppercase tracking-[2px] text-xs">

                                <th className="p-5 text-left">
                                    Name
                                </th>

                                <th className="p-5 text-left">
                                    Email
                                </th>

                                <th className="p-5 text-center">
                                    Orders
                                </th>

                                <th className="p-5 text-center">
                                    Total Spent
                                </th>

                                <th className="p-5 text-center">
                                    Status
                                </th>

                                <th className="p-5 text-center">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                filteredUsers.map((user) => (

                                    <tr
                                        key={user._id}
                                        className="border-b border-[#F0E7DB]"
                                    >

                                        <td className="p-5">
                                            {user.name}
                                        </td>

                                        <td className="p-5">
                                            {user.email}
                                        </td>

                                        <td className="text-center">
                                            {user.totalOrders}
                                        </td>

                                        <td className="text-center">
                                            ₹{user.totalSpent.toLocaleString()}
                                        </td>

                                        <td className="text-center">

                                            {
                                                user.isBlocked ?

                                                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 text-sm">
                                                        Blocked
                                                    </span>

                                                    :

                                                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
                                                        Active
                                                    </span>

                                            }

                                        </td>

                                        <td className="text-center">

                                            <div className="flex justify-center gap-2">

                                                <button
                                                    onClick={() => openUser(user)}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                                                >
                                                    View
                                                </button>

                                                <button
                                                    onClick={() => toggleBlock(user._id)}
                                                    className={`px-4 py-2 rounded-lg text-white
                                                        ${user.isBlocked
                                                            ? "bg-green-600 hover:bg-green-700"
                                                            : "bg-red-600 hover:bg-red-700"
                                                        }`}
                                                >
                                                    {user.isBlocked ? "Unblock" : "Block"}
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                ))
                            }

                        </tbody>

                    </table>

                </div>

                {
                    selectedUser && (

                        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                            <div className="bg-white rounded-3xl w-[550px] p-8 shadow-2xl">

                                <div className="flex justify-between items-center mb-8">

                                    <h2 className="text-3xl font-serif">
                                        Customer Details
                                    </h2>

                                    <button
                                        onClick={() => setSelectedUser(null)}
                                        className="text-2xl"
                                    >
                                        ✕
                                    </button>

                                </div>

                                <div className="space-y-5">

                                    <div>
                                        <p className="text-gray-400 uppercase text-xs tracking-[2px]">
                                            Name
                                        </p>

                                        <h3 className="text-xl font-semibold">
                                            {selectedUser.name}
                                        </h3>
                                    </div>

                                    <div>
                                        <p className="text-gray-400 uppercase text-xs tracking-[2px]">
                                            Email
                                        </p>

                                        <p>{selectedUser.email}</p>
                                    </div>

                                    <div>
                                        <p className="text-gray-400 uppercase text-xs tracking-[2px]">
                                            Phone
                                        </p>

                                        <p>
                                            {selectedUser.phone || "Not Available"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-gray-400 uppercase text-xs tracking-[2px]">
                                            Address
                                        </p>

                                        <p>
                                            {selectedUser.address || "Not Available"}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6 mt-4">

                                        <div className="bg-[#F8F4EE] rounded-2xl p-5">

                                            <p className="text-gray-500 text-sm">
                                                Orders
                                            </p>

                                            <h2 className="text-3xl font-serif mt-2">
                                                {selectedUser.totalOrders}
                                            </h2>

                                        </div>

                                        <div className="bg-[#F8F4EE] rounded-2xl p-5">

                                            <p className="text-gray-500 text-sm">
                                                Total Spent
                                            </p>

                                            <h2 className="text-3xl font-serif mt-2">
                                                ₹{selectedUser.totalSpent.toLocaleString()}
                                            </h2>

                                        </div>

                                    </div>

                                    <div className="mt-5">

                                        <p className="text-gray-400 uppercase text-xs tracking-[2px]">
                                            Status
                                        </p>

                                        <span
                                            className={`inline-block mt-2 px-4 py-2 rounded-full text-sm
                            ${selectedUser.isBlocked
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-green-100 text-green-700"
                                                }`}
                                        >
                                            {selectedUser.isBlocked
                                                ? "Blocked"
                                                : "Active"}
                                        </span>

                                    </div>

                                    <div className="mt-5">

                                        <p className="text-gray-400 uppercase text-xs tracking-[2px]">
                                            Joined On
                                        </p>

                                        <p>
                                            {new Date(
                                                selectedUser.createdAt
                                            ).toLocaleDateString("en-IN")}
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    )
                }

            </div>

        </div>

    )

}

export default AdminUsers