# After changing this file:
#   pnpm dev:app:rebuild    # rebuild flare-app image and recreate its container
# Optional full cleanup:
#   pnpm dev:docker:cleanup # remove containers, local compose images, and volumes

FROM node:24-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Refer to .dockerignore for ex/included files
COPY . .

EXPOSE 3000

CMD ["pnpm", "dev", "--hostname", "0.0.0.0", "--port", "3000"]
