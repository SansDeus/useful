/**
 * 
 * @param ms 
 * @returns 
 */
export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));