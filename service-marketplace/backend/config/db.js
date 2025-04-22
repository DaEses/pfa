const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      
    });
    console.log(`✅ MongoDB connecté : ${conn.connection.host}`);
  } catch (err) {
    console.error('❌ Échec de la connexion à MongoDB :', err.message);
    process.exit(1); // Quitter l'application
  }
};

module.exports = connectDB;
