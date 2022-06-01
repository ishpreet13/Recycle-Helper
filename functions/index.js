const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
exports.GCFPrediction = functions.https.onCall((data, context) => {
  const imagePath = data.image;
  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError("failed-precondition", "Auth"+
    "entication failed");
  }
  if (imagePath==null) {
    throw new functions.https.HttpsError("invalid-argument", "Image path"+
    "cannot be null");
  }
  
  return {
    imagePath: imagePath,
  };
});
