'use client';

import { useState } from 'react';
import { Search, Command } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  
  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
  };

  const handleSelect = () => {
    setOpen(false);
    setQuery('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        >
          <Search className="h-4 w-4 xl:mr-2" />
          <span className="hidden xl:inline-flex">Search...</span>
          <span className="sr-only">Search</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <CommandDialog>
          <CommandInput
            placeholder="Search posts, components, or documentation..."
            value={query}
            onValueChange={handleSearch}
          />
          <CommandList>
            {query && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
            {!query && (
              <CommandGroup heading="Quick Links">
                <CommandItem onSelect={handleSelect}>
                  <Command className="mr-2 h-4 w-4" />
                  <span>View all components</span>
                </CommandItem>
                <CommandItem onSelect={handleSelect}>
                  <Command className="mr-2 h-4 w-4" />
                  <span>Browse documentation</span>
                </CommandItem>
                <CommandItem onSelect={handleSelect}>
                  <Command className="mr-2 h-4 w-4" />
                  <span>Read latest blog posts</span>
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        </CommandDialog>
      </DialogContent>
    </Dialog>
  );
}
