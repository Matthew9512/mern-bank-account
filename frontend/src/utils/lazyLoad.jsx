import { lazy } from 'react';

export function lazyLoad(path, namedExport) {
   return lazy(async () => {
      const promise = import(path);
      if (!namedExport) return promise;
      const module = await promise;
      return { default: module[namedExport] };
   });
}
