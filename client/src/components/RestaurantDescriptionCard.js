import React from 'react';
import { Radio } from 'semantic-ui-react';

function RestaurantDescriptionCard(props) {
  const {
    restaurant: { name = 'Tandoori Express', status = 'order ahead' },
    onChangeFavorite,
    isFavorite = true,
    sortingValue = 'ratingAverage',
  } = props;

  let color = 'red',
    openingState = 'Closed';

  switch (status) {
    case 'open':
      color = 'green';
      openingState = 'Open';
      break;
    case 'order ahead':
      color = 'brown';
      openingState = 'Order Ahead';
      break;
    default:
      break;
  }
  return (
    <div
      className="restaurantCardStyle"
      style={{
        width: '300px',
        height: '250px',
        float: 'left',
        margin: '10px',
        color: '#000',
      }}
    >
      <div
        style={{
          borderTop: 'solid 10px #dbddf9',
        }}
      >
        <div
          style={{
            width: '300px',
            height: '250px',
            paddingTop: '2px',
            boxShadow: '1px 2px 5px #eee',
          }}
        >
          <h2
            style={{
              color: 'rgb(72, 72, 126)',
              fontWeight: 'bold',
            }}
          >
            {name}
          </h2>
          <h4 style={{ color, padding: '1px' }}>{openingState}</h4>
          <div style={{ textAlign: 'center', paddingLeft: '3px' }}>
            <Radio
              value={name}
              label={isFavorite ? 'REMOVE FAVORITE' : 'ADD FAVORITE'}
              toggle
              checked={isFavorite}
              onChange={onChangeFavorite}
            />
          </div>
          <div style={{ paddingTop: '40px' }}>
            <h4>{`Sorted By: ${sortingValue.text}`}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDescriptionCard;
