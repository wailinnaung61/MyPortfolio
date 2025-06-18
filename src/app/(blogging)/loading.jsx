import { Spinner } from "@/components/utils";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-grey bg-opacity-90">
      <Spinner />
    </div>
  );
}
