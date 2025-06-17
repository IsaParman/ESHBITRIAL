/**
 * Menjalankan semua skrip utama setelah konten halaman (DOM) selesai dimuat.
 * Cukup satu event listener 'DOMContentLoaded' untuk seluruh skrip.
 */
document.addEventListener("DOMContentLoaded", function () {
  // =================================================================
  // BAGIAN 1: PEMUATAN KOMPONEN HEADER & FOOTER
  // =================================================================

  /**
   * Memuat konten HTML dari file lain ke dalam elemen tertentu.
   * @param {string} url - Path ke file HTML komponen.
   * @param {string} elementId - ID dari elemen placeholder.
   * @returns {Promise} - Promise yang selesai setelah konten dimuat.
   */
  const loadHTML = (url, elementId) => {
    return fetch(url)
      .then((response) => {
        if (!response.ok)
          throw new Error(`Gagal memuat ${url}: ${response.statusText}`);
        return response.text();
      })
      .then((data) => {
        const element = document.getElementById(elementId);
        if (element) element.innerHTML = data;
        else console.error(`Elemen dengan ID '${elementId}' tidak ditemukan.`);
      })
      .catch((error) => console.error("Error saat memuat HTML:", error));
  };

  /**
   * Mengatur menu hamburger, termasuk event listener-nya.
   * Fungsi ini harus dipanggil SETELAH header dimuat.
   */
  const setupHamburger = () => {
    const hamburger = document.querySelector(".hamburger");
    const navGroup = document.querySelector(".nav-group-right");
    if (!hamburger || !navGroup) return;

    hamburger.addEventListener("click", () => {
      navGroup.classList.toggle("active");
      hamburger.classList.toggle("active");
    });

    // Menutup menu saat link di-klik (penting untuk mobile).
    const navLinks = navGroup.querySelectorAll(".nav-menu a");
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navGroup.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
  };

  /**
   * Menandai link navigasi yang aktif berdasarkan halaman saat ini.
   * Fungsi ini harus dipanggil SETELAH header dimuat.
   */
  const setActiveLink = () => {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-menu a");
    navLinks.forEach((link) => {
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
      }
    });
  };

  // Eksekusi pemuatan komponen
  // Pertama muat header, SETELAH itu jalankan fungsi yang bergantung padanya.
  loadHTML("/partials/header.html", "header-container").then(() => {
    setupHamburger();
    setActiveLink();
  });
  // Muat footer secara paralel.
  loadHTML("/partials/footer.html", "footer-container");

  // =================================================================
  // BAGIAN 2: SLIDER GAMBAR
  // =================================================================

  const initSlider = () => {
    const slidesWrapper = document.querySelector(".slides-wrapper");
    const dots = document.querySelectorAll(".dot");
    if (!slidesWrapper || dots.length === 0) return; // Keluar jika elemen slider tidak ada

    let currentSlide = 0;
    let slideInterval;

    const goToSlide = (slideIndex) => {
      slidesWrapper.style.transform = `translateX(-${slideIndex * 100}vw)`;
      dots.forEach((dot, index) =>
        dot.classList.toggle("active", index === slideIndex)
      );
      currentSlide = slideIndex;
    };

    const startSlider = () => {
      slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % dots.length;
        goToSlide(currentSlide);
      }, 5000);
    };

    const resetSlider = () => {
      clearInterval(slideInterval);
      startSlider();
    };

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        goToSlide(index);
        resetSlider();
      });
    });

    // Inisialisasi slider
    goToSlide(0);
    startSlider();
  };

  // Panggil fungsi inisialisasi slider
  initSlider();

  // =================================================================
  // BAGIAN 3: TOMBOL SCROLL KE ATAS
  // =================================================================

  const initScrollTopButton = () => {
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (!scrollTopBtn) return; // Keluar jika tombol tidak ada

    const handleScroll = () => {
      const isScrolled =
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100;
      scrollTopBtn.style.display = isScrolled ? "block" : "none";
    };

    const smoothScrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };

    window.addEventListener("scroll", handleScroll);
    scrollTopBtn.addEventListener("click", smoothScrollToTop);
  };

  // Panggil fungsi inisialisasi tombol scroll
  initScrollTopButton();
});
