import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCurrentOrg = create(
    persist<{
        currentOrg: string;
        setCurrentOrg: (org: string) => void;
    }>(
        (set) => ({
            currentOrg: "",
            setCurrentOrg: (org) => set(() => ({ currentOrg: org })),
        }),
        { name: "currentOrg" }
    )
);

export default useCurrentOrg;