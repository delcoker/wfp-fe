import React from 'react'
import {Item} from "../domain/entities/Item";

export type CartContextProps = {
    inputRef: React.LegacyRef<HTMLInputElement>;
    items: Item[];
    subTotal: number;
    totalAmount: number;
    amountToBePaid: number;
    change: number;
    multiplier: number | null;
    addItemToCart: (product: Item) => void;
    removeOneItem: (product: Item) => void;
    emptyCart: () => void;
    deleteItem: (product: Item) => void;
    calculateChange: (amountToBePaid: number) => void;
    updateMultiplier: (quantity: number) => void;
};

export interface Props {
    children: React.ReactNode
}

export type cartStateType = {
    items: Item[]
    subTotal: number
    totalAmount: number
    amountToBePaid: number;
    change: number;
    multiplier: number | null;
}
