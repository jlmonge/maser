import VerifyEmail from "@/components/VerifyEmail";
import Image from "next/image";

//key: token, value = token value
interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

// get the token, then render the page based on the token
export default function VerifyEmailPage({ searchParams }: PageProps) {
  const token = searchParams.token;
  const toEmail = searchParams.to;

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {token && typeof token === "string" ? (
          <div className="grid gap-6">
            <VerifyEmail token={token} />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            {/* below div is wrapper for img */}
            {/* <div className="relative mb-4 h-60 w-60 text-muted-foreground">
              
            </div> */}
            <h3 className="font-semibold text-2xl">Check your email</h3>

            {toEmail ? (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a verification link to{" "}
                <span className="font-semibold">{toEmail}</span>.
              </p>
            ) : (
              <p className="text-muted-foreground text-center">
                We&apos;ve sent a verification link to your email
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
