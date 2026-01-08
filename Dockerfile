# =========================
# Base
# =========================
FROM node:20-bullseye AS base
WORKDIR /app

# =========================
# Dependencies (build)
# =========================
FROM base AS deps
ENV NODE_ENV=development

COPY package.json package-lock.json* ./
COPY prisma ./prisma

RUN npm ci

# =========================
# Builder
# =========================
FROM base AS builder
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# =========================
# Runner (STANDALONE)
# =========================
FROM node:20-bullseye AS runner
WORKDIR /app
ENV NODE_ENV=production

# Standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["node", "server.js"]
