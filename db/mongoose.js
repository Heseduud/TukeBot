const userSchema = require('./schema/user');

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
}

module.exports.resetLeaderboard = async () => {
  await userSchema.updateMany({}, {kouluCount: 0});
}

module.exports.resetPerson = async (key) => {
  await userSchema.findOneAndUpdate({id: key}, {kouluCount: 0});
}