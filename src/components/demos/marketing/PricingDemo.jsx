import { useState } from 'react';
import { Check, Zap } from 'lucide-react';

const PLANS = [
  { name: 'Free', monthly: '$0', yearly: '$0', desc: 'For individuals', features: ['5 projects', '1 GB storage', 'Community support', 'Basic analytics'], cta: 'Get Started', popular: false },
  { name: 'Pro', monthly: '$19', yearly: '$15', desc: 'For professionals', features: ['Unlimited projects', '100 GB storage', 'Priority support', 'Advanced analytics', 'Custom domains', 'API access'], cta: 'Upgrade to Pro', popular: true },
  { name: 'Enterprise', monthly: '$49', yearly: '$39', desc: 'For teams', features: ['Everything in Pro', 'Unlimited storage', 'Dedicated support', 'SSO & SAML', 'Audit logs', 'SLA guarantee'], cta: 'Contact Sales', popular: false },
];

export default function PricingDemo({ activeOptions }) {
  const hasToggle = activeOptions.has('toggle');
  const hasFeatures = activeOptions.has('features');
  const [annual, setAnnual] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8 overflow-y-auto">
      <div className="w-full max-w-5xl">
        {hasToggle && (
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-base font-medium ${!annual ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'}`}>Monthly</span>
            <button onClick={() => setAnnual(!annual)} className={`relative w-16 h-8 rounded-full transition-colors ${annual ? 'bg-indigo-600' : 'bg-zinc-300 dark:bg-zinc-600'}`}>
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow transition-transform ${annual ? 'left-9' : 'left-1'}`} />
            </button>
            <span className={`text-base font-medium ${annual ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'}`}>Annual <span className="text-emerald-500 text-sm font-bold">Save 20%</span></span>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PLANS.map(plan => (
            <div key={plan.name} className={`relative bg-white dark:bg-zinc-800 rounded-2xl p-7 shadow-md ${plan.popular ? 'border-2 border-indigo-500 ring-4 ring-indigo-500/10' : 'border border-zinc-200 dark:border-zinc-700'}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1.5">
                  <Zap size={12} /> Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">{plan.name}</h3>
              <p className="text-sm text-zinc-400 mb-4">{plan.desc}</p>
              <div className="mb-6">
                <span className="text-5xl font-extrabold text-zinc-900 dark:text-white">{annual ? plan.yearly : plan.monthly}</span>
                <span className="text-base text-zinc-400 ml-1">/mo</span>
              </div>
              <button className={`w-full py-3 rounded-lg text-base font-semibold transition-opacity hover:opacity-90 mb-5 ${plan.popular ? 'bg-indigo-600 text-white' : 'bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300'}`}>
                {plan.cta}
              </button>
              {hasFeatures && (
                <ul className="space-y-3">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-zinc-600 dark:text-zinc-400">
                      <Check size={18} className="text-emerald-500 shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
