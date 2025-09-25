// 도모 템플릿 시스템

// 사이드바 템플릿
const SIDEBAR_TEMPLATES = {
    'default-sidebar': `
        <nav class="sidebar-nav">
            <h3 style="color: #fff; margin-bottom: 2rem; font-size: 1.5rem;">Menu</h3>
            <ul class="sidebar-menu">
                <li><a href="/" class="sidebar-link">Home</a></li>
                <li><a href="/about" class="sidebar-link">About</a></li>
                <li><a href="/services" class="sidebar-link">Services</a></li>
                <li><a href="/contact" class="sidebar-link">Contact</a></li>
            </ul>
        </nav>
        <style>
            .sidebar-nav {
                padding-top: 2rem;
            }
            .sidebar-menu {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            .sidebar-link {
                display: block;
                padding: 1rem 0;
                color: rgba(255, 255, 255, 0.8);
                text-decoration: none;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                transition: all 0.3s ease;
                font-size: 1.1rem;
            }
            .sidebar-link:hover {
                color: #ffffff;
                padding-left: 1rem;
                background: rgba(255, 255, 255, 0.05);
            }
        </style>
    `,
    
    'user-sidebar': `
        <div class="user-sidebar">
            <div class="user-profile">
                <div class="user-avatar"></div>
                <h4 style="color: #fff; margin: 1rem 0;">User Name</h4>
            </div>
            <nav class="sidebar-nav">
                <ul class="sidebar-menu">
                    <li><a href="/profile" class="sidebar-link">Profile</a></li>
                    <li><a href="/settings" class="sidebar-link">Settings</a></li>
                    <li><a href="/logout" class="sidebar-link">Logout</a></li>
                </ul>
            </nav>
        </div>
        <style>
            .user-sidebar {
                padding-top: 2rem;
            }
            .user-profile {
                text-align: center;
                margin-bottom: 2rem;
                padding-bottom: 2rem;
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            }
            .user-avatar {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                margin: 0 auto 1rem;
            }
            .sidebar-menu {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }
            .sidebar-link {
                display: block;
                padding: 1rem 0;
                color: rgba(255, 255, 255, 0.8);
                text-decoration: none;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                transition: all 0.3s ease;
                font-size: 1.1rem;
            }
            .sidebar-link:hover {
                color: #ffffff;
                padding-left: 1rem;
                background: rgba(255, 255, 255, 0.05);
            }
        </style>
    `
};

// 푸터 템플릿
const FOOTER_TEMPLATES = {
    'main-footer': `
        <footer class="footer">
            <div class="footer-slider">
                <span class="footer-text">domo</span>
                <span class="footer-text">domo</span>
                <span class="footer-text">domo</span>
                <span class="footer-text">domo</span>
                <span class="footer-text">domo</span>
                <span class="footer-text">domo</span>
                <span class="footer-text">domo</span>
                <span class="footer-text">domo</span>
                <span class="footer-text">domo</span>
                <span class="footer-text">domo</span>
            </div>
        </footer>
    `,
    
    'minimal-footer': `
        <footer class="footer">
            <div class="footer-content" style="padding: 2rem; text-align: center;">
                <p style="color: rgba(255, 255, 255, 0.6); font-size: 0.9rem;">
                    © 2025 domo. All rights reserved.
                </p>
            </div>
        </footer>
        <style>
            .footer-content {
                border-top: 1px solid rgba(255, 255, 255, 0.1);
            }
        </style>
    `
};

// HTML 안전 삽입
function safeInsertHTML(html, container) {
    if (!container) {
        console.error('컨테이너 없음');
        return false;
    }
    
    try {
        container.innerHTML = html;
        return true;
    } catch (error) {
        console.error('HTML 삽입 오류:', error);
        return false;
    }
}

// CSS 동적 추가
function injectCSS(css, id) {
    if (document.getElementById(id)) {
        return;
    }
    
    const style = document.createElement('style');
    style.id = id;
    style.textContent = css;
    document.head.appendChild(style);
}

// CSS 추출 및 적용
function extractAndInjectCSS(html, componentId) {
    const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi;
    let css = '';
    let matches;
    
    while ((matches = styleRegex.exec(html)) !== null) {
        css += matches[1];
    }
    
    if (css.trim()) {
        injectCSS(css, `${componentId}-style`);
    }
    
    return html.replace(styleRegex, '');
}

// 사이드바 로드
function loadSidebar(templateName = 'default-sidebar', customHTML = null) {
    const sidebarContent = document.getElementById('sidebar-content');
    
    if (!sidebarContent) {
        console.error('사이드바 컨테이너 없음');
        return false;
    }
    
    let html;
    
    if (customHTML) {
        html = customHTML;
    } else if (SIDEBAR_TEMPLATES[templateName]) {
        html = SIDEBAR_TEMPLATES[templateName];
    } else {
        console.error(`사이드바 템플릿 '${templateName}' 없음`);
        return false;
    }
    
    const cleanHTML = extractAndInjectCSS(html, `sidebar-${templateName}`);
    return safeInsertHTML(cleanHTML, sidebarContent);
}

// 푸터 로드
function loadFooter(templateName = 'main-footer', customHTML = null) {
    const footerContainer = document.getElementById('footer-container');
    
    if (!footerContainer) {
        console.error('푸터 컨테이너 없음');
        return false;
    }
    
    let html;
    
    if (customHTML) {
        html = customHTML;
    } else if (FOOTER_TEMPLATES[templateName]) {
        html = FOOTER_TEMPLATES[templateName];
    } else {
        console.error(`푸터 템플릿 '${templateName}' 없음`);
        return false;
    }
    
    const cleanHTML = extractAndInjectCSS(html, `footer-${templateName}`);
    return safeInsertHTML(cleanHTML, footerContainer);
}

// 외부 컴포넌트 로드
async function loadExternalComponent(url, containerId, componentId) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP 오류: ${response.status}`);
        }
        
        const html = await response.text();
        const container = document.getElementById(containerId);
        
        if (!container) {
            throw new Error(`컨테이너 '${containerId}' 없음`);
        }
        
        const cleanHTML = extractAndInjectCSS(html, componentId);
        return safeInsertHTML(cleanHTML, container);
        
    } catch (error) {
        console.error('외부 컴포넌트 로드 오류:', error);
        return false;
    }
}

// 모바일 감지
function isMobile() {
    return window.innerWidth <= 768;
}

// 터치 디바이스 감지
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// 리사이즈 처리
function handleResize() {
    const isMobileNow = isMobile();
    document.body.classList.toggle('mobile', isMobileNow);
    document.body.classList.toggle('desktop', !isMobileNow);
    
    if (isMobileNow) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    }
}

// 공통 이벤트 초기화
function initializeCommonEvents() {
    if (isTouchDevice()) {
        document.body.classList.add('touch-device');
    }
    
    handleResize();
    
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResize, 150);
    });
    
    // iOS 더블 탭 줌 방지
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // ESC 키 처리
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const sidebar = document.getElementById('sidebar');
            if (sidebar && sidebar.classList.contains('active')) {
                closeSidebar();
            }
        }
    });
}

// 사이드바 토글
window.toggleSidebar = function() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (!sidebar || !overlay) {
        console.error('사이드바 요소 없음');
        return;
    }
    
    const isActive = sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    
    document.body.style.overflow = isActive ? 'hidden' : '';
    
    if (isActive) {
        const firstFocusable = sidebar.querySelector('button, a, input, [tabindex]');
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }
};

// 사이드바 닫기
window.closeSidebar = function() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    if (sidebar && overlay) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
};

// 템플릿 추가
function addSidebarTemplate(name, html) {
    SIDEBAR_TEMPLATES[name] = html;
}

function addFooterTemplate(name, html) {
    FOOTER_TEMPLATES[name] = html;
}

// 템플릿 목록
function getAvailableTemplates(type) {
    if (type === 'sidebar') {
        return Object.keys(SIDEBAR_TEMPLATES);
    } else if (type === 'footer') {
        return Object.keys(FOOTER_TEMPLATES);
    } else {
        console.error('잘못된 템플릿 타입');
        return [];
    }
}

// 부드러운 스크롤
function smoothScrollTo(target, duration = 800) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    
    if (!element) {
        console.error('스크롤 대상 없음');
        return;
    }
    
    const targetPosition = element.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// 페이드 인
function fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let start = performance.now();
    
    function fade(timestamp) {
        let elapsed = timestamp - start;
        let progress = elapsed / duration;
        
        if (progress < 1) {
            element.style.opacity = progress;
            requestAnimationFrame(fade);
        } else {
            element.style.opacity = '1';
        }
    }
    
    requestAnimationFrame(fade);
}

// 페이드 아웃
function fadeOut(element, duration = 300) {
    let start = performance.now();
    
    function fade(timestamp) {
        let elapsed = timestamp - start;
        let progress = elapsed / duration;
        
        if (progress < 1) {
            element.style.opacity = 1 - progress;
            requestAnimationFrame(fade);
        } else {
            element.style.opacity = '0';
            element.style.display = 'none';
        }
    }
    
    requestAnimationFrame(fade);
}

// 오류 로깅
function logError(message, error = null) {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.error(`[DOMO] ${message}`, error);
    }
}

// 성능 측정
async function measurePerformance(name, fn) {
    const start = performance.now();
    try {
        const result = await fn();
        const end = performance.now();
        console.log(`[성능] ${name}: ${(end - start).toFixed(2)}ms`);
        return result;
    } catch (error) {
        const end = performance.now();
        console.error(`[성능] ${name} 실패 ${(end - start).toFixed(2)}ms:`, error);
        throw error;
    }
}

// 도모 초기화
function initializeDomo() {
    initializeCommonEvents();
    
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        const overlay = document.querySelector('.sidebar-overlay');
        if (overlay) {
            overlay.addEventListener('click', closeSidebar);
        }
    }
    
    console.log('[DOMO] 템플릿 시스템 초기화됨');
}

// DOM 준비 시 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDomo);
} else {
    initializeDomo();
}

// 전역 객체
window.domo = {
    loadSidebar,
    loadFooter,
    loadExternalComponent,
    addSidebarTemplate,
    addFooterTemplate,
    getAvailableTemplates,
    isMobile,
    isTouchDevice,
    smoothScrollTo,
    fadeIn,
    fadeOut,
    measurePerformance,
    toggleSidebar,
    closeSidebar
};