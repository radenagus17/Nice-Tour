import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSeatList() {
  return (
    <form className="flex flex-row justify-between gap-5">
      <div className="flex gap-5">
        <div className="flex flex-col gap-[19px]">
          {[0, 1, 2, 3].map((val) => (
            <Skeleton key={val} className="size-[60px] rounded-xl bg-white" />
          ))}
        </div>
        <div className="flex flex-col gap-[19px]">
          {[0, 1, 2, 3].map((val) => (
            <Skeleton key={val} className="size-[60px] rounded-xl bg-white" />
          ))}
        </div>
      </div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-[19px]">
          {[0, 1, 2, 3].map((val) => (
            <Skeleton key={val} className="size-[60px] rounded-xl bg-white" />
          ))}
        </div>
        <div className="flex flex-col gap-[19px]">
          {[0, 1, 2, 3].map((val) => (
            <Skeleton key={val} className="size-[60px] rounded-xl bg-white" />
          ))}
        </div>
      </div>
    </form>
  );
}
