export default function LoadingItem() {
  return (
    <div className="group">
      <article className="flex flex-col items-center justify-center group group-hover:opacity-60 hover:grayscale">
        <div className="animate-pulse">
          <div className="relative mb-1 w-28 h-28 md:w-40 md:h-40 bg-slate-300"></div>
        </div>
        <div className="animate-pulse">
          <div className="w-24 h-2 mt-2 rounded bg-slate-200"></div>
          <div className="w-24 h-2 mt-2 rounded bg-slate-100"></div>
        </div>
      </article>
    </div>
  );
}
