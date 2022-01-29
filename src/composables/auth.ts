import authStore from '@store/auth';

/**
 * Exports a hook that inits the store
 *
 * @return Auth store instance
 */
 export default () => {
  const auth = authStore();
  auth.init();

  return {
    auth
  };
};
