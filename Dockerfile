# =========================
# Base
# =========================
FROM node:20-bullseye AS base
WORKDIR /app
ENV NODE_ENV=production

# =========================
# Dependencies
# =========================
FROM base AS deps

COPY package.json package-lock.json* ./
COPY prisma ./prisma

RUN npm ci

# =========================
# Builder
# =========================
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# =========================
# Runner
# =========================
FROM node:20-bullseye AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/next.config.* ./

EXPOSE 3000

CMD ["npm", "start"]
