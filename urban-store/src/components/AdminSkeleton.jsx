import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

function AdminSkeleton() {

    return (

        <div className="space-y-8">

            {/* Cards */}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

                {[1, 2, 3, 4].map((item) => (

                    <div
                        key={item}
                        className="bg-white rounded-3xl p-8 shadow-sm"
                    >

                        <Skeleton height={18} width={120} />

                        <Skeleton
                            height={50}
                            width={90}
                            className="mt-6"
                        />

                    </div>

                ))}

            </div>

            {/* Table */}

            <div className="bg-white rounded-3xl p-8 shadow-sm">

                <Skeleton height={35} width={220} />

                <div className="mt-8 space-y-6">

                    {[1, 2, 3, 4, 5].map((row) => (

                        <Skeleton
                            key={row}
                            height={50}
                        />

                    ))}

                </div>

            </div>

        </div>

    )

}

export default AdminSkeleton