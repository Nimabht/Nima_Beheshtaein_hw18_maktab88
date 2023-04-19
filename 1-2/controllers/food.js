import { Food } from "../models/food.js";
import AppError from "../utils/AppError.js";
import validateFood from "../validators/food.js";
export default {
  getAllFoods: async (req, res, next) => {
    const foods = await Food.findAll();
    res.send(foods);
  },
  getFoodById: async (req, res, next) => {
    res.send(req.food);
  },
  createFood: async (req, res, next) => {
    const { error, value } = validateFood(req.body);
    if (!!error) {
      const ex = new AppError(error.details[0].message, "fail", 400);
      return next(ex);
    }
    const food = await Food.create(value);
    res.status(201).send(food);
  },
  updateFood: async (req, res, next) => {
    const { error, value } = validateFood(req.body);
    if (!!error) {
      const ex = new AppError(error.details[0].message, "fail", 400);
      return next(ex);
    }
    await Food.update(value, {
      where: { id: req.food.id },
    });
    const updatedFood = await Food.findOne({
      where: { id: req.food.id },
    });
    res.status(200).send(updatedFood);
  },
  deleteFood: async (req, res, next) => {
    const id = req.food.id;
    await Food.destroy({ where: { id } });
    res.status(204).end();
  },
};
