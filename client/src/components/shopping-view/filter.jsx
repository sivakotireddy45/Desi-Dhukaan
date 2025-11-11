

import { filterOptions } from "@/config";
import { Fragment } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

function ProductFilter({ filters, handleFilter }) {
  return (
    <div className="rounded-xl shadow-lg bg-gradient-to-br from-cyan-300/30 to-green-300/30 backdrop-blur-xl border border-white/20 text-black">
      <div className="p-4 border-b border-white/30">
        <h2 className="text-lg font-extrabold">Filters</h2>
      </div>

      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem, idx) => (
          <Fragment key={keyItem}>
            <div>
              <h3 className="text-base font-bold">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option) => (
                  <Label
                    key={option.id}
                    className="flex items-center gap-2 text-black font-medium"
                  >
                    <Checkbox
                      checked={
                        filters?.[keyItem]?.includes(option.id) || false
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            {idx !== Object.keys(filterOptions).length - 1 && (
              <Separator className="bg-white/30" />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default ProductFilter;
