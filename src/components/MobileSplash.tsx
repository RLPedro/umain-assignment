import Image from 'next/image';

interface MobileSplashProps {
    onContinue: () => void;
}

export function MobileSplash({ onContinue }: MobileSplashProps) {
    return (
        <div className="md:hidden fixed z-[100] inset-0 bg-[var(--color-brand)] overflow-hidden w-full h-full flex flex-col p-6">
            <div className="relative w-[167.17px] h-6 mt-[70px]">
                <Image
                    src="/icon-white.svg"
                    alt="munchies."
                    fill
                    className="object-contain object-left"
                    priority
                />
            </div>

            <div className="mt-[180px] w-[246px]">
                <h1
                    className="text-white text-5xl font-extrabold leading-none"
                    style={{
                        fontFamily: 'SF Pro Expanded',
                        fontStretch: 'expanded'
                    }}
                >
                    Treat<br />yourself.
                </h1>
            </div>

            <div className="mt-4 w-[246px]">
                <p className="text-white text-sm leading-relaxed">
                    Find the best restaurants in your city and get it delivered to your place!
                </p>
            </div>

            <button
                onClick={onContinue}
                className="mt-auto w-full h-14 flex items-center justify-center text-white transition-colors hover:bg-white/10 rounded-lg border border-white font-semibold text-base mb-8"
            >
                Continue
            </button>
        </div>
    );
}
