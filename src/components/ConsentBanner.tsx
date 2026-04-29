import { useEffect, useState } from 'react';
import { cn, ghostButtonClass, primaryButtonClass } from '../lib/utils';
import type { ConsentPreferences } from '../lib/tracking';

type ConsentBannerProps = {
  isOpen: boolean;
  initialPreferences: ConsentPreferences;
  onAcceptAnalytics: () => void;
  onRejectAnalytics: () => void;
  onSavePreferences: (preferences: Pick<ConsentPreferences, 'analytics'>) => void;
  onCloseManage?: () => void;
  isManageMode?: boolean;
};

export function ConsentBanner({
  isOpen,
  initialPreferences,
  onAcceptAnalytics,
  onRejectAnalytics,
  onSavePreferences,
  onCloseManage,
  isManageMode = false,
}: ConsentBannerProps) {
  const [showPreferences, setShowPreferences] = useState(isManageMode);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(initialPreferences.analytics);

  useEffect(() => {
    setAnalyticsEnabled(initialPreferences.analytics);
  }, [initialPreferences.analytics, isOpen]);

  useEffect(() => {
    setShowPreferences(isManageMode);
  }, [isManageMode, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[98] px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#06080d]/95 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-2xl">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#2872fa]/45 to-transparent" />
        <div className="grid gap-5 p-4 sm:p-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:p-6">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#2872fa]">Cookies</p>
            <h3 className="mt-2 text-xl font-black uppercase leading-tight text-white sm:text-2xl">
              Cookievoorkeuren
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/72">
              Door op <span className="font-semibold text-white">‘Accepteer alle cookies’</span> te klikken, ga je akkoord met het opslaan van cookies op je apparaat om de website beter te laten werken en om het gebruik van de site te analyseren.
            </p>
            <p className="mt-2 text-sm leading-6 text-white/52">
              Je voorkeuren kun je later altijd weer aanpassen via de cookie-instellingen.
            </p>
          </div>

          <div className="flex flex-col gap-3 justify-end">
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={onAcceptAnalytics}
                className={cn(
                  primaryButtonClass,
                  'w-full px-5 py-3 text-[11px] shadow-[0_0_30px_rgba(40,114,250,0.24)] sm:px-7 sm:py-4 sm:text-sm',
                )}
              >
                Accepteer alle cookies
              </button>
              <div className="flex flex-col gap-2.5 sm:flex-row">
                <button
                  type="button"
                  onClick={onRejectAnalytics}
                  className={cn(ghostButtonClass, 'w-full px-5 py-3 text-[11px] sm:px-7 sm:py-4 sm:text-sm')}
                >
                  Weiger alle cookies
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (showPreferences) {
                      onSavePreferences({ analytics: analyticsEnabled });
                      onCloseManage?.();
                    } else {
                      setAnalyticsEnabled((current) => !current);
                      onSavePreferences({ analytics: !analyticsEnabled });
                      onCloseManage?.();
                    }
                  }}
                  className={cn(
                    'inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-[11px] font-black uppercase tracking-[0.18em] text-white transition hover:border-white/25 hover:text-white sm:px-7 sm:py-4 sm:text-sm',
                  )}
                >
                  {showPreferences ? 'Bewaar instellingen' : analyticsEnabled ? 'Analytics uitschakelen' : 'Analytics inschakelen'}
                </button>
              </div>
              {isManageMode ? (
                <button
                  type="button"
                  onClick={onCloseManage}
                  className="text-left text-[11px] font-black uppercase tracking-[0.18em] text-white/38 transition hover:text-white/65"
                >
                  Sluiten
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
