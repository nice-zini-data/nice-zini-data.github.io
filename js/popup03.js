/**
 * 이벤트 팝업03 관리 모듈 (새창 방식 - eventPopup03)
 *
 * 기능:
 * - 홈 페이지 접속 시 popup03 자동 실행
 * - "오늘 하루 보지 않기" 쿠키 처리
 *
 * @author NICE지니데이타
 * @version 1.1.0
 */

(function() {
    'use strict';

    const COOKIE_NAME03 = 'eventPopup03';

    function isMobile() {
        return window.matchMedia('(max-width: 768px)').matches;
    }

    function getTodayString03() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function getCookie03(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) {
                return c.substring(nameEQ.length, c.length);
            }
        }
        return null;
    }

    function isHiddenTodayByCookie(cookieName) {
        const cookieValue = getCookie03(cookieName);
        if (!cookieValue || cookieValue === 'null') {
            return false;
        }

        const today = getTodayString03();
        if (cookieValue === today || cookieValue === 'true') {
            return true;
        }

        return false;
    }

    function isHiddenToday03() {
        return isHiddenTodayByCookie(COOKIE_NAME03);
    }

    function getPopupFeatures(width, height, left, top) {
        return `width=${width},height=${height},left=${left},top=${top},scrollbars=no,resizable=yes,location=no,menubar=no,toolbar=no`;
    }

    function openEventPopup03() {
        if (isHiddenToday03()) {
            console.log('[EVENT-POPUP03] 오늘 하루 보지 않기 설정됨 - 팝업 표시 안함');
            return;
        }

        const popupWidth = isMobile() ? window.screen.width : 685;
        const popupHeight = isMobile() ? window.screen.height : 800 * 1.1;
        const popupLeft = isMobile() ? 0 : 40;
        const popupTop = isMobile() ? 0 : 40;

        const eventWindow03 = window.open(
            'eventPopup03.html',
            'eventPopup03',
            getPopupFeatures(popupWidth, popupHeight, popupLeft, popupTop)
        );

        if (eventWindow03) {
            eventWindow03.focus();
            console.log('[EVENT-POPUP03] 새창 팝업 실행 완료');
        } else {
            console.log('[EVENT-POPUP03] 팝업 차단됨');
        }
    }

    window.openEventPopup03Mobile = openEventPopup03;

    function isHomePage() {
        const path = window.location.pathname.replace(/\/+$/, '') || '/';
        if (path === '/' || path === '/home' || path === '/index.html') {
            return true;
        }
        const segments = path.split('/').filter(Boolean);
        return segments.length === 1 && segments[0] === 'index.html';
    }

    $(function() {
        console.log('[EVENT-POPUP03] 스크립트 로드 완료');

        if (isHomePage()) {
            console.log('[EVENT-POPUP03] 홈 페이지 감지 - 팝업 자동 실행');
            if (!isHiddenToday03()) {
                setTimeout(openEventPopup03, 500);
            }
        }
    });

})();

const COOKIE_NAME03 = 'eventPopup03';

function closePopup03() {
    console.log('[EVENT-POPUP03] 새창 닫기');
    window.close();
}

function getTodayString03() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function setDontShowTodayAndClose03() {
    console.log('[EVENT-POPUP03] 오늘하루 보지 않기 버튼 클릭');

    const today = getTodayString03();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    document.cookie = `${COOKIE_NAME03}=${today};expires=${tomorrow.toUTCString()};path=/`;
    console.log('[EVENT-POPUP03] 오늘하루 보지 않기 설정 완료:', today);

    window.close();
}
