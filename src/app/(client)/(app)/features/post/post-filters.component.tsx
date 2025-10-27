"use client";

import { useCallback, useMemo } from "react";
import { SortOrder } from "../../entities/models";
import { usePostsFilterStore } from "../../shared/store";
import { Input } from "../../shared/ui/input";
import { Button } from "../../shared/ui/button";

export default function PostFilters() {
  const { search, setSearch, sortOrder, setSortOrder } = usePostsFilterStore();

  const sortButtons = useMemo(
    () => [
      { label: "A → Z", order: SortOrder.TitleAsc },
      { label: "Z → A", order: SortOrder.TitleDesc },
      { label: "Oldest", order: SortOrder.IdAsc },
      { label: "Newest", order: SortOrder.IdDesc },
    ],
    []
  );

  const handleSort = useCallback(
    (order: SortOrder) => {
      if (order !== sortOrder) setSortOrder(order);
    },
    [sortOrder, setSortOrder]
  );

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [setSearch]
  );

  const buttonClass = useCallback(
    (order: SortOrder) =>
      `rounded-md px-4 py-1 transition cursor-pointer ${
        sortOrder === order
          ? "bg-blue-600 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-blue-200"
      }`,
    [sortOrder]
  );

  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:gap-6">
      <Input
        placeholder="Search posts..."
        value={search}
        onChange={handleSearch}
        className="mb-3 w-full rounded-lg border border-gray-300 p-2 shadow-sm transition sm:mb-0 sm:flex-1"
      />

      <div className="flex flex-wrap gap-2">
        {sortButtons.map(({ label, order }) => (
          <Button
            key={order}
            onClick={() => handleSort(order)}
            className={buttonClass(order)}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
