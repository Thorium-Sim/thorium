import actions from '../actions';
const {cards} = actions;
const { REMOVE_CARD, UPDATE_CARD, FLUSH_CARDS, FETCH_CARDS_REQUEST, FETCH_CARDS_SUCCESS, FETCH_CARDS_ERROR } = cards;

function cardsReducer(state = [], action){
	switch (action.type){
		case REMOVE_CARD:
		return state.filter((card) => {
			if (card.id !== action.card.id){
				return true;
			}
			return false;
		});
		case UPDATE_CARD:
		return state.map((card) => {
			if (card.id === action.card.old_val.id){
				return action.card.new_val;
			}
			return card;
		});
		case FETCH_CARDS_SUCCESS:
		if(action.card.id){
			//Make sure we don't have any duplicate simulators
			let filterRes = state.filter((card) => {
				if (card.id === action.card.id){
					return true;
				}
				return false;
			});
			if (filterRes.length === 0){
				return state.concat(action.card);
			}
		}
		return state;
		case FLUSH_CARDS:
		return [];
		default:
		return state;
	}
}

export default cardsReducer;
