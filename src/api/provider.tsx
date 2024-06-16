import fetcher from "~/services/fetcher";
import { ReactNode } from "react";
import { SWRConfig } from "swr";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <SWRConfig
            value={{
                fetcher,
                refreshInterval: 0,
                // revalidateIfStale: false,
                // revalidateOnFocus: false,
                // revalidateOnReconnect: false,
            }}
        >
            {children}
        </SWRConfig>
    );
}
