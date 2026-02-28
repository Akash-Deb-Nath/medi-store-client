import { Card, CardContent } from "@/components/ui/card";

export default function Stats() {
  const stats = [
    {
      title: "Medicines Available",
      value: "5000+",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
    },
    {
      title: "Happy Customers",
      value: "10,000+",
      icon: (
        <svg
          className="h-8 w-8"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      title: "Genuine Products",
      value: "100%",
      icon: (
        <svg
          className="h-8 w-8"
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
    },
    {
      title: "Customer Rating",
      value: "4.8/5",
      icon: (
        <svg
          className="h-8 w-8 fill-white"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <Card className="bg-gradient-to-br from-blue-600 to-cyan-600 relative overflow-hidden shadow-2xl rounded-xl border-0">
<div
  className="absolute inset-0"
  style={{
    backgroundImage: `
      linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)
    `,
    backgroundSize: "40px 40px",
  }}
></div>
        <CardContent className="relative z-10 p-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
            {stats.map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <p className="text-4xl font-bold">{stat.value}</p>
                <p className="text-blue-100">{stat.title}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}