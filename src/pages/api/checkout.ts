import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../lib/stripe'

interface Product {
  id: string
  name: string
  imageUrl: string
  price: string
  description: string
  defaultPriceId: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const checkoutProducts = JSON.parse(req.body.checkout) as Product[]

  if (!checkoutProducts) {
    return res.status(400).json({ error: 'Price not found' })
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}`

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'payment',
    line_items: checkoutProducts,
  })

  return res.status(201).json({ checkoutUrl: checkoutSession.url })
}
