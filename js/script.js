document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  var overlay = document.createElement("div");
  overlay.className = "nav-overlay";
  document.body.appendChild(overlay);

  var progressBar = document.querySelector(".scroll-progress");
  if (!progressBar) {
    progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    progressBar.setAttribute("aria-hidden", "true");
    document.body.prepend(progressBar);
  }

  function closeNav() {
    if (nav) nav.classList.remove("open");
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  function openNav() {
    if (nav) nav.classList.add("open");
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      if (nav.classList.contains("open")) closeNav();
      else openNav();
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
    overlay.addEventListener("click", closeNav);
    window.addEventListener("resize", function () {
      if (window.innerWidth > 800 && nav.classList.contains("open")) {
        closeNav();
      }
    });
  }

  var header = document.querySelector(".site-header");
  var backToTop = document.querySelector(".back-to-top");
  var lastScroll = 0;

  function onScroll() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    if (progressBar) progressBar.style.width = progress + "%";
    if (header) header.classList.toggle("scrolled", scrollTop > 10);
    if (backToTop) backToTop.classList.toggle("visible", scrollTop > 400);

    lastScroll = scrollTop;
  }

  /* Lenis Smooth Scroll Setup */
  var lenis = null;
  if (typeof Lenis !== "undefined") {
    lenis = new Lenis({
      duration: 1.2,
      easing: function (t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
      },
      direction: "vertical",
      gestureDirection: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", function () {
      onScroll();
    });
  } else {
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  onScroll();

  /* Custom Eased Smooth Scrolling Engine (Lenis + Native Fallback) */
  function smoothScrollTo(targetPosition, customDuration) {
    if (lenis) {
      lenis.scrollTo(targetPosition, {
        duration: (customDuration || 1200) / 1000,
        easing: function (t) {
          return Math.min(1, 1.001 - Math.pow(2, -10 * t));
        }
      });
    } else {
      var startPosition = window.pageYOffset || document.documentElement.scrollTop;
      var distance = targetPosition - startPosition;
      if (Math.abs(distance) < 2) return;

      var startTime = null;
      var scrollDuration = customDuration || Math.min(Math.max(Math.abs(distance) * 0.5, 450), 1000);

      function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      }

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        var timeElapsed = currentTime - startTime;
        var progress = Math.min(timeElapsed / scrollDuration, 1);
        var run = easeInOutCubic(progress) * distance + startPosition;

        window.scrollTo(0, run);

        if (timeElapsed < scrollDuration) {
          requestAnimationFrame(animation);
        }
      }

      requestAnimationFrame(animation);
    }
  }

  /* Smooth Scrolling for Internal Anchor Links (#id) */
  document.addEventListener("click", function (e) {
    var anchor = e.target.closest('a[href*="#"]');
    if (!anchor) return;

    var href = anchor.getAttribute("href");
    if (!href || href === "#") return;

    var hashIndex = href.indexOf("#");
    var targetId = href.substring(hashIndex + 1);
    if (!targetId) return;

    var currentPath = window.location.pathname;
    var linkPath = href.substring(0, hashIndex);
    var isSamePage = !linkPath || currentPath.endsWith(linkPath) || linkPath === currentPath;

    if (isSamePage) {
      var targetEl = document.getElementById(targetId) || document.querySelector('[name="' + targetId + '"]');
      if (targetEl) {
        e.preventDefault();

        if (typeof closeNav === "function") closeNav();

        var headerEl = document.querySelector(".site-header");
        var headerHeight = headerEl ? headerEl.offsetHeight : 76;
        var targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;

        smoothScrollTo(targetPosition);

        if (history.pushState) {
          history.pushState(null, null, "#" + targetId);
        }
      }
    }
  });

  if (backToTop) {
    backToTop.addEventListener("click", function (e) {
      e.preventDefault();
      smoothScrollTo(0, 750);
    });
  }

  function observeReveal(selector, className) {
    var els = document.querySelectorAll(selector);
    var visibleClass = className || "visible";

    function markVisible(el) {
      el.classList.add(visibleClass);
    }

    function isInViewport(el) {
      var rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight - 40 && rect.bottom > 40;
    }

    if (!("IntersectionObserver" in window) || !els.length) {
      els.forEach(markVisible);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            markVisible(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 0px 0px" }
    );

    els.forEach(function (el) {
      if (isInViewport(el)) markVisible(el);
      else observer.observe(el);
    });
  }

  observeReveal(".reveal");
  observeReveal(".reveal-stagger");


  var counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window && counters.length) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach(function (el) { counterObserver.observe(el); });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute("data-count"), 10);
    var suffix = el.getAttribute("data-suffix") || "";
    var prefix = el.getAttribute("data-prefix") || "";
    var duration = 1400;
    var startTime = null;

    function easeOut(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var value = Math.floor(easeOut(progress) * target);
      el.textContent = prefix + value + suffix;
      if (progress < 1) window.requestAnimationFrame(step);
      else el.textContent = prefix + target + suffix;
    }

    window.requestAnimationFrame(step);
  }

  document.querySelectorAll(".product-card").forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = "translateY(-6px) perspective(600px) rotateX(" + (-y * 4) + "deg) rotateY(" + (x * 4) + "deg)";
    });
    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  });

  /* Form Submission Modal Helper */
  function showFormModal(isSuccess, title, message) {
    var modal = document.querySelector(".form-modal-overlay");
    if (!modal) {
      modal = document.createElement("div");
      modal.className = "form-modal-overlay";
      modal.innerHTML =
        '<div class="form-modal-card">' +
          '<div class="form-modal-icon">✓</div>' +
          '<h3 class="form-modal-title"></h3>' +
          '<p class="form-modal-text"></p>' +
          '<button class="form-modal-btn">OK</button>' +
        '</div>';
      document.body.appendChild(modal);

      var closeBtn = modal.querySelector(".form-modal-btn");
      closeBtn.addEventListener("click", function () {
        modal.classList.remove("active");
      });
      modal.addEventListener("click", function (e) {
        if (e.target === modal) modal.classList.remove("active");
      });
    }

    var iconEl = modal.querySelector(".form-modal-icon");
    var titleEl = modal.querySelector(".form-modal-title");
    var textEl = modal.querySelector(".form-modal-text");

    if (isSuccess) {
      iconEl.className = "form-modal-icon";
      iconEl.innerHTML = "✓";
    } else {
      iconEl.className = "form-modal-icon error-icon";
      iconEl.innerHTML = "✕";
    }

    titleEl.textContent = title;
    textEl.textContent = message;

    modal.classList.add("active");
  }

  /* Web3Forms Submission Handling */
  document.querySelectorAll("form").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var btn = form.querySelector("[type=submit]");
      var originalBtnText = btn ? btn.innerHTML : "Submit";

      var resultDiv = form.querySelector(".form-result");
      if (!resultDiv) {
        resultDiv = document.createElement("div");
        resultDiv.className = "form-result";
        form.appendChild(resultDiv);
      }

      var accessKeyInput = form.querySelector('input[name="access_key"]');
      var accessKey = accessKeyInput ? accessKeyInput.value.trim() : "";
      if (!accessKey || accessKey === "YOUR_WEB3FORMS_ACCESS_KEY" || accessKey === "YOUR_ACCESS_KEY_HERE") {
        accessKey = "3f310507-fb89-4555-81b7-9ccddd95e01e";
        if (accessKeyInput) accessKeyInput.value = accessKey;
      }

      var botcheck = form.querySelector('input[name="botcheck"]');
      if (botcheck && botcheck.checked) {
        return;
      }

      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span class="btn-spinner"></span> Sending...';
      }

      resultDiv.className = "form-result info";
      resultDiv.style.display = "block";
      resultDiv.innerHTML = "Submitting your request...";

      var formData = new FormData(form);
      var object = {};

      formData.forEach(function (value, key) {
        if (key === "botcheck") return;
        if (object[key]) {
          if (!Array.isArray(object[key])) {
            object[key] = [object[key]];
          }
          object[key].push(value);
        } else {
          object[key] = value;
        }
      });

      Object.keys(object).forEach(function (key) {
        if (Array.isArray(object[key])) {
          object[key] = object[key].join(", ");
        }
      });

      var jsonPayload = JSON.stringify(object);

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: jsonPayload
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.success) {
            resultDiv.className = "form-result success";
            resultDiv.innerHTML = "<strong>✓ Success!</strong> Your request has been sent successfully. Our team will review your specifications and get in touch.";
            form.reset();

            showFormModal(
              true,
              "Form Submitted Successfully!",
              "Thank you for contacting The Good Food Company. Your request details have been sent to our sales team. A confirmation message has also been sent to your email address."
            );
          } else {
            resultDiv.className = "form-result error";
            resultDiv.innerHTML = "<strong>⚠️ Submission Failed:</strong> " + (data.message || "Something went wrong. Please try again.");

            showFormModal(
              false,
              "Submission Failed",
              data.message || "Something went wrong while submitting the form. Please try again."
            );
          }
        })
        .catch(function (error) {
          console.error("Web3Forms submission error:", error);
          resultDiv.className = "form-result error";
          resultDiv.innerHTML = "<strong>⚠️ Connection Error:</strong> Unable to reach server. Please check your network and try again.";

          showFormModal(
            false,
            "Connection Error",
            "Unable to reach the server. Please check your internet connection and try again."
          );
        })
        .finally(function () {
          if (btn) {
            btn.disabled = false;
            btn.innerHTML = originalBtnText;
          }
        });
    });
  });

  /* Smooth FAQ accordion open/close */
  document.querySelectorAll(".faq-item").forEach(function (details) {
    var summary = details.querySelector("summary");
    var answer = details.querySelector(".faq-answer");
    if (!summary || !answer) return;

    var animating = false;

    summary.addEventListener("click", function (e) {
      e.preventDefault();
      if (animating) return;
      animating = true;

      if (details.open) {
        details.classList.remove("is-open");
        answer.style.gridTemplateRows = "1fr";
        // force reflow
        answer.offsetHeight;
        answer.style.gridTemplateRows = "0fr";
        setTimeout(function () {
          details.open = false;
          answer.style.gridTemplateRows = "";
          animating = false;
        }, 450);
      } else {
        details.open = true;
        details.classList.add("is-open");
        answer.style.gridTemplateRows = "0fr";
        // force reflow
        answer.offsetHeight;
        answer.style.gridTemplateRows = "1fr";
        setTimeout(function () {
          answer.style.gridTemplateRows = "";
          animating = false;
        }, 450);
      }
    });
  });
});
