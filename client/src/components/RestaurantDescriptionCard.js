import React from 'react';
import { Radio } from 'semantic-ui-react';

function RestaurantDescriptionCard(props) {
  const {
    restaurant: { name, status },
    onChangeFavorite,
    isFavorite,
    sortingValue,
  } = props;

  return (
    <div
      className="restaurantCardStyle"
      style={{
        width: '300px',
        height: '450px',
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
            height: '450px',
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
          <h4 style={{ color: 'grey', padding: '1px' }}>{status}</h4>
          <div style={{ textAlign: 'left', paddingLeft: '3px' }}>
            <Radio
              value={name}
              label={isFavorite ? 'REMOVE FAVORITE' : 'ADD FAVORITE'}
              toggle
              checked={isFavorite}
              onChange={onChangeFavorite}
            />
          </div>
          <div style={{ paddingRight: '5px' }}>
            <h4>{`Sorted By: ${sortingValue.text}`}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDescriptionCard;
