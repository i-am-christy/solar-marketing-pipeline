// config/tools.js
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { Client as RedisClient } from '@upstash/redis';
import { Client as MapsClient } from '@googlemaps/google-maps-services-js';
import { Logtail } from '@logtail/node';
import * as Sentry from '@sentry/node';



//supabase client
export const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);

//google maps client
export const googleMapsClient = new MapsClient({});

//apollo.io client
export const apolloClient = {
  enrichPerson: async (email) => {
    const res = await fetch("https://api.apollo.io/v1/people/match", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": process.env.APOLLO_API_KEY
      },
      body: JSON.stringify({ email })
    });

    if (!res.ok) {
      throw new Error(`Apollo API failed: ${res.status}`);
    }

    return res.json();
  }
};

//resend client
export const resendClient = new Resend(
    process.env.RESEND_API_KEY
);

//redis upstash client
export const redis = new RedisClient({
    token: process.env.UPSTASH_REDIS_TOKEN,
    url: process.env.UPSTASH_REDIS_URL
});

//zerobounce client
export const zeroBounceClient = {
  validateEmail: async (email) => {
    const res = await fetch(
      `https://api.zerobounce.net/v2/validate?api_key=${process.env.ZEROBOUNCE_API_KEY}&email=${encodeURIComponent(email)}`
    );

    if (!res.ok) {
      throw new Error(`ZeroBounce API failed: ${res.status}`);
    }

    return res.json();
  }
};

//betterstack client
export const logger = new Logtail(
  process.env.LOGTAIL_SOURCE_TOKEN
);

export const PIPELINE_CONFIG = {
  batchSize: Number(process.env.BATCH_SIZE),
  maxRetries: Number(process.env.MAX_RETRIES),
  requestDelayMs: Number(process.env.REQUEST_DELAY_MS),
  minLeadScore: Number(process.env.MIN_LEAD_SCORE),
  dailyScrapeTarget: Number(process.env.DAILY_SCRAPE_TARGET),
  dailyEmailTarget: Number(process.env.DAILY_EMAIL_TARGET),
};

//sentry client
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0
});

export { Sentry };