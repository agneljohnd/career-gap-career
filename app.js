/* Gap to Career — behaviour.
   The page reads correctly with this file absent: nothing here supplies
   content, and every animated thing starts from a legible state. */
(function () {
  'use strict';

  /* ===================================================================
     MOCK · THE ONE THING THAT MUST BE FILLED BEFORE THIS PAGE GOES LIVE.
     Paste the payment link here (Razorpay / Cashfree / Instamojo page URL).
     The hero form POSTs name, email and phone to it. Until it is set, the
     form refuses to submit and logs an error — it never pretends to work.
     =================================================================== */
  var CHECKOUT_URL = '';

  var rm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- sticky bar: translucent only once it is actually stuck ---- */
  var top = $('#top');
  var onScrollTop = function () { top.classList.toggle('stuck', window.scrollY > 80); };
  onScrollTop();
  addEventListener('scroll', onScrollTop, { passive: true });

  /* ---------- reveal ---------------------------------------------------
     A sweep, not an observer. An IntersectionObserver never fires for an
     element that was jumped past (a #hash landing, a restored scroll
     position, a flick) or for a card clipped inside a horizontal swipe row,
     and that element then stays at opacity 0 forever. Arrival is a pure
     function of scroll position, so compute it from scroll position.       */
  var pending = $$('.rv, .s-head');
  if (rm) {
    pending.forEach(function (el) { el.classList.add('seen'); });
    pending = [];
  }
  var sweep = function () {
    if (!pending.length) return;
    var line = innerHeight * 0.9, rest = [];
    pending.forEach(function (el) {
      if (el.getBoundingClientRect().top < line) el.classList.add('seen');
      else rest.push(el);
    });
    pending = rest;
  };
  sweep();
  addEventListener('scroll', sweep, { passive: true });
  addEventListener('resize', sweep);
  addEventListener('load', sweep);

  /* ---------- curriculum timeline -------------------------------------
     Fill is a pure function of scroll position and of the dots' REAL
     centres, so scrolling back up unwinds it and a card that rewraps to a
     different height cannot make the line drift off the dots.            */
  var tl = $('#tl');
  if (tl && !rm) {
    var fill = $('.tl-fill', tl), tip = $('.tl-tip', tl), rows = $$('.tl-row', tl);
    var draw = function () {
      var box = tl.getBoundingClientRect();
      var line = Math.max(0, Math.min(1, (innerHeight * 0.62 - box.top) / box.height));
      var h = line * (box.height - 28);
      fill.style.height = h + 'px';
      if (tip) {
        tip.style.transform = 'translateY(' + (h + 6) + 'px)';
        tip.style.opacity = line > 0.01 && line < 0.99 ? '.8' : '0';
      }
      var mark = box.top + 14 + h;
      rows.forEach(function (r) {
        var dot = $('.tl-dot', r).getBoundingClientRect();
        r.classList.toggle('lit', dot.top + dot.height / 2 <= mark + 2);
      });
    };
    draw();
    addEventListener('scroll', draw, { passive: true });
    addEventListener('resize', draw);
  }

  /* ---------- price count: 7,996 -> 101, once, off the same sweep -------
     The element already reads ₹101 in the markup, so a reader who never
     triggers this (no JS, reduced motion, landed below it) sees the price. */
  var amt = $('[data-count-to]');
  if (amt && !rm) {
    var ran = false, fmt = new Intl.NumberFormat('en-IN');
    var card = amt.closest('.rv') || amt;
    var tick = function () {
      if (ran || !card.classList.contains('seen')) return;
      ran = true;
      var to = +amt.dataset.countTo, from = +amt.dataset.countFrom, t0 = performance.now(), dur = 1100;
      var step = function (now) {
        var pr = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - pr, 3);
        amt.textContent = '₹' + fmt.format(Math.round(from + (to - from) * e));
        if (pr < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    addEventListener('scroll', tick, { passive: true });
    tick();
  }

  /* ---------- LinkedIn before / after --------------------------------- */
  var tabs = $$('.li-tabs button');
  tabs.forEach(function (b) {
    b.addEventListener('click', function () {
      tabs.forEach(function (o) {
        var on = o === b;
        o.setAttribute('aria-selected', on ? 'true' : 'false');
        document.getElementById(o.getAttribute('aria-controls')).hidden = !on;
      });
    });
  });

  /* ---------- FAQ -----------------------------------------------------
     A <button> over a region, not <details>: a native one cannot animate
     its own height or close its siblings. The panels are collapsed only
     once this script has marked the list ready, so every answer is still
     readable if the script never runs.                                   */
  var list = $('#fqlist');
  if (list) {
    var items = $$('.fq-item', list);
    items.forEach(function (item, i) {
      var btn = $('.fq-btn', item), pane = $('.fq-a', item);
      pane.id = 'fq-a-' + i;
      btn.setAttribute('aria-controls', pane.id);
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        items.forEach(function (o) {
          var ob = $('.fq-btn', o), op = $('.fq-a', o);
          if (ob.getAttribute('aria-expanded') === 'true') {
            op.style.height = op.scrollHeight + 'px';
            requestAnimationFrame(function () { op.style.height = '0px'; });
            ob.setAttribute('aria-expanded', 'false');
          }
        });
        if (!open) {
          btn.setAttribute('aria-expanded', 'true');
          pane.style.height = pane.scrollHeight + 'px';
          var settle = function (e) {
            if (e.propertyName !== 'height') return;
            pane.style.height = 'auto';           /* or it clips on rewrap */
            pane.removeEventListener('transitionend', settle);
          };
          pane.addEventListener('transitionend', settle);
        }
      });
    });
    list.classList.add('js');
    var first = items[0];
    if (first) {
      $('.fq-btn', first).setAttribute('aria-expanded', 'true');
      $('.fq-a', first).style.height = 'auto';
    }
  }

  /* ---------- registration form --------------------------------------
     Fields POST to the gateway, so nothing personal goes into a URL. */
  var form = $('[data-checkout-form]');
  if (form) {
    var bad = function (f, on) { f.closest('.field').classList.toggle('bad', on); return !on; };
    form.addEventListener('submit', function (e) {
      var name = $('#f-name'), mail = $('#f-mail'), wa = $('#f-wa');
      var ok = bad(name, name.value.trim().length < 2);
      ok = bad(mail, !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail.value.trim())) && ok;
      ok = bad(wa, wa.value.replace(/[^\d]/g, '').length < 8) && ok;
      if (!ok) {
        e.preventDefault();
        $('.field.bad input', form).focus();
        return;
      }
      if (!CHECKOUT_URL) {
        e.preventDefault();
        document.body.setAttribute('data-needs-checkout', 'true');
        console.error('[Gap to Career] CHECKOUT_URL is empty in app.js. ' +
          'Paste the payment link there before this page goes live.');
        return;
      }
      form.action = CHECKOUT_URL;
    });
  }

  /* ---------- CTA anchors all route to the one form -------------------- */
  $$('a[data-checkout]').forEach(function (a) {
    a.addEventListener('click', function () {
      setTimeout(function () { var n = $('#f-name'); if (n) n.focus({ preventScroll: true }); }, 520);
    });
  });
})();
