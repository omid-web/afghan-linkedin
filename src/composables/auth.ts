import authStore from '@store/auth';

export default () => {
  authStore.dispatch('init');
}
