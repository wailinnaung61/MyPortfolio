import Link from "next/link";
import Image from "next/image";
import i18next from "i18next";

export default function NotFound() {
  const lng = i18next.language || "en";
  const t = (key) => i18next.t(key, { lng, ns: "common" });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-24 lg:py-28 xl:py-32">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-6 text-center">
          <Image
            src="/images/notfound.svg"
            alt="404 Not Found"
            width={500}
            height={400}
            className="mx-auto mb-8"
            priority
          />
        </div>
      </div>
    </div>
  );
}
