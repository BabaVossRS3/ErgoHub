"use client";

import React, { useState } from 'react';
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { jobCategories } from '@/data/jobCategories';

const normalizeGreekText = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ά/g, 'α')
    .replace(/έ/g, 'ε')
    .replace(/ή/g, 'η')
    .replace(/ί/g, 'ι')
    .replace(/ϊ/g, 'ι')
    .replace(/ΐ/g, 'ι')
    .replace(/ό/g, 'ο')
    .replace(/ύ/g, 'υ')
    .replace(/ϋ/g, 'υ')
    .replace(/ΰ/g, 'υ')
    .replace(/ώ/g, 'ω');
};

const ProfessionSelect = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Create a flattened array of all professions once
  const allProfessions = React.useMemo(() => {
    const professions = [];
    jobCategories.forEach(category => {
      category.subCategories.forEach(subCategory => {
        subCategory.professions.forEach(profession => {
          professions.push({
            value: profession,
            categoryId: category.id,
            categoryName: category.name,
            subCategoryId: subCategory.id,
            subCategoryName: subCategory.name
          });
        });
      });
    });
    return professions;
  }, []);

  // Define preferred order for categories
  const categoryOrder = [
    'home-services',    
    'professional-services',
    'tech-services',
    'beauty-wellness',
    'events-entertainment',
    'automotive',
    'education',
    'healthcare',     
    'pet-services'
  ];

  const getFilteredResults = (query) => {
    if (!query) {
      // Sort categories according to our preferred order
      return jobCategories
        .slice()
        .sort((a, b) => {
          const indexA = categoryOrder.indexOf(a.id);
          const indexB = categoryOrder.indexOf(b.id);
          return indexA - indexB;
        });
    }
    
    const normalizedQuery = normalizeGreekText(query);
    // First find matching professions
    const matchingProfessions = allProfessions.filter(prof => {
      const normalizedProf = normalizeGreekText(prof.value);
      const isMatch = normalizedProf.includes(normalizedQuery);
      return isMatch;
    });

    // Then reconstruct the category hierarchy with only matching professions
    const filteredCategories = jobCategories
      .map(category => ({
        ...category,
        subCategories: category.subCategories
          .map(subCategory => ({
            ...subCategory,
            professions: subCategory.professions.filter(profession =>
              matchingProfessions.some(match => match.value === profession)
            )
          }))
          .filter(subCategory => subCategory.professions.length > 0)
      }))
      .filter(category => category.subCategories.length > 0);

    return filteredCategories;
  };

  const filteredCategories = getFilteredResults(searchQuery);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value || "Επιλέξτε επάγγελμα..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput 
            placeholder="Αναζήτηση επαγγέλματος..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>Δεν βρέθηκε επάγγελμα.</CommandEmpty>
            {filteredCategories.map((category, index) => (
              <React.Fragment key={category.id}>
                {index > 0 && <CommandSeparator />}
                {category.subCategories.map((subCategory) => (
                  <CommandGroup key={subCategory.id} heading={subCategory.name}>
                    {subCategory.professions.map((profession) => (
                      <CommandItem
                        key={profession}
                        value={profession}
                        onSelect={() => {
                          onChange(profession);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === profession ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <span>{profession}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
              </React.Fragment>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ProfessionSelect;