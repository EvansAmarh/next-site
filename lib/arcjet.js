// // lib/arcjet.js
// import arcjet, { tokenBucket, detectBot } from "@arcjet/next";

// console.log("✅ ARCJET_KEY:", process.env.ARCJET_KEY);

// const aj = arcjet({
//   key: process.env.ARCJET_KEY,
//   characteristics: ["userId"],
//   rules: [
//     tokenBucket({
//       mode: "LIVE", // Or "DRY_RUN" for dev
//       refillRate: 10,
//       interval: 60,
//       capacity: 10,
//     }),
//     detectBot({
//       mode: "LIVE",
//       allow: ["CATEGORY:SEARCH_ENGINE"],
//     }),
//   ],
// });

// export default aj;

// lib/arcjet.js
// Arcjet disabled
export default {};
