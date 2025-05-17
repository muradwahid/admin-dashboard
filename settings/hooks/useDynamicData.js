import useWPAjax from "./useWPAjax";

const useDynamicData = (field) => {
  const settingsEl = document.getElementById('bPlSettings');
  const nonce = settingsEl?.dataset?.nonce;

  const { data, isLoading, error, refetch } = useWPAjax('getDynamicData', { _wpnonce: nonce, dataType: field }, true);

  return { data, isLoading, error, refetch };
}
export default useDynamicData;