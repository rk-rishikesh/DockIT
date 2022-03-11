
  export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  export const areraveUrl = (cid) => {
    let url = `https://arweave.net/${cid}`;
    return url;
  };

  export const extractMetadata = async (cid) => {
    let url = `https://arweave.net/${cid}`;
    const response = await fetch(url);
    console.log(response)
    const json = await response.json();
    console.log(json);
    return json;
  }
  
  export const invoiceUrl = (cid) => `${window.location.origin}/pay/${cid}`
  
  export const getDateStringFromTimestamp = (ts, showTime) => {
    const d = new Date(ts);
    if (showTime) {
      return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
    }
    return d.toLocaleDateString();
  };
  
  export const col = (k) => ({
    title: capitalize(k),
    dataIndex: k,
    key: k,
  });
  