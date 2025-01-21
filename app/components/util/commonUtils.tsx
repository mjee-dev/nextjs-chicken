// 접속 디바이스 환경 체크
export const isMobileDevice = (): boolean => {
    if (typeof window === 'undefined') {
        return false;   //  SSR 환경에서는 항상 false
    }
    const mobile = /android|webOS|iPhone|iPad|iPod|blackberry|iemobile|opera mini/i;
    const userAgent = navigator.userAgent;

    return mobile.test(userAgent);
}