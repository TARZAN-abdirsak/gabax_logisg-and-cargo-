'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowRight, Anchor } from 'lucide-react';
import { adminLogin } from '@/services/admin';

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      await adminLogin(password);
      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Access denied');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="ad-rise w-full max-w-md" style={{ animationDelay: '60ms' }}>
        {/* Brand mark */}
        <div className="mb-8 flex items-center gap-3">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl"
            style={{
              background: 'var(--ad-amber)',
              color: '#1a1403',
              boxShadow: '0 10px 30px -8px rgba(245,197,24,0.55)',
            }}
          >
            <Anchor className="h-6 w-6" strokeWidth={2.5} />
          </div>
          <div>
            <p
              className="text-2xl font-black leading-none tracking-wide"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--ad-amber)' }}
            >
              GABAX
            </p>
            <p className="ad-label mt-1">Operations Deck</p>
          </div>
        </div>

        <div className="ad-panel p-8">
          <span className="ad-chip ad-chip-teal">
            <span className="ad-pulse" />
            Secure Channel
          </span>

          <h1 className="mt-5 text-3xl font-extrabold">System Access</h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--ad-muted)' }}>
            Authenticate to control live news &amp; feedback.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div>
              <label htmlFor="admin-password" className="ad-label">
                Access Key
              </label>
              <input
                id="admin-password"
                type="password"
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="ad-input mt-2"
              />
            </div>

            {error && (
              <p
                className="rounded-lg px-3 py-2 text-sm"
                style={{
                  background: 'rgba(251,113,133,0.12)',
                  color: 'var(--ad-danger)',
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="ad-btn ad-btn-primary w-full"
            >
              {isSubmitting ? (
                'Authenticating...'
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  Enter Deck
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <p
          className="ad-label mt-6 text-center"
          style={{ letterSpacing: '0.22em' }}
        >
          Gabax Logistics · Internal
        </p>
      </div>
    </div>
  );
}
