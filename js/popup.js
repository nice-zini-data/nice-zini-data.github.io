/**
 * 이벤트 팝업 관리 모듈 (새창 방식 - 1+1 이벤트)
 * 
 * 기능:
 * - 홈 페이지 접속 시 새창 팝업 자동 실행
 * - "오늘 하루 보지 않기" 쿠키 처리
 * - 이미지 클릭 시 부모창에서 /pricing/plans로 이동
 * 
 * @author NICE지니데이타
 * @version 1.0.0
 */

(function() {
    'use strict';
    
    const COOKIE_NAME = 'eventPopup';
    
    /**
     * 오늘 날짜를 YYYY-MM-DD 형식으로 반환
     */
    function getTodayString() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    /**
     * 쿠키 조회
     */
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
    
    /**
     * 오늘 하루 보지 않기 여부 확인
     */
    function isHiddenToday() {
        const cookieValue = getCookie(COOKIE_NAME);
        if (!cookieValue || cookieValue === 'null') {
            return false;
        }
        
        // 쿠키 값이 오늘 날짜와 일치하는지 확인
        const today = getTodayString();
        if (cookieValue === today) {
            return true;
        }
        
        // 쿠키 값이 'true'인 경우도 확인 (이전 버전 호환)
        if (cookieValue === 'true') {
            return true;
        }
        
        return false;
    }
    
    /**
     * 새창 팝업 열기
     */
    function openEventPopup() {
        // 오늘 하루 보지 않기 확인
        if (isHiddenToday()) {
            console.log('[EVENT-POPUP] 오늘 하루 보지 않기 설정됨 - 팝업 표시 안함');
            return;
        }
        
        // 새창 팝업 실행 (화면 중앙)
        const popupWidth = 685;
        const popupHeight = 800 * 1.1;
        const screenWidth = window.screen.width;
        const screenHeight = window.screen.height;
        const popupLeft = 40;
        const popupTop = 40;
        // const popupLeft = Math.round((screenWidth - popupWidth) / 2);
        // const popupTop = Math.round((screenHeight - popupHeight) / 2);
        
        const eventWindow = window.open(
            'eventPopup.html',
            'eventPopup',
            `width=${popupWidth},height=${popupHeight},left=${popupLeft},top=${popupTop},scrollbars=no,resizable=yes,location=no,menubar=no,toolbar=no`
        );
        
        if (eventWindow) {
            eventWindow.focus();
            console.log('[EVENT-POPUP] 새창 팝업 실행 완료 (화면 중앙)');
        } else {
            console.log('[EVENT-POPUP] 팝업 차단됨');
        }
    }
    
    /**
     * 홈(index) 페이지 여부 확인
     * - /, /home, /index.html 및 하위 index.html 경로 지원
     */
    function isHomePage() {
        const path = window.location.pathname.replace(/\/+$/, '') || '/';
        if (path === '/' || path === '/home' || path === '/index.html') {
            return true;
        }
        const segments = path.split('/').filter(Boolean);
        return segments.length === 1 && segments[0] === 'index.html';
    }
    
    // 홈 페이지에서만 자동 실행
    $(function() {
        console.log('[EVENT-POPUP] 스크립트 로드 완료');
        const path = window.location.pathname;
        console.log('[EVENT-POPUP] 현재 경로:', path);
        
        if (isHomePage()) {
            console.log('[EVENT-POPUP] 홈 페이지 감지 - 팝업 자동 실행');
            
            // 오늘 하루 보지 않기 확인
            const isHidden = isHiddenToday();
            console.log('[EVENT-POPUP] 오늘 하루 보지 않기 여부:', isHidden);
            
            if (!isHidden) {
                setTimeout(openEventPopup, 500);
            } else {
                console.log('[EVENT-POPUP] 오늘 하루 보지 않기 설정으로 인해 팝업 표시 안함');
            }
        } else {
            console.log('[EVENT-POPUP] 홈 페이지가 아님 - 팝업 표시 안함');
        }
    });
    
})();

// ======================== 새창 전용 함수들 ========================

const COOKIE_NAME = 'eventPopup';

/**
 * 새창 팝업 닫기
 */
function closePopup() {
    console.log('[EVENT-POPUP] 새창 닫기');
    window.close();
}

/**
 * 오늘 날짜를 YYYY-MM-DD 형식으로 반환
 */
function getTodayString() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * "오늘하루 보지 않기" 버튼 클릭 시 쿠키 설정 후 창 닫기
 */
function setDontShowTodayAndClose() {
    console.log('[EVENT-POPUP] 오늘하루 보지 않기 버튼 클릭');
    
    // 오늘 날짜를 쿠키 값으로 설정 (내일 자정까지 유효)
    const today = getTodayString();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    document.cookie = `${COOKIE_NAME}=${today};expires=${tomorrow.toUTCString()};path=/`;
    console.log('[EVENT-POPUP] 오늘하루 보지 않기 설정 완료:', today);
    
    window.close();
}
