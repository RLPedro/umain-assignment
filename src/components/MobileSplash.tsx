import Image from 'next/image';

interface MobileSplashProps {
    onContinue: () => void;
}

export function MobileSplash({ onContinue }: MobileSplashProps) {
    return (
        <div
            className="md:hidden fixed z-[100] bg-[#00703A] overflow-hidden overflow-y-hidden left-1/2 -translate-x-1/2"
            style={{
                maxWidth: '375px',
                width: '100%',
                height: '100%',
                top: 0
            }}
        >

            < div
                className="absolute"
                style={{
                    width: '167.17px',
                    height: '24px',
                    top: '94px',
                    left: '24px'
                }
                }
            >
                <Image
                    src="/icon-white.svg"
                    alt="munchies."
                    fill
                    className="object-contain object-left"
                    priority
                />
            </div >

            < div
                className="absolute flex flex-col justify-center"
                style={{
                    width: '246px',
                    height: '96px',
                    top: '329px',
                    left: '24px'
                }}
            >
                <h1
                    className="text-white"
                    style={{
                        fontFamily: 'SF Pro Expanded',
                        fontSize: '48px',
                        fontWeight: 800,
                        lineHeight: '100%',
                        fontStretch: 'expanded'
                    }}
                >
                    Treat<br />yourself.
                </h1>
            </div >

            < div
                className="absolute flex items-center"
                style={{
                    width: '246px',
                    height: '42px',
                    top: '441px',
                    left: '24px'
                }}
            >
                <p
                    className="text-white"
                    style={{
                        fontSize: '14px',
                        lineHeight: '150%',
                    }}
                >
                    Find the best restaurants in your city and get it delivered to your place!
                </p>
            </div >

            < button
                onClick={onContinue}
                className="absolute flex items-center justify-center text-white transition-colors hover:bg-white/10"
                style={{
                    width: '327px',
                    height: '56px',
                    top: '662px',
                    left: '24px',
                    borderRadius: '8px',
                    border: '1px solid #FFFFFF',
                    paddingTop: '20px',
                    paddingRight: '24px',
                    paddingBottom: '20px',
                    paddingLeft: '24px',
                    gap: '8px',
                    fontSize: '16px',
                    fontWeight: 600
                }}
            >
                Continue
            </button >
        </div >
    );
}
