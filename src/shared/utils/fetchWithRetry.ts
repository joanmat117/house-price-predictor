export const fetchWithRetry = async (url:RequestInfo,init :RequestInit, n:number):Promise<any> => {
  try {
    return await fetch(url,init);
  } catch (err) {
    if (n === 1) {
      throw err;
    }
    return await fetchWithRetry(url,init, n - 1);
  }
};
