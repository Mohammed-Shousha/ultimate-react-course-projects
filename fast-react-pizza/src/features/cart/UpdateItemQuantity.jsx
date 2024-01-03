import { useDispatch } from 'react-redux';

import { increaseItemQuantity, decreaseItemQuantity } from './cartSlice';

import Button from '../../ui/Button';

function UpdateItemQuantity({ pizzaId, currentQuantity }) {
  const dispatch = useDispatch();

  function handleIncrement() {
    dispatch(increaseItemQuantity(pizzaId));
  }

  function handleDecrement() {
    dispatch(decreaseItemQuantity(pizzaId));
  }

  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button type="round" onClick={handleDecrement}>
        -
      </Button>

      <span className="text-sm font-medium ">{currentQuantity}</span>

      <Button type="round" onClick={handleIncrement}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
