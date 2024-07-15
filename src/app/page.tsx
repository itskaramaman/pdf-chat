import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className="text-sm font-semibold text-gray-700">
            PDF-Note is now public
          </p>
        </div>
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl leading-relaxed">
          Notes with your{" "}
          <span className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
            documents
          </span>{" "}
          in seconds.
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
          PDF-Notes enables you to have create notes using AI with any PDF
          document. Simply upload your file and start writing notes right away.
        </p>
        <Link
          className={buttonVariants({ size: "lg", className: "mt-5" })}
          href="/dashboard"
          target="_blank"
        >
          Get Started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </MaxWidthWrapper>
      <MaxWidthWrapper className="my-10 md:my-20 rounded-lg">
        <Image
          src="/rockymountain.png"
          alt=""
          width={0}
          height={0}
          quality={100}
          sizes="100vw"
          className="w-full drop-shadow-lg"
        />
      </MaxWidthWrapper>

      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col justify-center text-start">
        <h1 className="max-w-4xl text-3xl font-semibold md:text-4xl lg:text-5xl leading-relaxed">
          Start chatting in minutes
        </h1>
        <p className="text-gray-600 mt-1">
          Chatting with your PDF files has never been this easier.
        </p>
        <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4">
              <span>Step 1</span>
              <span className="text-xl font-semibold">
                Sign up for an account
              </span>
              <span className="mt-2 text-zinc-700">
                Either starting out a free plan or choose our{" "}
                <Link className="text-blue-700 hover:underline" href="/pricing">
                  pro plan.
                </Link>
              </span>
            </div>
          </li>

          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4">
              <span>Step 2</span>
              <span className="text-xl font-semibold">
                Upload your PDF file
              </span>
              <span className="mt-2 text-zinc-700">
                We&apos;ll process your file and make it ready for you to note
                with.
              </span>
            </div>
          </li>

          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4">
              <span>Step 3</span>
              <span className="text-xl font-semibold">
                Start creating notes
              </span>
              <span className="mt-2 text-zinc-700">
                It&apos;s that simple. Try it yourself - it really takes less
                than a minute.
              </span>
            </div>
          </li>
        </ol>
      </MaxWidthWrapper>

      <MaxWidthWrapper className="mb-20">
        <Image
          src="/file-upload-preview.jpg"
          alt=""
          width={0}
          height={0}
          quality={100}
          sizes="100vw"
          className="w-full drop-shadow-lg"
        />
      </MaxWidthWrapper>
    </>
  );
}
