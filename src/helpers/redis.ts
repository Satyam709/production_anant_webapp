import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  console.error("ERROR: REDIS_URL is not set in environment variables.");
  process.exit(1); // Exit the process if env is missing
}

const redis = new Redis(redisUrl, {
  tls: {
    rejectUnauthorized: false, // This is required for Upstash Redis
  },
});

// Log success or errors
redis.on("connect", () => console.log("Redis connected successfully!"));
redis.on("error", (err) => console.error("Redis connection error:", err));

export default redis;
