import { Filter } from "lucide-react";
import { memo } from "react";

export const EmptyState = memo(function EmptyState({
  onReset,
}: { onReset?: () => void }) {
  return (
    <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center text-center">
      <Filter className="w-8 h-8 text-zinc-700 mb-3" />
      <h3 className="text-sm font-semibold text-zinc-300">No results</h3>
      <p className="text-xs text-zinc-500 mt-1 mb-4">
        Adjust filters or search query.
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-lg transition-all duration-200 ease-out active:scale-95"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
});
