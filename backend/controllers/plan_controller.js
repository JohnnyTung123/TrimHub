const Plan = require("../models/plan");

const createPlan = async (req, res) => {
  const { salonId, name, price, description } = req.body;

  if (!salonId || !name || !price || !description) {
    console.log("Receive empty data");
    return res.status(400).json({ error: "Receive empty data" });
  }

  try {
    const plan = await Plan.create({
      salon: salonId,
      name: name,
      price: price,
      description: description,
    });
    await plan.populate("salon");

    console.log("Created Plan:", plan);
    res.status(201).json(plan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

const getPlan = async (req, res) => {
  const { planId } = req.params;

  try {
    const plan = await Plan.findById(planId).populate("salon");
    console.log("Got Plan:", plan);
    res.status(200).json(plan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

const getPlans = async (req, res) => {
  const { salonId } = req.query;

  try {
    const plans = await Plan.find({ salon: salonId }).populate("salon");
    console.log("Got Plans:", plans);
    res.status(200).json(plans);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

const updatePlan = async (req, res) => {
  const { planId } = req.params;
  const { name, price, description } = req.body;

  try {
    const plan = await Plan.findByIdAndUpdate(
      planId,
      {
        name,
        price,
        description,
      },
      { new: true },
    );
    if (!plan) {
      return res.status(404).json({ error: `Cannot find Plan Id ${planId}` });
    }
    console.log("Updated Plan:", plan);
    res.status(200).json(plan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

const deletePlan = async (req, res) => {
  const { planId } = req.params;

  try {
    const plan = await Plan.findByIdAndDelete(planId);
    if (!plan) {
      return res.status(404).json({ error: `Cannot find Plan Id ${planId}` });
    }
    console.log("Deleted Plan:", plan);
    res.status(204).json(plan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Server side error: ${error.message}` });
  }
};

module.exports = { createPlan, getPlan, getPlans, updatePlan, deletePlan };
