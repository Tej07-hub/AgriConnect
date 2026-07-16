import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <span className="badge">
          Trusted Agricultural Marketplace
        </span>

        <h1>
          Connecting Retailers with Verified Wholesalers
        </h1>

        <p>
          Compare fertilizer, pesticide and seed prices from
          multiple wholesalers. Place secure orders and receive
          digital invoices—all from one platform.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">
            Explore Products
          </button>

          <button className="secondary-btn">
            Become a Wholesaler
          </button>
        </div>

      </div>

      <div className="hero-image">

        <img
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=700"
          alt="Agriculture"
        />

      </div>

    </section>
  );
}

export default Hero;