const Service = require('../models/Service');

exports.createService = async (req, res) => {
  try {
    const newService = new Service(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getServices = async (req, res) => {
  try {
    const { categorie, ville, keywords } = req.query;
    let filter = {};
    
    if (categorie) {
      filter.categorie = categorie;
    }
    
    if (ville) {
      filter.ville = ville;
    }
    
    if (keywords) {
      filter.$or = [
        { titre: { $regex: keywords, $options: 'i' } },
        { description: { $regex: keywords, $options: 'i' } }
      ];
    }
    
    const services = await Service.find(filter);
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service supprimé.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
