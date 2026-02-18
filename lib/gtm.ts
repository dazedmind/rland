let gtm: typeof import ("react-gtm-module");

export const getGtm = async () => {
    if (!gtm && typeof window !== "undefined") {
        gtm = await import("react-gtm-module");
        gtm.initialize({
            gtmId: process.env.GTM_ID as string,
        })
    }
    return gtm;
};