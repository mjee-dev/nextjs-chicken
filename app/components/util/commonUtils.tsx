// 접속 디바이스 환경 체크
export const isMobileDevice = (): boolean => {
    if (typeof window === 'undefined') {
        return false;   //  SSR 환경에서는 항상 false
    }
    const mobile = /android|webOS|iPhone|iPad|iPod|blackberry|iemobile|opera mini/i;
    const userAgent = navigator.userAgent;

    return mobile.test(userAgent);
}

// 전화번호 입력시 '-' 자동 입력, 숫자만 입력
export const inputTel = (txt) => {
    console.log(`inputTel, txt: ${txt}, length: ${txt.length}`);
    const str = txt.replace(/\D+/g, '');    // 숫자만 남기기

    if (str.length <= 3) { return str;}
    else if (str.length <= 7) {
        return `${str.substring(0, 3)}-${str.substring(3)}`;
    } else if (str.length <= 11) {
        return `${str.substring(0, 3)}-${str.substring(3, 7)}-${str.substring(7, 11)}`;
    }
}