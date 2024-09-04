"use client";

import { DefinitionCard } from "@/db/dto/definition-card";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useCallback,
} from "react";

interface ICardContext {
  defCards: DefinitionCard[];
  setDefCards: (cards: DefinitionCard[]) => void;
  addDefCard: (card: DefinitionCard) => void;
  removeDefCard: (cardId: string) => void;
}

interface CardProviderProps extends PropsWithChildren<{}> {
  definitionCards: DefinitionCard[] | null;
}

const CardContext = createContext<ICardContext>({
  defCards: [],
  setDefCards: () => {
    throw new Error("setDefCards function must be used within CardProvider.");
  },
  addDefCard: () => {
    throw new Error("addDefCard function must be used within CardProvider.");
  },
  removeDefCard: () => {
    throw new Error("removeDefCard function must be used within CardProvider.");
  },
});

export function CardProvider({ children, definitionCards }: CardProviderProps) {
  const [defCards, setDefCards] = useState<DefinitionCard[]>(
    definitionCards || [],
  );

  const addDefCard = useCallback(
    (card: DefinitionCard) => {
      setDefCards((prevCards) => [...prevCards, card]);
    },
    [setDefCards],
  );

  const removeDefCard = useCallback(
    (cardId: string) => {
      setDefCards((prevCards) =>
        prevCards.filter((card) => card.id !== cardId),
      );
    },
    [setDefCards],
  );

  return (
    <CardContext.Provider
      value={{ defCards, setDefCards, addDefCard, removeDefCard }}
    >
      {children}
    </CardContext.Provider>
  );
}

export const useCard = (): ICardContext => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error("useCard must be used within a CardProvider.");
  }
  return context;
};
