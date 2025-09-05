import { useEffect, useMemo, useRef, useState } from 'react';
import { buildSearchUrl, mapDocs } from '../lib/api';

// Small debounce helper
function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export default function useBooks({ title, page }) {
  const debouncedTitle = useDebouncedValue(title, 350);
  const [state, setState] = useState({
    loading: false,
    error: null,
    data: [],
    total: 0,     // numFound
  });

  const abortRef = useRef(null);

  const url = useMemo(
    () => buildSearchUrl({ title: debouncedTitle, page }),
    [debouncedTitle, page]
  );

  useEffect(() => {
    if (!debouncedTitle) {
      setState({ loading: false, error: null, data: [], total: 0 });
      return;
    }

    // Cancel previous request
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setState(s => ({ ...s, loading: true, error: null }));

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(json => {
        const items = mapDocs(json.docs);
        setState({
          loading: false,
          error: null,
          data: items,
          total: json.numFound ?? items.length,
        });
      })
      .catch(err => {
        if (err.name === 'AbortError') return;
        setState({ loading: false, error: err.message, data: [], total: 0 });
      });

    return () => controller.abort();
  }, [url, debouncedTitle]);

  return state;
}