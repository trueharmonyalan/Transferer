import dotenv from "dotenv";
dotenv.config({ quiet: true });
export const ENV = {
    PORT: process.env.PORT || 9010,
    NODE_ENV: process.env.NODE_ENV || "development",
};
