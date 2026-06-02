function HeroBanner() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">

            <img
                src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?w=1600"
                alt="Fashion Banner"
                className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/20"></div>

            <div className="relative z-10 text-center text-white px-6">

                <p className="uppercase tracking-[6px] mb-4 text-gray-300">
                    UrbanStore 2026
                </p>

                <h1 className="text-6xl md:text-8xl font-black mb-6">
                    SUMMER
                    <br />
                    COLLECTION
                </h1>

                <p className="text-xl md:text-2xl mb-8 text-gray-200">
                    Premium Fashion For Every Style
                </p>

                <button
                    onClick={() => {
                        document
                            .getElementById("products")
                            ?.scrollIntoView({
                                behavior: "smooth",
                            })
                    }}
                    className="bg-white text-black px-10 py-4 rounded-full font-semibold hover:scale-105 transition"
                >
                    Shop Now
                </button>

            </div>
        </section>
    )
}

export default HeroBanner