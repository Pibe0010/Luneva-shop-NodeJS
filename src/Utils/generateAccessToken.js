import { JTW_SECRET } from "../../env.js";
import jtw from "jsonwebtoken";

export const generateAccessToken = (user) => {
  return jtw.sign(
    {
      ID_user: user.ID_user,
      user_name: user.user_name,
      last_name: user.last_name,
      role: user.role,
    },
    JTW_SECRET,
    { expiresIn: "7d" }
  );
};
