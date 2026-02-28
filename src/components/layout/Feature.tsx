import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function Features() {
  const features = [
    {
      title: "100% Genuine",
      description: "All medicines are sourced from verified and licensed pharmacies",
      icon: (
        <svg
          className="h-8 w-8 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      gradient: "from-blue-100 to-cyan-100",
    },
    {
      title: "Fast Delivery",
      description: "Get your medicines delivered within 24-48 hours to your doorstep",
      icon: (
        <svg
          className="h-8 w-8 text-cyan-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
          />
        </svg>
      ),
      gradient: "from-cyan-100 to-blue-100",
    },
    {
      title: "24/7 Support",
      description: "Our customer support team is available round the clock for you",
      icon: (
        <svg
          className="h-8 w-8 text-purple-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      gradient: "from-purple-100 to-pink-100",
    },
    {
      title: "Best Prices",
      description: "Competitive pricing with regular discounts and cashback offers",
      icon: (
        <svg
          className="h-8 w-8 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
      gradient: "from-green-100 to-emerald-100",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, idx) => (
          <Card
            key={idx}
            className="border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl rounded-lg overflow-hidden cursor-pointer group"
          >
            <CardContent className="p-6 space-y-4">
              <div
                className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center icon-scale",
                  `bg-gradient-to-br ${feature.gradient}`
                )}
              >
                {feature.icon}
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}