import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    "collaborator_pro": "price_1TyFkTJaIoEaXo392hSutMe4",
    "collaborator_premium": "price_1TyFg7JaIoEaXo39ZmU7acTE",
    "founder_growth": "price_1TyFnYJaIoEaXo39IRVX2zwJ",
    "founder_enterprise": "price_1TyFpdJaIoEaXo39twBoqnZA",
}