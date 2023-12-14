import { useEffect } from 'react';

export function useKey(key, action) {
  useEffect(
    function () {
      function handleEscape(e) {
        if (e.key.toLowerCase() === key.toLowerCase()) {
          action();
        }
      }

      document.addEventListener('keydown', handleEscape);

      return function () {
        document.removeEventListener('keydown', handleEscape);
      };
    },
    [key, action]
  );
}
