const shortid = require("shortid");

const uploadResolver = {
  Query: {
    users: (parent, args, { db }) => db.get("users").value()
  },

  Mutation: {
    createUser: async (
      parent,
      { picture, document, ...rest },
      { db, storeUpload }
    ) => {
      const id = shortid.generate();
      const { filename: filename1 } = await storeUpload(picture, id);
      const { filename: filename2 } = await storeUpload(document, id);

      const user = {
        id,
        ...rest,
        picture: filename1,
        document: filename2
      };

      db.get("users")
        .push(user)
        .write();

      return user;
    }
  }
};

export default uploadResolver;
