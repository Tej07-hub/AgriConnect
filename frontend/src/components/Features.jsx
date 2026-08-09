import { Leaf, Truck, ShoppingBasket, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Fresh Products",
    description: "Buy fresh fruits, vegetables, grains, and agricultural products directly.",
  },
  {
    icon: ShoppingBasket,
    title: "Easy Shopping",
    description: "Browse categories, add products to cart, and place orders effortlessly.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Retailers can efficiently manage and deliver orders on time.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Platform",
    description: "JWT authentication and secure order management for every user.",
  },
];

function Features() {
  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900">
            Why Choose AgriConnect?
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            A complete agriculture marketplace connecting customers,
            retailers, and administrators through one smart platform.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-gray-200 p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center">
                  <Icon className="text-green-700" size={28} />
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-gray-600 leading-7">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Features;


