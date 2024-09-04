"use client";

import { Collection } from "@/db/dto/collections";
import {
  createContext,
  useContext,
  useState,
  useCallback,
  PropsWithChildren,
} from "react";

interface ICollectionContext {
  collections: Collection[];
  setCollection: (collections: Collection[]) => void;
  addCollection: (collection: Collection) => void;
  removeCollection: (collectionId: string) => void;
  filterCollection: (query: string) => void;
}

const CollectionContext = createContext<ICollectionContext>({
  collections: [],
  setCollection: () => {
    throw new Error("setCollection must be used within CollectionProvider.");
  },
  addCollection: () => {
    throw new Error("addCollection must be used within CollectionProvider.");
  },
  removeCollection: () => {
    throw new Error("removeCollection must be used within CollectionProvider.");
  },
  filterCollection: () => {
    throw new Error("filterCollection must be used within CollectionProvider.");
  },
});

interface CollectionProviderProps extends PropsWithChildren<{}> {
  collections: Collection[] | null;
}

export function CollectionProvider({
  collections,
  children,
}: CollectionProviderProps) {
  const [allCollections, setAllCollections] = useState<Collection[]>(
    collections || [],
  );
  const [filteredCollections, setFilteredCollections] =
    useState<Collection[]>(allCollections);

  const addCollection = useCallback((collection: Collection) => {
    setAllCollections((prev) => [...prev, collection]);
    setFilteredCollections((prev) => [...prev, collection]);
  }, []);

  const removeCollection = useCallback((collectionId: string) => {
    setAllCollections((prev) => prev.filter((c) => c.id !== collectionId));
    setFilteredCollections((prev) => prev.filter((c) => c.id !== collectionId));
  }, []);

  const filterCollection = useCallback(
    (query: string) => {
      setFilteredCollections(
        allCollections.filter(
          (collection) =>
            collection.name.toLowerCase().includes(query.toLowerCase()) ||
            collection.description!.toLowerCase().includes(query.toLowerCase()),
        ),
      );
    },
    [allCollections],
  );

  return (
    <CollectionContext.Provider
      value={{
        collections: filteredCollections,
        setCollection: setAllCollections,
        addCollection,
        removeCollection,
        filterCollection,
      }}
    >
      {children}
    </CollectionContext.Provider>
  );
}

export const useCollection = () => useContext(CollectionContext);
