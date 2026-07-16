import "./HowItWorks.css";

function HowItWorks() {
    return (
        <section className="how-it-works">

            <div className="section-title">
                <h2>How It Works</h2>

                <p>
                    Ordering agricultural products has never been easier.
                </p>
            </div>

            <div className="steps">

                <div className="step">
                    <h3>Search</h3>
                    <p>Search products from verified wholesalers.</p>
                </div>

                <div className="step">
                    <h3>Compare</h3>
                    <p>Compare prices and available stock.</p>
                </div>

                <div className="step">
                    <h3>Order</h3>
                    <p>Place your order using a secure transaction password.</p>
                </div>

                <div className="step">
                    <h3>Delivery</h3>
                    <p>Wholesaler confirms and dispatches your parcel.</p>
                </div>

            </div>

        </section>
    );
}

export default HowItWorks;
