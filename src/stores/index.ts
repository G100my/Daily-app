import { createPinia } from 'pinia';

const store = createPinia();

store.use(({ store }) => {
  store.$subscribe((mutation, state) => {
    console.log('🚀 ~ file: index.js ~ line 7 ~ store.$subscribe ~ mutation', mutation);
    // import { MutationType } from 'pinia'
    mutation.type; // 'direct' | 'patch object' | 'patch function'
    console.log('🚀 ~ file: index.js ~ line 9 ~ store.$subscribe ~  mutation.type', mutation.type);
    // same as cartStore.$id
    mutation.storeId; // 'cart'
    console.log('🚀 ~ file: index.js ~ line 12 ~ store.$subscribe ~ mutation.storeId', mutation.storeId);
    // only available with mutation.type === 'patch object'
    mutation.payload; // patch object passed to cartStore.$patch()
    console.log('🚀 ~ file: index.js ~ line 15 ~ store.$subscribe ~ mutation.payload', mutation.payload);
    state;
    console.log('🚀 ~ file: index.js ~ line 18 ~ store.$subscribe ~ state', state);
  });
  store.$onAction(function () {
    console.log(arguments);
    console.log('🚀 ~ file: index.js ~ line 22 ~ arguments', arguments);
  });
});

export default store;
