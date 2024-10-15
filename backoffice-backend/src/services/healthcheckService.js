import config from "../config.js";

export const getHealthcheck = async () => {
  return { status: "UP", version: config.version };
};
