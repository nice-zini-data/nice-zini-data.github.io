/**
 * 이벤트 팝업02 관리 모듈 (새창 방식 - eventPopup02)
 *
 * 기능:
 * - 데스크톱: 홈 페이지 접속 시 popup02 자동 실행
 * - 모바일: popup1 닫기 후 순차 표출 (또는 popup1 숨김 시 단독 표출)
 * - "오늘 하루 보지 않기" 쿠키 처리
 *
 * @author NICE지니데이타
 * @version 1.1.0
 */

(function() {
    'use strict';

    const COOKIE_NAME02 = 'eventPopup02';

    function isMobile() {
        return window.matchMedia('(max-width: 768px)').matches;
    }

    function getTodayString02() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function getCookie02(name) {
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
        const cookieValue = getCookie02(cookieName);
        if (!cookieValue || cookieValue === 'null') {
            return false;
        }

        const today = getTodayString02();
        if (cookieValue === today || cookieValue === 'true') {
            return true;
        }

        return false;
    }

    function isHiddenToday02() {
        return isHiddenTodayByCookie(COOKIE_NAME02);
    }

    function getPopupFeatures(width, height, left, top) {
        return `width=${width},height=${height},left=${left},top=${top},scrollbars=no,resizable=yes,location=no,menubar=no,toolbar=no`;
    }

    function openEventPopup02() {
        if (isHiddenToday02()) {
            console.log('[EVENT-POPUP02] 오늘 하루 보지 않기 설정됨 - 팝업 표시 안함');
            return;
        }

        const popupWidth = isMobile() ? window.screen.width : 685;
        const popupHeight = isMobile() ? window.screen.height : 800 * 1.1;
        const popupLeft = isMobile() ? 0 : 740;
        const popupTop = isMobile() ? 0 : 40;

        const eventWindow02 = window.open(
            'eventPopup02.html',
            'eventPopup02',
            getPopupFeatures(popupWidth, popupHeight, popupLeft, popupTop)
        );

        if (eventWindow02) {
            eventWindow02.focus();
            console.log('[EVENT-POPUP02] 새창 팝업 실행 완료');
        } else {
            console.log('[EVENT-POPUP02] 팝업 차단됨');
        }
    }

    window.openEventPopup02Mobile = openEventPopup02;

    $(function() {
        console.log('[EVENT-POPUP02] 스크립트 로드 완료 (홈 자동 실행은 popup.js에서 제어)');
    });

})();

const COOKIE_NAME02 = 'eventPopup02';

function closePopup02() {
    console.log('[EVENT-POPUP02] 새창 닫기');
    window.close();
}

function getTodayString02() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function setDontShowTodayAndClose02() {
    console.log('[EVENT-POPUP02] 오늘하루 보지 않기 버튼 클릭');

    const today = getTodayString02();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    document.cookie = `${COOKIE_NAME02}=${today};expires=${tomorrow.toUTCString()};path=/`;
    console.log('[EVENT-POPUP02] 오늘하루 보지 않기 설정 완료:', today);

    window.close();
}
