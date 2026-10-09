"use client";

import { ArrowUpRight } from "lucide-react";
import {
  BriefcaseBusiness,
  Clapperboard,
  Cpu,
  FlaskConical,
  HeartPulse,
  LucideIcon,
  Newspaper,
  Trophy,
} from "lucide-react";
import { categories } from "@/constants";

const categoryIcons: Record<string, LucideIcon> = {
  general: Newspaper,
  business: BriefcaseBusiness,
  technology: Cpu,
  science: FlaskConical,
  health: HeartPulse,
  sports: Trophy,
  entertainment: Clapperboard,
};

const CategoryFilter = ({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) => {
  return (
    <section className="category-rail" aria-labelledby="category-heading">
      <div className="category-rail__header">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[.18em] text-[var(--neon-blue)]">
            Explore the signal
          </p>
          <h3 id="category-heading" className="mt-2 font-display text-2xl font-semibold tracking-[-.035em] text-[var(--ink)]">
            Browse by category
          </h3>
        </div>
        <span className="hidden font-mono text-[10px] uppercase tracking-[.14em] text-[var(--ink-faint)] sm:block">
          {categories.length} channels
        </span>
      </div>

      <div className="category-rail__list" role="tablist" aria-label="News categories">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          const CategoryIcon = categoryIcons[category.id] ?? Newspaper;

          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`category-tab ${isSelected ? "category-tab--active" : ""}`}
              onClick={() => onCategoryChange(category.id)}
            >
              <span className="category-tab__icon" aria-hidden="true">
                <CategoryIcon strokeWidth={1.8} />
              </span>
              <span>{category.name}</span>
              {isSelected ? <ArrowUpRight className="category-tab__arrow" aria-hidden="true" /> : null}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryFilter;
