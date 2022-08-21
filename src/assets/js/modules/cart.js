import { toggleAriaExpanded } from "./_helpers";
import A11yDialog from "a11y-dialog";

export function cart() {
  const warenkorbTrigger = document.getElementById("warenkorb-trigger");
  const cartContainer = document.querySelector("#cart-modal");

  const cartDialog = new A11yDialog(cartContainer);

  // Eingeklappt starten
  warenkorbTrigger.setAttribute("aria-expanded", "false");

  // Klick-Event ändert `aria-expanded`-Wert
  warenkorbTrigger.addEventListener("click", () =>
    toggleAriaExpanded(warenkorbTrigger)
  );

  PetiteVue.createApp({
    products: [
      {
        id: 1,
        name: "Foo",
        amount: 3,
        price: 999,
      },
      {
        id: 2,
        name: "Do",
        amount: 30,
        price: 499,
      },
      {
        id: 3,
        name: "Re",
        amount: 13,
        price: 99,
      },
      {
        id: 4,
        name: "Mi",
        amount: 5,
        price: 2549,
      },
    ],
    filterLiveRegion: document.querySelector("#filter-live-region"),
    cart: [],
    sortBy: "id",
    sortDirection: "asc",
    filterOn: false,
    get sortedProducts() {
      return this.products.sort((p1, p2) => {
        let modifier = 1;
        if (this.sortDirection === "desc") modifier = -1;
        if (p1[this.sortBy] < p2[this.sortBy]) return -1 * modifier;
        if (p1[this.sortBy] > p2[this.sortBy]) return 1 * modifier;
        return 0;
      });
    },
    isFiltered(product) {
      if (this.filterOn && product.amount < 10) {
        this.filterLiveRegion.textContent = "Filtere nach geringer Stückzahl";
        return true;
      } else {
        this.filterLiveRegion.textContent = "Zeige alle Produkte";
        return false;
      }
    },
    isInCart(id) {
      return this.cart.includes(id);
    },
    changeSort(e) {
      switch (e.target.value) {
        case "name-desc":
          this.sortDirection = "desc";
          this.sort("name");
          this.filterLiveRegion.textContent = "Sortiert nach: Name, Z bis A";
          break;
        case "name-asc":
          this.sortDirection = "asc";
          this.sort("name");
          this.filterLiveRegion.textContent = "Sortiert nach: Name, A bis Z";
          break;
        case "price-asc":
          this.sortDirection = "asc";
          this.sort("price");
          this.filterLiveRegion.textContent =
            "Sortiert nach: Preis, günstigste zuerst";
          break;
        case "price-desc":
          this.sortDirection = "desc";
          this.sort("price");
          this.filterLiveRegion.textContent =
            "Sortiert nach: Preis, teuerste zuerst";
          break;
        case "":
          this.sortDirection = "asc";
          this.sort("id");
          this.filterLiveRegion.textContent = "Sortierung zurückgesetzt";
          break;
      }
    },
    getCartItemById(id) {
      return this.products.filter((n) => n.id === id);
    },
    toggleCartItem(id) {
      if (this.isInCart(id)) {
        this.cart = this.cart.filter((n) => n != id);
      } else {
        this.cart.push(id);
        cartDialog.show();
      }
    },
    sort: function (s) {
      if (s === this.sortBy) {
        this.sortDirection = this.sortDirection === "asc" ? "asc" : "desc";
      }
      this.sortBy = s;
    },
  }).mount();
}
