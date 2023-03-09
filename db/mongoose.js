/* eslint-disable new-cap */
const userSchema = require('./schema/user');
const momentSchema = require('./schema/moment');

module.exports.getUser = async (key) => {
  let user = await userSchema.findOne({ id: key });
  if (user) {
    return user;
  } else {
    user = new userSchema({
      id: key,
      kouluCount: 0
    });

    await user
      .save()
      .catch(e => console.error(e));

    return user;
  }
};

module.exports.addCount = async (key) => {
  let user = await userSchema.findOne({ id: key });
  if (user) {
    user.kouluCount += 1;
    await user
      .save()
      .catch(e => console.error(e));

    return user;
  } else {
    user = new userSchema({
      id: key,
      kouluCount: 1
    });

    await user
      .save()
      .catch(e => console.error(e));

    return user;
  }
};

module.exports.getAllUsers = async () => {
  const res = await userSchema.find({});
  return res;
};

module.exports.resetLeaderboard = async () => {
  await userSchema.deleteMany({});
};

module.exports.resetPerson = async (key) => {
  await userSchema.deleteOne({ id: key });
};

module.exports.addMoment = async (key, text) => {
  const user = await this.getUser(key);
  const moment = new momentSchema({
    user: user._id,
    text: text
  });

  await moment
    .save()
    .catch(e => console.error(e));

  return moment;
};

module.exports.getMoments = async (key) => {
  const user = await this.getUser(key);
  const moments = await momentSchema.find({ user: user._id });
  return moments;
};
