function Hero() {
    return (
        <section
            className="h-screen bg-cover bg-center flex items-center"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070')",
            }}
        >
            <div className="bg-black/50 w-full h-full flex items-center">
                <div className="text-white px-16">
                    <h1 className="text-7xl font-extrabold leading-tight mb-6">
                        Elevate <br /> Your Fashion
                    </h1>

                    <p className="text-xl mb-8 max-w-lg">
                        Discover premium streetwear collections inspired
                        by modern fashion culture.
                    </p>

                    <button className="bg-white text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-200 transition">
                        Shop Collection
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Hero