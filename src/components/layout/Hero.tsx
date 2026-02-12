import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="w-full px md:px-10">
      <div className="mx-auto rounded-3xl bg-[#FBFCFF] p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          <div>
            <Badge className="mb-4 bg-[#DBEAFE] text-[#1D4ED8] p-2">
              💊 Trusted Online Pharmacy
            </Badge>

            <h1 className="text-4xl md:text-7xl font-bold leading-tight">
              Your Health,
              <br />
              <span className="text-[#24CFEF]">
                Delivered to
              </span>
              <br />
              <span className="text-[#30A7F2]">
                Your Door
              </span>
            </h1>

            <p className="mt-4 text-lg max-w-md">
              Order genuine medicines, healthcare products, and essentials from
              verified pharmacies — fast, safe, and affordable.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <Button className="bg-[#2563EB] text-white">
                    <Link href={"/shop"}>Browse Medicines</Link>
              </Button>
              <Button size="lg" variant="outline" className="border hover:bg-white/10">
                Learn More
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap gap-6 text-sm">
              <span>✔ 100% Genuine</span>
              <span>✔ Fast Delivery</span>
              <span>✔ Licensed Sellers</span>
            </div>
          </div>

          <Card className="overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="/medicines.jpg"
              alt="Medicines"
              width={600}
              height={400}
              className="object-cover"
            />
          </Card>

        </div>
      </div>
      <div className="w-full px-4 md:px-10">
      <Card
        className="
          mx-auto
          rounded-3xl
          border border-blue-200
          bg-gradient-to-b from-blue-50 to-blue-100
          p-10 md:p-16
          text-center
        "
      >
        <div className="mb-6">
          <Button
            size="sm"
            className="rounded-full bg-blue-600 px-6 hover:bg-blue-700"
          >
            Get Started Today
          </Button>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
          Ready to Order Your Medicines?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          Join thousands of satisfied customers and experience hassle-free
          medicine delivery
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button size="lg" className="px-8">
            <Link href={"/register"}>Register Now</Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="px-8 border-slate-300 bg-[#2563EB] text-white"
          >
            <Link href={"/shop"}>Browse Medicines</Link>
          </Button>
        </div>
      </Card>
    </div>
    </section>
  )
}
