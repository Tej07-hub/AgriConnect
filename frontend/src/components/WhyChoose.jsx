import {
  ShieldCheck,
  Truck,
  LayoutDashboard,
  Leaf,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Platform",
    description:
      "Protected authentication and secure transactions using JWT.",
  },
  {
    icon: Truck,
    title: "Efficient Order Management",
    description:
      "Track orders, manage inventory, and streamline deliveries.",
  },
  {
    icon: LayoutDashboard,
    title: "Powerful Dashboards",
    description:
      "Dedicated dashboards for customers, retailers, and administrators.",
  },
  {
    icon: Leaf,
    title: "Fresh Agricultural Products",
    description:
      "Browse quality products from trusted retailers.",
  },
];

function WhyChoose() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
            Why AgriConnect
          </p>

          <h2 className="mt-2 text-4xl font-bold text-gray-900">
            Built for Modern Agriculture
          </h2>

          <p className="mt-4 text-gray-600">
            Everything needed to connect farmers, retailers, and customers
            through one reliable platform.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
                  <Icon size={28} className="text-green-700" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-gray-900">
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

export default WhyChoose;


