import React, { useMemo, useState } from 'react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mjgjbwba';

function googleMapsUrl(address, city) {
  const query = encodeURIComponent(`${address}, ${city}, TX`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

// ============================================================
// RESTAURANT DATA — update addresses here with real addresses
// ============================================================
const INITIAL_DEALS = [
  {
    id: 1,
    name: "Roma's Italian Restaurant",
    cuisine: 'Italian',
    zip: '75078',
    miles: 1.5,
    city: 'Prosper',
    address: '1361 E University Dr #70, Prosper, TX 75078',
    dealTitle: 'Free Drink with Any Pasta Lunch',
    description: 'Classic pasta lunch dishes made with fresh ingredients.',
    originalPrice: '$17.99',
    salePrice: '$13.99',
    discount: 'Save $4 + free drink',
    window: '11:00 AM – 2:00 PM',
    scarcityLeft: 5,
    scarcityTotal: 15,
    image: '🍝',
    featured: true,
  },
  {
    id: 2,
    name: 'Fontina Ristorante',
    cuisine: 'Italian',
    zip: '75069',
    miles: 4.8,
    city: 'McKinney',
    address: '215 E Louisiana St',
    dealTitle: '15% Off Lunch Menu',
    description: 'Traditional Italian lunch menu in downtown McKinney.',
    originalPrice: '$18.00',
    salePrice: '$15.30',
    discount: '15% off',
    window: '11:30 AM – 2:30 PM',
    scarcityLeft: 6,
    scarcityTotal: 20,
    image: '🍷',
    featured: false,
  },
  {
    id: 3,
    name: 'Salute Italian Restaurant',
    cuisine: 'Italian',
    zip: '75078',
    miles: 2.2,
    city: 'Prosper',
    address: '400 W Frontier Pkwy',
    dealTitle: 'Lunch Pasta + Salad Combo $12',
    description: 'Classic Italian lunch combo with pasta and side salad.',
    originalPrice: '$16.00',
    salePrice: '$12.00',
    discount: 'Combo pricing',
    window: '11:00 AM – 2:00 PM',
    scarcityLeft: 7,
    scarcityTotal: 18,
    image: '🍕',
    featured: false,
  },
  {
    id: 4,
    name: 'Hutchins BBQ',
    cuisine: 'BBQ',
    zip: '75070',
    miles: 4.5,
    city: 'McKinney',
    address: '1301 N Central Expy',
    dealTitle: 'Free Dessert with BBQ Plate',
    description: 'Famous brisket, ribs, and a complimentary dessert.',
    originalPrice: '$19.99',
    salePrice: '$19.99',
    discount: 'Free dessert',
    window: '11:00 AM – 3:00 PM',
    scarcityLeft: 8,
    scarcityTotal: 25,
    image: '🍖',
    featured: true,
  },
  {
    id: 5,
    name: 'Local Yocal BBQ & Grill',
    cuisine: 'BBQ',
    zip: '75069',
    miles: 4.2,
    city: 'McKinney',
    address: '108 E Virginia St',
    dealTitle: '10% Off Lunch Plates',
    description: 'Farm-to-table BBQ with responsibly sourced meats.',
    originalPrice: '$20.00',
    salePrice: '$18.00',
    discount: '10% off',
    window: '11:00 AM – 2:00 PM',
    scarcityLeft: 6,
    scarcityTotal: 14,
    image: '🔥',
    featured: false,
  },
  {
    id: 6,
    name: 'Tender Smokehouse',
    cuisine: 'BBQ',
    zip: '75009',
    miles: 1.8,
    city: 'Celina',
    address: '2700 W Outer Loop',
    dealTitle: '2 Meat Plate + Drink $13.99',
    description: 'Scratch-made BBQ with sides included.',
    originalPrice: '$17.99',
    salePrice: '$13.99',
    discount: 'Combo deal',
    window: '11:00 AM – 2:30 PM',
    scarcityLeft: 4,
    scarcityTotal: 12,
    image: '🍗',
    featured: true,
  },
  {
    id: 7,
    name: "Cookie's Mexican Food",
    cuisine: 'Mexican',
    zip: '75070',
    miles: 3.9,
    city: 'McKinney',
    address: '519 N Central Expy',
    dealTitle: '$9 Burrito Lunch Special',
    description: 'Classic burritos and tacos with fast service.',
    originalPrice: '$12.50',
    salePrice: '$9.00',
    discount: 'Save $3.50',
    window: '10:30 AM – 2:00 PM',
    scarcityLeft: 9,
    scarcityTotal: 20,
    image: '🌯',
    featured: false,
  },
  {
    id: 8,
    name: 'Mi Luna Tex-Mex',
    cuisine: 'Tex-Mex',
    zip: '75078',
    miles: 2.6,
    city: 'Prosper',
    address: '141 S Preston Rd',
    dealTitle: 'Free Queso with Any Entree',
    description: 'Bold Tex-Mex flavors with a popular local following.',
    originalPrice: '$15.99',
    salePrice: '$15.99',
    discount: 'Free appetizer',
    window: '11:00 AM – 3:00 PM',
    scarcityLeft: 5,
    scarcityTotal: 15,
    image: '🧀',
    featured: false,
  },
  {
    id: 9,
    name: 'Spoon + Fork Thai Kitchen',
    cuisine: 'Thai',
    zip: '75070',
    miles: 4.1,
    city: 'McKinney',
    address: '380 S Central Expy',
    dealTitle: 'Lunch Curry + Drink $11.99',
    description: 'Popular Thai curries and stir-fry dishes.',
    originalPrice: '$15.99',
    salePrice: '$11.99',
    discount: 'Save $4',
    window: '11:00 AM – 2:30 PM',
    scarcityLeft: 6,
    scarcityTotal: 16,
    image: '🍜',
    featured: false,
  },
  {
    id: 10,
    name: "Lucy's on the Square",
    cuisine: 'American',
    zip: '75009',
    miles: 1.2,
    city: 'Celina',
    address: '210 W Walnut St',
    dealTitle: 'Free Drink with Lunch Entree',
    description: 'Comfort food in a local Celina favorite spot.',
    originalPrice: '$14.99',
    salePrice: '$12.99',
    discount: 'Save $2 + free drink',
    window: '11:00 AM – 2:00 PM',
    scarcityLeft: 7,
    scarcityTotal: 18,
    image: '🍽️',
    featured: true,
  },
];

// ============================================================
// IMPROVED DEMO RIBBON
// ============================================================
function DemoRibbon() {
  return (
    <div className="absolute -right-2 -top-2 rotate-45 bg-gradient-to-r from-orange-500 to-rose-500 px-12 py-1 text-xs font-bold tracking-[0.08em] text-white shadow-md z-10">
      DEMO
    </div>
  );
}

// ============================================================
// IMPROVED DEAL COUPON CARD
// ============================================================
function DealCouponCard({ deal, isFavorite, onToggleFavorite, onRedeem }) {
  const isLowStock = deal.scarcityLeft <= 3;

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <DemoRibbon />

      <div className="flex gap-5">
        {/* Larger emoji */}
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-orange-50 text-5xl shadow-inner ring-1 ring-inset ring-orange-100">
          {deal.image}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-xl text-slate-900 tracking-tight">{deal.name}</h3>
                {deal.featured && (
                  <span className="rounded-full bg-orange-100 px-3 py-0.5 text-xs font-semibold uppercase tracking-widest text-orange-700">
                    Featured
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-500 mt-1">
                {deal.city} • {deal.cuisine} • {deal.miles} mi away
              </p>
            </div>

            <button
              onClick={() => onToggleFavorite(deal.id)}
              className={`rounded-full p-2.5 text-2xl transition-all ${
                isFavorite ? 'text-rose-500 scale-110' : 'text-slate-300 hover:text-slate-400'
              }`}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              ♥
            </button>
          </div>

          <div className="mt-6">
            <p className="text-2xl font-bold tracking-tight text-slate-900 leading-none">
              {deal.dealTitle}
            </p>

            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-4xl font-bold text-teal-600">{deal.salePrice}</span>
              <span className="text-xl text-slate-400 line-through">{deal.originalPrice}</span>
              <span className="ml-auto rounded-2xl bg-teal-100 px-4 py-1 text-sm font-semibold text-teal-700">
                {deal.discount}
              </span>
            </div>
          </div>

          <p className="mt-4 text-slate-600 text-[15px] leading-relaxed line-clamp-2">
            {deal.description}
          </p>

          {deal.address && (
            <a
              href={googleMapsUrl(deal.address, deal.city)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-sm text-orange-600 hover:text-orange-700 hover:underline"
            >
              📍 {deal.address}, {deal.city}
            </a>
          )}

          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-slate-500">{deal.window}</div>
            <div className={`font-semibold text-sm ${isLowStock ? 'text-red-600' : 'text-red-500'}`}>
              Only {deal.scarcityLeft}/{deal.scarcityTotal} left
            </div>
          </div>

          <button
            onClick={() => onRedeem(deal)}
            disabled={deal.scarcityLeft <= 0}
            className="mt-5 w-full rounded-2xl bg-orange-600 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-orange-700 disabled:bg-slate-300 disabled:cursor-not-allowed active:scale-[0.985]"
          >
            {deal.scarcityLeft > 0 ? 'Redeem Now' : 'Sold Out'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// IMPROVED CUSTOMER MARKETPLACE
// ============================================================
function CustomerMarketplace({ deals, zipCode, setZipCode, radius, setRadius, cuisine, setCuisine, favorites, onToggleFavorite, onRedeem, onOpenPartnerPage }) {
  const cuisines = ['All', ...new Set(deals.map((d) => d.cuisine))];
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredDeals = useMemo(() => {
    const trimmed = zipCode.trim();
    return deals.filter((deal) => {
      const matchZip = trimmed === '' || deal.zip === trimmed;
      const matchRadius = trimmed === '' || deal.miles <= radius;
      const matchCuisine = cuisine === 'All' || deal.cuisine === cuisine;
      const matchFavorite = !showFavoritesOnly || favorites.includes(deal.id);
      return matchZip && matchRadius && matchCuisine && matchFavorite;
    });
  }, [deals, zipCode, radius, cuisine, favorites, showFavoritesOnly]);

  const hasZip = zipCode.trim() !== '';

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-6">
      <div className="mx-auto w-full max-w-[440px] rounded-[38px] border border-slate-200 bg-white shadow-2xl overflow-hidden">
        {/* Status bar */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-3 text-sm text-slate-500 bg-white">
          <span>9:41</span>
          <div className="flex gap-1">
            <div className="h-2 w-2 rounded-full bg-slate-400" />
            <div className="h-2 w-2 rounded-full bg-slate-400" />
            <div className="h-2 w-2 rounded-full bg-slate-400" />
          </div>
        </div>

        <div className="bg-white">
          <div className="px-6 pt-6 pb-4 border-b border-slate-100">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-3xl font-bold tracking-tighter text-slate-900">Kuidago</p>
                <p className="text-slate-500 mt-1">Fresh lunch deals nearby</p>
              </div>
              <button 
                onClick={onOpenPartnerPage}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
              >
                For restaurants
              </button>
            </div>

            <div className="mt-6 grid grid-cols-[1fr,auto] gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1.5">ZIP CODE</label>
                <input
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="Enter ZIP"
                  maxLength={5}
                  className="w-full rounded-2xl border border-slate-200 bg-zinc-50 px-5 py-3.5 text-sm focus:border-orange-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1.5">RADIUS</label>
                <select
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  disabled={!hasZip}
                  className="w-full rounded-2xl border border-slate-200 bg-zinc-50 px-5 py-3.5 text-sm focus:border-orange-400 outline-none disabled:opacity-50"
                >
                  {[5,10,20,30,50].map(r => <option key={r} value={r}>{r} mi</option>)}
                </select>
              </div>
            </div>

            {hasZip && (
              <button onClick={() => setZipCode('')} className="mt-2 text-xs text-slate-400 hover:text-orange-600 underline">
                Clear ZIP filter
              </button>
            )}

            <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
              {cuisines.map((item) => (
                <button
                  key={item}
                  onClick={() => setCuisine(item)}
                  className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition ${
                    cuisine === item 
                      ? 'bg-slate-900 text-white' 
                      : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="px-6 py-4 bg-orange-50 flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900">{filteredDeals.length} deals found</p>
              <p className="text-xs text-slate-500">
                {!hasZip ? 'All available deals' : `Near ${zipCode} • ${radius} miles`}
              </p>
            </div>
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium border transition ${
                showFavoritesOnly 
                  ? 'bg-rose-100 text-rose-700 border-rose-200' 
                  : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              ♥ Favorites {favorites.length > 0 && `(${favorites.length})`}
            </button>
          </div>

          <div className="px-6 py-6 space-y-6 bg-zinc-50 min-h-[400px]">
            {filteredDeals.map((deal) => (
              <DealCouponCard
                key={deal.id}
                deal={deal}
                isFavorite={favorites.includes(deal.id)}
                onToggleFavorite={onToggleFavorite}
                onRedeem={onRedeem}
              />
            ))}

            {filteredDeals.length === 0 && (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <p className="font-semibold text-slate-900">No matching deals</p>
                <p className="mt-2 text-slate-500 text-sm">Try a different filter or larger radius</p>
                <button 
                  onClick={() => setZipCode('')}
                  className="mt-6 rounded-2xl bg-orange-600 px-8 py-3 text-white font-medium hover:bg-orange-700"
                >
                  Show all deals
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ORIGINAL PARTNER LANDING (kept fully intact)
// ============================================================
function PartnerLanding({ deals, onOpenMarketplace }) {
  const [formData, setFormData] = useState({
    restaurantName: '',
    contactName: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    cuisine: '',
    offerIdea: '',
    launchTiming: '',
    agreement: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleFormChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, val]) => payload.append(key, String(val)));
      payload.append('_subject', 'New Kuidago Early Partner Request');
      payload.append('_captcha', 'false');
      payload.append('_template', 'table');
      const response = await fetch(FORMSPREE_ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: payload });
      if (!response.ok) throw new Error('Submission failed');
      setSubmitted(true);
    } catch {
      alert('There was a problem sending the request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const previewDeals = deals.slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div>
            <p className="text-2xl font-bold tracking-tight text-slate-900">Kuidago</p>
            <p className="text-sm text-slate-500">Helping local restaurants fill slower hours</p>
          </div>
          <button onClick={onOpenMarketplace} className="rounded-xl bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700 transition">
            View customer app
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-orange-50 via-white to-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:items-start lg:px-8 lg:py-20">
          <div>
            <div className="inline-flex rounded-full border border-orange-200 bg-white px-4 py-1 text-sm font-medium text-orange-700 shadow-sm">
              Early partner rollout · Celina · Prosper · McKinney
            </div>
            <h1 className="mt-5 max-w-2xl text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              Fill slower hours with deals customers actually discover.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Kuidago is a local food deals marketplace that drives lunch traffic to restaurants during slower hours — customers browse real nearby offers by ZIP code, radius, and cuisine.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex -space-x-2">
                {['🍝','🍖','🌯'].map((emoji, i) => (
                  <div key={i} className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-orange-50 text-sm shadow-sm">{emoji}</div>
                ))}
              </div>
              <p className="text-sm text-slate-500"><span className="font-semibold text-slate-900">3 restaurants</span> already signed up in Celina · Prosper · McKinney</p>
            </div>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <a href="#partner-form" className="rounded-2xl bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700 transition text-center">
                Join as early partner — it's free
              </a>
              <button onClick={onOpenMarketplace} className="rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50 transition text-center">
                See the customer app
              </button>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { label: 'Initial launch', value: 'First 10 restaurants' },
                { label: 'Customer filters', value: 'ZIP · Radius · Cuisine' },
                { label: 'Offer style', value: 'Limited-time local deals' },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200 self-start">
            <div className="rounded-[28px] bg-slate-50 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Restaurant preview</p>
                  <h3 className="text-xl font-semibold text-slate-900">How your deal appears</h3>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-500">Preview</span>
              </div>
              <div className="space-y-3">
                {previewDeals.map((deal) => (
                  <div key={deal.id} className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <DemoRibbon />
                    <div className="flex items-start gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-2xl">{deal.image}</div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-base font-semibold text-slate-900 truncate">{deal.name}</h4>
                          <span className="shrink-0 rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-600">{deal.scarcityLeft}/{deal.scarcityTotal} left</span>
                        </div>
                        <p className="mt-1 text-sm text-slate-600">{deal.dealTitle}</p>
                        <p className="mt-0.5 text-xs text-slate-500">{deal.city} · {deal.cuisine} · {deal.miles} mi</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits, How it works, Pricing, FAQ, Form, Footer remain exactly as in your original code */}
      {/* (Included below for completeness) */}

      {/* Benefits */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: 'Get discovered nearby', text: 'Customers browse by location and distance, so your offer is shown to people already close enough to act on it.' },
              { title: 'Use scarcity to create action', text: 'Each offer shows limited availability — making deals feel timely and worth using now.' },
              { title: 'Launch with local visibility', text: 'Early partners are featured in the first wave of local promotion and awareness.' },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">How it works</h2>
          <p className="mt-3 text-center text-slate-500 text-lg">Three simple steps from setup to customers walking in.</p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { step: '01', title: 'You create a deal', text: 'Set your offer, time window, and how many spots are available. We handle the rest.' },
              { step: '02', title: 'Customers discover it', text: 'People nearby search by ZIP, distance, and cuisine type and find your offer instantly.' },
              { step: '03', title: 'They walk in', text: 'Customers redeem a unique code at your restaurant during the deal window. More traffic, less guesswork.' },
            ].map((item) => (
              <div key={item.step} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center">
                <p className="text-5xl font-bold text-orange-100">{item.step}</p>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900">Simple, transparent pricing</h2>
            <p className="mt-3 text-lg text-slate-500">Start free. Pay only when it works. Upgrade when you're ready.</p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="relative rounded-3xl border-2 border-orange-400 bg-white p-8 shadow-md">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="rounded-full bg-orange-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow">
                  Now open · First 10 only
                </span>
              </div>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-orange-600">Launch</p>
              <p className="mt-2 text-5xl font-bold text-slate-900">Free</p>
              <p className="mt-1 text-sm text-slate-500">No credit card required</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                {['Unlimited deal listings','Featured in launch promotion','Full access to customer app','No commitment — opt out anytime'].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-500">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#partner-form" className="mt-8 block rounded-2xl bg-orange-600 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-orange-700 transition">
                Join free now
              </a>
            </div>

            <div className="relative rounded-3xl border-2 border-slate-900 bg-slate-900 p-8 shadow-xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="rounded-full bg-slate-900 border border-slate-700 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow">
                  Most popular
                </span>
              </div>
              <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-orange-400">Growth</p>
              <div className="mt-2 flex items-end gap-2">
                <p className="text-5xl font-bold text-white">$2.99</p>
                <p className="mb-1.5 text-sm text-slate-400">/ redemption</p>
              </div>
              <p className="mt-1 text-sm text-slate-400">Capped at $99/month max</p>
              <div className="mt-4 rounded-2xl bg-slate-800 px-4 py-3">
                <p className="text-xs text-slate-400">At just <span className="font-semibold text-orange-400">34 customers/month</span> you hit the cap — after that every extra customer is free.</p>
              </div>
              <ul className="mt-5 space-y-3 text-sm text-slate-300">
                {['Pay only when customers show up','Never pay more than $99/month','Full access to customer app','Cancel anytime, no questions'].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-400">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 rounded-2xl bg-slate-800 px-6 py-3 text-center text-sm font-medium text-slate-400">
                Available after launch period
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Premium</p>
              <div className="mt-2 flex items-end gap-2">
                <p className="text-5xl font-bold text-slate-900">$149</p>
                <p className="mb-1.5 text-sm text-slate-500">/ month</p>
              </div>
              <p className="mt-1 text-sm text-slate-500">Unlimited redemptions + top placement</p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                {['Your deal appears first in every search','Unlimited customer redemptions','"Featured" badge on all your deals','Priority support & onboarding','Cancel anytime'].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-0.5 text-emerald-500">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 rounded-2xl border border-slate-200 bg-white px-6 py-3 text-center text-sm font-medium text-slate-500">
                Available after launch period
              </p>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-slate-400">
            All early launch partners join completely free. After launch, choose the plan that fits — or opt out with no questions asked.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 text-center">Common questions</h2>
          <p className="mt-3 text-center text-slate-500 text-lg">Everything you need to know before signing up.</p>
          <div className="mt-10 space-y-4">
            {[
              { q: 'What if I get no customers from Kuidago?', a: 'On the Growth plan you only pay per redemption — so if no customers show up, you pay nothing. The free launch period also means there\'s zero financial risk to getting started.' },
              { q: 'How does the redemption code work?', a: 'When a customer claims your deal on the app they get a unique code. They show that code to your staff when ordering — no app install or hardware needed on your end.' },
              { q: 'Do I need to install anything or change my POS?', a: 'No. Kuidago works completely independently of your existing setup. Your staff just verifies the code shown on the customer\'s phone — that\'s it.' },
              { q: 'Can I cancel or change my deal anytime?', a: 'Yes, always. You can pause, edit, or remove your deal at any time with no penalty. You\'re never locked in.' },
              { q: 'How do I control how many customers come in?', a: 'You set the exact number of available spots per deal. Once that limit is hit the deal shows as sold out automatically — so you\'re never overwhelmed.' },
            ].map((item) => (
              <div key={item.q} className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5">
                <p className="font-semibold text-slate-900">{item.q}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Form */}
      <section id="partner-form" className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
        <div className="rounded-[32px] bg-slate-900 px-8 py-14 text-white shadow-2xl shadow-slate-300">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">Early partner agreement</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Join free during our launch and get featured in the first group.
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">
            Complete the form below to request an early partner listing. No cost, no commitment — you can opt out at any time.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="mt-10 grid gap-4 sm:grid-cols-2">
              {[
                { name: 'restaurantName', placeholder: 'Restaurant name', required: true },
                { name: 'contactName', placeholder: 'Contact name', required: true },
                { name: 'email', placeholder: 'Business email', type: 'email', required: true },
                { name: 'phone', placeholder: 'Phone number', required: true },
                { name: 'city', placeholder: 'City', required: true },
                { name: 'address', placeholder: 'Street address', required: true },
                { name: 'cuisine', placeholder: 'Cuisine type' },
                { name: 'launchTiming', placeholder: 'Preferred launch timing' },
              ].map((field) => (
                <input
                  key={field.name}
                  name={field.name}
                  type={field.type || 'text'}
                  value={formData[field.name]}
                  onChange={handleFormChange}
                  required={field.required || false}
                  placeholder={field.placeholder}
                  className="rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:border-orange-400"
                />
              ))}
              <textarea
                name="offerIdea"
                value={formData.offerIdea}
                onChange={handleFormChange}
                placeholder="Proposed deal or offer idea"
                className="sm:col-span-2 min-h-[120px] rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400 outline-none focus:border-orange-400"
              />
              <label className="sm:col-span-2 flex items-start gap-3 rounded-2xl border border-slate-700 bg-slate-800 px-4 py-4 text-sm text-slate-300 cursor-pointer">
                <input name="agreement" type="checkbox" checked={formData.agreement} onChange={handleFormChange} required className="mt-1" />
                <span>I confirm I am authorized to submit this restaurant for early partner review and activation.</span>
              </label>
              <div className="sm:col-span-2 flex flex-col gap-4 sm:flex-row">
                <button type="submit" disabled={submitting} className="rounded-2xl bg-orange-500 px-6 py-3 font-medium text-white transition hover:-translate-y-0.5 hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-500">
                  {submitting ? 'Submitting…' : 'Submit Early Partner Request'}
                </button>
                <button type="button" onClick={onOpenMarketplace} className="rounded-2xl border border-slate-600 px-6 py-3 font-medium text-white transition hover:bg-slate-800">
                  View customer app
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-10 rounded-[28px] border border-slate-700 bg-slate-800 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">Request received</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">Thank you, {formData.contactName || formData.restaurantName}.</h3>
              <p className="mt-4 max-w-2xl text-slate-300">Your early partner request has been sent. The Kuidago team will follow up with you directly.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-lg font-bold text-slate-900">Kuidago</p>
              <p className="mt-1 text-sm text-slate-500">Serving Celina · Prosper · McKinney</p>
              <a href="mailto:kuidago.co@gmail.com" className="mt-2 block text-sm text-orange-600 hover:underline">kuidago.co@gmail.com</a>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-slate-500">
              <a href="#partner-form" className="hover:text-orange-600 transition">Join as partner</a>
              <a href="#how-it-works" className="hover:text-orange-600 transition">How it works</a>
              <a href="#pricing" className="hover:text-orange-600 transition">Pricing</a>
              <a href="#faq" className="hover:text-orange-600 transition">FAQ</a>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="text-xs text-slate-400 text-center">© {new Date().getFullYear()} Kuidago. All rights reserved. · Celina, TX</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function KuidagoLandingPage() {
  const [page, setPage] = useState('partner');
  const [deals, setDeals] = useState(INITIAL_DEALS);
  const [zipCode, setZipCode] = useState('');
  const [radius, setRadius] = useState(10);
  const [cuisine, setCuisine] = useState('All');
  const [favorites, setFavorites] = useState([]);
  const [redeemedDeal, setRedeemedDeal] = useState(null);

  function onToggleFavorite(id) {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function onRedeem(deal) {
    if (deal.scarcityLeft <= 0) return;
    const nextLeft = deal.scarcityLeft - 1;
    const shortName = deal.name.split(' ').join('').slice(0, 4).toUpperCase();
    const code = shortName + '-' + deal.id + '7' + nextLeft;
    setDeals((current) => current.map((item) => item.id === deal.id ? { ...item, scarcityLeft: Math.max(0, nextLeft) } : item));
    setRedeemedDeal({ ...deal, scarcityLeft: nextLeft, code });
  }

  return (
    <div className="bg-white min-h-screen">
      {page === 'partner' ? (
        <PartnerLanding deals={deals} onOpenMarketplace={() => setPage('customer')} />
      ) : (
        <CustomerMarketplace
          deals={deals}
          zipCode={zipCode}
          setZipCode={setZipCode}
          radius={radius}
          setRadius={setRadius}
          cuisine={cuisine}
          setCuisine={setCuisine}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          onRedeem={onRedeem}
          onOpenPartnerPage={() => setPage('partner')}
        />
      )}

      {redeemedDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 px-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
            <div className="flex justify-end">
              <button onClick={() => setRedeemedDeal(null)} className="text-slate-400 hover:text-slate-600 text-xl">✕</button>
            </div>
            <div className="text-center mt-4">
              <p className="text-teal-600 font-medium">Your redeem code is ready</p>
              <p className="mt-6 text-5xl font-bold tracking-widest text-slate-900">{redeemedDeal.code}</p>
              <p className="mt-8 text-sm text-slate-500">Show this code to the restaurant staff</p>
            </div>
            <div className="mt-8 rounded-2xl bg-orange-50 p-5 text-sm">
              <p className="font-medium">{redeemedDeal.dealTitle}</p>
              <p className="text-slate-600 mt-1">Valid during {redeemedDeal.window}</p>
              <p className="text-red-600 mt-3">Remaining: {redeemedDeal.scarcityLeft}/{redeemedDeal.scarcityTotal}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
