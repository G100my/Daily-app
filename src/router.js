import { createRouter, createWebHistory } from 'vue-router';
import pages from '~pages';

const tmp = [];
function findChildren(route) {
  if (route.children?.length) {
    route.children.forEach(child => {
      findChildren(child);
      if (child.name) tmp.push(child);
    });
  }
}

const routePathes = pages
  .filter(route => {
    findChildren(route);
    if (route.path) return true;
  })
  .concat(tmp)
  .map(i => i.path);

export const pathMap = {
  INDEX: '/',
};

if (import.meta.env.DEV) {
  console.log(pages);
  console.log(pathMap);

  const handmade = Object.values(pathMap);
  handmade.forEach(i => {
    if (!routePathes.includes(i)) {
      console.error('[route]: pathMap has unmatched route path', `'${i}'`);
    }
  });
  const rest = routePathes.filter(i => !handmade.includes(i));
  if (rest.length) {
    console.warn('[route]: Not used route: ', rest);
  }
}

// ===

const router = createRouter({
  routes: pages,
  history: createWebHistory(),
});

export default router;
