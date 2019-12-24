import State from './state/index.js';
import Mutations from './mutations/index.js';
import Actions from './actions/index.js';
import Getters from './getters/index.js';


export default {
	namespaced: true,
	state: {
		...State,
	},
	mutations: {
		...Mutations,
	},
	actions: {
		...Actions,
	},
	getters: {
		...Getters,
	},
};
