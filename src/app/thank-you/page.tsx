// should be server component, to perform server side validation

import PaymentStatus from "@/components/PaymentStatus";
import { PRODUCT_CATEGORIES } from "@/config";
import { getPayloadClient } from "@/get-payload";
import { getServerSideUser } from "@/lib/payload-utils";
import { formatPrice } from "@/lib/utils";
import { Product, User } from "@/payload-types";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function ThankYouPage({ searchParams }: PageProps) {
  const orderId = searchParams.orderId;
  const nextCookies = cookies();

  const { user } = await getServerSideUser(nextCookies);
  const payload = await getPayloadClient();

  const { docs: orders } = await payload.find({
    collection: "orders",
    depth: 2,
    where: {
      id: {
        equals: orderId,
      },
    },
  });

  const [order] = orders;

  if (!order) return notFound();

  // make sure only user who ordered can access this
  const orderUserId =
    typeof order.user === "string" ? order.user : order.user.id;

  if (orderUserId !== user?.id) {
    return redirect(`/sign-in?origin=thank-you?orderId=${order.id}`);
  }

  const products = order.products as Product[];

  const orderTotal = products.reduce(
    (total, product) => total + product.price,
    0,
  );
  const fee = 9.99;

  return (
    <div className="relative lg:min-h-full">
      {/* image container */}
      {/* <div className="hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">

      </div> */}
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
        {/* <div className="lg:col-start-2"> old div of below */}
        <div className="lg:col-start-2">
          <p className="text-sm font-medium text-blue- 600">Order successful</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Thanks for ordering
          </h1>
          {order._isPaid ? (
            <p className="mt-2 text-base text-muted-foreground">
              Your order was processed and your order will reach you the next
              time you enter NREM sleep. We&apos;ve sent your receipt and order
              details to{" "}
              {typeof order.user !== "string" ? (
                <span className="font-medium text-gray-900">
                  {order.user.email}
                </span>
              ) : null}
              .
            </p>
          ) : (
            // order not successful
            <p className="mt-2 text-base text-muted-foreground">
              We appreciate your order, and we&apos;re currently processing it.
              So hang tight and we&apos;ll send you confirmation very soon!
            </p>
          )}

          <div className="mt-16 text-sm font-medium">
            <div className="text-muted-foreground">Order number</div>
            <div className="mt-2 text-gray-900">{order.id}</div>

            <ul className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-muted-foreground">
              {(order.products as Product[]).map((product) => {
                const label = PRODUCT_CATEGORIES.find(
                  (obj) => obj.value === product.category,
                )?.label;

                const { image } = product.images[0];
                return (
                  <li key={product.id} className="flex space-x-6 py-6">
                    <div className="relative h-24 w-24">
                      {typeof image !== "string" && image.url ? (
                        <Image
                          fill
                          src={image.url}
                          alt={`${product.name} image`}
                          className="flex-none rounded-md bg-gray-100 object-cover object-center"
                        />
                      ) : null}
                    </div>
                    <div className="flex-auto flex flex-col justify-between">
                      <div className="space-y-1">
                        <h3 className="text-gray-900">{product.name}</h3>
                        <p className="my-1">Category: {label}</p>
                      </div>
                    </div>

                    <p className="flex-none font-medium text-gray-900">
                      {formatPrice(product.price)}
                    </p>
                  </li>
                );
              })}
            </ul>

            <div className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-muted-foreground">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p className="text-gray-900">{formatPrice(orderTotal)}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping fee</p>
                <p className="text-gray-900">{formatPrice(fee)}</p>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-900">
                <p className="text-base">Total</p>
                <p className="text-base">{formatPrice(orderTotal + fee)}</p>
              </div>
            </div>

            <PaymentStatus
              isPaid={order._isPaid}
              orderEmail={(order.user as User).email}
              orderId={order.id}
            />

            <div className="mt-16 border-t border-gray-200 py-6 text-right">
              <Link
                href="/products"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Continue shopping &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
