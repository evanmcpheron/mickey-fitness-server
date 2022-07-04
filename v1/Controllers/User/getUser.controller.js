import User from "../../Models/User";

export default {
  me: async (req, res) => {
    res.send({ currentUser: req.currentUser || null });
  },
};
