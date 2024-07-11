import { getUserListModel } from "../../Models/user/getUserListModel.js";

export const getUserListController = async (req, res, next) => {
  try {
    const usersList = await getUserListModel();

    res.status(200).send({ status: "ok", usersList });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
