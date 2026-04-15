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
    <div className="flex flex-col items-center justify-center h-full w-full bg-zinc-50 dark:bg-zinc-900/50 p-4 overflow-y-auto">
      <div className="w-full max-w-2xl">
        {hasToggle && (
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className={`text-sm font-medium ${!annual ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'}`}>Monthly</span>
            <button onClick={() => setAnnual(!annual)} className={`relative w-12 h-6 rounded-full transition-colors ${annual ? 'bg-indigo-600' : 'bg-zinc-300 dark:bg-zinc-600'}`}>
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${annual ? 'left-7' : 'left-1'}`} />
            </button>
            <span className={`text-sm font-medium ${annual ? 'text-zinc-900 dark:text-white' : 'text-zinc-400'}`}>Annual <span className="text-emerald-500 text-xs font-bold">Save 20%</span></span>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PLANS.map(plan => (
            <div key={plan.name} className={`relative bg-white dark:bg-zinc-900 rounded-xl p-5 shadow-sm ${plan.popular ? 'border-2 border-indigo-500 ring-4 ring-indigo-500/10' : 'border border-zinc-200 dark:border-zinc-700'}`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full flex items-center gap-1">
                  <Zap size={10} /> Most Popular
                </div>
              )}
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{plan.name}</h3>
              <p className="text-xs text-zinc-400 mb-3">{plan.desc}</p>
              <div className="mb-4">
                <span className="text-3xl font-extrabold text-zinc-900 dark:text-white">{annual ? plan.yearly : plan.monthly}</span>
                <span className="text-sm text-zinc-400">/mo</span>
              </div>
              <button className={`w-full py-2.5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90 mb-4 ${plan.popular ? 'bg-indigo-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'}`}>
                {plan.cta}
              </button>
              {hasFeatures && (
                <ul className="space-y-2">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                      <Check size={14} className="text-emerald-500 shrink-0" /> {f}
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
