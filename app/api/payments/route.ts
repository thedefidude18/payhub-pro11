import { type NextRequest, NextResponse } from "next/server"
import { PaymentService } from "@/lib/services/payment-service"

export async function GET() {
  try {
    const payments = await PaymentService.getAllPayments()
    return NextResponse.json(payments)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const payment = await request.json()
    const newPayment = await PaymentService.createPayment(payment)
    return NextResponse.json(newPayment)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create payment" }, { status: 500 })
  }
}
