/**
 * 이벤트 팝업 관리 모듈 (새창 방식)
 *
 * 기능:
 * - 홈 페이지 접속 시 새창 팝업 자동 실행
 * - 모바일: popup1 → 닫기 시 popup2 → 닫기 시 popup3 순차 표출
 * - "오늘 하루 보지 않기" 쿠키 처리
 *
 * @author NICE지니데이타
 * @version 1.1.0
 */

(function() {
    'use strict';

    const COOKIE_NAME = 'eventPopup';
    const COOKIE_NAME02 = 'eventPopup02';
    const COOKIE_NAME03 = 'eventPopup03';

    function isMobile() {
        return window.matchMedia('(max-width: 768px)').matches;
    }

    function isSequentialPopupMode() {
        return isMobile() || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }

    function getTodayString() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function getCookie(name) {
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
        const cookieValue = getCookie(cookieName);
        if (!cookieValue || cookieValue === 'null') {
            return false;
        }

        const today = getTodayString();
        if (cookieValue === today || cookieValue === 'true') {
            return true;
        }

        return false;
    }

    function isHiddenToday() {
        return isHiddenTodayByCookie(COOKIE_NAME);
    }

    function isHiddenTodayPopup02() {
        return isHiddenTodayByCookie(COOKIE_NAME02);
    }

    function isHiddenTodayPopup03() {
        return isHiddenTodayByCookie(COOKIE_NAME03);
    }

    function getPopupFeatures(width, height, left, top) {
        return `width=${width},height=${height},left=${left},top=${top},scrollbars=no,resizable=yes,location=no,menubar=no,toolbar=no`;
    }

    function openEventPopup() {
        if (isHiddenToday()) {
            console.log('[EVENT-POPUP] 오늘 하루 보지 않기 설정됨 - 팝업 표시 안함');
            return;
        }

        const popupWidth = isMobile() ? window.screen.width : 685;
        const popupHeight = isMobile() ? window.screen.height : 800 * 1.1;
        const popupLeft = isMobile() ? 0 : 40;
        const popupTop = isMobile() ? 0 : 40;

        const eventWindow = window.open(
            'eventPopup.html',
            'eventPopup',
            getPopupFeatures(popupWidth, popupHeight, popupLeft, popupTop)
        );

        if (eventWindow) {
            eventWindow.focus();
            console.log('[EVENT-POPUP] 새창 팝업 실행 완료');
        } else {
            console.log('[EVENT-POPUP] 팝업 차단됨');
        }
    }

    function isHomePage() {
        const path = window.location.pathname.replace(/\/+$/, '') || '/';
        if (path === '/' || path === '/home' || path === '/index.html') {
            return true;
        }
        const segments = path.split('/').filter(Boolean);
        return segments.length === 1 && segments[0] === 'index.html';
    }

    function openEventPopup02FromMain() {
        if (typeof window.openEventPopup02Mobile === 'function') {
            window.openEventPopup02Mobile();
        }
    }

    function openEventPopup03FromMain() {
        if (typeof window.openEventPopup03Mobile === 'function') {
            window.openEventPopup03Mobile();
        }
    }

    function initHomePopups() {
        if (isSequentialPopupMode()) {
            if (!isHiddenToday()) {
                setTimeout(openEventPopup, 500);
            } else if (!isHiddenTodayPopup02()) {
                setTimeout(openEventPopup02FromMain, 500);
            } else if (!isHiddenTodayPopup03()) {
                setTimeout(openEventPopup03FromMain, 500);
            }
            return;
        }

        if (!isHiddenToday()) {
            setTimeout(openEventPopup, 500);
        }
        if (!isHiddenTodayPopup02()) {
            setTimeout(openEventPopup02FromMain, 500);
        }
        if (!isHiddenTodayPopup03()) {
            setTimeout(openEventPopup03FromMain, 500);
        }
    }

    $(function() {
        console.log('[EVENT-POPUP] 스크립트 로드 완료');
        const path = window.location.pathname;
        console.log('[EVENT-POPUP] 현재 경로:', path);

        if (isHomePage()) {
            console.log('[EVENT-POPUP] 홈 페이지 감지 - 팝업 자동 실행');
            console.log('[EVENT-POPUP] 모바일 여부:', isMobile());
            console.log('[EVENT-POPUP] 오늘 하루 보지 않기 여부:', isHiddenToday());
            initHomePopups();
        } else {
            console.log('[EVENT-POPUP] 홈 페이지가 아님 - 팝업 표시 안함');
        }
    });

})();

const COOKIE_NAME = 'eventPopup';

function getMainWindowForPopupMode() {
    if (window.opener && !window.opener.closed) {
        return window.opener;
    }
    return window;
}

function isSequentialPopupModeGlobal() {
    var mainWin = getMainWindowForPopupMode();
    return mainWin.matchMedia('(max-width: 768px)').matches
        || /Mobi|Android|iPhone|iPad|iPod/i.test(mainWin.navigator.userAgent);
}

function closePopup1AndMaybeOpenPopup2() {
    if (isSequentialPopupModeGlobal()
        && window.opener
        && !window.opener.closed
        && typeof window.opener.openEventPopup02Mobile === 'function') {
        var opener = window.opener;
        // 모바일: 클릭 컨텍스트 안에서 먼저 열어야 popup02 차단을 피할 수 있음
        opener.openEventPopup02Mobile();
        window.close();
        return;
    }

    window.close();
}

function closePopup() {
    console.log('[EVENT-POPUP] 새창 닫기');
    closePopup1AndMaybeOpenPopup2();
}

function getTodayString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function setDontShowTodayAndClose() {
    console.log('[EVENT-POPUP] 오늘하루 보지 않기 버튼 클릭');

    const today = getTodayString();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    document.cookie = `${COOKIE_NAME}=${today};expires=${tomorrow.toUTCString()};path=/`;
    console.log('[EVENT-POPUP] 오늘하루 보지 않기 설정 완료:', today);

    closePopup1AndMaybeOpenPopup2();
}
