# =========================
# Base
# =========================
FROM node:20-bullseye AS base
WORKDIR /app

# Evita problemas com OpenSSL / Prisma
ENV NODE_ENV=production

# =========================
# Dependencies
# =========================
FROM base AS deps

COPY package.json package-lock.json* ./

RUN npm ci

# =========================
# Builder
# =========================
FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Prisma precisa do DATABASE_URL no build
# (não define aqui — será injetado pelo ambiente)
RUN npm run build

# =========================
# Runner (produção)
# =========================
FROM node:20-bullseye AS runner

WORKDIR /app
ENV NODE_ENV=production

# Apenas o necessário para rodar
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/next.config.* ./

EXPOSE 3000

CMD ["npm", "start"]
