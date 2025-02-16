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
import { greekAreas } from '@/data/greekAreas';

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

const LocationSelect = ({ value, onChange = () => {} }) => {  // Added default empty function
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Create a flattened array of all areas once
  const allAreas = React.useMemo(() => {
    const areas = [];
    greekAreas.forEach(region => {
      region.subAreas.forEach(subArea => {
        subArea.areas.forEach(area => {
          areas.push({
            value: area,
            regionId: region.id,
            regionName: region.name,
            subAreaId: subArea.id,
            subAreaName: subArea.name
          });
        });
      });
    });
    return areas;
  }, []);

  // Define preferred order for regions
  const regionOrder = [
    'attiki',
    'thessaloniki',
    'patra'
  ];

  const getFilteredResults = (query) => {
    if (!query) {
      // Sort regions according to our preferred order
      return greekAreas
        .slice()
        .sort((a, b) => {
          const indexA = regionOrder.indexOf(a.id);
          const indexB = regionOrder.indexOf(b.id);
          return indexA - indexB;
        });
    }
    
    const normalizedQuery = normalizeGreekText(query);
    // First find matching areas
    const matchingAreas = allAreas.filter(area => {
      const normalizedArea = normalizeGreekText(area.value);
      const isMatch = normalizedArea.includes(normalizedQuery);
      return isMatch;
    });

    // Then reconstruct the region hierarchy with only matching areas
    const filteredRegions = greekAreas
      .map(region => ({
        ...region,
        subAreas: region.subAreas
          .map(subArea => ({
            ...subArea,
            areas: subArea.areas.filter(area =>
              matchingAreas.some(match => match.value === area)
            )
          }))
          .filter(subArea => subArea.areas.length > 0)
      }))
      .filter(region => region.subAreas.length > 0);

    return filteredRegions;
  };

  const filteredRegions = getFilteredResults(searchQuery);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value 
            ? value
            : "Επιλέξτε περιοχή..."
          }
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput 
            placeholder="Αναζήτηση περιοχής..." 
            value={searchQuery}
            onValueChange={setSearchQuery}
          />
          <CommandList>
            <CommandEmpty>Δεν βρέθηκε περιοχή.</CommandEmpty>
            {filteredRegions.map((region, index) => (
              <React.Fragment key={region.id}>
                {index > 0 && <CommandSeparator />}
                {region.subAreas.map((subArea) => (
                  <CommandGroup key={subArea.id} heading={subArea.name}>
                    {subArea.areas.map((area) => (
                      <CommandItem
                        key={area}
                        value={area}
                        onSelect={(currentValue) => {
                          onChange(currentValue);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === area ? "opacity-100" : "opacity-0"
                          )}
                        />
                        <span>{area}</span>
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

export default LocationSelect;