function HeroBanner() {
    return (
        <section
            className="
  bg-[#EFE5D8]
  min-h-[90vh]
  flex
  items-center
  pt-2
"
        >
            <div
                className="
    max-w-7xl
    mx-auto
    px-10
    grid
    md:grid-cols-2
    gap-20
    items-center
    "
            >

                {/* Left Side */}

                <div className="max-w-xl">

                    <p
                        className="
                        uppercase
                        tracking-[4px]
                        text-gray-500
                        mb-6
                        "
                    >
                        UrbanStore 2026
                    </p>

                    <h1
                        className="
                        text-5xl
                        md:text-6xl
                        font-serif
                        leading-tight
                        mb-6
                        "
                    >
                        Elevate Your
                        <br />
                        Style
                    </h1>

                    <p
                        className="
                        text-gray-600
                        text-lg
                        mb-10
                        max-w-md
                        "
                    >
                        Timeless fashion
                        designed for modern
                        confidence and
                        everyday elegance.
                    </p>

                    <button
                        onClick={() => {
                            document
                                .getElementById(
                                    "products"
                                )
                                ?.scrollIntoView({
                                    behavior:
                                        "smooth",
                                })
                        }}
                        className="
bg-black
text-white
px-10
py-4
uppercase
tracking-wider
transition
hover:bg-[#222]
hover:scale-105
"
                    >
                        Shop Collection
                    </button>

                </div>

                {/* Right Side */}

                <div className="flex justify-end">
                    <img
                        src="https://images.unsplash.com/photo-1622023585373-fbd947f3fdc3?q=80&w=709&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Fashion Model"
                        className="
w-full
max-w-md
h-[550px]
object-cover
shadow-xl
rounded-lg
"
                    />
                </div>

            </div>
        </section>
    )
}

export default HeroBanner