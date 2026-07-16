import "./FeaturedWholesalers.css";

function FeaturedWholesalers() {
    return (
        <section className="featured">

            <div className="section-title">
                <h2>Featured Wholesalers</h2>
                <p>Trusted wholesalers providing quality agricultural products.</p>
            </div>

            <div className="featured-container">

                <div className="featured-card">
                    <h3>ABC Agro Traders</h3>
                    <p>📍 Nashik</p>
                    <p>⭐ 4.8</p>
                    <button>View Products</button>
                </div>

                <div className="featured-card">
                    <h3>Green Agro</h3>
                    <p>📍 Pune</p>
                    <p>⭐ 4.7</p>
                    <button>View Products</button>
                </div>

                <div className="featured-card">
                    <h3>Shree Krushi</h3>
                    <p>📍 Nagpur</p>
                    <p>⭐ 4.9</p>
                    <button>View Products</button>
                </div>

            </div>

        </section>
    );
}

export default FeaturedWholesalers;