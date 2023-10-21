const DATABASE_URL = `mongodb+srv://jaxon:12345@cluster0.cmcdhij.mongodb.net/qwiklok?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 8080;

const JWT_KEY_SECRET = `time_waits_for_noone`;

module.exports = { DATABASE_URL, PORT, JWT_KEY_SECRET };
