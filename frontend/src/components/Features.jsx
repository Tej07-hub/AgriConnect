import "./Features.css";

function Features() {
    return (
        <section className="features">

            <div className="section-title">
                <h2>Why Choose AgriConnect?</h2>

                <p>
                    A smarter way for retailers and wholesalers to connect.
                </p>
            </div>

            <div className="feature-container">

                <div className="feature-card">
                    <h3>Fast Ordering</h3>

                    <p>
                        Place orders within minutes without making phone calls.
                    </p>
                </div>

                <div className="feature-card">
                    <h3>Compare Prices</h3>

                    <p>
                        View prices from multiple wholesalers before purchasing.
                    </p>
                </div>

                <div className="feature-card">
                    <h3>Secure Transactions</h3>

                    <p>
                        Confirm every order using a transaction password.
                    </p>
                </div>

            </div>

        </section>
    );
}

export default Features;