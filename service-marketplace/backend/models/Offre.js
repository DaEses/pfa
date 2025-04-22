const mongoose = require('mongoose');

const offreSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  typeMission: { type: String, required: true },
  competences: { type: [String], required: true },
  description: { type: String, required: true },
  recruteur: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Offre', offreSchema);
