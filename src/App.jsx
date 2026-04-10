import React, { useMemo, useState } from 'react';

const FORM_ENDPOINT = 'https://formsubmit.co/REPLACE_WITH_YOUR_EMAIL';

export default function KuidagoLandingPage() {
  const initialDeals = [
    {
      id: 1,
      name: "Roma's Italian Restaurant",
      cuisine: 'Italian',
      zip: '75078',
      miles: 1.5,
      city: 'Prosper',
      dealTitle: 'Free Drink with Any Pasta Lunch',
      description: 'Classic pasta lunch dishes made with fresh ingredients.',
      discount: 'Free add-on value',
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
      dealTitle: '15% Off Lunch Menu',
      description: 'Traditional Italian lunch menu in downtown McKinney.',
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
      dealTitle: 'Lunch Pasta + Salad Combo $12',
      description: 'Classic Italian lunch combo with pasta and side salad.',
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
      dealTitle: 'Free Dessert with BBQ Plate',
      description: 'Famous brisket, ribs, and a complimentary dessert.',
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
      dealTitle: '10% Off Lunch Plates',
      description: 'Farm-to-table BBQ with responsibly sourced meats.',
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
      dealTitle: '2 Meat Plate + Drink $13.99',
      description: 'Scratch-made BBQ with sides included.',
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
      dealTitle: '$9 Burrito Lunch Special',
      description: 'Classic burritos and tacos with fast service.',
      discount: 'Low price special',
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
      dealTitle: 'Free Queso with Any Entree',
      description: 'Bold Tex-Mex flavors with a popular local following.',
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
      dealTitle: 'Lunch Curry + Drink $11.99',
      description: 'Popular Thai curries and stir-fry dishes.',
      discount: 'Combo price',
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
      dealTitle: 'Free Drink with Lunch Entree',
      description: 'Comfort food in a local Celina favorite spot.',
      discount: 'Free drink',
      window: '11:00 AM – 2:00 PM',
      scarcityLeft: 7,
      scarcityTotal: 18,
      image: '🍽️',
      featured: true,
    },
  ];

  const cuisines = ['All'].concat(Array.from(new Set(initialDeals.map((d) => d.cuisine))));
  const [deals, setDeals] = useState(initialDeals);
  const [zipCode, setZipCode] = useState('75009');
  const [radius, setRadius] = useState(5);
  const [cuisine, setCuisine] = useState('All');
  const [redeemedDeal, setRedeemedDeal] = useState(null);
  const [submitting, setSubmitting] = useState(false);
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

  const filteredDeals = useMemo(() => {
    return deals.filter((deal) => {
      const matchZip = zipCode.trim() === '' || deal.zip === zipCode.trim();
      const matchRadius = deal.miles <= radius;
      const matchCuisine = cuisine === 'All' || deal.cuisine === cuisine;
      return matchZip && matchRadius && matchCuisine;
    });
  }, [deals, zipCode, radius, cuisine]);

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function generateCode(deal) {
    if (deal.scarcityLeft <= 0) return;

    const nextLeft = deal.scarcityLeft - 1;
    const shortName = deal.name.split(' ').join('').slice(0, 4).toUpperCase();
    const code = shortName + '-' + deal.id + '7' + nextLeft;

    setDeals((currentDeals) =>
      currentDeals.map((item) =>
        item.id === deal.id ? { ...item, scarcityLeft: Math.max(0, item.scarcityLeft - 1) } : item
      )
    );

    setRedeemedDeal({ ...deal, scarcityLeft: nextLeft, code });
  }

  function handleFormChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = new FormData();
      payload.append('restaurantName', formData.restaurantName);
      payload.append('contactName', formData.contactName);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('city', formData.city);
      payload.append('address', formData.address);
      payload.append('cuisine', formData.cuisine);
      payload.append('offerIdea', formData.offerIdea);
      payload.append('launchTiming', formData.launchTiming);
      payload.append('agreement', String(formData.agreement));
      payload.append('_subject', 'New Kuidago Early Partner Request');
      payload.append('_captcha', 'false');
      payload.append('_template', 'table');

      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: payload,
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setSubmitted(true);
    } catch (error) {
      alert('Form submission is not configured yet. Replace REPLACE_WITH_YOUR_EMAIL in src/App.jsx with the email where you want to receive submissions, then redeploy.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div>
            <p className="text-2xl font-semibold tracking-tight text-slate-900">Kuidago</p>
            <p className="text-sm text-slate-500">Local food deals marketplace</p>
          </div>
          <div className="hidden gap-3 sm:flex">
            <button
              onClick={() => scrollToSection('marketplace')}
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              View Customer Experience
            </button>
            <button
              onClick={() => scrollToSection('partner-form')}
              className="rounded-xl bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700"
            >
              Join as Early Partner
            </button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-orange-50 via-white to-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center rounded-full border border-orange-200 bg-white px-4 py-1 text-sm font-medium text-orange-700 shadow-sm">
                Live preview for Celina, Prosper, and McKinney
              </div>
              <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-slate-900 sm:text-6xl">
                Nearby food deals. Real restaurants. Live-style marketplace experience.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Browse by ZIP code, distance, and cuisine. Restaurants can launch limited-time offers and customers can redeem them instantly.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={() => scrollToSection('marketplace')}
                  className="rounded-2xl bg-orange-600 px-6 py-3 text-base font-medium text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-orange-700"
                >
                  View Customer Experience
                </button>
                <button
                  onClick={() => scrollToSection('partner-form')}
                  className="rounded-2xl border border-slate-300 bg-white px-6 py-3 text-base font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  Join as Early Partner
                </button>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">Launch goal</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">First 10 restaurants</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">Search radius</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">Up to 50 miles</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">Redemption</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">Live-style code flow</p>
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-200">
              <div className="rounded-[28px] bg-slate-50 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Marketplace preview</p>
                    <h3 className="text-xl font-semibold text-slate-900">Top nearby deals</h3>
                  </div>
                  <div className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">
                    Demo live
                  </div>
                </div>
                <div className="space-y-3">
                  {deals.slice(0, 3).map((deal) => (
                    <div key={deal.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-2xl">
                            {deal.image}
                          </div>
                          <div>
                            <h4 className="text-base font-semibold text-slate-900">{deal.name}</h4>
                            <p className="mt-1 text-sm text-slate-600">{deal.dealTitle}</p>
                            <p className="mt-1 text-xs text-slate-500">{deal.city} · {deal.miles} mi · {deal.cuisine}</p>
                          </div>
                        </div>
                        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                          {deal.scarcityLeft}/{deal.scarcityTotal} left
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="marketplace" className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="mb-8 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Customer marketplace</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Search local deals by ZIP code, radius, and cuisine.
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Showing deals near <span className="font-semibold text-slate-900">{zipCode || 'all ZIPs'}</span> within <span className="font-semibold text-slate-900">{radius} miles</span>.
            </p>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-slate-50 p-5 shadow-sm">
            <div className="grid gap-4 lg:grid-cols-[1.2fr,0.8fr,0.8fr,1fr]">
              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <label className="text-sm font-medium text-slate-600">ZIP code</label>
                <input
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none placeholder:text-slate-400 focus:border-orange-400"
                  placeholder="Enter ZIP code"
                />
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <label className="text-sm font-medium text-slate-600">Radius</label>
                <select
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-400"
                >
                  <option value={5}>Under 5 miles</option>
                  <option value={10}>Under 10 miles</option>
                  <option value={20}>Under 20 miles</option>
                  <option value={30}>Under 30 miles</option>
                  <option value={50}>Under 50 miles</option>
                </select>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <label className="text-sm font-medium text-slate-600">Cuisine</label>
                <select
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-400"
                >
                  {cuisines.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div className="rounded-2xl bg-white p-4 shadow-sm">
                <label className="text-sm font-medium text-slate-600">Results</label>
                <div className="mt-2 flex h-[52px] items-center rounded-xl border border-slate-200 px-4 text-base font-semibold text-slate-900">
                  {filteredDeals.length} deals found
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
            <div className="space-y-5">
              {filteredDeals.map((deal) => (
                <div key={deal.id} className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                    <div className="flex gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-orange-50 text-3xl">
                        {deal.image}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xl font-semibold text-slate-900">{deal.name}</h3>
                          {deal.featured && (
                            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-slate-500">{deal.city} · {deal.cuisine} · {deal.miles} miles away · ZIP {deal.zip}</p>
                        <p className="mt-3 text-lg font-semibold text-slate-900">{deal.dealTitle}</p>
                        <p className="mt-2 max-w-2xl text-slate-600">{deal.description}</p>
                        <div className="mt-4 flex flex-wrap gap-3 text-sm">
                          <span className="rounded-full bg-emerald-50 px-3 py-1 font-medium text-emerald-700">{deal.discount}</span>
                          <span className="rounded-full bg-slate-100 px-3 py-1 font-medium text-slate-700">Available {deal.window}</span>
                          <span className="rounded-full bg-red-50 px-3 py-1 font-medium text-red-600">Only {deal.scarcityLeft}/{deal.scarcityTotal} left</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex min-w-[180px] flex-col gap-3">
                      <button
                        onClick={() => generateCode(deal)}
                        disabled={deal.scarcityLeft <= 0}
                        className="rounded-2xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-100 transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-slate-300"
                      >
                        {deal.scarcityLeft > 0 ? 'Redeem' : 'Sold Out'}
                      </button>
                      <button className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                        Save Deal
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {filteredDeals.length === 0 && (
                <div className="rounded-[28px] border border-dashed border-slate-300 bg-white p-10 text-center">
                  <p className="text-lg font-semibold text-slate-900">No deals match this filter.</p>
                  <p className="mt-2 text-slate-600">Try another ZIP, larger radius, or a different cuisine.</p>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Live demo notes</p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-900">What this shows</h3>
                <ul className="mt-5 space-y-4 text-slate-700">
                  <li>Restaurants appear in a real local marketplace view.</li>
                  <li>Customers can search by ZIP code and adjust radius up to 50 miles.</li>
                  <li>Cuisine filtering helps narrow options fast.</li>
                  <li>Redemptions reduce limited inventory one by one.</li>
                  <li>Each offer produces a redeem code to show the restaurant.</li>
                </ul>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">Restaurant controls</p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-900">What partners manage</h3>
                <div className="mt-5 space-y-3">
                  {[
                    'Offer title and description',
                    'Discount type or bundle special',
                    'Start and end time',
                    'Daily redemption cap',
                    'Cuisine category and visibility',
                    'Pause or reactivate deals instantly',
                  ].map((item) => (
                    <div key={item} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Start with 10 local partners',
                text: 'Once the first 10 restaurants are live, Kuidago becomes strong enough to market locally with real inventory.',
              },
              {
                title: 'Push visibility hard',
                text: 'Promote deals through social media, neighborhood groups, flyers, and direct local awareness campaigns.',
              },
              {
                title: 'Grow city by city',
                text: 'Once the model works in one area, duplicate it into nearby communities and expand gradually.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-slate-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="partner-form" className="mx-auto max-w-5xl px-6 py-20 lg:px-8">
        <div className="rounded-[32px] bg-slate-900 px-8 py-14 text-white shadow-2xl shadow-slate-300">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">Early partner agreement</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Join early, stand out locally, and get featured in the first launch group.
          </h2>
          <p className="mt-4 max-w-3xl text-lg text-slate-300">
            Complete the form below to request an early partner listing. Submissions can be emailed directly to you once the destination email is set.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="mt-10 grid gap-4 sm:grid-cols-2">
              <input name="restaurantName" value={formData.restaurantName} onChange={handleFormChange} required placeholder="Restaurant name" className="rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400" />
              <input name="contactName" value={formData.contactName} onChange={handleFormChange} required placeholder="Contact name" className="rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400" />
              <input name="email" type="email" value={formData.email} onChange={handleFormChange} required placeholder="Business email" className="rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400" />
              <input name="phone" value={formData.phone} onChange={handleFormChange} required placeholder="Phone number" className="rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400" />
              <input name="city" value={formData.city} onChange={handleFormChange} required placeholder="City" className="rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400" />
              <input name="address" value={formData.address} onChange={handleFormChange} required placeholder="Address" className="rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400" />
              <input name="cuisine" value={formData.cuisine} onChange={handleFormChange} placeholder="Cuisine type" className="rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400" />
              <input name="launchTiming" value={formData.launchTiming} onChange={handleFormChange} placeholder="Preferred launch timing" className="rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400" />
              <textarea name="offerIdea" value={formData.offerIdea} onChange={handleFormChange} placeholder="Proposed deal or offer idea" className="sm:col-span-2 min-h-[120px] rounded-2xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-400" />
              <label className="sm:col-span-2 flex items-start gap-3 rounded-2xl border border-slate-700 bg-slate-800 px-4 py-4 text-sm text-slate-300">
                <input name="agreement" type="checkbox" checked={formData.agreement} onChange={handleFormChange} required className="mt-1" />
                <span>
                  I confirm I am authorized to submit this restaurant for early partner review and understand this request may be contacted by email for activation.
                </span>
              </label>
              <div className="sm:col-span-2 flex flex-col gap-4 sm:flex-row">
                <button type="submit" disabled={submitting} className="rounded-2xl bg-orange-500 px-6 py-3 font-medium text-white transition hover:-translate-y-0.5 hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-500">
                  {submitting ? 'Submitting...' : 'Submit Early Partner Request'}
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection('marketplace')}
                  className="rounded-2xl border border-slate-600 px-6 py-3 font-medium text-white transition hover:bg-slate-800"
                >
                  Back to Customer Experience
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-10 rounded-[28px] border border-slate-700 bg-slate-800 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">Request received</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">Thank you, {formData.contactName || formData.restaurantName}.</h3>
              <p className="mt-4 max-w-2xl text-slate-300">
                Your early partner request has been submitted. Once your email destination is configured, every form submission will arrive in your inbox automatically.
              </p>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={() => scrollToSection('marketplace')}
                  className="rounded-2xl bg-orange-500 px-6 py-3 font-medium text-white hover:bg-orange-600"
                >
                  View Marketplace Again
                </button>
                <button
                  onClick={() => setSubmitted(false)}
                  className="rounded-2xl border border-slate-600 px-6 py-3 font-medium text-white hover:bg-slate-700"
                >
                  Edit Submission
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {redeemedDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4">
          <div className="w-full max-w-md rounded-[32px] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">Redeem code generated</p>
                <h3 className="mt-1 text-2xl font-semibold text-slate-900">{redeemedDeal.name}</h3>
              </div>
              <button
                onClick={() => setRedeemedDeal(null)}
                className="rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-600"
              >
                Close
              </button>
            </div>
            <div className="mt-6 rounded-3xl bg-orange-50 p-6 text-center">
              <p className="text-sm text-orange-700">Show this code to the restaurant</p>
              <p className="mt-3 text-3xl font-bold tracking-[0.2em] text-slate-900">{redeemedDeal.code}</p>
              <p className="mt-3 text-sm text-slate-600">This demo code is generated at the moment of redemption.</p>
            </div>
            <div className="mt-6 rounded-2xl border border-slate-200 p-4 text-left">
              <p className="text-sm text-slate-500">Offer</p>
              <p className="mt-1 font-semibold text-slate-900">{redeemedDeal.dealTitle}</p>
              <p className="mt-2 text-sm text-slate-600">Valid during {redeemedDeal.window}</p>
              <p className="mt-2 text-sm font-medium text-red-600">Remaining now: {redeemedDeal.scarcityLeft}/{redeemedDeal.scarcityTotal}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
