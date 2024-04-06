import { Access, CollectionConfig } from "payload/types";

const yourOwn: Access = ({ req: { user } }) => {
  if (user.role === "admin") return true;

  return {
    user: {
      equals: user?.id,
    },
  };
};

export const Orders: CollectionConfig = {
  slug: "orders",
  admin: {
    useAsTitle: "Your Orders",
    description: "A summary of all your orders on Maser.",
  },
  //only backend can create and update, admin and buyer + seller can view
  access: {
    create: ({ req }) => req.user.role === "admin",
    read: yourOwn,
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
  },
  fields: [
    // after reveal
    {
      // underscore to indicate internal
      name: "_isPaid",
      type: "checkbox",
      access: {
        create: () => false,
        read: ({ req }) => req.user.role === "admin",
        update: () => false,
      },
      //hidden, internal field
      admin: {
        hidden: true,
      },
      required: true,
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      required: true,
      // wont show up in dashboard
      admin: {
        hidden: true,
      },
    },
    // after reveal
    {
      name: "products",
      type: "relationship",
      relationTo: "products",
      hasMany: true,
      required: true,
    },
  ],
};
