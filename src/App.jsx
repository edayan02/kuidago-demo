import React, { useMemo, useState } from 'react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mjgjbwba';

function AppStoreFrame({ children }) {
  return (
    <div className="mx-auto w-full max-w-[430px] rounded-[34px] border border-slate-200 bg-white shadow-2xl shadow-slate-200">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3 text-sm text-slate-500">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <span className="h-2 w-2 rounded-full bg-slate-400" />
          <span className="h-2 w-2 rounded-full bg-slate-400" />
        </div>
      </div>
      <div className="min-h-[780px] overflow-hidden rounded-b-[34px] bg-slate-50">{children}</div>
    </div>
  );
}

function DealCouponCard({ deal, isFavorite, onToggleFavorite, onRedeem }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-3xl">
          {deal.image}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate text-base font-semibold text-slate-900">{deal.name}</h3>
                {deal.featured && (
                  <span className="rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-orange-700">
                    Featured
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-slate-500">{deal.city} · {deal.cuisine} · {deal.miles} mi away</p>
            </div>
            <button
              onClick={() => onToggleFavorite(deal.id)}
              className={`rounded-full border px-2.5 py-1 text-sm ${isFavorite ? 'border-rose-200 bg-rose-50 text-rose-600' : 'border-slate-200 bg-white text-slate-400'}`}
              aria-label="Save favorite"
            >
              ♥
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between gap-3">
            <div>
              <p className="text-lg font-bold tracking-tight text-slate-900">{deal.dealTitle}</p>
              <div className="mt-1 flex items-center gap-2 text-sm">
                <span className="text-slate-400 line-through">{deal.originalPrice}</span>
                <span className="font-bold text-emerald-700">{deal.salePrice}</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">{deal.window}</p>
            </div>
            <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-right text-xs font-semibold text-emerald-700">
              {deal.discount}
            </div>
          </div>

          <p className="mt-3 text-sm leading-6 text-slate-600">{deal.description}</p>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-red-600">Only {deal.scarcityLeft}/{deal.scarcityTotal} left</p>
              <p className="mt-1 text-xs text-slate-500">Call: {deal.phone}</p>
            </div>
            <button
              onClick={() => onRedeem(deal)}
              disabled={deal.scarcityLeft <= 0}
              className="rounded-2xl bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {deal.scarcityLeft > 0 ? 'Redeem' : 'Sold Out'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CustomerMarketplace({ deals, zipCode, setZipCode, radius, setRadius, cuisine, setCuisine, favorites, onToggleFavorite, onRedeem, onOpenPartnerPage }) {
  const cuisines = ['All'].concat(Array.from(new Set(deals.map((d) => d.cuisine))));
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  const filteredDeals = useMemo(() => {
    return deals.filter((deal) => {
      const hasZip = zipCode.trim() !== '';
      const matchZip = !hasZip || deal.zip === zipCode.trim();
      const matchRadius = !hasZip || deal.miles <= radius;
      const matchCuisine = cuisine === 'All' || deal.cuisine === cuisine;
      const matchFavorite = !showFavoritesOnly || favorites.includes(deal.id);
      return matchZip && matchRadius && matchCuisine && matchFavorite;
    });
  }, [deals, zipCode, radius, cuisine, favorites, showFavoritesOnly]);

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-5">
      <AppStoreFrame>
        <div className="border-b border-slate-100 bg-white px-4 pb-4 pt-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-2xl font-bold tracking-tight text-slate-900">Kuidago</p>
              <p className="mt-1 text-sm text-slate-500">Food deals near you</p>
            </div>
            <button
              onClick={onOpenPartnerPage}
              className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700"
            >
              For restaurants
            </button>
          </div>

          <div className="mt-4 grid grid-cols-[1fr,120px] gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">ZIP code</label>
              <input
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Enter ZIP"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-orange-300"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">Radius</label>
              <select
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-orange-300"
              >
                <option value={5}>5 mi</option>
                <option value={10}>10 mi</option>
                <option value={20}>20 mi</option>
                <option value={30}>30 mi</option>
                <option value={50}>50 mi</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1">
            {cuisines.map((item) => (
              <button
                key={item}
                onClick={() => setCuisine(item)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${cuisine === item ? 'bg-slate-900 text-white' : 'border border-slate-200 bg-white text-slate-600'}`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-orange-50 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">{filteredDeals.length} deals found</p>
              <p className="text-xs text-slate-500">{zipCode.trim() === '' ? 'Showing all available deals in the system' : `Showing results near ${zipCode} within ${radius} miles`}</p>
            </div>
            <button
              onClick={() => setShowFavoritesOnly((v) => !v)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${showFavoritesOnly ? 'bg-rose-100 text-rose-700' : 'bg-white text-slate-600 border border-slate-200'}`}
            >
              ♥ Favorites {favorites.length > 0 ? `(${favorites.length})` : ''}
            </button>
          </div>
        </div>

        <div className="space-y-3 px-4 py-4">
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
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
              <p className="text-base font-semibold text-slate-900">No deals match this filter.</p>
              <p className="mt-2 text-sm text-slate-500">Try a larger radius, another ZIP code, or tap All cuisine.</p>
            </div>
          )}
        </div>
      </AppStoreFrame>
    </div>
  );
}

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

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: payload,
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setSubmitted(true);
    } catch (error) {
      alert('There was a problem sending the request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div>
            <p className="text-2xl font-bold tracking-tight text-slate-900">Kuidago</p>
            <p className="text-sm text-slate-500">Restaurant partner page</p>
          </div>
          <button
            onClick={onOpenMarketplace}
            className="rounded-xl bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700"
          >
            View customer app
          </button>
        </div>
      </header>

      <section className="border-b border-slate-200 bg-gradient-to-b from-orange-50 via-white to-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <div className="inline-flex rounded-full border border-orange-200 bg-white px-4 py-1 text-sm font-medium text-orange-700 shadow-sm">
              Early partner rollout · Celina · Prosper · McKinney
            </div>
            <h1 className="mt-5 max-w-2xl text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl">
              Fill slower hours with limited-time deals customers can actually discover.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Kuidago is a local food deals marketplace designed to help restaurants drive more traffic during slower periods while customers browse real nearby offers by ZIP code, radius, and cuisine.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={onOpenMarketplace}
                className="rounded-2xl bg-orange-600 px-6 py-3 font-semibold text-white hover:bg-orange-700"
              >
                View customer app experience
              </button>
              <a href="#partner-form" className="rounded-2xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50">
                Join as early partner
              </a>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm text-slate-500">Initial launch</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">First 10 restaurants</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm text-slate-500">Customer filters</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">ZIP · Radius · Cuisine</p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm text-slate-500">Offer style</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">Limited-time local deals</p>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200">
            <div className="rounded-[28px] bg-slate-50 p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Restaurant preview</p>
                  <h3 className="text-xl font-semibold text-slate-900">How your deal appears</h3>
                </div>
                <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-700">Preview</span>
              </div>
              <div className="space-y-3">
                {deals.slice(0, 3).map((deal) => (
                  <div key={deal.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-2xl">{deal.image}</div>
                        <div>
                          <h4 className="text-base font-semibold text-slate-900">{deal.name}</h4>
                          <p className="mt-1 text-sm text-slate-600">{deal.dealTitle}</p>
                          <p className="mt-1 text-xs text-slate-500">{deal.city} · {deal.cuisine} · {deal.miles} mi away</p>
                        </div>
                      </div>
                      <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">{deal.scarcityLeft}/{deal.scarcityTotal} left</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Get discovered nearby',
                text: 'Customers browse by location and distance, so your offer is shown to people already close enough to act on it.',
              },
              {
                title: 'Use scarcity to create action',
                text: 'Each offer can show limited availability like 4/15 left, making deals feel timely and worth using now.',
              },
              {
                title: 'Launch with local visibility',
                text: 'Early partners are positioned to be featured in the first wave of local promotion and awareness.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
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
            Complete the form below to request an early partner listing. This form is designed for your first wave of local onboarding.
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
                <span>I confirm I am authorized to submit this restaurant for early partner review and activation.</span>
              </label>
              <div className="sm:col-span-2 flex flex-col gap-4 sm:flex-row">
                <button type="submit" disabled={submitting} className="rounded-2xl bg-orange-500 px-6 py-3 font-medium text-white transition hover:-translate-y-0.5 hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-500">
                  {submitting ? 'Submitting...' : 'Submit Early Partner Request'}
                </button>
                <button
                  type="button"
                  onClick={onOpenMarketplace}
                  className="rounded-2xl border border-slate-600 px-6 py-3 font-medium text-white transition hover:bg-slate-800"
                >
                  View customer app
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-10 rounded-[28px] border border-slate-700 bg-slate-800 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">Request received</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">Thank you, {formData.contactName || formData.restaurantName}.</h3>
              <p className="mt-4 max-w-2xl text-slate-300">Your early partner request has been sent successfully. The Kuidago team will receive it by email at kuidago.co@gmail.com and can follow up directly.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function KuidagoLandingPage() {
  const initialDeals = [
    { id: 1, name: "Roma's Italian Restaurant", cuisine: 'Italian', zip: '75078', miles: 1.5, city: 'Prosper', phone: '(469) 555-1101', dealTitle: 'Free Drink with Any Pasta Lunch', description: 'Classic pasta lunch dishes made with fresh ingredients.', originalPrice: '$17.99', salePrice: '$13.99', discount: 'Save $4 + free drink', window: '11:00 AM – 2:00 PM', scarcityLeft: 5, scarcityTotal: 15, image: '🍝', featured: true },
    { id: 2, name: 'Fontina Ristorante', cuisine: 'Italian', zip: '75069', miles: 4.8, city: 'McKinney', phone: '(469) 555-1102', dealTitle: '15% Off Lunch Menu', description: 'Traditional Italian lunch menu in downtown McKinney.', originalPrice: '$18.00', salePrice: '$15.30', discount: '15% off', window: '11:30 AM – 2:30 PM', scarcityLeft: 6, scarcityTotal: 20, image: '🍷', featured: false },
    { id: 3, name: 'Salute Italian Restaurant', cuisine: 'Italian', zip: '75078', miles: 2.2, city: 'Prosper', phone: '(469) 555-1103', dealTitle: 'Lunch Pasta + Salad Combo $12', description: 'Classic Italian lunch combo with pasta and side salad.', originalPrice: '$16.00', salePrice: '$12.00', discount: 'Combo pricing', window: '11:00 AM – 2:00 PM', scarcityLeft: 7, scarcityTotal: 18, image: '🍕', featured: false },
    { id: 4, name: 'Hutchins BBQ', cuisine: 'BBQ', zip: '75070', miles: 4.5, city: 'McKinney', phone: '(469) 555-1104', dealTitle: 'Free Dessert with BBQ Plate', description: 'Famous brisket, ribs, and a complimentary dessert.', originalPrice: '$19.99', salePrice: '$19.99', discount: 'Free dessert', window: '11:00 AM – 3:00 PM', scarcityLeft: 8, scarcityTotal: 25, image: '🍖', featured: true },
    { id: 5, name: 'Local Yocal BBQ & Grill', cuisine: 'BBQ', zip: '75069', miles: 4.2, city: 'McKinney', phone: '(469) 555-1105', dealTitle: '10% Off Lunch Plates', description: 'Farm-to-table BBQ with responsibly sourced meats.', originalPrice: '$20.00', salePrice: '$18.00', discount: '10% off', window: '11:00 AM – 2:00 PM', scarcityLeft: 6, scarcityTotal: 14, image: '🔥', featured: false },
    { id: 6, name: 'Tender Smokehouse', cuisine: 'BBQ', zip: '75009', miles: 1.8, city: 'Celina', phone: '(469) 555-1106', dealTitle: '2 Meat Plate + Drink $13.99', description: 'Scratch-made BBQ with sides included.', originalPrice: '$17.99', salePrice: '$13.99', discount: 'Combo deal', window: '11:00 AM – 2:30 PM', scarcityLeft: 4, scarcityTotal: 12, image: '🍗', featured: true },
    { id: 7, name: "Cookie's Mexican Food", cuisine: 'Mexican', zip: '75070', miles: 3.9, city: 'McKinney', phone: '(469) 555-1107', dealTitle: '$9 Burrito Lunch Special', description: 'Classic burritos and tacos with fast service.', originalPrice: '$12.50', salePrice: '$9.00', discount: 'Save $3.50', window: '10:30 AM – 2:00 PM', scarcityLeft: 9, scarcityTotal: 20, image: '🌯', featured: false },
    { id: 8, name: 'Mi Luna Tex-Mex', cuisine: 'Tex-Mex', zip: '75078', miles: 2.6, city: 'Prosper', phone: '(469) 555-1108', dealTitle: 'Free Queso with Any Entree', description: 'Bold Tex-Mex flavors with a popular local following.', originalPrice: '$15.99', salePrice: '$15.99', discount: 'Free appetizer', window: '11:00 AM – 3:00 PM', scarcityLeft: 5, scarcityTotal: 15, image: '🧀', featured: false },
    { id: 9, name: 'Spoon + Fork Thai Kitchen', cuisine: 'Thai', zip: '75070', miles: 4.1, city: 'McKinney', phone: '(469) 555-1109', dealTitle: 'Lunch Curry + Drink $11.99', description: 'Popular Thai curries and stir-fry dishes.', originalPrice: '$15.99', salePrice: '$11.99', discount: 'Save $4', window: '11:00 AM – 2:30 PM', scarcityLeft: 6, scarcityTotal: 16, image: '🍜', featured: false },
    { id: 10, name: "Lucy's on the Square", cuisine: 'American', zip: '75009', miles: 1.2, city: 'Celina', phone: '(469) 555-1110', dealTitle: 'Free Drink with Lunch Entree', description: 'Comfort food in a local Celina favorite spot.', originalPrice: '$14.99', salePrice: '$12.99', discount: 'Save $2 + free drink', window: '11:00 AM – 2:00 PM', scarcityLeft: 7, scarcityTotal: 18, image: '🍽️', featured: true },
  ];

  const [page, setPage] = useState('partner');
  const [deals, setDeals] = useState(initialDeals);
  const [zipCode, setZipCode] = useState('75009');
  const [radius, setRadius] = useState(5);
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

    setDeals((currentDeals) =>
      currentDeals.map((item) => item.id === deal.id ? { ...item, scarcityLeft: Math.max(0, item.scarcityLeft - 1) } : item)
    );

    setRedeemedDeal({ ...deal, scarcityLeft: nextLeft, code });
  }

  return (
    <div className="bg-white">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4">
          <div className="w-full max-w-md rounded-[32px] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">Redeem code generated</p>
                <h3 className="mt-1 text-2xl font-semibold text-slate-900">{redeemedDeal.name}</h3>
              </div>
              <button onClick={() => setRedeemedDeal(null)} className="rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-600">
                Close
              </button>
            </div>
            <div className="mt-6 rounded-3xl bg-orange-50 p-6 text-center">
              <p className="text-sm text-orange-700">Show this code to the restaurant</p>
              <p className="mt-3 text-3xl font-bold tracking-[0.2em] text-slate-900">{redeemedDeal.code}</p>
              <p className="mt-3 text-sm text-slate-600">This is the current shopper-side Preview flow.</p>
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
