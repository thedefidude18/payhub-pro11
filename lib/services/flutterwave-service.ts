"use client"

interface FlutterwaveConfig {
  public_key: string
  tx_ref: string
  amount: number
  currency: string
  payment_options: string
  customer: {
    email: string
    phone_number?: string
    name: string
  }
  customizations: {
    title: string
    description: string
    logo?: string
  }
  callback: (response: any) => void
  onclose: () => void
}

interface PaymentData {
  amount: number
  currency: string
  email: string
  name: string
  phone?: string
  projectId: string
  freelancerId: string
  description: string
}

export class FlutterwaveService {
  private static publicKey = "FLWPUBK_TEST-8c5e41f0e8fab86eb65afcbe88045cdf-X"
  private static secretKey = "FLWSECK_TEST-9de31a88414f45d0f7f7d44e8d7c6c23-X"
  private static encryptionKey = "FLWSECK_TEST4d056efeb439"

  static generateTxRef(): string {
    return `PV_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  static async initializePayment(paymentData: PaymentData): Promise<any> {
    const config: FlutterwaveConfig = {
      public_key: this.publicKey,
      tx_ref: this.generateTxRef(),
      amount: paymentData.amount,
      currency: paymentData.currency,
      payment_options: "card,mobilemoney,ussd,banktransfer",
      customer: {
        email: paymentData.email,
        phone_number: paymentData.phone,
        name: paymentData.name,
      },
      customizations: {
        title: "PayVidi Payment",
        description: paymentData.description,
        logo: "https://payvidi.com/logo.png",
      },
      callback: (response) => {
        console.log("Payment callback:", response)
        this.verifyPayment(response.transaction_id)
      },
      onclose: () => {
        console.log("Payment modal closed")
      },
    }

    // Load Flutterwave script if not already loaded
    if (!window.FlutterwaveCheckout) {
      await this.loadFlutterwaveScript()
    }

    return new Promise((resolve, reject) => {
      try {
        window.FlutterwaveCheckout({
          ...config,
          callback: (response: any) => {
            resolve(response)
            config.callback(response)
          },
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  static async verifyPayment(transactionId: string): Promise<any> {
    try {
      const response = await fetch(`/api/payments/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transaction_id: transactionId,
          secret_key: this.secretKey,
        }),
      })

      return await response.json()
    } catch (error) {
      console.error("Payment verification failed:", error)
      throw error
    }
  }

  static async loadFlutterwaveScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.getElementById("flutterwave-script")) {
        resolve()
        return
      }

      const script = document.createElement("script")
      script.id = "flutterwave-script"
      script.src = "https://checkout.flutterwave.com/v3.js"
      script.onload = () => resolve()
      script.onerror = () => reject(new Error("Failed to load Flutterwave script"))
      document.head.appendChild(script)
    })
  }

  static calculateCommission(amount: number, commissionRate: number) {
    const commission = (amount * commissionRate) / 100
    const freelancerAmount = amount - commission
    return {
      commission,
      freelancerAmount,
      platformFee: commission,
    }
  }
}

// Extend window object for TypeScript
declare global {
  interface Window {
    FlutterwaveCheckout: (config: FlutterwaveConfig) => void
  }
}
