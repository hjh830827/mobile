export const state = () => ({
  SVC_MGMT_NUM: '',
  PRODUCT_GRP_ID: '',
  CATEGORY_ID: '',
  PHONE_PROD_SELECT_INFO: {},
  SKT_PROD_SELECT_INFO: {}
});

export const mutations = {
  addInfo(state, payload) {
    state[payload.step][payload.key] = payload.value;
  }
};
