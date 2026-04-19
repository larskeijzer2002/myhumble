import { privacySections } from '../data/siteContent';
import { cn, ghostButtonClass } from '../lib/utils';

type PrivacyOverlayProps = {
  onClose: () => void;
};

export function PrivacyOverlay({ onClose }: PrivacyOverlayProps) {
  return (
    <div className="fixed inset-0 z-[90] overflow-y-auto bg-black text-white">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <button type="button" onClick={onClose} className={cn(ghostButtonClass, 'mb-10')}>
          Terug
        </button>
        <h1 className="mb-6 text-4xl font-black uppercase">Privacy Policy</h1>
        <div className="space-y-6 leading-7 text-white/70">
          <p>Bij My Humble hechten we veel waarde aan jouw privacy.</p>
          {privacySections.map((section) => (
            <div key={section.title}>
              <h2 className="mb-2 text-xl font-black uppercase text-white">{section.title}</h2>
              <p>{section.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
