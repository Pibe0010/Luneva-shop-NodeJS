import { selectUserByIdModel } from "../../Models/user/selectUserByIdModel.js";

export const getProfileUserController = async (req, res, next) => {
  try {
    const ID_user = req.user.id_user;
    const user = await selectUserByIdModel(ID_user);

    res.status(200).send({
      status: "ok",
      data: user,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
