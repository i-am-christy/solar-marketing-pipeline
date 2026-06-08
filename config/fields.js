// config/fields.js

export const LeadSchema = {

  // ── Identity ──────────────────────────────────────────────────
  leadId:               String,   // MD5(name + phone + area) — stable unique ID
  createdAt:            String,   // ISO timestamp
  updatedAt:            String,   // ISO timestamp

  // ── Contact ───────────────────────────────────────────────────
  fullName:             String,   // Person name (if known)
  businessName:         String,   // Company / org name
  email:                String,   // Primary email (validated)
  emailStatus:          String,   // 'valid' | 'risky' | 'invalid' | 'unknown'
  emailSource:          String,   // 'hunter' | 'apollo' | 'scraped' | 'manual'
  phone:                String,   // +234XXXXXXXXXX normalised
  phoneRaw:             String,   // As scraped (audit trail)
  phoneCarrier:         String,   // 'MTN' | 'Airtel' | 'Glo' | '9mobile'
  phoneValid:           Boolean,
  whatsapp:             String,   // Same as phone unless different
  website:              String,

  // ── Location ──────────────────────────────────────────────────
  address:              String,
  area:                 String,   // Neighbourhood (e.g. "Lekki Phase 1")
  lga:                  String,   // Local Government Area
  state:                String,   // Default: "Lagos"
  country:              String,   // Default: "Nigeria"
  latitude:             Number,
  longitude:            Number,

  // ── Segment & Classification ───────────────────────────────────
  segment:              String,   // One of 14 segment IDs
  segmentLabel:         String,   // Human label (e.g. "Gated Estate")
  category:             String,   // 'residential' | 'commercial' | 'institutional' | 'community' | 'special'
  priorityTier:         Number,   // 1 (highest) → 4

  // ── Pain Signals ──────────────────────────────────────────────
  ekedcBand:            String,   // 'A' | 'B' | 'C' | 'D' | 'E'
  estDieselMonthlyNgn:  Number,   // Estimated monthly diesel spend
  painScore:            Number,   // 0–100
  leadScore:            Number,   // 0–100 overall quality

  // ── Enrichment ────────────────────────────────────────────────
  apolloId:             String,
  hunterDomain:         String,
  linkedinUrl:          String,
  jobTitle:             String,   // Decision-maker title if found
  decisionMakerName:    String,
  decisionMakerEmail:   String,
  companySize:          String,   // 'micro' | 'small' | 'medium' | 'large'
  industry:             String,

  // ── Scrape Metadata ───────────────────────────────────────────
  sourceUrl:            String,
  sourceName:           String,   // 'google_maps' | 'vconnect' | 'property_portal'
  scrapedAt:            String,
  rawData:              Object,   // Full raw API/HTML response (JSONB in DB)

  // ── Outreach & CRM ────────────────────────────────────────────
  status:               String,   // 'raw' | 'enriched' | 'ready' | 'sent' | 'replied' | 'visit_booked' | 'closed' | 'unsubscribed' | 'email_failed
  emailSentAt:          String,
  emailOpenedAt:        String,
  emailRepliedAt:       String,
  emailMessageId:       String,   // For tracking threads
  whatsappMessage:      String,   // Pre-generated outreach message
  emailSubject:         String,
  emailBody:            String,
  messageVariant:       String,   // A/B variant label
  followUpDate:         String,
  followUpCount:        Number,   // How many follow-ups sent
  notes:                String,
  assignedTo:           String,   // Sales rep name
};

export const DEFAULT_LEAD = {

  // ── Identity ──────────────────────────────────────────────────
  leadId:               null,   // MD5(name + phone + area) — stable unique ID
  createdAt:            null,   // ISO timestamp
  updatedAt:            null,   // ISO timestamp

  // ── Contact ───────────────────────────────────────────────────
  fullName:             null,   // Person name (if known)
  businessName:         null,   // Company / org name
  email:                null,   // Primary email (validated)
  emailStatus:          null,   // 'valid' | 'risky' | 'invalid' | 'unknown'
  emailSource:          null,   // 'hunter' | 'apollo' | 'scraped' | 'manual'
  phone:                null,   // +234XXXXXXXXXX normalised
  phoneRaw:             null,   // As scraped (audit trail)
  phoneCarrier:         null,   // 'MTN' | 'Airtel' | 'Glo' | '9mobile'
  phoneValid:           null,
  whatsapp:             null,   // Same as phone unless different
  website:              null,

  // ── Location ──────────────────────────────────────────────────
  address:              null,
  area:                 null,   // Neighbourhood (e.g. "Lekki Phase 1")
  lga:                  null,   // Local Government Area
  state:                'Lagos',   // Default: "Lagos"
  country:              'Nigeria',   // Default: "Nigeria"
  latitude:             null,
  longitude:            null,

  // ── Segment & Classification ───────────────────────────────────
  segment:              null,   // One of 14 segment IDs
  segmentLabel:         null,   // Human label (e.g. "Gated Estate")
  category:             null,   // 'residential' | 'commercial' | 'institutional' | 'community' | 'special'
  priorityTier:         null,   // 1 (highest) → 4

  // ── Pain Signals ──────────────────────────────────────────────
  ekedcBand:            null,   // 'A' | 'B' | 'C' | 'D' | 'E'
  estDieselMonthlyNgn:  null,   // Estimated monthly diesel spend
  painScore:            null,   // 0–100
  leadScore:            null,   // 0–100 overall quality

  // ── Enrichment ────────────────────────────────────────────────
  apolloId:             null,
  hunterDomain:         null,
  linkedinUrl:          null,
  jobTitle:             null,   // Decision-maker title if found
  decisionMakerName:    null,
  decisionMakerEmail:   null,
  companySize:          null,   // 'micro' | 'small' | 'medium' | 'large'
  industry:             null,

  // ── Scrape Metadata ───────────────────────────────────────────
  sourceUrl:            null,
  sourceName:           null,   // 'google_maps' | 'vconnect' | 'property_portal'
  scrapedAt:            null,
  rawData:              null,   // Full raw API/HTML response (JSONB in DB)

  // ── Outreach & CRM ────────────────────────────────────────────
  status:               'raw',   // 'raw' | 'enriched' | 'ready' | 'sent' | 'replied' | 'visit_booked' | 'closed' | 'unsubscribed' | 'email_failed
  emailSentAt:          null,
  emailOpenedAt:        null,
  emailRepliedAt:       null,
  emailMessageId:       null,   // For tracking threads
  whatsappMessage:      null,   // Pre-generated outreach message
  emailSubject:         null,
  emailBody:            null,
  messageVariant:       null,   // A/B variant label
  followUpDate:         null,
  followUpCount:        0,   // How many follow-ups sent
  notes:                null,
  assignedTo:           null,   // Sales rep name 
};