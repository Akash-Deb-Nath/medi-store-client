import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CTASection() {
  return (
    <section className="container mx-auto px-4 py-16">
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
    </section>
  )
}