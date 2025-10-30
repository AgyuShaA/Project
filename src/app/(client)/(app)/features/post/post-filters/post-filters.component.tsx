"use client";

import { SortOrder } from "../../../entities/models";
import { Input } from "../../../shared/ui/input";
import { Button } from "../../../shared/ui/button";
import { useTranslations } from "next-intl";

interface PostFiltersProps {
  search: string;
  sortOrder: SortOrder;
  setSearch: (value: string) => void;
  setSortOrder: (order: SortOrder) => void;
}

export default function PostFilters({
  search,
  sortOrder,
  setSearch,
  setSortOrder,
}: PostFiltersProps) {
  const t = useTranslations("posts");

  const sortButtons = [
    { label: t("sort.titleAsc"), order: SortOrder.TitleAsc },
    { label: t("sort.titleDesc"), order: SortOrder.TitleDesc },
    { label: t("sort.oldest"), order: SortOrder.IdAsc },
    { label: t("sort.newest"), order: SortOrder.IdDesc },
  ];

  const handleSort = (order: SortOrder) => {
    if (order !== sortOrder) setSortOrder(order);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const buttonClass = (order: SortOrder) =>
    `rounded-md px-4 py-1 transition cursor-pointer ${
      sortOrder === order
        ? "bg-blue-600 text-white"
        : "bg-gray-100 text-gray-700 hover:bg-blue-200"
    }`;

  return (
    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:gap-6">
      <Input
        placeholder={t("searchPlaceholder")}
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
