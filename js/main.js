$(document).ready(function () {
  var scroll = new SmoothScroll('[data-scroll]', {});

  new WOW().init();
  
  $('[data-toggle="tooltip"]').tooltip()
});

$(document).on("click", ".sidebar-toggler, .sidebar-overlay", function () {
  if ($(".sidebar").hasClass("active")) {
    $(".sidebar").removeClass("active");
    $("body").removeClass("sidebar-active");
  } else {
    $(".sidebar").addClass("active");
    $("body").addClass("sidebar-active");
  }
})

$(document).on("click", "[data-filter-category]", function () {
  category = $(this).data("filter-category")

  $("[data-filter-category]").removeClass("active");
  $(this).addClass("active");

  if (category == "all") {
    $(".business-card").removeClass("hidden");
  } else {
    $(".business-card").addClass("hidden");
    $(`[data-category='${category}']`).removeClass("hidden");
  }
})

/**
 * module cluster-l
 * description
 * A custom element for grouping items, with control over the margin between them
 * property {string} justify=flex-start A CSS `justify-content` value
  display: block;
  box-sizing: content-box;
  margin-left: auto;
  margin-right: auto;
  max-width: var(--measure);
}
*/

class Cluster extends HTMLElement {
  constructor() {
    super();
    this.render = () => {
      this.i = `Cluster-${[this.justify, this.align, this.space].join('')}`;
      this.dataset.i = this.i;
      if (!document.getElementById(this.i)) {
        let styleEl = document.createElement('style');
        styleEl.id = this.i;
        styleEl.innerHTML = `
          [data-i="${this.i}"] {
            justify-content: ${this.justify};
            align-items: ${this.align};
            gap: ${this.space};
          }
        `.replace(/\s\s+/g, ' ').trim();
        document.head.appendChild(styleEl);
      }
    }
  }

  get justify() {
    return this.getAttribute('justify') || 'flex-start';
  }

  set justify(val) {
    return this.setAttribute('justify', val);
  }

  get align() {
    return this.getAttribute('align') || 'flex-start';
  }

  set align(val) {
    return this.setAttribute('align', val);
  }

  get space() {
    return this.getAttribute('space') || 'var(--s1)';
  }

  set space(val) {
    return this.setAttribute('space', val);
  }

  static get observedAttributes() {
    return ['justify', 'align', 'space'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

if ('customElements' in window) {
  customElements.define('cluster-l', Cluster);
}