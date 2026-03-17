import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import api from '../services/api';
import ItemCard from '../components/ItemCard';

const LostItemsPage = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('desc');

  useEffect(() => {
    const fetchItems = async () => {
      const res = await api.get('/lost');
      setItems(res.data);
    };
    fetchItems();
  }, []);

  const filtered = useMemo(() => {
    let list = [...items];
    if (search) {
      list = list.filter((i) => i.itemName.toLowerCase().includes(search.toLowerCase()));
    }
    if (category) {
      list = list.filter((i) => i.category === category);
    }
    list.sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      return sort === 'asc' ? da - db : db - da;
    });
    return list;
  }, [items, search, category, sort]);

  return (
    <div className="dashboard-layout">
      <Navbar />
      <main className="content">
        <h2 className="section-title">Lost Items</h2>
        <div className="filters-row">
          <input
            placeholder="Search by item name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All categories</option>
            <option value="ELECTRONICS">Electronics</option>
            <option value="DOCUMENTS">Documents</option>
            <option value="CLOTHING">Clothing</option>
            <option value="ACCESSORIES">Accessories</option>
            <option value="OTHER">Other</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="desc">Newest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </div>
        <div className="cards-grid">
          {filtered.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default LostItemsPage;

