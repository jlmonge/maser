import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { buildConfig } from "payload/config";
import { slateEditor } from "@payloadcms/richtext-slate";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import path from "path";

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  collections: [],
  routes: {
    admin: "/sell",
  },
  admin: {
    // only used for admin dashboard, it's separate from nextjs bundler
    bundler: webpackBundler(),
    meta: {
      titleSuffix: "- Maser",
      favicon: "/favicon.ico",
      ogImage: "/thumbnail.jpg",
    },
  },
  rateLimit: {
    // default: 500
    max: 2000,
  },
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
});
