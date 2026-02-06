document.addEventListener('DOMContentLoaded', () => {
    // --- API Configuration ---
    const QURAN_API = "https://api.alquran.cloud/v1";
    const RECITERS = {
        'Alafasy_128kbps': 'مشاري العفاسي',
        'Abdurrahmaan_As-Sudais_192kbps': 'عبدالرحمن السديس',
        'Husary_128kbps': 'محمود خليل الحصري',
        'Ali_Jaber_64kbps': 'علي جابر',
        'Saood_ash-Shuraym_128kbps': 'سعود الشريم'
    };
    let currentReciter = 'Alafasy_128kbps';
    const TOTAL_PAGES = 604;

    // --- Surah/Juz/Hizb Data (Static for fast access) ---
    const SURAH_DATA = [
        { num: 1, name: "الفاتحة", page: 1 }, { num: 2, name: "البقرة", page: 2 }, { num: 3, name: "آل عمران", page: 50 },
        { num: 4, name: "النساء", page: 77 }, { num: 5, name: "المائدة", page: 106 }, { num: 6, name: "الأنعام", page: 128 },
        { num: 7, name: "الأعراف", page: 151 }, { num: 8, name: "الأنفال", page: 177 }, { num: 9, name: "التوبة", page: 187 },
        { num: 10, name: "يونس", page: 208 }, { num: 11, name: "هود", page: 221 }, { num: 12, name: "يوسف", page: 235 },
        { num: 13, name: "الرعد", page: 249 }, { num: 14, name: "إبراهيم", page: 255 }, { num: 15, name: "الحجر", page: 262 },
        { num: 16, name: "النحل", page: 267 }, { num: 17, name: "الإسراء", page: 282 }, { num: 18, name: "الكهف", page: 293 },
        { num: 19, name: "مريم", page: 305 }, { num: 20, name: "طه", page: 312 }, { num: 21, name: "الأنبياء", page: 322 },
        { num: 22, name: "الحج", page: 332 }, { num: 23, name: "المؤمنون", page: 342 }, { num: 24, name: "النور", page: 350 },
        { num: 25, name: "الفرقان", page: 359 }, { num: 26, name: "الشعراء", page: 367 }, { num: 27, name: "النمل", page: 377 },
        { num: 28, name: "القصص", page: 385 }, { num: 29, name: "العنكبوت", page: 396 }, { num: 30, name: "الروم", page: 404 },
        { num: 31, name: "لقمان", page: 411 }, { num: 32, name: "السجدة", page: 415 }, { num: 33, name: "الأحزاب", page: 418 },
        { num: 34, name: "سبأ", page: 428 }, { num: 35, name: "فاطر", page: 434 }, { num: 36, name: "يس", page: 440 },
        { num: 37, name: "الصافات", page: 446 }, { num: 38, name: "ص", page: 453 }, { num: 39, name: "الزمر", page: 458 },
        { num: 40, name: "غافر", page: 467 }, { num: 41, name: "فصلت", page: 477 }, { num: 42, name: "الشورى", page: 483 },
        { num: 43, name: "الزخرف", page: 489 }, { num: 44, name: "الدخان", page: 496 }, { num: 45, name: "الجاثية", page: 499 },
        { num: 46, name: "الأحقاف", page: 502 }, { num: 47, name: "محمد", page: 507 }, { num: 48, name: "الفتح", page: 511 },
        { num: 49, name: "الحجرات", page: 515 }, { num: 50, name: "ق", page: 518 }, { num: 51, name: "الذاريات", page: 520 },
        { num: 52, name: "الطور", page: 523 }, { num: 53, name: "النجم", page: 526 }, { num: 54, name: "القمر", page: 528 },
        { num: 55, name: "الرحمن", page: 531 }, { num: 56, name: "الواقعة", page: 534 }, { num: 57, name: "الحديد", page: 537 },
        { num: 58, name: "المجادلة", page: 542 }, { num: 59, name: "الحشر", page: 545 }, { num: 60, name: "الممتحنة", page: 549 },
        { num: 61, name: "الصف", page: 551 }, { num: 62, name: "الجمعة", page: 553 }, { num: 63, name: "المنافقون", page: 554 },
        { num: 64, name: "التغابن", page: 556 }, { num: 65, name: "الطلاق", page: 558 }, { num: 66, name: "التحريم", page: 560 },
        { num: 67, name: "الملك", page: 562 }, { num: 68, name: "القلم", page: 564 }, { num: 69, name: "الحاقة", page: 566 },
        { num: 70, name: "المعارج", page: 568 }, { num: 71, name: "نوح", page: 570 }, { num: 72, name: "الجن", page: 572 },
        { num: 73, name: "المزمل", page: 574 }, { num: 74, name: "المدثر", page: 575 }, { num: 75, name: "القيامة", page: 577 },
        { num: 76, name: "الإنسان", page: 578 }, { num: 77, name: "المرسلات", page: 580 }, { num: 78, name: "النبأ", page: 582 },
        { num: 79, name: "النازعات", page: 583 }, { num: 80, name: "عبس", page: 585 }, { num: 81, name: "التكوير", page: 586 },
        { num: 82, name: "الانفطار", page: 587 }, { num: 83, name: "المطففين", page: 587 }, { num: 84, name: "الانشقاق", page: 589 },
        { num: 85, name: "البروج", page: 590 }, { num: 86, name: "الطارق", page: 591 }, { num: 87, name: "الأعلى", page: 591 },
        { num: 88, name: "الغاشية", page: 592 }, { num: 89, name: "الفجر", page: 593 }, { num: 90, name: "البلد", page: 594 },
        { num: 91, name: "الشمس", page: 595 }, { num: 92, name: "الليل", page: 595 }, { num: 93, name: "الضحى", page: 596 },
        { num: 94, name: "الشرح", page: 596 }, { num: 95, name: "التين", page: 597 }, { num: 96, name: "العلق", page: 597 },
        { num: 97, name: "القدر", page: 598 }, { num: 98, name: "البينة", page: 598 }, { num: 99, name: "الزلزلة", page: 599 },
        { num: 100, name: "العاديات", page: 599 }, { num: 101, name: "القارعة", page: 600 }, { num: 102, name: "التكاثر", page: 600 },
        { num: 103, name: "العصر", page: 601 }, { num: 104, name: "الهمزة", page: 601 }, { num: 105, name: "الفيل", page: 601 },
        { num: 106, name: "قريش", page: 602 }, { num: 107, name: "الماعون", page: 602 }, { num: 108, name: "الكوثر", page: 602 },
        { num: 109, name: "الكافرون", page: 603 }, { num: 110, name: "النصر", page: 603 }, { num: 111, name: "المسد", page: 603 },
        { num: 112, name: "الإخلاص", page: 604 }, { num: 113, name: "الفلق", page: 604 }, { num: 114, name: "الناس", page: 604 }
    ];

    const JUZ_DATA = [
        { num: 1, page: 1 }, { num: 2, page: 22 }, { num: 3, page: 42 }, { num: 4, page: 62 }, { num: 5, page: 82 },
        { num: 6, page: 102 }, { num: 7, page: 121 }, { num: 8, page: 142 }, { num: 9, page: 162 }, { num: 10, page: 182 },
        { num: 11, page: 201 }, { num: 12, page: 222 }, { num: 13, page: 242 }, { num: 14, page: 262 }, { num: 15, page: 282 },
        { num: 16, page: 302 }, { num: 17, page: 322 }, { num: 18, page: 342 }, { num: 19, page: 362 }, { num: 20, page: 382 },
        { num: 21, page: 402 }, { num: 22, page: 422 }, { num: 23, page: 442 }, { num: 24, page: 462 }, { num: 25, page: 482 },
        { num: 26, page: 502 }, { num: 27, page: 522 }, { num: 28, page: 542 }, { num: 29, page: 562 }, { num: 30, page: 582 }
    ];

    const HIZB_DATA = [];
    for (let i = 1; i <= 60; i++) {
        // Approximate: each hizb is ~10 pages (604/60 ≈ 10.07)
        HIZB_DATA.push({ num: i, page: Math.min(1 + Math.floor((i - 1) * 10.07), 604) });
    }

    // --- State ---
    let currentPage = 1;
    let currentPageData = null;
    let activeVerseId = null;
    let activeVerseInfo = null;
    let isPlaying = false;
    let currentAudio = null;
    let isDarkMode = false;

    // --- UI Elements ---
    const appContainer = document.querySelector('.app-container');
    const pageContainer = document.getElementById('page-container');
    const versesContainer = document.getElementById('verses-content');
    const loader = document.getElementById('loader');
    const surahNameEl = document.getElementById('surah-name');
    const juzInfoEl = document.getElementById('juz-info');
    const pageNumberEl = document.getElementById('page-number');
    const quranContent = document.querySelector('.quran-page-content');

    // Modals
    const tafsirModal = document.getElementById('tafsir-panel');
    const settingsModal = document.getElementById('settings-panel');
    const navPanel = document.getElementById('nav-panel');
    const searchPanel = document.getElementById('search-panel');
    const tafsirContent = document.getElementById('tafsir-content');
    const tafsirRef = document.getElementById('tafsir-ref');

    // Verse Menu
    const verseMenu = document.getElementById('verse-menu');
    const copyVerseBtn = document.getElementById('copy-verse-btn');
    const shareVerseBtn = document.getElementById('share-verse-btn');

    // Buttons
    const playBtn = document.getElementById('play-btn');
    const tafsirBtn = document.getElementById('tafsir-btn');
    const bookmarkBtn = document.getElementById('bookmark-btn');
    const settingsBtn = document.getElementById('quran-settings-btn');
    const navMenuBtn = document.getElementById('nav-menu-btn');
    const darkModeBtn = document.getElementById('dark-mode-btn');
    const searchBtn = document.getElementById('search-btn');
    const reciterBtn = document.getElementById('reciter-btn');
    const reciterMenu = document.getElementById('reciter-menu');
    const reciterItems = document.querySelectorAll('.reciter-item');
    const prevBtn = document.getElementById('prev-page');
    const nextBtn = document.getElementById('next-page');
    const fontSlider = document.getElementById('font-size-slider');
    const pageJumpInput = document.getElementById('page-jump-input');
    const pageJumpBtn = document.getElementById('page-jump-btn');

    // Search Elements
    const searchInput = document.getElementById('search-input');
    const searchSubmitBtn = document.getElementById('search-submit-btn');
    const searchResults = document.getElementById('search-results');

    // Nav Panel Elements
    const navTabs = document.querySelectorAll('.nav-tab');
    const surahListEl = document.getElementById('surah-list');
    const juzListEl = document.getElementById('juz-list');
    const hizbListEl = document.getElementById('hizb-list');

    // --- Initialization ---
    init();

    async function init() {
        const savedPage = localStorage.getItem('quran_page');
        const savedFontSize = localStorage.getItem('quran_font_size');
        const savedDarkMode = localStorage.getItem('quran_dark_mode');

        if (savedFontSize) {
            quranContent.style.fontSize = `${savedFontSize}px`;
            fontSlider.value = savedFontSize;
        }

        // Initialize dark mode
        if (savedDarkMode === 'true') {
            isDarkMode = true;
            document.body.classList.add('dark-mode');
            darkModeBtn.textContent = '☀️';
        }

        // Initialize reciter
        const savedReciter = localStorage.getItem('quran_reciter');
        if (savedReciter && RECITERS[savedReciter]) {
            currentReciter = savedReciter;
            updateReciterUI();
        }

        currentPage = savedPage ? parseInt(savedPage) : 1;
        pageJumpInput.value = currentPage;

        // Populate navigation lists
        populateNavLists();

        await loadPage(currentPage);
    }

    function populateNavLists() {
        // Surahs
        SURAH_DATA.forEach(s => {
            const item = document.createElement('div');
            item.className = 'nav-item';
            item.innerHTML = `<span class="nav-item-title">${s.name}</span><span class="nav-item-sub">ص ${s.page}</span>`;
            item.addEventListener('click', () => {
                loadPage(s.page);
                toggleNavPanel(false);
            });
            surahListEl.appendChild(item);
        });

        // Juz
        JUZ_DATA.forEach(j => {
            const item = document.createElement('div');
            item.className = 'nav-item';
            item.innerHTML = `<span class="nav-item-title">الجزء ${j.num}</span><span class="nav-item-sub">ص ${j.page}</span>`;
            item.addEventListener('click', () => {
                loadPage(j.page);
                toggleNavPanel(false);
            });
            juzListEl.appendChild(item);
        });

        // Hizb
        HIZB_DATA.forEach(h => {
            const item = document.createElement('div');
            item.className = 'nav-item';
            item.innerHTML = `<span class="nav-item-title">الحزب ${h.num}</span><span class="nav-item-sub">ص ${h.page}</span>`;
            item.addEventListener('click', () => {
                loadPage(h.page);
                toggleNavPanel(false);
            });
            hizbListEl.appendChild(item);
        });
    }

    // --- API Functions ---
    async function loadPage(pageNum) {
        if (pageNum < 1 || pageNum > TOTAL_PAGES) return;

        showLoading(true);
        stopAudio();

        try {
            const response = await fetch(`${QURAN_API}/page/${pageNum}/quran-uthmani`);
            const data = await response.json();

            if (data.code === 200) {
                currentPage = pageNum;
                currentPageData = data.data;
                renderPage(data.data);
                localStorage.setItem('quran_page', pageNum);
                pageJumpInput.value = pageNum;
            } else {
                showNotification("خطأ في تحميل الصفحة");
            }
        } catch (error) {
            console.error("API Error:", error);
            showNotification("تعذر الاتصال بالخادم");
        }

        showLoading(false);
    }

    function renderPage(data) {
        versesContainer.innerHTML = '';
        activeVerseId = null;
        activeVerseInfo = null;
        hideVerseMenu();

        const ayahs = data.ayahs;
        if (!ayahs || ayahs.length === 0) return;

        const firstAyah = ayahs[0];
        surahNameEl.textContent = firstAyah.surah.name;
        juzInfoEl.textContent = `الجزء ${firstAyah.juz}`;
        pageNumberEl.textContent = convertToArabicNumerals(currentPage);

        let currentSurahNum = null;

        ayahs.forEach((ayah, index) => {
            if (ayah.surah.number !== currentSurahNum) {
                currentSurahNum = ayah.surah.number;
                if (ayah.numberInSurah === 1 && ayah.surah.number !== 1 && ayah.surah.number !== 9) {
                    const basmala = document.createElement('div');
                    basmala.className = 'basmala';
                    basmala.textContent = 'بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ';
                    versesContainer.appendChild(basmala);
                }
            }

            const verseSpan = document.createElement('span');
            verseSpan.className = 'verse';
            verseSpan.dataset.index = index;
            verseSpan.dataset.surah = ayah.surah.number;
            verseSpan.dataset.ayah = ayah.numberInSurah;
            verseSpan.tabIndex = 0;
            verseSpan.textContent = ` ${ayah.text} `;
            verseSpan.addEventListener('click', (e) => {
                e.stopPropagation();
                selectVerse(verseSpan, ayah, e);
            });
            versesContainer.appendChild(verseSpan);

            const endSpan = document.createElement('span');
            endSpan.className = 'ayah-end';
            endSpan.textContent = `﴿${convertToArabicNumerals(ayah.numberInSurah)}﴾`;
            versesContainer.appendChild(endSpan);
        });
    }

    function selectVerse(element, ayahData, event) {
        document.querySelectorAll('.verse').forEach(v => v.classList.remove('active'));
        element.classList.add('active');
        activeVerseId = element.dataset.index;
        activeVerseInfo = {
            surah: parseInt(element.dataset.surah),
            ayah: parseInt(element.dataset.ayah),
            data: ayahData
        };

        // Show verse menu near the clicked verse
        showVerseMenu(event);

        if (isPlaying) playVerseAudio(activeVerseInfo.surah, activeVerseInfo.ayah);
    }

    // --- Verse Menu (Copy/Share) ---
    function showVerseMenu(event) {
        if (!activeVerseInfo) return;

        const rect = appContainer.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top - 60;

        // Ensure menu stays within bounds
        if (x < 100) x = 100;
        if (x > rect.width - 100) x = rect.width - 100;
        if (y < 10) y = event.clientY - rect.top + 20;

        verseMenu.style.left = `${x}px`;
        verseMenu.style.top = `${y}px`;
        verseMenu.classList.remove('hidden');
    }

    function hideVerseMenu() {
        verseMenu.classList.add('hidden');
    }

    function copyVerse() {
        if (!activeVerseInfo) return;

        const text = `${activeVerseInfo.data.text}\n\n﴿${activeVerseInfo.data.surah.name} - آية ${activeVerseInfo.ayah}﴾`;

        navigator.clipboard.writeText(text).then(() => {
            showNotification('تم نسخ الآية');
            hideVerseMenu();
        }).catch(() => {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            showNotification('تم نسخ الآية');
            hideVerseMenu();
        });
    }

    async function shareVerse() {
        if (!activeVerseInfo) return;

        const text = `${activeVerseInfo.data.text}\n\n﴿${activeVerseInfo.data.surah.name} - آية ${activeVerseInfo.ayah}﴾`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'القرآن الكريم',
                    text: text
                });
                hideVerseMenu();
            } catch (err) {
                if (err.name !== 'AbortError') {
                    // Fallback to copy
                    copyVerse();
                }
            }
        } else {
            // Fallback to copy if share not supported
            copyVerse();
            showNotification('تم نسخ الآية (المشاركة غير مدعومة)');
        }
    }

    // --- Dark Mode ---
    function toggleDarkMode() {
        isDarkMode = !isDarkMode;
        document.body.classList.toggle('dark-mode', isDarkMode);
        darkModeBtn.textContent = isDarkMode ? '☀️' : '🌙';
        localStorage.setItem('quran_dark_mode', isDarkMode);
        showNotification(isDarkMode ? 'تم تفعيل الوضع الليلي' : 'تم تفعيل الوضع النهاري');
    }

    // --- Reciter Selection ---
    function getReciterUrl() {
        return `https://everyayah.com/data/${currentReciter}/`;
    }

    function toggleReciterMenu() {
        reciterMenu.classList.toggle('hidden');
    }

    function hideReciterMenu() {
        reciterMenu.classList.add('hidden');
    }

    function selectReciter(reciterId) {
        currentReciter = reciterId;
        localStorage.setItem('quran_reciter', reciterId);
        updateReciterUI();
        hideReciterMenu();
        showNotification(`تم اختيار: ${RECITERS[reciterId]}`);

        // If audio is playing, restart with new reciter
        if (isPlaying && activeVerseInfo) {
            playVerseAudio(activeVerseInfo.surah, activeVerseInfo.ayah);
        }
    }

    function updateReciterUI() {
        reciterItems.forEach(item => {
            if (item.dataset.reciter === currentReciter) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // --- Search ---
    async function performSearch() {
        const query = searchInput.value.trim();
        if (!query || query.length < 2) {
            showNotification('أدخل كلمة أو أكثر للبحث');
            return;
        }

        searchResults.innerHTML = '<div class="search-loading"><div class="spinner"></div><p>جاري البحث...</p></div>';

        try {
            const response = await fetch(`${QURAN_API}/search/${encodeURIComponent(query)}/all/ar.uthmani`);
            const data = await response.json();

            if (data.code === 200 && data.data.matches && data.data.matches.length > 0) {
                displaySearchResults(data.data.matches, query);
            } else {
                searchResults.innerHTML = '<div class="search-no-results"><p>لم يتم العثور على نتائج</p></div>';
            }
        } catch (error) {
            console.error("Search Error:", error);
            searchResults.innerHTML = '<div class="search-no-results"><p>خطأ في البحث</p></div>';
        }
    }

    function displaySearchResults(matches, query) {
        searchResults.innerHTML = '';

        const header = document.createElement('p');
        header.style.marginBottom = '15px';
        header.style.color = 'var(--text-secondary)';
        header.innerHTML = `عدد النتائج: <strong>${matches.length}</strong>`;
        searchResults.appendChild(header);

        matches.slice(0, 50).forEach(match => {
            const item = document.createElement('div');
            item.className = 'search-result-item';

            // Highlight the search term
            const highlightedText = match.text.replace(
                new RegExp(`(${escapeRegExp(query)})`, 'gi'),
                '<mark>$1</mark>'
            );

            item.innerHTML = `
                <div class="search-result-header">
                    <span>${match.surah.name}</span>
                    <span>آية ${match.numberInSurah}</span>
                </div>
                <div class="search-result-text">${highlightedText}</div>
            `;

            item.addEventListener('click', () => {
                // Find the page for this verse
                const surahNum = match.surah.number;
                const surahData = SURAH_DATA.find(s => s.num === surahNum);
                if (surahData) {
                    loadPage(surahData.page);
                    toggleSearchPanel(false);
                }
            });

            searchResults.appendChild(item);
        });
    }

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // --- Page Navigation ---
    function goToNextPage() {
        if (currentPage < TOTAL_PAGES) loadPage(currentPage + 1);
        else showNotification("آخر صفحة في المصحف");
    }

    function goToPrevPage() {
        if (currentPage > 1) loadPage(currentPage - 1);
        else showNotification("أول صفحة في المصحف");
    }

    function jumpToPage() {
        const pageNum = parseInt(pageJumpInput.value);
        if (pageNum >= 1 && pageNum <= TOTAL_PAGES) {
            loadPage(pageNum);
            toggleSettings(false);
        } else {
            showNotification("رقم صفحة غير صحيح (1-604)");
        }
    }

    // --- Audio Logic ---
    function togglePlay() {
        if (isPlaying) pauseAudio();
        else playAudio();
    }

    function playAudio() {
        if (!activeVerseInfo) {
            const firstVerse = versesContainer.querySelector('.verse');
            if (firstVerse) firstVerse.click();
            setTimeout(() => {
                if (activeVerseInfo) playVerseAudio(activeVerseInfo.surah, activeVerseInfo.ayah);
            }, 100);
            return;
        }
        playVerseAudio(activeVerseInfo.surah, activeVerseInfo.ayah);
    }

    function pauseAudio() {
        if (currentAudio) currentAudio.pause();
        isPlaying = false;
        playBtn.innerText = "▶";
    }

    function stopAudio() {
        if (currentAudio) { currentAudio.pause(); currentAudio = null; }
        isPlaying = false;
        playBtn.innerText = "▶";
    }

    function playVerseAudio(surahNum, ayahNum) {
        if (currentAudio) { currentAudio.pause(); currentAudio = null; }

        const surah = surahNum.toString().padStart(3, '0');
        const ayah = ayahNum.toString().padStart(3, '0');
        const url = `${getReciterUrl()}${surah}${ayah}.mp3`;

        currentAudio = new Audio(url);
        currentAudio.onended = onVerseEnd;
        currentAudio.onerror = () => { showNotification("خطأ في الصوت"); stopAudio(); };

        currentAudio.play().then(() => { isPlaying = true; playBtn.innerText = "⏸"; })
            .catch(err => { console.error("Play failed:", err); stopAudio(); });
    }

    function onVerseEnd() {
        // Don't continue if playback was stopped
        if (!isPlaying) return;

        const verses = Array.from(versesContainer.querySelectorAll('.verse'));
        const currentIndex = parseInt(activeVerseId);

        if (currentIndex < verses.length - 1) {
            // Move to next verse on current page
            const nextVerse = verses[currentIndex + 1];
            selectVerseForPlayback(nextVerse, currentIndex + 1);
        } else if (currentPage < TOTAL_PAGES) {
            // Move to next page
            loadPage(currentPage + 1).then(() => {
                setTimeout(() => {
                    const firstVerse = versesContainer.querySelector('.verse');
                    if (firstVerse && isPlaying) {
                        selectVerseForPlayback(firstVerse, 0);
                    }
                }, 300);
            });
        } else {
            showNotification("ختم المصحف الشريف");
            stopAudio();
        }
    }

    // Helper function to select verse and continue playback
    function selectVerseForPlayback(verseElement, index) {
        // Remove active class from all verses
        document.querySelectorAll('.verse').forEach(v => v.classList.remove('active'));

        // Add active class to new verse
        verseElement.classList.add('active');

        // Update state
        activeVerseId = index.toString();
        activeVerseInfo = {
            surah: parseInt(verseElement.dataset.surah),
            ayah: parseInt(verseElement.dataset.ayah),
            data: currentPageData.ayahs[index]
        };

        // Hide verse menu
        hideVerseMenu();

        // Play the verse audio
        if (isPlaying) {
            playVerseAudio(activeVerseInfo.surah, activeVerseInfo.ayah);
        }
    }

    // --- Tafsir ---
    async function showTafsir() {
        if (!activeVerseInfo) { showNotification('اختر آية أولاً'); return; }

        tafsirRef.innerHTML = `<strong>${activeVerseInfo.data.surah.name} - آية ${activeVerseInfo.ayah}</strong>`;
        tafsirContent.textContent = "جاري التحميل...";
        toggleTafsir(true);

        try {
            const response = await fetch(`${QURAN_API}/ayah/${activeVerseInfo.data.number}/ar.muyassar`);
            const data = await response.json();
            tafsirContent.textContent = data.code === 200 ? data.data.text : "لا يوجد تفسير متاح.";
        } catch (error) {
            tafsirContent.textContent = "خطأ في جلب التفسير.";
        }
    }

    window.toggleTafsir = (show) => { tafsirModal.classList.toggle('hidden', !show); };
    window.toggleSettings = (show) => { settingsModal.classList.toggle('hidden', !show); };
    window.toggleNavPanel = (show) => { navPanel.classList.toggle('hidden', !show); };
    window.toggleSearchPanel = (show) => {
        searchPanel.classList.toggle('hidden', !show);
        if (show) {
            setTimeout(() => searchInput.focus(), 300);
        }
    };

    // --- Tab Switching ---
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            navTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            surahListEl.classList.add('hidden');
            juzListEl.classList.add('hidden');
            hizbListEl.classList.add('hidden');

            const target = tab.dataset.tab;
            if (target === 'surah') surahListEl.classList.remove('hidden');
            else if (target === 'juz') juzListEl.classList.remove('hidden');
            else if (target === 'hizb') hizbListEl.classList.remove('hidden');
        });
    });

    // --- Bookmark ---
    function saveBookmark() {
        if (activeVerseInfo) {
            const bookmark = { page: currentPage, surah: activeVerseInfo.surah, ayah: activeVerseInfo.ayah };
            localStorage.setItem('quran_bookmark', JSON.stringify(bookmark));
            showNotification(`تم الحفظ: ${activeVerseInfo.data.surah.name} - آية ${activeVerseInfo.ayah}`);
        } else {
            localStorage.setItem('quran_page', currentPage);
            showNotification(`تم حفظ الصفحة ${currentPage}`);
        }
    }

    // --- Utilities ---
    function showLoading(show) {
        loader.classList.toggle('active', show);
        versesContainer.style.opacity = show ? '0.3' : '1';
    }

    function showNotification(msg) {
        const existing = document.querySelector('.quran-toast');
        if (existing) existing.remove();
        const toast = document.createElement('div');
        toast.className = 'quran-toast';
        toast.innerText = msg;
        toast.style.cssText = `position:fixed; bottom:80px; left:50%; transform:translateX(-50%); background:var(--toast-bg); color:var(--toast-color); padding:10px 24px; border-radius:30px; z-index:1000; font-size:0.95rem; box-shadow:0 4px 10px rgba(0,0,0,0.3); font-family:'Amiri',serif;`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    function convertToArabicNumerals(num) {
        const arabicNums = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
        return num.toString().split('').map(d => arabicNums[parseInt(d)] || d).join('');
    }

    // --- UI Toggle (Reader Mode) ---
    pageContainer.addEventListener('click', (e) => {
        if (e.target.closest('.verse') || e.target.closest('button')) return;
        appContainer.classList.toggle('ui-hidden');
        hideVerseMenu();
    });

    // Hide verse menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.verse') && !e.target.closest('.verse-menu')) {
            hideVerseMenu();
        }
    });

    // --- Event Listeners ---
    playBtn.addEventListener('click', (e) => { e.stopPropagation(); togglePlay(); });
    tafsirBtn.addEventListener('click', (e) => { e.stopPropagation(); showTafsir(); });
    bookmarkBtn.addEventListener('click', (e) => { e.stopPropagation(); saveBookmark(); });
    if (settingsBtn) settingsBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleSettings(true); });
    navMenuBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleNavPanel(true); });
    darkModeBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleDarkMode(); });
    searchBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleSearchPanel(true); });
    reciterBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleReciterMenu(); });

    // Reciter menu items
    reciterItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            selectReciter(item.dataset.reciter);
        });
    });

    // Hide reciter menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.reciter-menu') && !e.target.closest('#reciter-btn')) {
            hideReciterMenu();
        }
    });

    // Verse menu buttons
    copyVerseBtn.addEventListener('click', (e) => { e.stopPropagation(); copyVerse(); });
    shareVerseBtn.addEventListener('click', (e) => { e.stopPropagation(); shareVerse(); });

    // Search
    searchSubmitBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') performSearch(); });

    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); goToPrevPage(); });
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); goToNextPage(); });

    pageJumpBtn.addEventListener('click', jumpToPage);
    pageJumpInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') jumpToPage(); });

    fontSlider.addEventListener('input', (e) => {
        const size = e.target.value;
        quranContent.style.fontSize = `${size}px`;
        localStorage.setItem('quran_font_size', size);
    });

    // --- Touch Swipe Navigation ---
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    const minSwipeDistance = 50; // Minimum swipe distance in pixels

    pageContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });

    pageContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        // Only trigger swipe if horizontal movement is greater than vertical
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                // Swiped right - go to previous page (RTL: next in reading order)
                goToNextPage();
            } else {
                // Swiped left - go to next page (RTL: previous in reading order)
                goToPrevPage();
            }
        }
    }
});
