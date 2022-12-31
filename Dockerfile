FROM denoland/deno:latest as base

WORKDIR /build

COPY main.ts ./
COPY deno.lock ./
COPY deno.json ./
COPY src ./src
COPY lib ./lib

RUN deno cache main.ts

CMD ["run", "--allow-net", "--allow-env", "--allow-read", "main.ts"] 