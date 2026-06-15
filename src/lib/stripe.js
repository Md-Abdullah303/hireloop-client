import "server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const PLAN_PRICE_ID = {
  "seeker-pro": "price_1TiRLkPfjqy0gSlwHeJvHhFu",
  "seeker-premium": "price_1TiRNvPfjqy0gSlwvbyRZ19Y",
  "recruiter-growth": "price_1TiROmPfjqy0gSlwx6PF3rhL",
  "recruiter-enterprise": "price_1TiRPAPfjqy0gSlwrNWoURuD",
};
