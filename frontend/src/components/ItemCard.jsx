import React from 'react';

const ItemCard = ({ item }) => {
  const firstImage = item.imageUrls?.[0];
  const isLost = item.type === 'LOST';

  return (
    <div className="item-card">
      {firstImage ? (
        <img src={`http://localhost:8080${firstImage}`} alt={item.title} className="item-image" />
      ) : (
        <div className="item-image" />
      )}
      <div className="item-body">
        <div className="item-title-row">
          <div>
            <div className="item-title">{item.title}</div>
            <div className="item-meta">
              {item.category} • {item.location}
            </div>
          </div>
          <span className={`item-pill ${isLost ? 'item-pill-lost' : 'item-pill-found'}`}>
            {isLost ? 'Lost' : 'Found'}
          </span>
        </div>
        <div className="item-meta" style={{ marginTop: '0.35rem' }}>
          {new Date(item.date).toLocaleDateString()}
        </div>
        {item.tags && item.tags.length > 0 && (
          <div className="tag-list">
            {item.tags.map((t) => (
              <span className="tag-pill" key={t}>
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemCard;

