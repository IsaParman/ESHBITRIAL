document.addEventListener('DOMContentLoaded', () => {

    // =================================================================
    // KODE UNTUK SLIDER GAMBAR (DENGAN SLIDE OTOMATIS)
    // =================================================================
    const slidesWrapper = document.querySelector('.slides-wrapper');
    const dots = document.querySelectorAll('.dot');

    if (slidesWrapper && dots.length > 0) {
        let currentSlide = 0;
        let slideInterval; // Variabel untuk menyimpan interval

        // Fungsi untuk pindah ke slide tertentu
        function goToSlide(slideIndex) {
            // Menggeser wrapper ke posisi slide yang benar
            slidesWrapper.style.transform = `translateX(-${slideIndex * 100}vw)`;
            // Mengupdate dot yang aktif
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === slideIndex);
            });
            currentSlide = slideIndex;
        }

        // Fungsi untuk memulai slider otomatis
        function startSlider() {
            slideInterval = setInterval(() => {
                // Pindah ke slide berikutnya, kembali ke awal jika sudah di akhir
                currentSlide = (currentSlide + 1) % dots.length;
                goToSlide(currentSlide);
            }, 5000); // Interval 5000 ms = 5 detik
        }

        // Fungsi untuk mereset dan memulai ulang slider
        function resetSlider() {
            clearInterval(slideInterval); // Hentikan interval yang sedang berjalan
            startSlider(); // Mulai interval baru
        }

        // Event listener untuk setiap dot navigasi
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const slideIndex = parseInt(dot.getAttribute('data-slide'));
                goToSlide(slideIndex);
                resetSlider(); // Reset timer saat pengguna mengklik dot
            });
        });

        // Inisialisasi slider
        goToSlide(0);
        startSlider(); // Mulai slider otomatis saat halaman dimuat
    }


    // =================================================================
    // KODE UNTUK HAMBURGER MENU (TETAP SAMA)
    // =================================================================
    const hamburger = document.querySelector('.hamburger');
    const navGroup = document.querySelector('.nav-group-right');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if (hamburger && navGroup) {
        hamburger.addEventListener('click', () => {
            navGroup.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navGroup.classList.contains('active')) {
                    navGroup.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        });
    }


    // =================================================================
    // KODE UNTUK TOMBOL KEMBALI KE ATAS (TETAP SAMA)
    // =================================================================
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        const handleScroll = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                scrollTopBtn.style.display = "block";
            } else {
                scrollTopBtn.style.display = "none";
            }
        };
        
        const smoothScrollToTop = () => {
            const startPosition = window.pageYOffset;
            const distance = -startPosition;
            const duration = 500;
            let startTime = null;

            const animation = (currentTime) => {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                
                window.scrollTo(0, startPosition + distance * ease(progress));

                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            };

            requestAnimationFrame(animation);
        };

        window.addEventListener('scroll', handleScroll);
        scrollTopBtn.addEventListener('click', smoothScrollToTop);
    }
});