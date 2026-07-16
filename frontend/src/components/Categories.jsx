import "./Categories.css";

function Categories() {
    return (
        <section className="categories">

            <div className="categories-header">

                <h2>Browse Categories</h2>

                <p>
                    Find the agricultural products you need from trusted wholesalers.
                </p>

            </div>

            <div className="categories-container">

                <div className="category-card">
                    <img src="https://via.placeholder.com/100" alt="Fertilizer" />

                    <h3>Fertilizers</h3>

                    <p>Explore high-quality fertilizers.</p>

                    <button>Explore</button>
                </div>

                <div className="category-card">
                    <img src="https://via.placeholder.com/100" alt="Seeds" />

                    <h3>Seeds</h3>

                    <p>Certified seeds from verified sellers.</p>

                    <button>Explore</button>
                </div>

                <div className="category-card">
                    <img src="https://via.placeholder.com/100" alt="Pesticides" />

                    <h3>Pesticides</h3>

                    <p>Protect crops with trusted pesticides.</p>

                    <button>Explore</button>
                </div>

            </div>

        </section>
    );
}

export default Categories;